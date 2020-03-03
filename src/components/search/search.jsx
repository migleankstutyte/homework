import React, { useState } from 'react';
import movie from '../../icons/movie.svg';
import search from '../../icons/search.svg';

import './search.scss';

const Search = props => {
	const [searchValue, setSearchValue] = useState({ title: '' });
	const [isActive, setIsActive] = useState(true);

	const handleSearchInputChanges = e => {
		const searchValue = e.target.value;
		setSearchValue(searchValue);
		return (
			searchValue.length >= 3 &&
			setSearchValue({
				title: props.fetchSearchResults(searchValue)
			})
		);
	};

	const changeIsActive = () => {
		if (isActive) {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	};

	const hadleResultClick = id => {
		const selectedMovie = id;
		setSearchValue({ title: selectedMovie });
		setIsActive(true);
		sendData(selectedMovie);
	};

	const sendData = id => {
		props.parentCallback(id);
	};

	const renderResults = () => {
		return (
			<>
				{!props.hasError &&
					props.searchResult.map(movie => {
						return (
							<div
								key={movie.id}
								className='results__row'
								onClick={() => hadleResultClick(movie.title)}
							>
								<p className='results__row-title'>{movie.title}</p>
								<div className='results__row-info'>
									<p>{movie.vote_average} Rating, </p>
									<p>{movie.release_date.slice(0, 4)}</p>
								</div>
							</div>
						);
					})}
			</>
		);
	};

	return (
		<>
			<div className='search'>
				<img src={movie} alt='movie' />
				<input
					value={searchValue.title}
					onChange={handleSearchInputChanges}
					onFocus={changeIsActive}
					type='text'
					placeholder='Enter movie name'
				/>
				{isActive && (
					<button type='button' className='search__button'>
						<img src={search} alt='search' />
					</button>
				)}
			</div>
			{!isActive && <div className='results'>{renderResults()}</div>}
		</>
	);
};

export default Search;
