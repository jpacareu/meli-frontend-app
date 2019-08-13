import React, { Fragment } from 'react';
import { connect } from '../store';
import Spinner from './Spinner';
import { IState, IStateHistory } from '../models/models';
import { Items } from './Items';
import { Breadcrumb } from './Breadcrumb';

export let ResultSearch = (props: IStateHistory) => {
	return props.loadingSearch ? (
		<Spinner />
	) : (
		<Fragment>
			<Breadcrumb list={props.categories} />
			<Items {...props} />
		</Fragment>
	);
};

export default ResultSearch = connect((state: IState) => ({ ...state }))(
	ResultSearch
);
