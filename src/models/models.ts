import { History } from 'history';

export interface IState {
	items: IItem[];
	searchBox: string;
	categories: string[];
	loadingSearch: boolean;
	detailProduct: {
		item: IDetailItem;
	} | null;
}

export interface IActions {
	search: (...rest: any) => {};
	getProductDetail: (...rest: any) => {};
	loading: (...rest: any) => {};
	received: (...rest: any) => {};
	setState: (...rest: any) => {};
	handleError: (...rest: any) => {};
}

export interface IStateHistory extends IState {
	history: History;
}

export interface IDetailItem {
	title: string;
	price: IPrice;
	picture: string;
	condition: ICondition;
	free_shipping: boolean;
	sold_quantity: number;
	description: string;
}

export interface IItem {
	id: string;
	title: string;
	price: IPrice;
	picture: string;
	condition: ICondition;
	free_shipping: boolean;
}

export type ICondition = 'new' | 'used';

export interface IPrice {
	currency: string;
	amount: number;
	decimals: number;
}

export interface IStore {
	Provider: any;
	connect: () => any;
	actions: IActions;
}
