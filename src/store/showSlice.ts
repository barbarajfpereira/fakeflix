import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show } from '../types';

interface ShowState {
    details: Show | null;
    isLoading: Boolean;
}

const initialState: ShowState = {
    details: null,
    isLoading: true,
};

export const showSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        setShowDetails: (state, action: PayloadAction<Show>) => {
            state.details = action.payload;
            state.isLoading = false;
        },
        clearShowDetails: state => {
            state.details = null;
            state.isLoading = false;
        },
    },
});

export const { setShowDetails, clearShowDetails } = showSlice.actions;

export default showSlice.reducer;
