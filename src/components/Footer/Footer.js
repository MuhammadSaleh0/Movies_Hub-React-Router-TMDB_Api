import classses from './Fotter.module.css';
import fotter_cover from '../../images/footer-bg.jpg';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={classses.footer}>
            <div className={classses.image}>
                <img src={fotter_cover} alt="footer" />
            </div>

            <div className={classses.container}>
                <div className={classses.logo}>
                    <div>
                        <Link to="/">Movies Hub</Link>
                    </div>
                </div>

                <div className={classses.Cards}>
                    <div className={classses.card}>
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us</Link>
                    </div>

                    <div className={classses.card}>
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link>
                    </div>

                    <div className={classses.card}>
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
