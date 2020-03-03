import React, { useState } from 'react';
import Header from '../components/header/header';
import Search from '../components/search/search';
import Table from '../components/table/table';

import './application.scss';

const App = () => {
	const [hasError, setHasError] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const [searchValueFromChild, setSearchValueFromChild] = useState({
		searchValueFromChild: ''
	});

	const fetchSearchResults = searchValue => {
		fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=ce5db8e32a33aed5d80fa6e4ee01e0a8&query=${searchValue}`
		)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.results.length !== 0) {
					const films = jsonResponse.results;
					setSearchResult(films.slice(0, 8));
				} else {
					setHasError(true);
				}
			});
	};

	const header = ['Title', 'Popularity', 'Release date', 'Language'];
	const headerRow = header.map((cell, index) => <div key={index}>{cell}</div>);

	const getSearchValueFromChild = childData => {
		setSearchValueFromChild({ searchValueFromChild: childData });
	};

	return (
		<div className='App'>
			<Header>
				<Search
					searchResult={searchResult}
					fetchSearchResults={fetchSearchResults}
					parentCallback={getSearchValueFromChild}
					hasError={hasError}
				/>
			</Header>
			{hasError ? (
				<div className='errorMessage'>
					<p>Ups...</p>
					<p>We couldn't find anything for this search.</p>
				</div>
			) : (
				<div className='table'>
					<div className='table__row table__row--header'>{headerRow}</div>
					<Table
						searchValue={searchValueFromChild}
						searchResult={searchResult}
					/>
				</div>
			)}
		</div>
	);
};

export default App;
