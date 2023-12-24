import { FC } from 'react';

interface IProps {
	message: string;
}

const SystemMessage: FC<IProps> = ({ message }) => {
	return (
		<div className="m-chat-message system">
			{ message }
		</div>
	);
};

export default SystemMessage;