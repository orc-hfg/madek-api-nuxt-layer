import type { ApiFunction } from '../types/api';

interface PlaceholderUserRepository {
	getUsers: () => Promise<User[]>;
}

interface GeoCoordinates {
	lat: string;
	lng: string;
}

interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: GeoCoordinates;
}

interface Company {
	name: string;
	catchPhrase: string;
	bs: string;
}

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}

export type Users = User[];

function createPlaceholderUserRepository($placeholderApi: ApiFunction): PlaceholderUserRepository {
	return {
		async getUsers(): Promise<Users> {
			return $placeholderApi('/users');
		},
	};
}

// This is only an example to demonstrate multiple API endpoints in this app
export function getPlaceholderUserRepository(): PlaceholderUserRepository {
	const { $placeholderApi } = useNuxtApp();

	return createPlaceholderUserRepository($placeholderApi as ApiFunction);
}
