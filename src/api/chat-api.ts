import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISendFeedbackDto } from '../types';

export class ChatAPI {
	public static sendFeedback = createAsyncThunk('feedback/sendFeedback', async (dto: ISendFeedbackDto) => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/work-report`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(dto)
		});

		return response.json();
	});
}