import React from 'react';
import { DailyStatistics } from 'pages/Home/components/DailyStatistics';
import { LocalTimeWidget } from 'pages/Home/components/LocalTimeWidget';
import { Chart } from 'pages/Home/components/Chart';
import { WeeklyChart } from 'pages/Home/components/WeeklyChart';

export const Home: React.FC = () => {
	return (
		<div>
			<div>
				<DailyStatistics />
				<LocalTimeWidget />
			</div>
			<div>
				<Chart />
				<WeeklyChart />
			</div>
		</div>
	);
};
