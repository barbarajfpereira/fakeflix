import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchEpisodes, fetchShowDetails } from '../api/showApi';
import { Episode, Show } from '../types';

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
        return <StyledInnerWrapper>Loading...</StyledInnerWrapper>;
    }

    if (!show) {
        return (
            <StyledInnerWrapper>Error loading show details</StyledInnerWrapper>
        );
    }

    return (
        <Wrapper bgImage={show.image.original}>
            <StyledInnerWrapper>
                <h1>{show.name}</h1>
                <StyledSubtitle
                    dangerouslySetInnerHTML={{ __html: show.summary }}
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
                                            <Link
                                                to={`/episode/${episode.id}`}
                                                state={{ episode }}
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                {episode.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </WrapperSeasons>
            </StyledInnerWrapper>
        </Wrapper>
    );
};

interface WrapperProps {
    bgImage: string;
}

const Wrapper = styled.div<WrapperProps>`
    background: url(${props => props.bgImage}) no-repeat top center;
    background-size: cover;
    width: 100%;
    min-height: 100vh;
`;
const WrapperSeasons = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;
const StyledInnerWrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
`;
const StyledSubtitle = styled.p`
    font-size: 1.2rem;
    line-height: 1.5;
`;

export default Homepage;
