const create = {
	get: jest.fn(),
	put: jest.fn(),
	interceptors: {
		request: {
			use: () => ({})
		},
		response: {
			use: () => ({})
		}
	}
};

export default {
	get: jest.fn(),
	create: () => create
};
