import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import { chatReducer } from './slices/chat-slice';
import { feedbackReducer } from './slices/feedback-slice';

const isDev = process.env.NODE_ENV === 'development';

const rootReducer = combineReducers({
	chat: chatReducer,
	feedback: feedbackReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		const middlewares = [];

		if (isDev) {
			middlewares.push(logger);
		}

		return getDefaultMiddleware().concat([...middlewares]);
	},
	devTools: isDev,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;