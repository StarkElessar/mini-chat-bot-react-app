// Функция для чтения файла как ArrayBuffer
export const readFile = (file: File): Promise<ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.readAsArrayBuffer(file);

		reader.addEventListener('load', () => {
			resolve(reader.result as ArrayBuffer);
		});

		reader.addEventListener('error', () => {
			reject(reader.error)
		});
	});
};