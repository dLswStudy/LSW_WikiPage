import SpinByW from "src/components/SpinByW/SpinByW";
import Board from "src/components/Board/Board";
import React from "react";
import axios from "axios";
import appConfig from "src/config/app.config";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";

const api_getPosts = async () => {
    // await new Promise(resolve => setTimeout(resolve, 100000))
    return await axios.get(appConfig.apiPreUrl + '/Post')
};
//모바일용
const api_getPosts_M = async (lastIdx, pageSize) => {
    // await new Promise(resolve => setTimeout(resolve, 100000))
    return await axios.get(appConfig.apiPreUrl + `/Post/infiscroll?lastVisibleIndex=${lastIdx}&pageSize=${pageSize}`)
};
const columns = [
    {title: '번호', dataIndex: 'index', maxWidth: 70},
    {title: '제목', dataIndex: 'title'},
    {title: '등록일시', dataIndex: 'instDT', type: 'dateTime', maxWidth: 170},
    {title: '수정일시', dataIndex: 'modfDT', type: 'dateTime', maxWidth: 170},
]
export function Main_Board(props) {
    console.log('%c Main_Board Rendering', "color:pink");
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery(['posts'],  api_getPosts_M(null,40));
    const posts = data?.data
    const errMsg = error ? '게시물을 가져오는 데 실패했습니다.' : null;

    const toDetail = (rowData) => {
        navigate('/wiki', {state: {index: rowData.index}})
    }

    return (
        <SpinByW loading={isLoading} top_px={100}>
            <Board columns={columns} rowDatas={posts} errMsg={errMsg} toDetailFunc={toDetail}/>
        </SpinByW>
    );
};

