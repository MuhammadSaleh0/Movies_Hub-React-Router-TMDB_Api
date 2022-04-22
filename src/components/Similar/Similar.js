import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useHttp from '../Hooks/use-http';
import classes from './Similar.module.css';

const Similar = (props) => {
    const { sentRequest } = useHttp();

    const [similar, setsimilar] = useState([]);

    const { category } = useParams();
    useEffect(() => {
        const fetchSimilar = async () => {
            const similarUrl = `https://api.themoviedb.org/3/${category}/${props.id}/similar?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=1`;
            const response = await sentRequest({ url: similarUrl });
            const data = await response.results;
            setsimilar(data);
        };
        fetchSimilar();
    }, [sentRequest, category, props.id]);

    const similarData = similar.map((item) => (
        <div key={item.id} className={classes.Moive_Similar_Card}>
            <NavLink to={`/${category}/${item.id}`}>
                <div className={classes.image}>
                    {item.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`}
                            alt="cover"
                        />
                    ) : (
                        <div className={classes.replacment}>
                            {'moiveTitle' || 'SeriesName'}
                        </div>
                    )}
                </div>
            </NavLink>
        </div>
    ));

    let itemTitle = '';
    category && category === 'movie'
        ? (itemTitle = 'Movie')
        : (itemTitle = 'Series');

    return (
        <div className={classes.similar}>
            <h1>Similar {itemTitle}</h1>
            <div className={classes.similarData}>{similarData}</div>
        </div>
    );
};

export default Similar;
