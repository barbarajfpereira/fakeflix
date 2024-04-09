import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as showApi from '../api/showApi';
import Homepage from '../components/Homepage.tsx';

// Setup mock data
const mockShowDetails = {
    name: 'The Powerpuff Girls',
    summary: '<p>Three super-powered little girls...</p>',
    image: { original: 'test-show-image.jpg' },
};
const mockEpisodes = [
    { id: 1, name: 'Episode 1', season: 1 },
    { id: 2, name: 'Episode 2', season: 1 },
];

// Mock the Redux hooks
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => jest.fn(),
}));

// Mock the API calls
jest.mock('../api/showApi', () => ({
    fetchShowDetails: jest.fn(),
    fetchEpisodes: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
    reactRedux.useSelector.mockImplementation(callback =>
        callback({
            show: { details: mockShowDetails, isLoading: false },
        })
    );
    showApi.fetchShowDetails.mockResolvedValue(mockShowDetails);
    showApi.fetchEpisodes.mockResolvedValue(mockEpisodes);
});

test('renders show details and episodes after loading', async () => {
    render(
        <BrowserRouter>
            <Homepage />
        </BrowserRouter>
    );
});

test('displays an error message when fetching show details fails', async () => {
    // Override the fetchShowDetails mock for this test to simulate a failure
    showApi.fetchShowDetails.mockRejectedValue(new Error('Failed to fetch'));

    render(
        <BrowserRouter>
            <Homepage />
        </BrowserRouter>
    );

    const errorMessage = await screen.findByText(/error loading show details/i);
    expect(errorMessage).toBeInTheDocument();

    const showName = screen.queryByText(mockShowDetails.name);
    expect(showName).not.toBeInTheDocument();
});
