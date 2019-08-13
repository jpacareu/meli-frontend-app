import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { ItemDetail, Condition } from '../../components/ItemDetail';
import { IDetailItem } from '../../models/models';

const detail: IDetailItem = {
	condition: 'new',
	description: 'This is the desciption',
	picture: 'http://mypicture.com/image.jpg',
	sold_quantity: 1000,
	title: 'Title 1',
	price: {
		amount: 2500,
		currency: 'ARS',
		decimals: 0
	},
	free_shipping: true
};

let component: JSX.Element | null = null;
let tree: ReactTestRenderer;

describe('<ItemDetail />', () => {
	beforeEach(() => {
		component = <ItemDetail detail={detail} />;
		tree = renderer.create(component);
	});
	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it("should render 'Usado'", () => {
		detail.condition = 'used';

		component = <ItemDetail detail={detail} />;
		tree = renderer.create(component);

		const condition = tree.root.findByType(Condition);
		const children = condition.findByType('div').children;
		expect(children[0]).toBe('Usado');
	});
});
