import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActorProfile from '../components/Actors/ActorProfile';
import useHttp from '../components/Hooks/use-http';

const ActorPage = () => {
    const { category, actor_id } = useParams();
    const { sentRequest } = useHttp();
    const [data, setData] = useState([]);
    const [actorInfo, setActorInfo] = useState({});

    useEffect(() => {
        const fetchActorData = async () => {
            const actorUrl = `https://api.themoviedb.org/3/person/${actor_id}?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US`;
            const response = await sentRequest({ url: actorUrl });
            const data = await response;
            setActorInfo(data);
        };
        fetchActorData();
    }, [sentRequest, actor_id]);

    useEffect(() => {
        const fetchActorData = async () => {
            const actorUrl = `https://api.themoviedb.org/3/person/${actor_id}/${category}_credits?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US`;
            const response = await sentRequest({ url: actorUrl });
            const data = await response.cast.slice(0, 100);
            setData(data);
        };
        fetchActorData();
    }, [sentRequest, actor_id, category]);

    return (
        <>
            <ActorProfile data={data} info={actorInfo} />
        </>
    );
};

export default ActorPage;
