import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from 'hooks/useStore';
import s from './index.module.scss';
import moment from 'moment-timezone';

export const LocalTimeWidget: React.FC = () => {
	const search = useAppSelector((state) => state.search.city);
	const [currentTime, setCurrentTime] = useState('');
	const lastUpdatedMinute = useRef<number | null>(null);

	const updateTime = () => {
		if (search && search.length > 0) {
			const city = search[0];
			if (city && city.timezone !== undefined) {
				const now = moment();
				const offset = city.timezone / 60;
				const localTime = now
					.utcOffset(offset)
					.format('YYYY-MM-DD HH:mm:ss Z')
					.slice(11, 16);
				setCurrentTime(localTime);
				lastUpdatedMinute.current = now.minute();
			}
		}
	};

	useEffect(() => {
		updateTime();

		const interval = setInterval(() => {
			const now = moment();
			if (now.minute() !== lastUpdatedMinute.current) {
				updateTime();
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [search]);

	return (
		<div className={s.time}>
			<p className={s.time__current}>{currentTime}</p>
		</div>
	);
};
