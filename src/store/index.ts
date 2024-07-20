import { configureStore } from '@reduxjs/toolkit';
import searchReducer from 'store/searchSlice';
import localCityReducer from 'store/localCitySlice';
import forecastReducer from 'store/weeklyForecastSlice';
import favoritesReducer from 'store/favoritesSlice';

export const store = configureStore({
	reducer: {
		search: searchReducer,
		localCity: localCityReducer,
		forecast: forecastReducer,
		favorites: favoritesReducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
