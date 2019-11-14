import React from "react";
import { Link } from "react-router-dom";
import "../style/about.style.css";

const MainMenu = () => {
    return (
        <div>
            <div class = "about-image">
                <img src={require('../assets/about (1).png')}/>
                <div class = "text-block">
                    <h4>About</h4>
                    <p>A New Life Line is a social enterprise providing assessment and re-entry support in the form of job placement, training, and mentorship for mentransitioning from incarceration to their communities after they are released. A New Life Line combines both in-person and online, asynchronous support from other formerly incarcerated persons along their journey.</p>
                </div>
            </div>
        </div>
);
};

export default MainMenu;