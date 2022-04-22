import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import useHttp from '../Hooks/use-http';
import classes from './ActorDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const ActorDetails = (props) => {
    const [cast, setCast] = useState([]);

    const { sentRequest } = useHttp();
    const { id } = props;

    const { category } = useParams();

    useEffect(() => {
        let moiveCast = `https://api.themoviedb.org/3/${category}/${id}/credits?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd`;
        const fetchdata = async () => {
            const response = await sentRequest({ url: moiveCast });
            const data = response.cast;
            setCast(data.slice(0, 5));
        };
        fetchdata();
    }, [sentRequest, id, category]);

    const navigate = useNavigate();
    const ActorProfileHandler = (actor_id) => {
        navigate(`/${category}/actor/id=${actor_id}`);
    };

    let Actor = cast.map((actor) => {
        return (
            <div
                onClick={ActorProfileHandler.bind(null, actor.id)}
                key={actor.id}
                className={classes.actorData}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                    alt="actor"
                ></img>
            </div>
        );
    });

    let itemTitle = '';
    category && category === 'movie'
        ? (itemTitle = 'Movie')
        : (itemTitle = 'Series');

    return (
        <div className={classes.ActorDetails}>
            <div className={classes.nav}>
                <div className={`${classes.NavItem} `}>
                    <div className={classes.NavIcon}>
                        <FontAwesomeIcon
                            icon={faPlay}
                            className={classes.hd}
                            size="1x"
                        />
                    </div>
                    <div className={classes.Navtext}>
                        Web <span>Tv</span>
                    </div>
                </div>

                <div className={`${classes.NavItem} ${classes.regular}`}>
                    <div className={classes.NavIcon}>
                        <FontAwesomeIcon
                            icon={faClapperboard}
                            className={classes.hd}
                            size="1x"
                        />
                    </div>
                    <div className={classes.Navtext}>
                        Web <span>Tv</span>
                    </div>
                </div>

                <div className={classes.NavItem}>
                    <div className={classes.NavIcon}>
                        <FontAwesomeIcon
                            icon={faPlayCircle}
                            className={classes.hd}
                            size="1x"
                        />
                    </div>
                    <div className={classes.Navtext}>
                        Web <span>Tv</span>
                    </div>
                </div>
            </div>

            <div className={classes.Actor}>
                <h1 className={classes.Title}>
                    <>{itemTitle}</> Cast
                </h1>

                <div className={classes.ActorContainer}>{Actor}</div>
            </div>
        </div>
    );
};

export default ActorDetails;
