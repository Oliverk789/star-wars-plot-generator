import React from "react";
import "./Header.css";
import {Segment, Image} from "semantic-ui-react";
import SWLogo from "../../assets/star-wars-logo.png";

const AppHeader = () => {
    return (
        <header className="main-header">
            <Segment inverted>
                <Image src={SWLogo} className="main-header-img"/>
                <p className="main-header-text">STAR WARS PLOT GENERATOR</p>
            </Segment>
        </header>
    );
}

export default AppHeader;