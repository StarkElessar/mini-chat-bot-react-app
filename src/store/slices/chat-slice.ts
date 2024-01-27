import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { IDataResponse, IMessage } from '../../types';
import { ChatApi } from '../../api/ChatApi';
import { getCookie } from '../../utils/get-cookie';

const chatApi = new ChatApi('ws://217.151.229.187:9080/api/chat?chat_person_id=1');

const linkRegExp = /https?:\/\/[^\s)]+/;

export interface ICheckingLimitData {
	userid: string | null;
	quest?: string;
	answ?: string;
}

export interface IRecipe {
	NAME: string;
	PHOTO: string;
}

export interface IChatState {
	messageStatus: 'start' | 'stream' | 'end';
	isOpen: boolean;
	canSendMessage: boolean;
	messages: IMessage[];
	isLoadingRecipes: boolean;
	allRecipes: Record<string, IRecipe> | null;
	userDialogData: ICheckingLimitData
}

const initialState: IChatState = {
	isOpen: true,
	messageStatus: 'end',
	canSendMessage: true,
	messages: [],
	isLoadingRecipes: false,
	allRecipes: null,
	userDialogData: {
		userid: getCookie(process.env.REACT_APP_COOKIE_NAME || ''),
		quest: '',
		answ: ''
	}
};

let FIRST_CYCLE = true;

const { actions: chatActions, reducer: chatReducer } = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		openChat: (state: IChatState): void => {
			state.isOpen = true;
		},
		closeChat: (state: IChatState): void => {
			state.isOpen = false;
		},
		messagesReceived: (state: IChatState, { payload }: PayloadAction<IDataResponse>) => {
			switch (payload.type) {
				case 'start': {
					state.canSendMessage = false;
					break;
				}
				case 'stream': {
					const existingMessageIndex = state.messages.findIndex(({ id }) => id === payload.id);

					if (existingMessageIndex !== -1) {
						state.messages[existingMessageIndex].message += payload.message;
					} else {
						state.messages.push(payload);
					}
					break;
				}
				case 'end': {
					if (payload.type_message === 'system') {
						state.messages.push(payload);
					}

					if (payload.sender === 'bot') {
						const messages = current(state.messages);
						// нужна проверка, тк current из библиотеки Immer ожидает получить валидные данные а не null
						const allRecipes = state.allRecipes ? current(state.allRecipes) : null;
						const lastYouMessage = messages.filter(({ sender }) => sender === 'you').at(-1);
						const lastBotMessage = messages.filter(({ sender }) => sender === 'bot').at(-1);
						const firstMessageIndexFromBot = messages.findIndex(({ type_message, sender, id }) =>
							type_message === 'message' && sender === 'bot' && id === payload.id);
						const hasLink = lastBotMessage?.message.match(linkRegExp);

						if (firstMessageIndexFromBot !== -1) {
							state.messages[firstMessageIndexFromBot] = {
								...messages[firstMessageIndexFromBot],
								first_message: FIRST_CYCLE
							};

							if (FIRST_CYCLE) FIRST_CYCLE = false;
						}

						state.userDialogData.quest = lastYouMessage?.message;
						state.userDialogData.answ = lastBotMessage?.message;

						if (hasLink && allRecipes) {
							const link = hasLink[0];
							const data: IRecipe | undefined = allRecipes[link];

							data && state.messages.push({
								id: crypto.randomUUID(),
								sender: 'bot',
								type_message: 'image-link',
								message: data.NAME,
								photo_link: data.PHOTO,
								link: link
							})
						}
					}

					state.canSendMessage = true;
					break;
				}
				default:
					break;
			}
		},
		deleteMessages: (state: IChatState) => {
			state.messages = [];
		},
		addMessage: (state, { payload }: PayloadAction<IMessage>) => {
			state.messages.push(payload);
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(openWSChanel.pending, () => {
				console.log('Идет подключение к серверу чата..');
			})
			.addCase(openWSChanel.fulfilled, () => {
				console.log('Чат успешно подключен к серверу.');
			})
			.addCase(smsCountRemainRequest.fulfilled, (state, action: PayloadAction<number>) => {
				if (!action.payload) {
					state.messages.push({
						id: crypto.randomUUID(),
						message: 'Суточный лимит на отправку сообщений превышен.',
						sender: 'bot',
						type_message: 'system'
					});
				}
			})
			.addCase(smsCountRemainRequest.rejected, (state, action) => {
				state.messages.push({
					id: crypto.randomUUID(),
					message: 'Ошибка при получении лимита. Обратитесь к администратору или повторите попытку позже.',
					sender: 'bot',
					type_message: 'system'
				});
			})
			.addCase(getAllRecipes.pending, (state) => {
				state.isLoadingRecipes = true;
			})
			.addCase(getAllRecipes.fulfilled, (state, action: PayloadAction<Record<string, IRecipe>>) => {
				state.isLoadingRecipes = false;
				state.allRecipes = action.payload;
			})
			.addCase(getAllRecipes.rejected, (state, action) => {
				state.isLoadingRecipes = false;
			})
	}
});

export const openWSChanel = createAsyncThunk('chat/openWSChat', async (arg, thunkAPI) => {
	chatApi.createWSChannel();
	chatApi.subscribe((data) => {
		thunkAPI.dispatch(chatActions.messagesReceived(data));
	});
});

export const closeWSChanel = createAsyncThunk('chat/closeWSChat', async (arg, thunkAPI) => {
	chatApi.closeWSChanel();
	chatApi.unsubscribe((data) => {
		thunkAPI.dispatch(chatActions.messagesReceived(data));
	});
});

export const sendMessageThunk = createAsyncThunk('chat/sendMessageThunk', async (message: string | Blob) => {
	chatApi.sendMessage(message);
});

export const smsCountRemainRequest = createAsyncThunk('chat/checkLimits', async () => {
	const userId = getCookie(process.env.REACT_APP_COOKIE_NAME || '');
	const res = await fetch(`${process.env.REACT_APP_API_URL}/local/rest/chat_get.php?token=${userId}`, { method: 'GET' });

	return res.json();
});

export const sendLogData = createAsyncThunk('chat/sendLogData', async (data: ICheckingLimitData) => {
	const res = await fetch(`${process.env.REACT_APP_API_URL}/local/rest/chat_send.php`, {
		method: 'POST',
		body: JSON.stringify(data),
	});

	return res.text();
});

export const getAllRecipes = createAsyncThunk('chat/getAllRecipes', async () => {
	const res = await fetch('https://baking-academy.ru/local/category/all_official.json');
	return res.json();
})


export { chatActions, chatReducer };