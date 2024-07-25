import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchReducer from 'store/searchSlice';
import localCityReducer from 'store/localCitySlice';
import forecastReducer from 'store/weeklyForecastSlice';
import favoritesReducer from 'store/favoritesSlice';

const rootReducer = combineReducers({
	search: searchReducer,
	localCity: localCityReducer,
	forecast: forecastReducer,
	favorites: favoritesReducer
});

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
});

export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
