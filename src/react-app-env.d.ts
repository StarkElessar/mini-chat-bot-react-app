/// <reference types="react-scripts" />
import 'react';

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number
	}
}