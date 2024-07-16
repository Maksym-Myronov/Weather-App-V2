import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherData {
	id: number;
	name: string;
	lat: number;
	lon: number;
	main: {
		temp: number;
		humidity: number;
	};
}

interface SearchState {
	data: WeatherData[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: SearchState = {
	data: [],
	status: 'idle',
	error: null
};

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeatherData = createAsyncThunk<
	WeatherData[],
	string,
	{ rejectValue: string }
>('search/fetchWeatherData', async (city, { rejectWithValue }) => {
	try {
		const geoResponse = await axios.get(
			`https://api.openweathermap.org/geo/1.0/direct?q=${city.trim()}&limit=5&appid=${API_KEY}`
		);
		return geoResponse.data;
	} catch (error) {
		return rejectWithValue('Failed to fetch weather data');
	}
});

export const getCityInfo = createAsyncThunk<
	WeatherData,
	{ lat: number; lon: number },
	{ rejectValue: string }
>('search/getCityInfo', async ({ lat, lon }, { rejectWithValue }) => {
	try {
		const weatherResponse = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
		);
		return weatherResponse.data;
	} catch (error) {
		return rejectWithValue('Failed to fetch weather data');
	}
});

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeatherData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchWeatherData.fulfilled,
				(state, action: PayloadAction<WeatherData[]>) => {
					state.status = 'succeeded';
					state.data = action.payload;
					state.error = null;
				}
			)
			.addCase(fetchWeatherData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			.addCase(getCityInfo.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				getCityInfo.fulfilled,
				(state, action: PayloadAction<WeatherData>) => {
					state.status = 'succeeded';
					state.data = [action.payload];
					state.error = null;
				}
			)
			.addCase(getCityInfo.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	}
});

export default searchSlice.reducer;
