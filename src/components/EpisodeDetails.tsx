import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchEpisodeById } from '../api/showApi';
import { Episode } from '../types';

const EpisodeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [episode, setEpisode] = useState<Episode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    useEffect(() => {
        const loadEpisodeDetails = async () => {
            try {
                const episodeData = await fetchEpisodeById(Number(id));
                setEpisode(episodeData);
            } catch (error) {
                console.error('Failed to fetch episode details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            loadEpisodeDetails();
        }
    }, [id]);

    if (isLoading) {
        return <Wrapper>Loading...</Wrapper>;
    }

    if (!episode) {
        return <Wrapper>Error loading episode details</Wrapper>;
    }

    return (
        <Wrapper>
            <StyledH1>
                <button onClick={goBack} aria-label="Go back">
                    &#x25c0;
                </button>
                {episode?.name}
            </StyledH1>
            <p>Summary:</p>
            <StyledSubtitle
                dangerouslySetInnerHTML={{ __html: episode.summary }}
            />
            <p>Check out more about this episode:</p>
            {episode.image && (
                <a
                    href={episode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textAlign: 'center' }}
                >
                    <img
                        src={episode.image.original}
                        width="50%"
                        alt={`Cover for episode ${episode.name}`}
                    />
                </a>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #d3deeb;
`;
const StyledH1 = styled.h1`
    display: flex;
    gap: 1rem;
`;
const StyledSubtitle = styled.p`
    margin-top: 0;
    font-size: 1.2rem;
    line-height: 1.5;
`;

export default EpisodeDetails;
