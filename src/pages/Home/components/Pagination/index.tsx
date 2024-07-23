import React from 'react';
// Styles
import s from './index.module.scss';

export const Pagination: React.FC = ({
	countriesPerPage,
	totalCity,
	handleChangePage
}) => {
	const currentPage = [];

	for (let i = 1; i <= Math.ceil(totalCity / countriesPerPage); i++) {
		currentPage.push(i);
	}

	return (
		<div className={s.pagination}>
			{currentPage.map((item) => (
				<button
					key={item}
					onClick={() => handleChangePage(item)}
					className={s.pagination__btn}
				>
					{item}
				</button>
			))}
		</div>
	);
};
