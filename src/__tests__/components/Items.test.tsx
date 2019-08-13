import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { IStateHistory } from '../../models/models';
import { Items, Item, FreeShipping } from '../../components/Items';
import { History } from 'history';

const props: IStateHistory = {
	items: [
		{
			id: '1',
			title: 'Title 1',
			condition: 'new',
			picture: 'http://mywebsite.com/image1.jpg',
			price: {
				amount: 1234,
				currency: 'USD',
				decimals: 0
			},
			free_shipping: true
		},
		{
			id: '2',
			title: 'Title 2',
			condition: 'new',
			picture: 'http://mywebsite.com/image2.jpg',
			price: {
				amount: 5678,
				currency: 'ARS',
				decimals: 0
			},
			free_shipping: false
		},
		{
			id: '3',
			title: 'Title 3',
			condition: 'new',
			picture: 'http://mywebsite.com/image3.jpg',
			price: {
				amount: 9999,
				currency: 'ARS',
				decimals: 0
			},
			free_shipping: false
		}
	],
	history: {
		push: jest.fn() as any
	} as History
} as IStateHistory;

let component: JSX.Element | null = null;
let tree: ReactTestRenderer;

describe('<Items />', () => {
	beforeEach(() => {
		component = <Items {...props} />;
		tree = renderer.create(component);
	});
	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it("should render 3 'Item'", () => {
		const items = tree.root.findAllByType(Item);
		expect(items.length).toBe(3);
	});

	it("should call 'push' from history", () => {
		const image = tree.root.findAllByProps({ className: 'item__image' })[0];

		image.props.onClick();

		expect(props.history.push).toHaveBeenCalled();
	});

	it("should render 1 'FreeShipping' component", () => {
		component = <Items {...props} />;
		tree = renderer.create(component);

		const items = tree.root.findAllByType(FreeShipping);
		expect(items).toHaveLength(1);
	});
});
