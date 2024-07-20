import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { fetchWeatherData, getCityInfo } from 'store/searchSlice';
import { RootState } from 'store/index';
import { fetchCityFromIP } from 'store/localCitySlice.ts';
import { RouteEnum } from 'routes/route.enum.ts';
import { fetchForecastData } from 'store/weeklyForecastSlice.ts';
// Images
import logo from 'assets/images/weather-app.png';
import searchIcon from 'assets/images/search.svg';
import heartIcon from 'assets/images/Icon.svg';
// Styles
import s from './index.module.scss';

export const Header: React.FC = () => {
	const [term, setTerm] = useState<string>('');
	const [selectedCity, setSelectedCity] = useState<{
		lat: number;
		lon: number;
	} | null>(null);
	const [showList, setShowList] = useState<boolean>(false);
	const data = useAppSelector((state: RootState) => state.search);
	const localCity = useAppSelector((state: RootState) => state.localCity);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCityFromIP());
	}, [dispatch]);

	useEffect(() => {
		if (localCity?.city?.latitude && localCity?.city?.longitude) {
			dispatch(
				fetchForecastData({
					lat: localCity.city.latitude,
					lon: localCity.city.longitude
				})
			);
		}
	}, [dispatch, localCity]);

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setTerm(value);
		if (value !== '') {
			dispatch(fetchWeatherData(value));
			setShowList(true);
		} else {
			setShowList(false);
		}
	};

	const handleSelectCity = (
		cityName: string,
		lat: number,
		lon: number
	): void => {
		setSelectedCity({ lat, lon });
		setShowList(false);
		setTerm(cityName);
	};

	const handleSearch = (): void => {
		if (selectedCity) {
			dispatch(getCityInfo(selectedCity));
			setTerm('');
		}
	};

	const localCityName: string = localCity.city.city;
	const localCountryName: string = localCity.city.country;

	return (
		<div className={s.header}>
			<div className={s.header__container}>
				<div className={s.header__container__search}>
					<div className={s.header__container__search}>
						<img src={logo as string} alt="logo" />
						<h1 className={s.header__name}>Weather App</h1>
					</div>
					<div className={s.header__container__input}>
						<img
							src={searchIcon as string}
							alt="searchIcon"
							className={s.header__icon}
						/>
						<input
							placeholder="Search city"
							type="text"
							className={s.header__input}
							value={term}
							onChange={handleChangeInput}
						/>
						{showList && data.status === 'succeeded' && (
							<ul className={s.header__city_list}>
								{data.data.map((weather) => (
									<li
										key={weather.id}
										onClick={() =>
											handleSelectCity(weather.name, weather.lat, weather.lon)
										}
									>
										{weather.name}
									</li>
								))}
							</ul>
						)}
					</div>
					<button className={s.header__btn} onClick={handleSearch}>
						Search
					</button>
				</div>
				<div className={s.header__location}>
					<div className={s.header__links}>
						<Link to={RouteEnum.Favorites}>Favorites</Link>
						<Link to={RouteEnum.General}>Recent</Link>
					</div>
					<div className={s.header__location__container}>
						<p>
							{localCityName}, {localCountryName}
						</p>
						<img src={heartIcon as string} alt="heartIcon" />
					</div>
				</div>
			</div>
		</div>
	);
};
