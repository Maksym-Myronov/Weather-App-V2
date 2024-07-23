import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { addFavoritesCity, removeFavoriteCity } from 'store/favoritesSlice';
import { removeCityFromArray } from 'store/searchSlice';
// Images
import blackHeart from 'assets/images/black-heart.png';
import redHeart from 'assets/images/red-heart.png';
import crosser from 'assets/images/crossed.png';
import location from 'assets/images/location.svg';
// Styles
import s from 'Layout/SideBar/index.module.scss';

interface Props {
	key: number;
	name: string;
	mainTemp: number;
	id: number;
	renderWeatherImageForWidgets: (weather: string) => string;
	weather: string;
	country: string;
}

export const Recent: React.FC<Props> = ({
	name,
	country,
	mainTemp,
	id,
	renderWeatherImageForWidgets,
	weather
}) => {
	const dispatch = useAppDispatch();
	const favorites = useAppSelector((state) => state.favorites.favorites);
	const isFavorite = favorites.some((city) => city.id === id);

	const [heart, setHeart] = useState<boolean>(isFavorite);

	useEffect(() => {
		setHeart(isFavorite);
	}, [isFavorite]);

	const handleChangeFavoritesState = (): void => {
		if (heart) {
			dispatch(removeFavoriteCity(id));
		} else {
			dispatch(addFavoritesCity({ name, country, id, mainTemp, weather }));
		}
		setHeart(!heart);
	};

	const handleDeleteCity = (cityId: number): void => {
		dispatch(removeCityFromArray(cityId));
	};

	return (
		<div className={s.recent}>
			<div className={s.recent__cards}>
				<div className={s.recent__card}>
					<button
						className={s.recent__crosser}
						onClick={handleChangeFavoritesState}
					>
						<img
							src={heart ? (redHeart as string) : (blackHeart as string)}
							alt="heart"
							className={s.recent__images}
						/>
					</button>
					<button
						onClick={() => handleDeleteCity(id)}
						className={s.recent__crosser}
					>
						<img
							src={crosser as string}
							alt="crosser"
							className={s.recent__images}
						/>
					</button>
				</div>
				<div className={s.recent__block}>
					<div>
						<p className={s.recent__temrature}>
							{Math.floor(mainTemp - 273.15)}°
						</p>
						<div className={s.recent__location}>
							<img src={location as string} alt="location" />
							<p>
								{name}, {country}
							</p>
						</div>
					</div>
					<img
						src={renderWeatherImageForWidgets(weather)}
						alt="weather"
						className={s.recent__weather}
					/>
				</div>
			</div>
		</div>
	);
};
