// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//
// type City = {
// 	id: number;
// 	name: string;
// 	lat: number;
// 	lon: number;
// };
//
// type CityData = {
// 	city: City[];
// };
//
// const initialState: CityData = {
// 	city: []
// };
//
// const recentCitySlice = createSlice({
// 	name: 'recentCity',
// 	initialState,
// 	reducers: {
// 		addNewCity: (state, action: PayloadAction<City | City[]>) => {
// 			if (Array.isArray(action.payload)) {
// 				action.payload.forEach((newCity) => {
// 					const cityExists = state.city.some((city) => city.id === newCity.id);
// 					if (!cityExists) {
// 						state.city.push(...newCity);
// 					}
// 				});
// 			} else {
// 				const cityExists = state.city.some(
// 					(city) => city.id === action.payload.id
// 				);
// 				if (!cityExists) {
// 					state.city.push(action.payload);
// 				}
// 			}
// 		}
// 	}
// });
//
// export default recentCitySlice.reducer;
// export const { addNewCity, removeCityFromArray } = recentCitySlice.actions;
