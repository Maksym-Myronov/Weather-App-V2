import React from 'react';
import { useAppSelector } from 'hooks/useStore.ts';
import { RootState } from 'store/index.ts';
import { WeatherData } from 'core/types/weekly-chart.type';
// Styles
import s from './index.module.scss';

interface WeeklyChartProps {
	renderWeatherImage: (weatherCondition: string) => string;
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({
	renderWeatherImage
}) => {
	const forecast = useAppSelector((state: RootState) => state.forecast);
	console.log(forecast);
	const getFirstDateOfEachDay = (weatherData: WeatherData[]): WeatherData[] => {
		const today = new Date().toISOString().split('T')[0];
		const groupedByDay: { [key: string]: WeatherData[] } = weatherData.reduce(
			(acc, curr) => {
				const data = curr.dt_txt.split(' ')[0];

				if (!acc[data]) {
					acc[data] = [];
				}

				acc[data].push(curr);

				return acc;
			},
			{} as { [key: string]: WeatherData[] }
		);
		const result: WeatherData[] = [];

		for (const date in groupedByDay) {
			if (date === today) {
				const currentHour = new Date().getHours();
				const closestTime = groupedByDay[date].reduce((prev, curr) => {
					const prevHour = new Date(prev.dt_txt).getHours();
					const currHour = new Date(curr.dt_txt).getHours();
					return Math.abs(currHour - currentHour) <
						Math.abs(prevHour - currentHour)
						? curr
						: prev;
				});
				result.push(closestTime);
			} else {
				const sortedByTime = groupedByDay[date].sort(
					(a, b) => new Date(a.dt_txt).getTime() - new Date(b.dt_txt).getTime()
				);
				const afterNoon = sortedByTime.find(
					(item) => new Date(item.dt_txt).getHours() >= 8
				);
				result.push(afterNoon ? afterNoon : sortedByTime[0]);
			}
		}

		return result;
	};

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const getDayLabel = (dataString: string): string => {
		const date = new Date(dataString);
		const today = new Date();

		if (date.toDateString() === today.toDateString()) {
			return 'Today';
		} else {
			return daysOfWeek[date.getDay()];
		}
	};

	const weatherData: WeatherData[] = Array.isArray(forecast.data.list)
		? forecast.data.list
		: [];
	const filteredData = getFirstDateOfEachDay(weatherData);

	return (
		<div className={s.chart}>
			{filteredData.map((item) => (
				<div key={item.dt_txt}>
					<div className={s.chart__max}>
						<p className={s.chart__day}>{getDayLabel(item.dt_txt)}</p>
						<img src={renderWeatherImage(item.weather[0].main)} alt="weather" />
						<div className={s.chart__temperature}>
							<p className={s.chart__degree__max}>
								{Math.floor(item.main.temp_max - 273.15)}°
							</p>
							<p className={s.chart__degree__min}>
								{Math.floor(item.main.temp_min - 273.15)}°
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
