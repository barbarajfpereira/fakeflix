import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchEpisodeById } from '../api/showApi';
import { RootState } from '../store';
import { clearEpisodeDetails, setEpisodeDetails } from '../store/episodeSlice';

const EpisodeDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const episodeState = useSelector((state: RootState) => state.episode);
    const navigate = useNavigate();
    const { details } = episodeState;

    const goBack = () => {
        navigate('/');
    };

    useEffect(() => {
        const loadEpisodeDetails = async () => {
            try {
                const episodeData = await fetchEpisodeById(Number(id));
                dispatch(setEpisodeDetails(episodeData));
            } catch (error) {
                console.error('Failed to fetch episode details:', error);
            }
        };

        if (id) {
            loadEpisodeDetails();
        }

        return () => {
            dispatch(clearEpisodeDetails());
        };
    }, [dispatch, id]);

    if (episodeState.isLoading) {
        return <Wrapper>Loading...</Wrapper>;
    }

    if (!details) {
        return <Wrapper>Error loading episode details</Wrapper>;
    }

    return (
        <Wrapper>
            <StyledH1>
                <button onClick={goBack} aria-label="Go back">
                    &#x25c0;
                </button>
                {details.name}
            </StyledH1>
            <p>Summary:</p>
            <StyledSubtitle
                dangerouslySetInnerHTML={{ __html: details.summary }}
            />
            <p>Check out more about this episode:</p>
            {details.image && (
                <a
                    href={details.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textAlign: 'center' }}
                >
                    <StyledImage
                        src={details.image.original}
                        alt={`Cover for episode ${details.name}`}
                    />
                </a>
            )}
        </Wrapper>
    );
};

const media = {
    tablet: '@media(min-width: 768px)',
};

const Wrapper = styled.div`
    height: calc(100vh - 4rem);
    width: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #d3deeb;
    ${media.tablet} {
        height: calc(100vh - 8rem);
        padding: 4rem;
    }
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
const StyledImage = styled.img`
    max-width: 50%;
    height: auto;
`;

export default EpisodeDetails;
