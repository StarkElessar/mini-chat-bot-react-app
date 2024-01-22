import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatActions } from '../store/slices/chat-slice';
import { WebSocketManager } from '../utils/websocket-manager';

export class ChatWebSocketAPI {
	public static wsInstance = new WebSocketManager(process.env.REACT_APP_WS_URL as string);

	public static openWSChanel = createAsyncThunk('chat/openWSChat', async (arg, thunkAPI) => {
		ChatWebSocketAPI.wsInstance.createWSChannel();
		ChatWebSocketAPI.wsInstance.subscribe((data) => {
			thunkAPI.dispatch(chatActions.messagesReceived(data));
		});
	});

	public static closeWSChanel = createAsyncThunk('chat/closeWSChat', async (arg, thunkAPI) => {
		ChatWebSocketAPI.wsInstance.closeWSChanel();
		ChatWebSocketAPI.wsInstance.unsubscribe((data) => {
			thunkAPI.dispatch(chatActions.messagesReceived(data));
		});
	});

	public static sendMessage = createAsyncThunk('chat/sendMessageThunk', async (message: string | Blob) => {
		ChatWebSocketAPI.wsInstance.sendMessage(message);
	});
}