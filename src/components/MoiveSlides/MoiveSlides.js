import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './MoiveSlides.module.css';
import { movieType, tvType } from '../../pages/MainHomePage';
import useHttp from '../Hooks/use-http';

const MoiveSlides = (props) => {
    const topRated =
        'https://api.themoviedb.org/3/movie/top_rated?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=1';
    const popular =
        'https://api.themoviedb.org/3/movie/popular?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=1';
    const upcoming =
        'https://api.themoviedb.org/3/movie/upcoming?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=1';

    const topRatedTv =
        'https://api.themoviedb.org/3/tv/top_rated?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=1';
    const popularTv =
        'https://api.themoviedb.org/3/tv/popular?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=1';
    const onTheAir =
        'https://api.themoviedb.org/3/tv/on_the_air?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=1';

    const [data, setData] = useState([]);

    const { sentRequest } = useHttp();

    useEffect(() => {
        if (props.category !== 'tv') {
            const getLists = async () => {
                if (props.type === movieType.top_rated) {
                    const response = await sentRequest({ url: topRated });
                    setData(response.results);
                } else if (props.type === movieType.popular) {
                    const response = await sentRequest({ url: popular });
                    setData(response.results);
                } else if (props.type === movieType.upcoming) {
                    const response = await sentRequest({ url: upcoming });
                    setData(response.results);
                }
            };
            getLists();
        } else {
            const getLists = async () => {
                if (props.type === tvType.top_rated) {
                    const response = await sentRequest({ url: topRatedTv });
                    setData(response.results);
                } else if (props.type === tvType.popular) {
                    const response = await sentRequest({ url: popularTv });
                    setData(response.results);
                } else if (props.type === tvType.on_the_air) {
                    const response = await sentRequest({ url: onTheAir });
                    setData(response.results);
                }
            };
            getLists();
        }
    }, [sentRequest, props.category, props.type]);

    return (
        <div id={props.type} className={classes.Moives}>
            <div className={classes.overley}></div>
            <MoiveItem category={props.category} type={props.type} data={data} />;
        </div>
    );
};

export default React.memo(MoiveSlides);

export const MoiveItem = (props) => {
    let TopRatedContainer = document.getElementById(props.type);

    const changeBackgroundHandler = (backdrop_path) => {
        if (TopRatedContainer) {
            TopRatedContainer.style.backgroundImage = `url("https://image.tmdb.org/t/p/w780${backdrop_path}")`;
        }
    };

    let moives = props.data.map((moive) => {
        let moiveTitle = moive.title ? moive.title : '';
        if (moive.title) {
            if (moiveTitle.length > 32) {
                moiveTitle = moive.title.slice(0, 32);
            }
        }
        let SeriesName = moive.name ? moive.name : '';
        if (moive.name) {
            if (SeriesName.length > 32) {
                SeriesName = moive.name.slice(0, 32);
            }
        }
        return (
            <div
                key={moive.id}
                onTouchStart={changeBackgroundHandler.bind(
                    null,
                    moive.backdrop_path
                )}
                onMouseEnter={changeBackgroundHandler.bind(
                    null,
                    moive.backdrop_path
                )}
                className={classes.MoiveCard}
            >
                <NavLink to={`/${props.category}/${moive.id}`}>
                    <div className={classes.image}>
                        {moive.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w185/${moive.poster_path}`}
                                alt="cover"
                            />
                        ) : (
                            <div className={classes.replacment}>
                                {moiveTitle || SeriesName}
                            </div>
                        )}
                    </div>
                </NavLink>
            </div>
        );
    });

    let pageTitle = '';
    props.type === movieType.popular
        ? (pageTitle = 'Popular')
        : props.type === movieType.top_rated
            ? (pageTitle = 'Top Rated')
            : props.type === movieType.upcoming
                ? (pageTitle = 'Up Coming')
                : props.type === tvType.upcoming
                    ? (pageTitle = 'Up Coming')
                    : props.type === tvType.top_rated
                        ? (pageTitle = 'Top Rated')
                        : (pageTitle = 'On The Air');

    return (
        <div className={classes.MoivesSlide}>
            <div className={classes.barTitle}>{pageTitle}</div>

            <div className={classes.CategoryMoives}>{moives}</div>

            <div className={classes.show_more}>
                <NavLink to={`/${props.category}/all/${props.type}/`}>
                    <p>Click For More!</p>
                </NavLink>
            </div>
        </div>
    );
};
