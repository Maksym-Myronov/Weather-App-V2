import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Weather = {
	id: number;
	main: string;
	description: string;
	icon: string;
};

type Main = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
};

type Forecast = {
	main: Main;
	weather: Weather[];
};

type DataForecast = {
	list: Forecast[];
};

type ForecastState = {
	data: DataForecast[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
};

const initialState: ForecastState = {
	data: [],
	status: 'idle',
	error: null
};

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchForecastData = createAsyncThunk<
	DataForecast,
	{ lat: number; lon: number },
	{ rejectValue: string }
>('forecast/fetchForecastData', async ({ lat, lon }, { rejectWithValue }) => {
	if (lat === undefined || lon === undefined) {
		return rejectWithValue('Invalid coordinates');
	}

	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
		);
		return response.data;
	} catch (error) {
		return rejectWithValue('Failed to fetch weather data');
	}
});

export const weeklyForecastSlice = createSlice({
	name: 'forecast',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchForecastData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchForecastData.fulfilled,
				(state, action: PayloadAction<DataForecast[]>) => {
					state.status = 'succeeded';
					state.data = action.payload;
					state.error = null;
				}
			)
			.addCase(fetchForecastData.rejected, (state) => {
				state.status = 'failed';
				state.error = null;
			});
	}
});

export default weeklyForecastSlice.reducer;
