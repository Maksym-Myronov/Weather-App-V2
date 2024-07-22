import React, { useState } from 'react';
import { Recent } from 'Layout/SideBar/components/Recent';
import { useAppSelector } from 'hooks/useStore.ts';
import { NoRecentCitiesCard } from 'Layout/SideBar/components/NoRecentCitiesCard';
import { useImageWidget } from 'hooks/useImageWidget';
// Styles
import s from './index.module.scss';
import { ModalWindow } from 'pages/Home/components/ModalWindow';

export const SideBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const search = useAppSelector((state) => state.search.city);
	const [renderWeatherImageForWidgets] = useImageWidget();

	const handleOpenModalWindow = (): void => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={s.container}>
			<div className={s.recent__header}>
				<p>Recent</p>
				<button className={s.recent__btn} onClick={handleOpenModalWindow}>
					Clear All
				</button>
			</div>
			{search.length >= 1 ? (
				search.map((item) => (
					<Recent
						key={item.id}
						name={item.name}
						mainTemp={item.main.temp}
						id={item.id}
						renderWeatherImageForWidgets={renderWeatherImageForWidgets}
						weather={item.weather[0].main}
						country={item.sys.country}
					/>
				))
			) : (
				<NoRecentCitiesCard />
			)}
			{isOpen && <ModalWindow handleOpenModalWindow={handleOpenModalWindow} />}
		</div>
	);
};
