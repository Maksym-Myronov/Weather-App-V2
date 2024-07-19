import React from 'react';
// Styles
import s from './index.module.scss';

export const NoRecentCitiesCard: React.FC = () => {
	return (
		<div className={s.card}>
			<div>
				<p>You dont have any recent cities yet, but you can always fix that!</p>
			</div>
		</div>
	);
};
