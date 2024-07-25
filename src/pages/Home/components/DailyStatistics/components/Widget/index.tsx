import React from 'react';
// Styles
import s from './index.module.scss';

type Props = {
	key: string;
	id: number;
	dt_txt: string;
	temp: number;
	weather: string;
	renderWeatherImage: (weather: string) => string;
};

export const Widget: React.FC<Props> = ({
	dt_txt,
	id,
	temp,
	weather,
	renderWeatherImage
}) => {
	const time = dt_txt.slice(11, 16);

	return (
		<div className={s.widget}>
			<div>
				<p className={s.widget__time}>{time}</p>
				<img
					src={renderWeatherImage(weather)}
					alt="weather"
					className={s.widget__image}
				/>
				<p className={s.widget__temp}>{Math.floor(temp - 273.15)}°</p>
			</div>
		</div>
	);
};
