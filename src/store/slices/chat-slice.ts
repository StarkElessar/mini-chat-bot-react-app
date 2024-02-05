import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { IDataResponse, IMessage } from '../../types';
import { ChatWebSocketAPI } from '../../api/chat-websocket-api';

export interface IChatState {
	messageStatus: 'start' | 'stream' | 'end';
	isTypingBot: boolean;
	isOpen: boolean;
	canSendMessage: boolean;
	messages: IMessage[];
}

const initialState: IChatState = {
	isOpen: true,
	isTypingBot: false,
	messageStatus: 'end',
	canSendMessage: true,
	messages: [],
};

const { actions: chatActions, reducer: chatReducer } = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		openChat: (state) => {
			state.isOpen = true;
		},
		closeChat: (state) => {
			state.isOpen = false;
		},
		messagesReceived: (state, { payload }: PayloadAction<IDataResponse>) => {
			switch (payload.type) {
				case 'start': {
					state.canSendMessage = false;
					break;
				}
				case 'stream': {
					if (payload.sender === 'bot') {
						state.isTypingBot = false;
					}

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

					if (payload.sender === 'you') {
						state.isTypingBot = true;
					}

					if (payload.sender === 'bot') {
						const messages = current(state.messages);
						const existingMessageIndex = state.messages.findIndex(({ id, type_message }) =>
							id === payload.id && type_message === 'message');

						if (existingMessageIndex !== -1) {
							state.messages[existingMessageIndex] = {
								...messages[existingMessageIndex],
								has_feedback: false
							}
						}
					}

					state.canSendMessage = true;
					break;
				}
			}
		},
		deleteMessages: (state) => {
			state.messages = [];
		},
		addMessage: (state, { payload }: PayloadAction<IMessage>) => {
			state.messages.push(payload);
		},
		changeFeedbackStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
			const existingMessageIndex = state.messages.findIndex(({ id }) => id === payload.id);

			if (existingMessageIndex !== -1) {
				/*
				* TODO: временный костыль, пока что бэк не можжет получать id нужного смс от бота
				*  */
				state.messages[existingMessageIndex + 1].has_feedback = true;
			}
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(ChatWebSocketAPI.openWSChanel.pending, () => {
				console.log('Идет подключение к серверу чата..');
			})
			.addCase(ChatWebSocketAPI.openWSChanel.fulfilled, () => {
				console.log('Чат успешно подключен к серверу.');
			})
	}
});

export { chatActions, chatReducer };