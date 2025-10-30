export interface UserDisplayData {
	id: AuthInfo['id'];
	login: AuthInfo['login'];
	firstName: AuthInfo['first_name'];
	lastName: AuthInfo['last_name'];
	displayName: string;
}

interface UserService {
	getUserDisplayData: () => Promise<UserDisplayData>;
}

export function createDisplayName(firstName: string, lastName: string): string {
	return [firstName, lastName]
		.filter(name => isNonEmptyString(name))
		.map(name => name.trim())
		.join(' ');
}

function createUserService(): UserService {
	const userRepository = getUserRepository();

	return {
		async getUserDisplayData(): Promise<UserDisplayData> {
			const authInfo = await userRepository.getAuthInfo();

			return {
				id: authInfo.id,
				login: authInfo.login,
				firstName: authInfo.first_name,
				lastName: authInfo.last_name,
				displayName: createDisplayName(authInfo.first_name, authInfo.last_name),
			};
		},
	};
}

export function getUserService(): UserService {
	return createUserService();
}
