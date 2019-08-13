import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { IStateHistory } from '../../../models/models';
import { History, createBrowserHistory } from 'history';
import { Search } from '../../../pages/Search/Search';
import { Router, Route } from 'react-router';
import { Provider, actions } from '../../../store';

const props: IStateHistory = {
	loadingSearch: false,
	detailProduct: {
		item: {
			condition: 'new',
			description: 'This is the description',
			free_shipping: true,
			picture: 'http://mywebsite.com/image.jpg',
			sold_quantity: 1000,
			title: 'Title 1',
			price: {
				amount: 1000,
				currency: 'ARS',
				decimals: 0
			}
		}
	},
	categories: ['Category 1', 'Category 2', 'Category 3'],
	items: [],
	searchBox: '',
	history: {} as History
};

let component: JSX.Element | null = null;
let tree: ReactTestRenderer;

describe('<Search />', () => {
	beforeEach(() => {
		const history = createBrowserHistory();
		history.push = () => {};
		component = (
			<Router history={history}>
				<Provider>
					<Route component={Search} exact path="/" />
				</Provider>
			</Router>
		);
		tree = renderer.create(component);
	});

	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it("should call 'onSubmit'", () => {
		const form = tree.root.findByType('form');
		const event = {
			preventDefault: jest.fn(),
			target: {
				value: 'Value'
			}
		};

		form.props.onSubmit(event);

		expect(event.preventDefault).toHaveBeenCalled();
	});

	it("should call 'onSubmit' when clicking button", () => {
		const form = tree.root.findByType('button');
		const event = {
			preventDefault: jest.fn(),
			target: {
				value: 'Value'
			}
		};
		form.props.onClick(event);

		expect(event.preventDefault).toHaveBeenCalled();
	});

	it("should call 'onChange' when changing text", () => {
		const input = tree.root.findByProps({ className: 'search-bar__input' });
		const event = {
			target: {
				value: 'Value'
			}
		};
		actions.setState = jest.fn();
		input.props.onChange(event);

		expect(actions.setState).toHaveBeenCalledWith({ searchBox: 'Value' });
	});
});
