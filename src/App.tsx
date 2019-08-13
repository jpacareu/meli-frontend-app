import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/main.scss';
import Search from './pages/Search/Search';
import ResultSearch from './components/ResultSearch';
import { Provider } from './store';
import { EmptySearch } from './components/EmptySearch';
import ProductDetail from './pages/ProductDetail/ProductDetail';

export const App = () => {
	return (
		<Router>
			<Provider>
				<header className="row header">
					<Search />
				</header>
				<main className="container">
					<div className="row flex-column">
						<Route exact path="/" component={EmptySearch} />
						<Route exact path="/items/:id" component={ProductDetail} />
						<Route exact path="/items" component={ResultSearch} />
						<Route component={EmptySearch} />
					</div>
				</main>
			</Provider>
		</Router>
	);
};

export default App;
