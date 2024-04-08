import axios from 'axios';
import { Show, Episode } from '../types';

const API_BASE_URL = 'https://api.tvmaze.com';

export const fetchShowDetails = async (showId: number): Promise<Show> => {
    const response = await axios.get<Show>(`${API_BASE_URL}/shows/${showId}`);
    return response.data;
};

export const fetchEpisodes = async (showId: number): Promise<Episode[]> => {
    const response = await axios.get<Episode[]>(
        `${API_BASE_URL}/shows/${showId}/episodes`
    );
    return response.data;
};
