import React, { Fragment } from 'react';
import mercadoLibreLogo from '../../assets/Logo_ML.png';
import searchLogo from '../../assets/ic_Search.png';
import { actions, connect } from '../../store';
import { withRouter, Link } from 'react-router-dom';
import { History } from 'history';

const handleOnSubmit = async (e, search: string, history: History) => {
	e.preventDefault();

	await actions.search();

	history.push({
		pathname: '/items',
		search: `search=${search}`
	});
};

export let Search = props => {
	return (
		<Fragment>
			<div className="offset-md-1 col-md-1 col-2">
				<Link to="/">
					<img
						className="search-bar__image"
						alt="Logo Marcado Libre"
						src={mercadoLibreLogo}
					/>
				</Link>
			</div>
			<div className="col-md-9 col-10">
				<form onSubmit={e => handleOnSubmit(e, props.searchBox, props.history)}>
					<div className="search-bar__container">
						<input
							className="search-bar__input"
							value={props.searchBox}
							onChange={e => actions.setState({ searchBox: e.target.value })}
							placeholder="Nunca dejes de buscar"
						/>
						<button
							className="search-bar__button"
							type="submit"
							onClick={e => handleOnSubmit(e, props.searchBox, props.history)}>
							<img src={searchLogo} alt="Search" />
						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default withRouter(connect(({ searchBox }) => ({ searchBox }))(Search));
