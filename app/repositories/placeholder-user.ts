import type { ApiFunction } from '../types/api';

interface PlaceholderUserRepository {
	getUsers: () => Promise<User[]>;
}

interface GeoCoordinates {
	lat: string;
	lng: string;
}

interface Address {
	city: string;
	geo: GeoCoordinates;
	street: string;
	suite: string;
	zipcode: string;
}

interface Company {
	bs: string;
	catchPhrase: string;
	name: string;
}

interface User {
	address: Address;
	company: Company;
	email: string;
	id: number;
	name: string;
	phone: string;
	username: string;
	website: string;
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
