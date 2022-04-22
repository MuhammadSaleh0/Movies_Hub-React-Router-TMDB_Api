
import MainPage from "../components/MainPage/MainPage";
import React from "react";
import Footer from "../components/Footer/Footer";
import MoiveLists from "./MoiveLists";

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}


const MainHomePage = () => {

    return <React.Fragment>
        <MainPage />
        <MoiveLists />
        <Footer />
    </React.Fragment>
}

export default MainHomePage;
