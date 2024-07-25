import React from 'react';
// Styles
import s from './index.module.scss';

type FavoriteOrRecentProps = {
	pageName: string;
};

export const NoRecentCitiesCard: React.FC<FavoriteOrRecentProps> = ({
	pageName
}) => {
	return (
		<div className={s.card}>
			<div>
				<p>
					You dont have any {pageName} cities yet, but you can always fix that!
				</p>
			</div>
		</div>
	);
};
