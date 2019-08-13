import React from 'react';
import { IDetailItem, ICondition, IPrice } from '../models/models';
import { formatAmount, formatCurrency } from '../utils/money';

interface IProps {
	detail: IDetailItem;
}

export const ItemDetail = (props: IProps) => {
	const { detail } = props;

	return (
		<div className="item-detail row">
			<div className="col-md-7">
				<Image title={detail.title} picture={detail.picture} />
			</div>
			<div className="col-md-4 col-sm-12">
				<section className="item-detail__main-info">
					<div className="item-detail__condition-and-sold d-flex">
						<Condition condition={detail.condition} />
						<span> - </span>
						<Sold sold={detail.sold_quantity} />
					</div>
					<Title title={detail.title} />
					<Price price={detail.price} />
					<ButtonComprar />
				</section>
			</div>
			<div className="col-md-7 col-sm-12">
				<Detalle description={detail.description} />
			</div>
		</div>
	);
};

export const Image = (props: { title: string; picture: string }) => {
	return (
		<img className="item-detail__image" alt={props.title} src={props.picture} />
	);
};
export const Detalle = (props: { description: string }) => {
	return (
		<section>
			<summary className="item-detail__descripcion-label">
				Descripción del producto
			</summary>
			<div className="item-detail__descripcion-text">{props.description}</div>
		</section>
	);
};

export const Condition = (props: { condition: ICondition }) => {
	return (
		<div className="item-detail__condition">
			{props.condition === 'new' ? 'Nuevo' : 'Usado'}
		</div>
	);
};

export const Sold = (props: { sold: number }) => {
	return <div className="item-detail__sold">{props.sold}</div>;
};

export const Title = (props: { title: string }) => {
	return <div className="item-detail__title">{props.title}</div>;
};

export const Price = (props: { price: IPrice }) => {
	return (
		<div className="item-detail__price">{`${formatCurrency(
			props.price.currency
		)} ${formatAmount(props.price.amount)}`}</div>
	);
};

export const ButtonComprar = () => {
	return <button className="item-detail__button">Comprar</button>;
};
