import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useStore.ts';
import { removeCityFromArray } from 'store/searchSlice.ts';
import { NoRecentCitiesCard } from 'Layout/SideBar/components/NoRecentCitiesCard';
import { useImageWidget } from 'hooks/useImageWidget';
// Images
import blackHeart from 'assets/images/black-heart.png';
import crosser from 'assets/images/crossed.png';
import location from 'assets/images/location.svg';
// Styles
import s from './index.module.scss';

export const SideBar: React.FC = () => {
	const search = useAppSelector((state) => state.search.city);
	const dispatch = useAppDispatch();

	const [renderWeatherImageForWidgets] = useImageWidget();

	const handleDeleteCity = (cityId: number): void => {
		dispatch(removeCityFromArray(cityId));
	};

	return (
		<div className={s.container}>
			<div className={s.recent__header}>
				<p>Recent</p>
				<button className={s.recent__btn}>Clear</button>
			</div>
			{search.length >= 1 ? (
				search.map((item) => (
					<div className={s.recent} key={item.id}>
						<div className={s.recent__cards}>
							<div className={s.recent__card}>
								<button className={s.recent__crosser}>
									<img
										src={blackHeart as string}
										alt="blackHeart"
										className={s.recent__images}
									/>
								</button>
								<button
									onClick={() => handleDeleteCity(item.id)}
									className={s.recent__crosser}
								>
									<img
										src={crosser as string}
										alt="crosser"
										className={s.recent__images}
									/>
								</button>
							</div>
							<div className={s.recent__block}>
								<div>
									<p className={s.recent__temrature}>
										{Math.floor(item.main.temp - 273.15)}
									</p>
									<div className={s.recent__location}>
										<img src={location as string} alt="location" />
										<p>
											{item.name}, {item.sys.country}
										</p>
									</div>
								</div>
								<img
									src={renderWeatherImageForWidgets(item.weather[0].main)}
									alt="mountins"
									className={s.recent__weather}
								/>
							</div>
						</div>
					</div>
				))
			) : (
				<NoRecentCitiesCard />
			)}
		</div>
	);
};
