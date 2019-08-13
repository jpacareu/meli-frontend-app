import createStore from 'react-waterfall';
import { actionsCreators } from './actions';
import { initialState } from './state';

const config = {
	initialState: initialState,
	actionsCreators: actionsCreators
};
const store = createStore(config);

export const { Provider, connect, actions } = store;
