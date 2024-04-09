import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as showApi from '../api/showApi';
import EpisodeDetails from '../components/EpisodeDetails';

// Mock data
const mockEpisodeDetails = {
    id: 1,
    name: 'Episode Name',
    summary: 'Episode Summary',
    image: { original: 'episode-image-url.jpg' },
    url: 'episode-url',
};

// Setting up mocks
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual for all non-hook parts
    useParams: () => ({ id: '1' }),
    useNavigate: () => jest.fn(),
}));

jest.mock('../api/showApi', () => ({
    fetchEpisodeById: jest.fn(),
}));

describe('EpisodeDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        redux.useSelector.mockImplementation(callback =>
            callback({
                episode: { details: mockEpisodeDetails, isLoading: false },
            })
        );
    });

    test('renders episode details after loading', async () => {
        showApi.fetchEpisodeById.mockResolvedValueOnce(mockEpisodeDetails);

        render(
            <BrowserRouter>
                <EpisodeDetails />
            </BrowserRouter>
        );

        await screen.findByText('Episode Name');

        expect(screen.getByText(/episode summary/i)).toBeInTheDocument();
        expect(
            screen.getByAltText('Cover for episode Episode Name')
        ).toBeInTheDocument();
    });

    test('displays a loading message initially', () => {
        redux.useSelector.mockImplementationOnce(callback =>
            callback({ episode: { details: null, isLoading: true } })
        );

        render(
            <BrowserRouter>
                <EpisodeDetails />
            </BrowserRouter>
        );

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('displays an error message when fetching episode details fails', async () => {
        showApi.fetchEpisodeById.mockRejectedValueOnce(
            new Error('Failed to fetch episode details')
        );
        redux.useSelector.mockImplementationOnce(callback =>
            callback({ episode: { details: null, isLoading: false } })
        );

        render(
            <BrowserRouter>
                <EpisodeDetails />
            </BrowserRouter>
        );

        await screen.findByText(/error loading episode details/i);
    });
});
