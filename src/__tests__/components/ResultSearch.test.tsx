import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { ResultSearch } from '../../components/ResultSearch';
import { IStateHistory } from '../../models/models';
import Spinner from '../../components/Spinner';

const props: IStateHistory = {
	loadingSearch: false,
	categories: ['Category 1', 'Category 2', 'Category 3'],
	items: [] as any
} as IStateHistory;

let component: JSX.Element | null = null;
let tree: ReactTestRenderer;

describe('<ResultSearch />', () => {
	beforeEach(() => {
		component = <ResultSearch {...props} />;
		tree = renderer.create(component);
	});
	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
	it("should render the '<Spinner />' when loading", () => {
		props.loadingSearch = true;

		component = <ResultSearch {...props} />;
		tree = renderer.create(component);

		const condition = tree.root.findByType(Spinner);
		expect(condition.instance).toBeDefined();
	});
});
