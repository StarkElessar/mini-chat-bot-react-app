import { useRef, useLayoutEffect, useState, MutableRefObject } from 'react';

interface IElementHeightData {
	elementRef: MutableRefObject<HTMLDivElement | null>;
	elementStyle: Record<string, string>;
}

// Кастомный хук для получения высоты элемента
export const useElementHeight = (elementName: string): IElementHeightData => {
	const [elementHeight, setElementHeight] = useState<number | null>(null);
	const elementRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		if (elementRef.current) {
			setElementHeight(elementRef.current.clientHeight);
		}
	}, [elementRef]);

	const elementStyle = {
		[`--m-chat-${elementName}-height`]: `${elementHeight}px`,
	};

	return { elementRef, elementStyle };
}