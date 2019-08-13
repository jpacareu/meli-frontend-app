import { IState } from '../models/models';

export const initialState: IState = {
	items: [],
	searchBox: '',
	categories: [],
	loadingSearch: false,
	detailProduct: null
};
