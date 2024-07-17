import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type CityState = {
	city: string;
	country: string;
	latitude: number;
	longitude: number;
};

type CityData = {
	city: CityState;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
};

const initialState: CityData = {
	city: {
		city: '',
		country: '',
		latitude: 0,
		longitude: 0,
	},
	status: 'idle',
	error: null
};

export const fetchCityFromIP = createAsyncThunk<
	CityState,
	void,
	{ rejectValue: string }
>('localCity/fetchCityFromIP', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get('https://ipapi.co/json/');
		return response.data as CityState;
	} catch (error) {
		return rejectWithValue('Failed to fetch city data');
	}
});

export const localCitySlice = createSlice({
	name: 'localCity',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCityFromIP.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchCityFromIP.fulfilled,
				(state, action: PayloadAction<CityState>) => {
					state.status = 'succeeded';
					state.city = action.payload;
					state.error = null;
				}
			)
			.addCase(fetchCityFromIP.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch city data';
			});
	}
});

export default localCitySlice.reducer;
