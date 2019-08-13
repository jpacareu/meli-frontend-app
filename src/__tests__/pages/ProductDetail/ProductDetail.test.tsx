import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import ProductDetailDefault, {
	ProductDetail
} from '../../../pages/ProductDetail/ProductDetail';
import Spinner from '../../../components/Spinner';
import { IStateHistory } from '../../../models/models';
import { Provider } from '../../../store';
import { match } from 'react-router';
import { History } from 'history';

type IMatch = match<{ id: string }>;

interface ITestProps extends IStateHistory {
	match: IMatch;
}

const props: ITestProps = {
	match: {
		params: {
			id: '123'
		}
	} as IMatch,
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

describe('<ProductDetailDefault />', () => {
	beforeEach(() => {
		component = (
			<Provider>
				<ProductDetailDefault {...props} />
			</Provider>
		);
		tree = renderer.create(component);
	});

	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
});

describe('<ProductDetail />', () => {
	beforeEach(() => {
		component = (
			<Provider>
				<ProductDetail {...props} />
			</Provider>
		);
		tree = renderer.create(component);
	});

	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it("should render a '<Spinner />' when loading", () => {
		props.loadingSearch = true;

		component = (
			<Provider>
				<ProductDetail {...props} />
			</Provider>
		);
		tree = renderer.create(component);

		const condition = tree.root.findAllByType(Spinner);
		expect(condition).toHaveLength(1);
	});
});
