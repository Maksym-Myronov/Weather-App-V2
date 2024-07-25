import React, { useState } from 'react';
import { Recent } from 'Layout/SideBar/components/Recent';
import { useAppSelector } from 'hooks/useStore.ts';
import { NoRecentCitiesCard } from 'Layout/SideBar/components/NoRecentCitiesCard';
import { useImageWidget } from 'hooks/useImageWidget';
import { ModalWindow } from 'pages/Home/components/ModalWindow';
import { Pagination } from 'pages/Home/components/Pagination';
// Styles
import s from './index.module.scss';

export const SideBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const search = useAppSelector((state) => state.search.city);
	const [renderWeatherImageForWidgets] = useImageWidget();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const countriesPerPage = 3;

	const lastIndex = currentPage * countriesPerPage;
	const firstIndex = lastIndex - countriesPerPage;
	const currentCity = search?.slice(firstIndex, lastIndex);

	const handleOpenModalWindow = (): void => {
		setIsOpen(!isOpen);
	};

	const handleChangePage = (pageNumber: number): void => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className={s.container}>
			<div className={s.recent__header}>
				<p>Recent</p>
				<button className={s.recent__btn} onClick={handleOpenModalWindow}>
					Clear All
				</button>
			</div>
			{search.length >= 1 ? (
				currentCity.map((item) => (
					<Recent
						key={item.id}
						name={item.name}
						mainTemp={item.main.temp}
						id={item.id}
						renderWeatherImageForWidgets={renderWeatherImageForWidgets}
						weather={item.weather[0].main}
						country={item.sys.country}
					/>
				))
			) : (
				<NoRecentCitiesCard pageName={'Recent'} />
			)}
			<Pagination
				countriesPerPage={countriesPerPage}
				totalCity={search.length}
				handleChangePage={handleChangePage}
			/>
			{isOpen && <ModalWindow handleOpenModalWindow={handleOpenModalWindow} />}
		</div>
	);
};
