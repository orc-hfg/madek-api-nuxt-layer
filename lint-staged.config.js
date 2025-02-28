export default {
	'*.{ts,vue,md,json}': ['eslint --fix'],
	'*.ts': () => 'npm run check-types',
};
