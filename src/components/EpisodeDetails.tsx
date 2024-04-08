import { useParams } from 'react-router-dom';

const EpisodeDetails = () => {
    let { id } = useParams<{ id: string }>();

    const episode = {
        title: `Episode Title ${id}`,
        summary: `This is the episode ${id} summary`,
    };

    return (
        <div>
            <h1>{episode.title}</h1>
            <p>{episode.summary}</p>
        </div>
    );
};

export default EpisodeDetails;
