import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.css';
import mLetter from '../../images/film-roll.png';
import LLetter from '../../images/film-strip.png';
import moon from '../../images/moon.png';
import sun from '../../images/sun.png';
import TvDark from '../../images/tv-screen (3).png';
import TvLight from '../../images/tv-screen (4).png';

const Header = (props) => {
    const headerDiv = document.querySelector('header_div');
    if (headerDiv) {
        window.addEventListener('scroll', () => {
            headerDiv.classList.add(`${classes.HeaderScroll}`);
        });
    }

    const location = useLocation();
    let moives_tv_class;
    moives_tv_class =
        location.pathname.includes('/tv')
            ? (moives_tv_class = classes.tvClass)
            : classes.moiveClass;

    const goToMoivesListHandler = () => {
        window.scrollTo(0, 400);
    };

    return (
        <div id="header_div" className={classes.Header}>
            <div className={classes.HeaderCountainer}>
                <Link to="/movie">
                    <div className={classes.logoContent}>
                        <h1>
                            M
                            <span>
                                <img src={mLetter} alt="letter" />
                            </span>
                            V
                            <span>
                                <img src={LLetter} alt="letter" />
                            </span>
                            ES
                        </h1>
                        <h1 className={classes.hub}>
                            <div className={classes.tv}>
                                <img src={props.isDark ? TvDark : TvLight} alt="Tv" />
                                <div className={classes.hubText}>Hub</div>
                            </div>
                        </h1>
                    </div>
                </Link>

                <div
                    className={`${classes.moives_shows_butttons} ${moives_tv_class}`}
                >
                    <Link id="movie" to="/movie" onClick={goToMoivesListHandler}>
                        Movie
                    </Link>
                    <Link id="tv" to="/tv" onClick={goToMoivesListHandler}>
                        Tv
                    </Link>
                </div>
                <div
                    className={classes.darkmood}
                    onClick={props.darkMoodHnadler.bind(null)}
                >
                    {props.isDark && (
                        <img className={classes.moon} src={moon} alt="moon" />
                    )}
                    {!props.isDark && (
                        <img className={classes.sun} src={sun} alt="sun" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
