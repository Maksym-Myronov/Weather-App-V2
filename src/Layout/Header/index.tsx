import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { fetchWeatherData, getCityInfo } from 'store/searchSlice';
import { RootState } from 'store/index';
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
	const dispatch = useAppDispatch();
	const data = useAppSelector((state: RootState) => state.search);
	console.log(data);

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setTerm(value);
		if (e.target.value !== '') {
			dispatch(fetchWeatherData(value));
			setShowList(true);
		} else {
			setShowList(false);
		}
	};

	const handleSelectCity = (cityName: string, lat: number, lon: number) => {
		setSelectedCity({ lat, lon });
		setShowList(false);
		setTerm(cityName);
	};

	const handleSearch = () => {
		if (selectedCity) {
			dispatch(getCityInfo(selectedCity));
		}
	};

	return (
		<div className={s.header}>
			<div className={s.header__container}>
				<div className={s.header__container__search}>
					<div className={s.header__container__search}>
						<img src={logo} alt="logo" />
						<h1 className={s.header__name}>Weather App</h1>
					</div>
					<div className={s.header__container__input}>
						<img src={searchIcon} alt="searchIcon" className={s.header__icon} />
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
						<Link to="">Favorites</Link>
						<Link to="">Recent</Link>
					</div>
					<div className={s.header__location__container}>
						<p>Kyiv, Ukraine</p>
						<img src={heartIcon} alt="heartIcon" />
					</div>
				</div>
			</div>
		</div>
	);
};
