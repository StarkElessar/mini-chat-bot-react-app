import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatAPI } from '../../api/chat-api';

interface IFeedbackState {
	openedPopup: boolean;
	messageId: string | null;
	isLoadingFeedback: boolean;
}

const initialState: IFeedbackState = {
	openedPopup: false,
	messageId: null,
	isLoadingFeedback: false,
};

const { actions: feedbackActions, reducer: feedbackReducer } = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		togglePopup: (state, action: PayloadAction<boolean>) => {
			state.openedPopup = action.payload;
		},
		setMessageId: (state, action: PayloadAction<string | null>) => {
			state.messageId = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(ChatAPI.sendFeedback.pending, (state) => {
				state.isLoadingFeedback = true;
			})
			.addCase(ChatAPI.sendFeedback.fulfilled, (state) => {
				state.isLoadingFeedback = false;
			})
			.addCase(ChatAPI.sendFeedback.rejected, (state) => {
				state.isLoadingFeedback = false;
			})
	}
});

export { feedbackActions, feedbackReducer };