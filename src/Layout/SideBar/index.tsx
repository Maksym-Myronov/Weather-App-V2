import React from 'react';
// Images
import blackHeart from 'assets/images/black-heart.png';
import crosser from 'assets/images/crossed.png';
import mountins from 'assets/images/1.svg';
import location from 'assets/images/location.svg';
// Styles
import s from './index.module.scss';

export const SideBar: React.FC = () => {
	return (
		<div className={s.recent}>
			<div className={s.recent__header}>
				<p>Recent</p>
				<button className={s.recent__btn}>Clear</button>
			</div>
			<div className={s.recent__cards}>
				<div className={s.recent__card}>
					<button>
						<img
							src={blackHeart as string}
							alt="blackHeart"
							className={s.recent__images}
						/>
					</button>
					<button>
						<img
							src={crosser as string}
							alt="crosser"
							className={s.recent__images}
						/>
					</button>
				</div>
				<div className={s.recent__block}>
					<div>
						<p className={s.recent__temrature}>27</p>
						<div className={s.recent__location}>
							<img src={location as string} alt="location" />
							<p>Gonin Gora, Kad</p>
						</div>
					</div>
					<img
						src={mountins as string}
						alt="mountins"
						className={s.recent__weather}
					/>
				</div>
			</div>
		</div>
	);
};
