import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Episode } from '../types';

interface EpisodeState {
    details: Episode | null;
    isLoading: Boolean;
}

const initialState: EpisodeState = {
    details: null,
    isLoading: true,
};

export const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {
        setEpisodeDetails: (state, action: PayloadAction<Episode>) => {
            state.details = action.payload;
            state.isLoading = false;
        },
    },
});

export const { setEpisodeDetails } = episodeSlice.actions;

export default episodeSlice.reducer;
