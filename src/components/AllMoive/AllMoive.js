import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../Hooks/use-http';
import { tvType, movieType } from '../../pages/MainHomePage';
// import Input from "../InputSearch/input";/
import Moives from './Moives';
import classes from './AllMoive.module.css';

const AllMoive = () => {
    const [data, setData] = useState([]);
    const { sentRequest } = useHttp();

    const { movie_type, category, keyword } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let response = null;
            if (keyword === undefined) {
                let base = `https://api.themoviedb.org/3/${category}/${movie_type}?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=`;
                let Urls = [base + `1`];
                response = await Promise.all(
                    Urls.map((url) => fetch(url).then((res) => res.json()))
                );
                let MoivesData = { ...response };
                let MoivesDataArrays = [];
                for (const index in MoivesData) {
                    MoivesDataArrays = [
                        ...MoivesDataArrays,
                        ...MoivesData[index].results,
                    ];
                }
                setData(MoivesDataArrays);
            } else {
                const searchUrl = `https://api.themoviedb.org/3/search/${category}?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&query=${keyword}&language=en-US&region=Usa&page=1`;
                response = await sentRequest({ url: searchUrl });
                const searchData = response.results;
                setData([...searchData]);
            }
        };
        fetchData();
    }, [movie_type, category, keyword, sentRequest]);

    const [page, setPage] = useState(2);

    const total_pages = 490;
    const isFinished = page < total_pages;
    const moreMoivesHandler = async () => {
        if (page === total_pages) {
            return;
        }
        if (keyword === undefined) {
            setPage(page + 1);
            let baseUrl = `https://api.themoviedb.org/3/${category}/${movie_type}?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&language=en-US&page=`;
            const response = await sentRequest({ url: `${baseUrl + page}` });
            const MoiveData = response.results;
            setData((prevstate) => [...prevstate, ...MoiveData]);
        } else {
            const searchUrl = `https://api.themoviedb.org/3/search/${category}?api_key=bd1f3cbe4cc63c0bda46a69f84a462cd&query=${keyword}&language=en-US&region=Usa&page=`;
            const response = await sentRequest({ url: `${searchUrl + page}` });
            const MoiveData = response.results;
            setData((prevstate) => [...prevstate, ...MoiveData]);
        }
    };

    let titleName = '"';
    if (category === 'movie') {
        movie_type === movieType.popular
            ? (titleName = 'Popular')
            : movie_type === movieType.upcoming
                ? (titleName = 'UP Coming')
                : (titleName = 'Top Rated');
    } else {
        movie_type === tvType.popular
            ? (titleName = 'Popular')
            : movie_type === tvType.top_rated
                ? (titleName = 'Top Rated')
                : (titleName = 'On The Air');
    }

    const navigate = useNavigate();
    const [keyword_input, setKeyword] = useState(keyword ? keyword : '');

    const goToSearch = useCallback(
        (e) => {
            if (keyword_input.trim().length <= 0) {
                return;
            }
            navigate(`/${category}/search/${keyword_input}/`);
        },
        [navigate, category, keyword_input]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    let searchTitle = 'Search Result';

    return (
        <div className={classes.allMoive}>
            <h1>{keyword ? searchTitle : titleName}</h1>
            <div className={classes.form}>
                <input
                    value={keyword_input}
                    onChange={(e) => setKeyword(e.target.value)}
                    type="text"
                    placeholder="Enter A KeyWord"
                />
                <button type="submit" onClick={goToSearch}>
                    search
                </button>
            </div>
            <Moives category={category} data={data} />
            {isFinished && (
                <div onClick={moreMoivesHandler} className={classes.addMore}>
                    More!
                </div>
            )}
        </div>
    );
};

export default AllMoive;
