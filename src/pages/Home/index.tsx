import React from 'react';
import { DailyStatistics } from 'pages/Home/components/DailyStatistics';
import { LocalTimeWidget } from 'pages/Home/components/LocalTimeWidget';
import { Chart } from 'pages/Home/components/Chart';
import { WeeklyChart } from 'pages/Home/components/WeeklyChart';
// Styles
import s from './index.module.scss';

export const Home: React.FC = () => {
	return (
		<div className={s.home}>
			<div className={s.home__widgets__first}>
				<DailyStatistics />
				<LocalTimeWidget />
			</div>
			<div className={s.home__widgets__second}>
				<Chart />
				<WeeklyChart />
			</div>
		</div>
	);
};
