import React, { Component } from 'react';
import { IState, IDetailItem, IActions } from '../../models/models';
import { match } from 'react-router';
import { connect, actions } from '../../store';
import Spinner from '../../components/Spinner';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ItemDetail } from '../../components/ItemDetail';

interface IProps extends IState {
	match: match<{ id: string }>;
}

export class ProductDetail extends Component<IProps> {
	componentDidMount = async () => {
		const { id } = this.props.match.params;
		await actions.getProductDetail(id);
	};
	render() {
		const { detailProduct, categories, loadingSearch } = this.props;

		return loadingSearch ? (
			<Spinner />
		) : (
			<div>
				<Breadcrumb list={categories} />
				{detailProduct && (
					<ItemDetail detail={detailProduct.item as IDetailItem} />
				)}
			</div>
		);
	}
}

export default connect((state: IState) => ({ ...state }))(ProductDetail);
