import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'Layout/index';
import { Home } from 'pages/Home';
import { RouteEnum } from 'routes/route.enum';

export const App: React.FC = () => {
	return (
		<Routes>
			<Route path={RouteEnum.General} element={<Layout />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
};
