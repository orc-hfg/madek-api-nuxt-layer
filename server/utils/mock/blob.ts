import { Buffer } from 'node:buffer';

export function dataUrlToBlob(dataUrl: string): Blob {
	const parts = dataUrl.split(',');
	const header = parts[0];
	const base64 = parts[1];

	if (!header || !base64) {
		throw new Error('Invalid data URL format.');
	}

	const mimeMatch = (/data:(?<mimeType>.*?);base64/u).exec(header);
	const mime = mimeMatch?.groups?.mimeType ?? 'image/jpeg';
	const buffer = Buffer.from(base64, 'base64');

	const bytes = new Uint8Array(buffer);
	const blob = new Blob([bytes], { type: mime });

	return blob;
}
