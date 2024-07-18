import React from 'react';
import { DailyStatistics } from 'pages/Home/components/DailyStatistics';
import { LocalTimeWidget } from 'pages/Home/components/LocalTimeWidget';
import { Chart } from 'pages/Home/components/Chart';
import { WeeklyChart } from 'pages/Home/components/WeeklyChart';
import { useImage } from 'hooks/useImage';

// Styles
import s from './index.module.scss';

export const Home: React.FC = () => {
	const [renderWeatherImage] = useImage();

	return (
		<div className={s.home}>
			<div className={s.home__widgets__first}>
				<DailyStatistics />
				<LocalTimeWidget />
			</div>
			<div className={s.home__widgets__second}>
				<Chart />
				<WeeklyChart renderWeatherImage={renderWeatherImage} />
			</div>
		</div>
	);
};
