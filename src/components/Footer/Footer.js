import React from "react";
import "./Footer.css";
import {Segment} from "semantic-ui-react";

const Footer = () => {
    return (
        <header className="main-footer footer">
            <Segment inverted >
                <p className="main-footer-text">&copy; Copyright 2019, Oliver Klein</p>
            </Segment>
        </header>
    );
}

export default Footer;