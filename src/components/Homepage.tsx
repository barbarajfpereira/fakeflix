import React, { useEffect, useState } from 'react';
import { fetchShowDetails, fetchEpisodes } from '../api/showApi';
import { Show, Episode } from '../types';
import styled from 'styled-components';

const Homepage = () => {
    const [show, setShow] = useState<Show | null>(null);
    const [episodesBySeason, setEpisodesBySeason] = useState<
        Record<number, Episode[]>
    >({});
    const [isLoading, setIsLoading] = useState(true);
    const powerPuffGirlsId = 6771;

    const groupEpisodesBySeason = (
        episodes: Episode[]
    ): Record<number, Episode[]> => {
        return episodes.reduce((prevEp, currEp) => {
            const { season } = currEp;
            if (!prevEp[season]) {
                prevEp[season] = [];
            }
            prevEp[season].push(currEp);
            return prevEp;
        }, {} as Record<number, Episode[]>);
    };

    useEffect(() => {
        const loadShowDetailsAndEpisodes = async () => {
            try {
                const showData = await fetchShowDetails(powerPuffGirlsId);
                const episodesData = await fetchEpisodes(powerPuffGirlsId);

                setShow(showData);
                setEpisodesBySeason(groupEpisodesBySeason(episodesData));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadShowDetailsAndEpisodes();
    }, []);

    if (isLoading) {
        return <Wrapper>Loading...</Wrapper>;
    }

    if (!show) {
        return <Wrapper>Error loading show details</Wrapper>;
    }

    return (
        <Wrapper>
            <h1>{show.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
            <img
                src={show.image.original}
                alt={show.name}
                style={{ width:'30vw', height:'50vh', objectFit: 'cover' }}
            />
            <WrapperSeasons>
                {Object.keys(episodesBySeason)
                    .map(season => parseInt(season, 10))
                    .map(season => (
                        <div key={season}>
                            <h2>Season {season}</h2>
                            <ul>
                                {episodesBySeason[season].map(episode => (
                                    <li
                                        key={episode.id}
                                        style={{
                                            listStyle: 'none',
                                            marginBottom: '6px',
                                        }}
                                    >
                                        <a
                                            href={episode.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {episode.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </WrapperSeasons>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const WrapperSeasons = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

export default Homepage;
