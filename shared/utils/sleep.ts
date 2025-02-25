export const sleep = (milliseconds: number) => {
	return new Promise((resolve, _reject) => {
		setTimeout(resolve, milliseconds);
	});
};
