import React from 'react';
// Styles
import s from './index.module.scss';

export const LocalTimeWidget: React.FC = () => {
	return (
		<div className={s.time}>
			<div>12:20</div>
		</div>
	);
};
