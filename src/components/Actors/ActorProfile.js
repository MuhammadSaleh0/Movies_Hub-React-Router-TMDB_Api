import classes from './ActorProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const ActorProfile = (props) => {
    let imag = '';
    if (props.info) {
        imag = (
            <img
                src={`https://image.tmdb.org/t/p/w300${props.info.profile_path}`}
                alt="cover"
            />
        );
    }

    const { category } = useParams();
    const navigate = useNavigate();
    const navigateTomovieHandler = (movie_id) => {
        navigate(`/${category}/${movie_id}`);
    };

    let Actor_movies;
    if (props.data) {
        Actor_movies = props.data.map((movie) => (
            <div
                className={classes.movie_card}
                key={movie.id}
                onClick={navigateTomovieHandler.bind(null, movie.id)}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path || movie.backdrop_path
                        }`}
                    alt="cover"
                />
            </div>
        ));
    }

    let biography = '';
    biography = props.info.biography
        ? (biography = props.info.biography.slice(0, 300))
        : (biography = '');
    let name = props.info.name ? props.info.name : '';
    let known_as1 = '';
    let known_as2 = '';
    known_as1 = props.info.also_known_as
        ? (known_as1 = props.info.also_known_as[0])
        : (known_as1 = '');
    known_as2 = props.info.also_known_as
        ? (known_as2 = props.info.also_known_as[6])
        : (known_as2 = '');
    let place_of_birth = '';
    props.info.place_of_birth
        ? (place_of_birth = props.info.place_of_birth)
        : (place_of_birth = '');

    return (
        <div className={classes.Actor_profile}>
            <div className={classes.Actor_info}>
                <div className={classes.Acto_name}>
                    <h1>{name}</h1>
                    <small>
                        known as: {known_as1} , ( {known_as2} )
                    </small>
                </div>

                <div className={classes.image}>{imag}</div>

                <div className={classes.Actor_personal_info}>
                    <div className={classes.biography}>{biography}</div>

                    <div className={classes.place_of_birth}>
                        <FontAwesomeIcon
                            icon={faHomeAlt}
                            className={classes.home}
                            size="2x"
                        />

                        <div>{place_of_birth}</div>
                    </div>
                </div>
            </div>

            <div className={classes.Actor_movies}>{Actor_movies}</div>
        </div>
    );
};

export default ActorProfile;
