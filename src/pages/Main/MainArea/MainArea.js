import React from "react";
import appConfig from "../../../config/app.config";
import axios from "axios";
import {Main_BoardAddPopup} from "src/pages/Main/MainArea/Main_BoardAddPopup";
import {Main_Board} from "src/pages/Main/MainArea/Main_Board";
import {useQuery} from "react-query";

const api_getPosts = async () => {
    // await new Promise(resolve => setTimeout(resolve, 100000))
    return await axios.get(appConfig.apiPreUrl + '/Post')
};

const MainArea = () => {
    console.log('%c MainArea Rendering', "color:skyblue")
    const Board = Main_Board
    const Popup = Main_BoardAddPopup

    const { data: posts, isLoading, error } = useQuery(['posts'],  api_getPosts);
    const errMsg = error ? '게시물을 가져오는 데 실패했습니다.' : null;


    return (
        <div id="MainArea">
            <div className="inner my-14">
                <section className="BoardSection">
                    <Popup />
                    <Board loading={isLoading} rowDatas={posts?.data} errMsg={errMsg}/>
                </section>
            </div>

        </div>
    );
};

export default MainArea;