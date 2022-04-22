import Header from "./Header";
import React from "react";

const Layout = (props) => {
    return <React.Fragment >
        <main className={props.className}>
            <header>
                <Header darkMoodHnadler=
                    {props.darkMoodHnadler}
                    isDark={props.isDark} />
            </header>
            {props.children}
        </main>
    </React.Fragment>
}

export default Layout;
