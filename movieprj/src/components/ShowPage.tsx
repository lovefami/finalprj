import React from 'react';
import './ShowPage.css';
import movieclip from '../assets/movieclip.mp4';
const ShowPage = () => {
    return (
        <div className = "showpage-container">
            <video autoPlay loop muted playsInline id = "background-video ">
                <source src = {movieclip} type ="video/mp4" />
            </video>
            <div className = "overlay">
                <div className ="content">
                    <h1>Track the most popular Movie, shows and more.</h1>
                    <form className="sign-up">
                        <input type="email" placeholder = "Email address" className="email-input" />
                        <button type="submit" className="get-Started-button">get Started</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShowPage;