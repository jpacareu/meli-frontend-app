import React from 'react';
import App from '../App';
import renderer, { ReactTestRenderer } from 'react-test-renderer';

let component: JSX.Element | null = null;
let tree: ReactTestRenderer;

describe('<App />', () => {
	beforeEach(() => {
		component = <App />;
		tree = renderer.create(component);
	});
	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
});
