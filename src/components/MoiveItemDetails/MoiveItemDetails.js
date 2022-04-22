import classes from './MoiveItemDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faClose,
    faCirclePlay,
    faHeart,
    faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
    faStar as faStarr,
    faCalendarPlus,
} from '@fortawesome/free-regular-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import ActorDetails from '../Actors/ActorDetails';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../Hooks/use-http';
import Similar from '../Similar/Similar';

const MoiveItemDetails = (props) => {
    const { data } = props;

    let image = (
        <div className={classes.image}>
            <img
                src={`https://image.tmdb.org/t/p/w780${data.backdrop_path || data.poster_path
                    }`}
                alt="cover"
            />
        </div>
    );

    //{/* <NavLink to={`/home`}>back</NavLink> */}
    let moiveType;
    if (data.genres) {
        moiveType = data.genres.map((i) => <small key={i.name}> {i.name}</small>);
    }

    const [favorite, setFavorite] = useState(false);
    const [watchLater, setWatchLater] = useState(false);
    // const [id_Lists, setId_Lists] = useState([]);

    // useEffect(() => {
    //     const list = localStorage.getItem("id_list");
    //     if (list && list.length > 0) {
    //         const dataa = JSON.parse(list)
    //         setId_Lists([...dataa, data.id])
    //     }

    // }, [data.id, id_Lists])

    const addFavoriteHandler = useCallback(() => {
        setFavorite((prevstate) => !prevstate);
        localStorage.setItem('favorite', favorite); // its gonna be false in the first render.(default state)
        localStorage.setItem('id', data.id);
        // localStorage.setItem("id_list", JSON.stringify(id_Lists));
    }, [favorite, data.id]);

    const WatchLaterHandler = useCallback(() => {
        setWatchLater((prevstate) => !prevstate);
        localStorage.setItem('list', watchLater);
        localStorage.setItem('id', data.id);
    }, [watchLater, data.id]);

    let favoriteClass = favorite
        ? `${classes.item} ${classes.heart} ${classes.favorite}`
        : `${classes.item} ${classes.heart}`;
    let watchLaterClass = watchLater
        ? `${classes.item} ${classes.heart} ${classes.watchLater}`
        : `${classes.item} ${classes.heart}`;

    useEffect(() => {
        const favoriteMoive = localStorage.getItem('favorite');
        const id_localStorage = localStorage.getItem('id');
        if (favoriteMoive === 'false' && +id_localStorage === data.id) {
            setFavorite((prevstate) => !prevstate);
        }
        const watchLaterMoive = localStorage.getItem('list');
        if (watchLaterMoive === 'false' && +id_localStorage === data.id) {
            setWatchLater((prevstate) => !prevstate);
        }
    }, [data.id]);

    let overView = data.overview ? data.overview : '';
    if (data.overview) {
        if (data.overview.length > 391) {
            overView = data.overview.slice(0, 370);
        }
    }

    let moiveTitle = data.title ? data.title : '';
    if (data.title) {
        if (moiveTitle.length > 46) {
            moiveTitle = data.title.slice(0, 46);
        }
    }
    let moiveName = data.name ? data.name : '';
    if (data.name) {
        if (moiveName.length > 46) {
            moiveName = data.name.slice(0, 46);
        }
    }

    const { category, movieId } = useParams();
    const { sentRequest } = useHttp();
    const [video, setVideo] = useState(null);

    const watchTrailerHandler = () => {
        const videoUrl = `https://api.themoviedb.org/3/${category}/${movieId}/videos?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US`;
        const getVideo = async () => {
            const response = await sentRequest({ url: videoUrl });
            setVideo(response.results.slice(0, 5));
        };
        getVideo();
    };

    let videoClasses = `${classes.videoContent}`;

    const closeVideoModal = () => {
        const video_div = document.getElementById('videoContent');
        video_div.classList.add(`${classes.hideVideo}`);
        setTimeout(() => {
            setVideo(null);
        }, 1000);
    };

    const VideosList = () => {
        let videoContent = '';
        if (video) {
            videoContent = video.map((item, i) => (
                <VideoFrame item={item} index={i} />
            ));
        }
        return (
            <div id="videoContent" className={videoClasses}>
                {videoContent}
            </div>
        );
    };

    const VideoFrame = (props) => {
        const { item, index } = props;

        const iFrameRef = useRef(null);
        useEffect(() => {
            const height = (iFrameRef.current.offsetWidth * 9) / 16 + 'px';
            iFrameRef.current.setAttribute('height', height);
        }, []);

        return (
            <div key={index} className={classes.iframe}>
                <div className={classes.close} onClick={closeVideoModal}>
                    <FontAwesomeIcon icon={faClose} size="2x" />
                </div>
                <h2>{item.name}</h2>
                <iframe
                    src={`https://www.youtube.com/embed/${item.key}`}
                    width="100%"
                    title="video"
                    ref={iFrameRef}
                ></iframe>
            </div>
        );
    };

    return (
        <>
            <div key={data.id} id="moive_details" className={classes.MoiveDetails}>
                {video && <VideosList />}
                {image}

                <div className={classes.overley}></div>
                <div className={classes.gray}></div>

                <div className={classes.Content}>
                    <div className={classes.MoiveTitle}>
                        <h2>{moiveTitle || moiveName}</h2>
                        <div className={classes.type}>{moiveType}</div>
                    </div>

                    <div className={classes.MoiveContent}>
                        <div className={classes.MoiveData}>
                            <div className={classes.icons_Vote_Popularity}>
                                <div className={classes.starts}>
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={classes.star}
                                        spin
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={classes.star}
                                        spin
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={classes.star}
                                        spin
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={classes.star}
                                        spin
                                    />
                                    <FontAwesomeIcon
                                        icon={faStarr}
                                        className={classes.star}
                                        spin
                                    />
                                </div>
                                <div className={classes.Popularity_Votes}>
                                    <div className={classes.vote_pop}>
                                        Popularity:<span>{data.popularity}</span>
                                    </div>
                                    <div className={classes.vote_pop}>
                                        Votes:<span>{data.vote_count}</span>
                                    </div>
                                </div>
                                <div className={classes.brands}>
                                    <div className={classes.item}>
                                        <FontAwesomeIcon
                                            icon={faImdb}
                                            className={` ${classes.imdb}`}
                                            size="2x"
                                        />
                                    </div>
                                    <div className={classes.item}>
                                        <FontAwesomeIcon
                                            icon={faCirclePlay}
                                            className={`${classes.hd}`}
                                            size="2x"
                                        />
                                    </div>
                                    <div
                                        onClick={addFavoriteHandler}
                                        id="heart"
                                        className={favoriteClass}
                                    >
                                        <FontAwesomeIcon icon={faHeart} size="2x" />
                                        {/* <small>add to favorite!</small> */}
                                    </div>
                                    <div
                                        onClick={WatchLaterHandler}
                                        id="list"
                                        className={watchLaterClass}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                watchLater
                                                    ? faCalendarCheck
                                                    : faCalendarPlus
                                            }
                                            size="2x"
                                        />
                                        {/* <small>add to favorite!</small> */}
                                    </div>
                                </div>
                            </div>

                            <div className={classes.description}>{overView}</div>
                            <div
                                className={classes.watchTrailer}
                                onClick={watchTrailerHandler}
                            >
                                Watch Trailer
                            </div>
                        </div>

                        <div className={classes.MoivePoser}>
                            <img
                                src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                                alt="cover"
                            ></img>
                        </div>
                    </div>
                </div>
            </div>

            <ActorDetails id={data.id} />
            <Similar id={data.id} />
        </>
    );
};

export default MoiveItemDetails;