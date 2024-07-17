import React from 'react';
import { Header } from 'Layout/Header';
import { Outlet } from 'react-router-dom';
import { Home } from 'pages/Home';
// Styles
import s from './index.module.scss';

export const Layout: React.FC = () => {
	return (
		<div className={s.layout}>
			<Header />
			<div className={s.layout__outlet}>
				<Home />
				<Outlet />
			</div>
		</div>
	);
};
