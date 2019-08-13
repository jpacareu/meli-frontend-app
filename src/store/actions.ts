import axios from 'axios';
import { IState, IActions } from '../models/models';

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://meli-backend-app.herokuapp.com'
		: 'http://localhost:4000';

const axiosInstance = axios.create({
	baseURL: baseURL + '/api/'
});

export const actionsCreators: IActions = {
	search: async (state: IState, actions) => {
		let resultState: any = {};

		if (state.searchBox === '') return resultState;

		await actions.loading();

		try {
			const result = await axiosInstance.get('/items', {
				params: {
					q: state.searchBox
				}
			});

			const { items, categories } = result.data;
			resultState = { items: items || [], categories: categories || [] };
		} catch (error) {
			await actions.handleError(error);
		} finally {
			await actions.received();
		}

		return resultState;
	},
	getProductDetail: async (state: IState, actions, id: string = '') => {
		let resultState: any = {};
		await actions.loading();
		try {
			const result = await axiosInstance.get(`/items/${id}`);
			const { categories, ...rest } = result.data;
			resultState = {
				detailProduct: rest,
				categories
			};
		} catch (error) {
			await actions.handleError(error);
		} finally {
			await actions.received();
			return resultState;
		}
	},
	loading: () => {
		return { loadingSearch: true };
	},
	received: () => {
		return { loadingSearch: false };
	},
	handleError: (state, actions, error) => {
		// Handle error mock
		return {};
	},
	setState: (state, actions, value = {}) => {
		return { ...value };
	}
};
