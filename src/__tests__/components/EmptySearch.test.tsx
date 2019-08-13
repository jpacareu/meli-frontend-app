import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { EmptySearch } from '../../components/EmptySearch';

let component: JSX.Element | null = null;
let tree: ReactTestRenderer;

describe('<EmptySearch />', () => {
	beforeEach(() => {
		component = <EmptySearch />;
		tree = renderer.create(component);
	});
	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
	it("should be a 'null' component", () => {
		expect(tree.root.instance).toBeNull();
	});
});
