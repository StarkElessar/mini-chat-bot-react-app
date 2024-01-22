import { Fragment, lazy, Suspense, useState } from 'react';

import botIcon from './assets/images/start-icon.png';

const ChatBot = lazy(() => import('./components/ChatBot'));

const App = () => {
	const [ chatLoaded, setChatLoaded ] = useState<boolean>(false);

	const initChatBot = () => {
		setChatLoaded(true);
	};

	return (
		<Fragment>
			{
				chatLoaded ? (
					<Suspense>
						<ChatBot/>
					</Suspense>
				) : (
					<button
						onClick={ initChatBot }
						className="m-chat-button-load"
					>
						<img src={ botIcon } alt="Запустить чат"/>
					</button>
				)
			}
		</Fragment>
	);
};

export default App;