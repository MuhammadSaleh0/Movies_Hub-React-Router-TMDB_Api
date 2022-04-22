import { useParams } from 'react-router-dom';
import MoiveSlides from '../components/MoiveSlides/MoiveSlides';
import { movieType, tvType } from './MainHomePage';

export const categoryM = {
    movie: 'movie',
    tv: 'tv',
};
const MoiveLists = () => {
    const { category } = useParams();
    let MoiveList = '';

    if (category === 'tv') {
        MoiveList = (
            <>
                <MoiveSlides category={categoryM.tv} type={tvType.popular} />
                <MoiveSlides category={categoryM.tv} type={tvType.on_the_air} />
                <MoiveSlides category={categoryM.tv} type={tvType.top_rated} />
            </>
        );
    } else {
        MoiveList = (
            <>
                <MoiveSlides category={categoryM.movie} type={movieType.popular} />
                <MoiveSlides
                    category={categoryM.movie}
                    type={movieType.top_rated}
                />
                <MoiveSlides category={categoryM.movie} type={movieType.upcoming} />
            </>
        );
    }

    return <> {MoiveList}</>;
};

export default MoiveLists;
