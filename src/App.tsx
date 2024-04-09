import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EpisodeDetails from './components/EpisodeDetails';
import Homepage from './components/Homepage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/episode/:id" element={<EpisodeDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
