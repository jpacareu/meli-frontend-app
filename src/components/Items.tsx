import React from 'react';
import { IStateHistory, IItem, IPrice } from '../models/models';
import freeShippingLogo from '../assets/ic_shipping.png';
import { formatAmount, formatCurrency } from '../utils/money';
type PushFunction = (location: { pathname: string }) => void;

interface IItemWithRouter {
	push: PushFunction;
	model: IItem;
}

export const Items = (props: IStateHistory) => {
	return (
		<div className="result-search">
			{props.items.map((elem, index) => (
				<Item key={index} push={props.history.push} model={elem} />
			))}
		</div>
	);
};

const goProductDetail = (id: string, push: PushFunction) => {
	return () =>
		push({
			pathname: `/items/${id}`
		});
};

export const Item = (props: IItemWithRouter) => {
	const { model, push } = props;

	return (
		<div className="col-md-12">
			<div className="item">
				<Image model={model} push={push} />
				<div>
					<div className="d-flex flex-row">
						<div className="item__price d-flex align-items-center">
							<Price price={model.price} />
							{model.free_shipping && <FreeShipping />}
						</div>
					</div>
					<Title title={model.title} />
				</div>
			</div>
		</div>
	);
};

const Title = (props: { title: string }) => (
	<p className="item__title">{props.title}</p>
);

export const FreeShipping = () => {
	return (
		<img
			className="item__free_shipping"
			alt="Free shipping"
			src={freeShippingLogo}
		/>
	);
};

const Image = (props: { model: IItem; push: PushFunction }) => {
	return (
		<img
			alt={props.model.title}
			className="item__image"
			onClick={goProductDetail(props.model.id, props.push)}
			src={props.model.picture}
		/>
	);
};

const Price = (props: { price: IPrice }) => {
	return (
		<div>{`${formatCurrency(props.price.currency)} ${formatAmount(
			props.price.amount
		)}`}</div>
	);
};
