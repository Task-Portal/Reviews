import React, {FC} from "react";
import MyNav from "../areas/MyNav";
import Main from "../areas/main/Main";
import "./Home.css";

const Home: FC = () => {

    return (
        <>
            <MyNav/>
            <Main/>
        </>
    );
};

export default Home;
