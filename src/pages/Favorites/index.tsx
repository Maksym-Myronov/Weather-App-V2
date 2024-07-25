import React, { useState } from 'react';
import { Recent } from 'Layout/SideBar/components/Recent';
import { NoRecentCitiesCard } from 'Layout/SideBar/components/NoRecentCitiesCard';
import { useAppSelector } from 'hooks/useStore';
import { useImageWidget } from 'hooks/useImageWidget';
// Styles
import s from './index.module.scss';
import { Pagination } from 'pages/Home/components/Pagination';

export const Favorites: React.FC = () => {
	const favorites = useAppSelector((state) => state.favorites.favorites);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const countriesPerPage = 3;

	const lastIndex = currentPage * countriesPerPage;
	const firstIndex = lastIndex - countriesPerPage;
	const currentCity = favorites.slice(firstIndex, lastIndex);

	const [renderWeatherImageForWidgets] = useImageWidget();

	const handleChangePage = (pageNumber: number): void => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className={s.favorites}>
			<p className={s.favorites__name}>Favorites</p>
			{favorites.length >= 1 ? (
				currentCity.map((item) => (
					<Recent
						key={item.id}
						name={item.name}
						mainTemp={item.mainTemp}
						id={item.id}
						renderWeatherImageForWidgets={renderWeatherImageForWidgets}
						weather={item.weather}
						country={item.country}
					/>
				))
			) : (
				<NoRecentCitiesCard pageName={'Favorite'} />
			)}
			<Pagination
				countriesPerPage={countriesPerPage}
				totalCity={favorites.length}
				handleChangePage={handleChangePage}
			/>
		</div>
	);
};
