export type ThrottledFuncType = (...args: any[]) => any;

export const throttle = <F extends ThrottledFuncType>(throttledFn: F, delayTime: number) => {
	let lastCallTime = 0;

	return (...args: Parameters<F>) => {
		const currentCallTime = new Date().getTime();
		if (currentCallTime - lastCallTime < delayTime) return;
		lastCallTime = currentCallTime;
		throttledFn(...args);
	};
};