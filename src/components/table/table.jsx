import React from 'react';

import './table.scss';

const Table = props => {
	for (var i = 0; i < props.searchResult.length; i++) {
		if (props.searchValue.searchValueFromChild === props.searchResult[i].title)
			return (
				<div className='table__row '>
					<div>{props.searchResult[i].title}</div>
					<div>{Math.round(props.searchResult[i].popularity * 10) / 10}</div>
					<div>{props.searchResult[i].release_date}</div>
					<div>{props.searchResult[i].original_language}</div>
				</div>
			);
		else continue;
	}

	return <></>;
};

export default Table;
