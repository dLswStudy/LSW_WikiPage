import React from "react";
import appConfig from "../../../config/app.config";
import axios from "axios";
import {Main_BoardAddPopup} from "src/pages/Main/MainArea/Main_BoardAddPopup";
import {Main_Board} from "src/pages/Main/MainArea/Main_Board";
import {useQuery} from "react-query";



const MainArea = () => {
    console.log('%c MainArea Rendering', "color:skyblue")
    const Board = Main_Board
    const Popup = Main_BoardAddPopup



    return (
        <div id="MainArea">
            <div className="inner my-14">
                <section className="BoardSection">
                    <Popup />
                    <Board isVisibleHeader/>
                </section>
            </div>

        </div>
    );
};

export default MainArea;