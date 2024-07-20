import React, { useState } from 'react';
import { removeCityFromArray } from 'store/searchSlice.ts';
import { useAppDispatch } from 'hooks/useStore.ts';
// Images
import blackHeart from 'assets/images/black-heart.png';
import crosser from 'assets/images/crossed.png';
import location from 'assets/images/location.svg';
import redHeart from 'assets/images/red-heart.png';
// Styles
import s from 'Layout/SideBar/index.module.scss';
import { addFavoritesCity, removeFavoriteCity } from 'store/favoritesSlice.ts';

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
	const [heart, setHeart] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleDeleteCity = (cityId: number): void => {
		dispatch(removeCityFromArray(cityId));
	};

	const handleChangeFavoritesState = (cityId): void => {
		setHeart(!heart);
		if (heart) {
			dispatch(removeFavoriteCity(cityId));
		} else {
			dispatch(addFavoritesCity({ name, country, id, mainTemp, weather }));
		}
	};

	return (
		<div className={s.recent}>
			<div className={s.recent__cards}>
				<div className={s.recent__card}>
					<button
						className={s.recent__crosser}
						onClick={() => handleChangeFavoritesState(id)}
					>
						<img
							src={heart ? (redHeart as string) : (blackHeart as string)}
							alt="blackHeart"
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
						alt="mountins"
						className={s.recent__weather}
					/>
				</div>
			</div>
		</div>
	);
};
