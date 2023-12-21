import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDataResponse, IMessage } from '../../types';
import { ChatApi } from '../../api/ChatApi';

const chatApi = new ChatApi('ws://217.151.229.187:9080/api/chat?chat_person_id=1');

interface IChatState {
	messageStatus: 'start' | 'stream' | 'end';
	isOpen: boolean;
	canSendMessage: boolean;
	messages: IMessage[];
}

const initialState: IChatState = {
	isOpen: true,
	messageStatus: 'end',
	canSendMessage: true,
	messages: [],
};

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
					state.canSendMessage = true;
					break;
				}
				default:
					break;
			}
		},
		deleteMessages: (state: IChatState) => {
			state.messages = [];
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(openWSChanel.pending, (state, action) => {
				console.log('Идет подключение к серверу чата..');
			})
			.addCase(openWSChanel.fulfilled, (state, action) => {
				console.log('Чат успешно подключен к серверу.');
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

export const sendMessageThunk = createAsyncThunk('chat/sendMessageThunk', async (message: string | Blob): Promise<void> => {
	// todo: здесь не должно быть обработки ошибок
	try {
		chatApi.sendMessage(message);
	} catch (error) {
		console.error('Error sending a message.', error);
	}
});

export { chatActions, chatReducer };