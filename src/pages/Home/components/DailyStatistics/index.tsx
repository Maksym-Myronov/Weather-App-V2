import React from 'react';
import { useAppSelector } from 'hooks/useStore';
import { Widget } from 'pages/Home/components/DailyStatistics/components/Widget';
import { useImage } from 'hooks/useImage';
// Styles
import s from './index.module.scss';

export const DailyStatistics: React.FC = () => {
	const forecast = useAppSelector((state) => state.forecast);

	const [renderWeatherImage] = useImage();

	return (
		<div className={s.statistics}>
			{forecast &&
				forecast.data &&
				forecast.data.list &&
				forecast.data.list
					.slice(0, 8)
					.map((item) => (
						<Widget
							key={item.dt_txt}
							id={item.id}
							dt_txt={item.dt_txt}
							temp={item.main.temp}
							weather={item.weather[0].main}
							renderWeatherImage={renderWeatherImage}
						/>
					))}
		</div>
	);
};
