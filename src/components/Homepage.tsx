import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const episodes = [
        { id: 1, title: 'Episode 1' },
        { id: 2, title: 'Episode 2' },
    ];

    return (
        <div>
            <h1>Show Title: Powerpuff Girls</h1>
            <ul>
                {episodes.map(ep => (
                    <li>
                        <Link to={`/episode/${ep.id}`}>{ep.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Homepage;
