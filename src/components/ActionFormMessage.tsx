import React, { ChangeEvent, FC, FormEvent, useId, useState } from 'react';
import cn from 'classnames';

import { MessageAvatar } from './MessageAvatar';

interface IProps {
	isMe: boolean;
}

const ActionFormMessage: FC<IProps> = ({ isMe }) => {
	const id = useId();
	const surnameInputId = id + 'surname';
	const addressInputId = id + 'address';
	const phoneInputId = id + 'phone';
	const addInfoInputId = id + 'add_info'

	const [agreement, setAgreement] = useState(false);

	const setAgreementHandle = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.currentTarget.checked);
		setAgreement((prevState) => !prevState);
	};

	const sendFormHandle = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(event.target);
	};

	return (
		<div className={cn('m-chat-message', isMe ? 'user' : 'bot')}>
			<MessageAvatar isMe={isMe}/>

			<div className="m-chat-message__text">
				<form className="m-chat-action-form" onSubmit={sendFormHandle}>
					<fieldset className="m-chat-action-form__fieldset">
						<label
							htmlFor={surnameInputId}
							className="m-chat-action-form__label m-chat-action-form__label_required"
						>
							Фамилия, имя, отчество собственника жилого помещения:
						</label>
						<input
							id={surnameInputId}
							type="text"
							placeholder="ФИО"
							name="surname"
							className="m-chat-action-form__input"
						/>
					</fieldset>
					<fieldset className="m-chat-action-form__fieldset">
						<label
							htmlFor={addressInputId}
							className="m-chat-action-form__label m-chat-action-form__label_required"
						>
							Адрес жилого помещения, где необходимо произвести работы:
						</label>
						<input
							id={addressInputId}
							type="text"
							placeholder="Адрес"
							name="address"
							className="m-chat-action-form__input"
						/>
					</fieldset>
					<fieldset className="m-chat-action-form__fieldset">
						<label
							htmlFor={phoneInputId}
							className="m-chat-action-form__label m-chat-action-form__label_required"
						>
							Контактный телефон для согласования времени прихода мастера:
						</label>
						<input
							id={phoneInputId}
							type="tel"
							placeholder="+375 (33) 444-66-33"
							name="phone"
							className="m-chat-action-form__input"
						/>
					</fieldset>
					<fieldset className="m-chat-action-form__fieldset">
						<label
							htmlFor={addInfoInputId}
							className="m-chat-action-form__label"
						>
							Также Вы можете сообщить другую дополнительную информацию:
						</label>
						<textarea
							id={addInfoInputId}
							placeholder="Дополнительная информация"
							name="add_info"
							className="m-chat-action-form__textarea"
						/>
					</fieldset>
					<label className="m-chat-action-form__agreement">
						<input
							type="checkbox"
							name="agreement"
							checked={agreement}
							onChange={setAgreementHandle}
						/>
						<span className="m-chat-action-form__checkbox"/>
						<span className="m-chat-action-form__agreement-text">Я даю согласие на обработку моих персональных данных.</span>
					</label>
					<button
						type="submit"
						className="m-chat-action-form__submit-btn"
						disabled={!agreement}
					>
						Отправить заявку
					</button>
				</form>
			</div>
		</div>);
};

export default ActionFormMessage;