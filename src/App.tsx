import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'Layout/index';
import { SideBar } from 'Layout/SideBar';
import { Favorites } from 'pages/Favorites';
import { RouteEnum } from 'routes/route.enum';

export const App: React.FC = () => {
	return (
		<Routes>
			<Route path={RouteEnum.General} element={<Layout />}>
				<Route index element={<SideBar />} />
				<Route path={RouteEnum.Favorites} element={<Favorites />} />
			</Route>
		</Routes>
	);
};
