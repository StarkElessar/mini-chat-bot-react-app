import { Fragment, lazy, Suspense, useState } from 'react';

import cookie from './assets/images/cookie-icon.svg';

const ChatBot = lazy(() => import('./components/ChatBot'));

const App = () => {
	const [ chatLoaded, setChatLoaded ] = useState<boolean>(false);

	const initChatBot = () => {
		setChatLoaded(true);
	};

	return (
		<Fragment>
			{
				!chatLoaded ? (
					<button
						onClick={initChatBot}
						className="m-chat-button-load"
					>
						<img src={cookie} alt="Запустить чат"/>
					</button>
				) : (
					<Suspense>
						<ChatBot/>
					</Suspense>
				)
			}
		</Fragment>
	)
};

export default App;