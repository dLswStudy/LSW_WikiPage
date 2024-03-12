import SpinByW from "src/components/SpinByW/SpinByW";
import Board from "src/components/Board/Board";
import React, {useCallback, useEffect, useRef} from "react";
import axios from "axios";
import appConfig from "src/config/app.config";
import {useInfiniteQuery, useQuery} from "react-query";
import {useNavigate} from "react-router-dom";

const api_getPosts = async () => {
    // await new Promise(resolve => setTimeout(resolve, 100000))
    return await axios.get(appConfig.apiPreUrl + '/Post')
};
//모바일용(무한스크롤)
const api_getPosts_M = async (lastIdx, pageSize) => {
    // await new Promise(resolve => setTimeout(resolve, 100000))
    return await axios.get(appConfig.apiPreUrl + `/Post/infiscroll?lastVisibleIndex=${lastIdx}&pageSize=${pageSize}`)
};
const fetchPosts = async ({ pageParam = 0 }) => {
    const pageSize = 20; // 한 페이지당 항목 수
    const {data} = await api_getPosts_M(pageParam, pageSize);
    console.log("fetchPosts posts = ", data);

    return {
        items: data, // API 응답에서 항목 목록
        nextCursor: data.length === pageSize ? data[data.length-1].index : undefined // 다음 페이지의 시작 인덱스
    }
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

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery('posts', fetchPosts, {
        getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    });

    const errMsg = isError ? '게시물을 가져오는 데 실패했습니다.' : null;

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasNextPage, fetchNextPage]);
    const posts = data?.pages.flatMap(page => page.items) ?? [];

    const toDetail = (rowData) => {
        navigate('/wiki', {state: {index: rowData.index}})
    }

    return (
        <SpinByW loading={isLoading} top_px={100}>
            <Board columns={columns} rowDatas={posts} errMsg={errMsg} toDetailFunc={toDetail}/>
            <div ref={lastPostElementRef} />
        </SpinByW>
    );
};

