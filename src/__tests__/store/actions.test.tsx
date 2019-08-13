import renderer from 'react-test-renderer';
import * as React from 'react';
import { Provider, connect, actions as a } from '../../store';
import { IActions } from '../../models/models';
import { initialState } from '../../store/state';
import axios from 'axios';

jest.mock('axios');

const actions = a as IActions;
let MainComponent;
let App;
let tree;
let spy: any = jest.fn().mockImplementation(state => null);

describe('actions object', () => {
	beforeEach(() => {
		spy = jest.fn(state => null);
		MainComponent = connect(state => ({ ...state }))(spy);

		App = () => (
			<Provider>
				<MainComponent />
			</Provider>
		);
		tree = renderer.create(<App />);
	});

	afterEach(() => {
		spy.mockReset();
	});


	it('actions triggered and state updated', async () => {
		expect(tree.toJSON()).toMatchSnapshot();
	});
	
	it("action 'handleError' is triggered and state is NOT updated", async () => {
		await actions.handleError({});

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(expect.objectContaining(initialState));
	});

	it("action 'getProductDetail' is triggered and resolved", async () => {
		const prodId = '1';
		axios
			.create()
			// @ts-ignore
			.get.mockImplementation(() =>
				Promise.resolve({ data: { categories: ['Category 1', 'Category 2'] } })
			);

		await actions.getProductDetail(prodId);

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(
			expect.objectContaining({
				categories: ['Category 1', 'Category 2']
			})
		);
	});

	it("action 'getProductDetail' is triggered and 'detailProduct' provided", async () => {
		const prodId = '1';
		axios
			.create()
			// @ts-ignore
			.get.mockImplementation(() =>
				Promise.resolve({
					data: {
						description: 'Description'
					}
				})
			);

		await actions.getProductDetail(prodId);

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(
			expect.objectContaining({
				detailProduct: {
					description: 'Description'
				}
			})
		);
	});

	it("action 'search' is triggered and resolved", async () => {
		await actions.setState({ searchBox: 'Detergente' });

		axios
			.create()
			// @ts-ignore
			.get.mockImplementation(() =>
				Promise.resolve({
					data: {
						items: [
							{
								id: '1'
							},
							{
								id: '2'
							}
						],
						categories: ['Category 1', 'Category 2']
					}
				})
			);

		await actions.search();

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(
			expect.objectContaining({
				items: [
					{
						id: '1'
					},
					{
						id: '2'
					}
				],
				categories: ['Category 1', 'Category 2']
			})
		);
	});

	it("action 'search' is triggered and rejected", async () => {
		const newState = { initialState, searchBox: 'Detergente' };
		await actions.setState(newState);

		axios
			.create()
			// @ts-ignore
			.get.mockImplementation(() =>
				Promise.reject({
					data: {}
				})
			);

		await actions.search();

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(expect.objectContaining(newState));
	});

	it("should not trigger API call for action 'search' if empty string provided", async () => {
		const newState = { initialState, searchBox: '' };
		await actions.setState(newState);
		const spy = jest.fn();

		axios
			.create()
			// @ts-ignore
			.get.mockImplementation(spy);

		await actions.search();

		expect(spy).not.toHaveBeenCalled();
	});


	it("action 'loading' is triggered and state updated", async () => {
		await actions.loading();

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(
			expect.objectContaining({
				loadingSearch: true
			})
		);
	});

	it("action 'received' is triggered and state updated", async () => {
		await actions.received();

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(
			expect.objectContaining({
				loadingSearch: false
			})
		);
	});

	it("action 'setState' is triggered and state updated", async () => {
		await actions.setState({ searchBox: 'Text' });

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(
			expect.objectContaining({
				searchBox: 'Text'
			})
		);
	});

	it("action 'setState' is triggered and state NOT updated when no parameter provided", async () => {
		await actions.setState();

		const instance = tree.root.findByType(MainComponent).children[0];

		expect(instance.props).toEqual(
			expect.objectContaining({
				searchBox: 'Text'
			})
		);
	});
});
