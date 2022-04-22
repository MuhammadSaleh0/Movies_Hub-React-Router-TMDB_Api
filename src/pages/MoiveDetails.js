import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../components/Hooks/use-http';
import MoiveItemDetails from '../components/MoiveItemDetails/MoiveItemDetails';

const MoiveDetails = () => {
    const params = useParams();

    const { sentRequest } = useHttp();

    const { movieId, category } = params;

    const [data, setdata] = useState({});

    let moiveItem = `https://api.themoviedb.org/3/${category}/${movieId}?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd`;

    useEffect(() => {
        const fetchdata = async () => {
            const response = await sentRequest({ url: moiveItem });
            setdata(response);
        };
        fetchdata();
    }, [sentRequest, moiveItem]);

    return (
        <React.Fragment>
            <MoiveItemDetails data={data} />
        </React.Fragment>
    );
};

export default MoiveDetails;
