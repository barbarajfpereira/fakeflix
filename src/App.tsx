import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import EpisodeDetails from './components/EpisodeDetails';

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
