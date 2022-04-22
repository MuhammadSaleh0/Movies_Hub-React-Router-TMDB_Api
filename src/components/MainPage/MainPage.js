import { useEffect, useRef, useState } from 'react';
import classes from './MainPage.module.css';
import { Covers } from './Covers';
import screen from '../../images/screen-flip.png';

const MainPage = () => {
    const [current, setCurrent] = useState(0);
    const autoPlayHandler = () => {
        if (current === Covers.length - 1) {
            return setCurrent(0);
        }
        setCurrent(current + 1);
    };

    const autoPlay = useRef();

    useEffect(() => {
        autoPlay.current = autoPlayHandler;
    });

    useEffect(() => {
        const play = () => {
            autoPlay.current();
        };
        const interval = setInterval(play, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    let textContainerClass = classes.textCotainer;
    useEffect(() => {
        let textsContainer = document.getElementsByClassName(textContainerClass);
        let myIndex = 0;
        const replaceTextHandler = () => {
            if (textsContainer) {
                let i;
                for (i = 0; i < textsContainer.length; i++) {
                    textsContainer[i].style.display = 'none';
                }
                myIndex++;
                if (myIndex > textsContainer.length) {
                    myIndex = 1;
                }
                if (textsContainer) {
                    textsContainer[myIndex - 1].style.display = 'block';
                }
            }
            setTimeout(replaceTextHandler, 6000);
        };
        replaceTextHandler();
    }, [textContainerClass]);

    const imageCovers = Covers.map((cover, index) => {
        return (
            <div
                key={index}
                className={index === current ? classes.coverActive : classes.cover}
            >
                {index === current && (
                    <img className={classes.img} src={cover.image} alt="cover" />
                )}
            </div>
        );
    });

    return (
        <div className={classes.MainPage}>
            {/* <div className={classes.overley}></div> */}
            <div className={classes.screen_Image}>
                <div className={classes.screen}>
                    <img src={screen} alt="screen" />
                    {imageCovers}
                </div>
                <div className={classes.explore_now}>Explore Now!</div>
            </div>
            <div className={classes.pageContent}>
                <div className={textContainerClass}>
                    Welcome.
                    <br />
                    Millions of movies, TV shows and people to discover. Explore now.
                </div>
                <div className={textContainerClass}>
                    Moives Hub.
                    <br />
                    Is Your Second Home, It's All About Cinema World.
                </div>
            </div>
        </div>
    );
};

export default MainPage;
