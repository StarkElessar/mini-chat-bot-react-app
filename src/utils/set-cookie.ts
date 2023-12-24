interface ICookieOptions {
	cookieName: string;
	cookieValue: string;
	expirationDays: number;
}

export const setCookie = ({ cookieName, cookieValue, expirationDays }: ICookieOptions) => {
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + expirationDays);

	document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`;
};