import { NavLink } from 'react-router-dom';
import classes from './AllMoive.module.css';
import React from 'react';

const Moives = (props) => {
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
            <div key={moive.id} className={classes.MoiveCard}>
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

    return <div className={classes.MoivesGrid}>{moives}</div>;
};

export default Moives;
