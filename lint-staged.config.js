export default {
	'*.{ts,vue,md,json}': ['eslint --fix'],
	'*.{ts,vue}': () => 'npm run check:unused',
	'*.ts': () => 'npm run check:types',
};
