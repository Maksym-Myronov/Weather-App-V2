import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Data = {
	name: string;
	mainTemp: number;
	id: number;
	weather: string;
	country: string;
};

type DataInArray = {
	favorites: Data[];
};

const initialState: DataInArray = {
	favorites: []
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavoritesCity: (state, action: PayloadAction<Data>) => {
			state.favorites.push(action.payload);
		},
		removeFavoriteCity: (state, action: PayloadAction<number>) => {
			state.favorites = state.favorites.filter(
				(city) => city.id !== action.payload
			);
		}
	}
});

export default favoritesSlice.reducer;
export const { addFavoritesCity, removeFavoriteCity } = favoritesSlice.actions;
