import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchEpisodes, fetchShowDetails } from '../api/showApi';
import { RootState } from '../store';
import { setShowDetails } from '../store/showSlice';
import { Episode } from '../types';

const Homepage = () => {
    const dispatch = useDispatch();
    const show = useSelector((state: RootState) => state.show.details);
    const isLoading = useSelector((state: RootState) => state.show.isLoading);
    const [episodesBySeason, setEpisodesBySeason] = useState<
        Record<number, Episode[]>
    >({});
    const powerPuffGirlsId = 6771;

    const groupEpisodesBySeason = (
        episodes: Episode[]
    ): Record<number, Episode[]> => {
        return episodes.reduce((prevEp, currEp) => {
            const { season } = currEp;
            // check if already exists, and if not, create empty array
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

                dispatch(setShowDetails(showData));
                setEpisodesBySeason(groupEpisodesBySeason(episodesData));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        loadShowDetailsAndEpisodes();
    }, [dispatch]);

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

const media = {
    tablet: '@media(min-width: 768px)',
};

// Styled Components
const Wrapper = styled.div<WrapperProps>`
    background: url(${props => props.bgImage}) no-repeat top center;
    background-size: cover;
    width: 100%;
    min-height: 100vh;
`;
const WrapperSeasons = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    ${media.tablet} {
        grid-template-columns: repeat(3, 1fr);
    }
`;
const StyledInnerWrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    ${media.tablet} {
        padding: 4rem;
    }
`;
const StyledSubtitle = styled.p`
    font-size: 1.2rem;
    line-height: 1.5;
`;

export default Homepage;
