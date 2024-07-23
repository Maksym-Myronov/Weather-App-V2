import React from 'react';
import { Recent } from 'Layout/SideBar/components/Recent';
import { NoRecentCitiesCard } from 'Layout/SideBar/components/NoRecentCitiesCard';
import { useAppSelector } from 'hooks/useStore';
import { useImageWidget } from 'hooks/useImageWidget';
// Styles
import s from './index.module.scss';

export const Favorites: React.FC = () => {
	const favorites = useAppSelector((state) => state.favorites?.favorites);
	console.log(favorites);

	const [renderWeatherImageForWidgets] = useImageWidget();

	return (
		<div className={s.favorites}>
			<p className={s.favorites__name}>Favorites</p>
			{favorites.length >= 1 ? (
				favorites.map((item) => (
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
				<NoRecentCitiesCard />
			)}
		</div>
	);
};
