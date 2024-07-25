import React, { useState } from 'react';
// Styles
import s from './index.module.scss';

type PaginationProps = {
	countriesPerPage: number;
	totalCity: number;
	handleChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
	countriesPerPage,
	totalCity,
	handleChangePage
}) => {
	const [activePage, setActivePage] = useState(1);
	const currentPage = [];

	for (let i = 1; i <= Math.ceil(totalCity / countriesPerPage); i++) {
		currentPage.push(i);
	}

	const handlePageClick = (page: number) => {
		setActivePage(page);
		handleChangePage(page);
	};

	return (
		<div className={s.pagination}>
			{currentPage.map((item) => (
				<button
					key={item}
					onClick={() => handlePageClick(item)}
					className={`${s.pagination__btn} ${item === activePage ? s.active : ''}`}
				>
					{item}
				</button>
			))}
		</div>
	);
};
