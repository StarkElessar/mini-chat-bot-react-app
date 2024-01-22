import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';

import { chatActions } from '../store/slices/chat-slice';
import { feedbackActions } from '../store/slices/feedback-slice';
import { AppDispatch, RootState } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useActions = () => {
	const dispatch = useDispatch();
	return useMemo(() => bindActionCreators({
		...chatActions,
		...feedbackActions
	}, dispatch), [dispatch]);
};