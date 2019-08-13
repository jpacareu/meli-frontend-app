import { Breadcrumb } from '../../components/Breadcrumb';
import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';

const list = ['Categoria 1', 'Categoria 2', 'Categoria 3'];

let component: JSX.Element | null = null;
let tree: ReactTestRenderer;

describe('<Breadcrumb />', () => {
	beforeEach(() => {
		component = <Breadcrumb list={list} />;
		tree = renderer.create(component);
	});
	it('should render without crashing', () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
	it('should have 3 categories as <li />', () => {
		const li = tree.root.findAllByType('li');
		expect(li).toHaveLength(3);
	});
	it('should NOT render any <li />', () => {
		// @ts-ignore
		component = <Breadcrumb list={null} />;
		tree = renderer.create(component);

		const li = tree.root.findAllByType('li');
		expect(li).toHaveLength(0);
	});
});
