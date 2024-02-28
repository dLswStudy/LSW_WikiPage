import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import appConfig from "../../../config/app.config";
import SpinByW from "src/components/SpinByW/SpinByW";
import {useMutation, useQuery} from "react-query";

// API 경로 설정
const apiURL = appConfig.apiPreUrl + '/Post';

// 포스트를 가져오는 함수
const api_getPost = async (postId) => {
    const { data } = await axios.get(`${apiURL}/${postId}`);
    return data;
};

// 포스트를 업데이트하는 함수
const api_updatePost = async (postId, postData) => {
    const { data } = await axios.put(`${apiURL}/${postId}`, postData);
    return data;
};

const WikiArea = ({queryClient}) => {
    console.log('%c WikiArea Rendering', "color:red")
    const navigate = useNavigate();
    const location = useLocation();
    const postId = location.state.index
    const titleInput = useRef();
    const contentInput = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ title: '', content: '' });
    const msg = {
        fetchFail: '데이터를 가져오는데 실패하였습니다.',
        updtOK: '저장 완료하였습니다.',
        updtFail: '저장 실패하였습니다.'
    }

    // 포스트 가져오기
    const { data: post, isLoading, error } = useQuery(['post', postId], () => api_getPost(postId));
    let errMsg = ''
    if (error) {
        errMsg = msg.fetchFail;
    }

    // 포스트 업데이트
    const { mutate, isLoading_save=false } = useMutation(({ data }) => api_updatePost(postId, data), {
        onSuccess: () => {
            // 업데이트 성공 후 포스트 다시 가져오기
            queryClient.invalidateQueries(['post', postId]).then(r => {
                setIsEditing(false);
                alert(msg.updtOK)
            });
        },
        onError: ()=>{
            alert(msg.updtFail)
        }
    });

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ title: post.title, content: post.content });
    };
    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        })
    }
    const goToMain = () => {
        navigate('/')
    }
    const doSaveBtn = () => {
        mutate({data: editData})
    }

    return (
        <div id="WikiArea">
            <div className="inner my-14">
                <div className="wiki-body__wrapper">
                    <div className="btnArea mb-5">
                        <div className="btnArea-left">
                            <div className="addBtn btn btn--black-reverse" onClick={goToMain}>메인으로</div>
                        </div>
                        <div className="btnArea-right">
                            {!isEditing ?
                                <div className="addBtn btn btn--black-reverse" onClick={handleEdit}>수정</div>
                                :
                                <SpinByW loading={isLoading_save}>
                                    <div className="addBtn btn btn--black-reverse" onClick={doSaveBtn}>저장</div>
                                </SpinByW>
                            }
                        </div>
                    </div>
                    <div className="pageName">Wiki Page</div>
                    <SpinByW loading={isLoading} top_px={100} errMsg={errMsg}>
                        <div className="wiki__loadingArea">
                            <hr className="hr4"/>
                            <div className="wiki__header">
                                <div className="wiki__header-left">
                                    {!isEditing ?
                                        <div className="title_content">{post?.title}</div>
                                        :
                                        <div className="titleDiv">
                                            <div className="itemText">제목:&nbsp;</div>
                                            <input
                                                className="title_content"
                                                ref={titleInput}
                                                name="title"
                                                value={editData.title}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="wiki__header-right">
                                    <div className="instDate">{}</div>
                                </div>
                            </div>
                            <hr className="hr4 mb-0"/>
                            <div className="wiki__content-body">
                                {!isEditing ?
                                    <div className="content">{post?.content}</div>
                                    :
                                    <div className="contentDiv">
                                        <div className="itemText">본문:&nbsp;</div>
                                        <textarea
                                            className="content"
                                            ref={contentInput}
                                            name="content"
                                            value={editData.content}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                }
                            </div>
                            <hr className="hr2"/>
                            <div className="wiki__movePost"><span
                                className="text text-noto-h1">이전글</span><span>{post?.prev?.title}</span></div>
                            <hr className="hr2"/>
                            <div className="wiki__movePost"><span
                                className="text text-noto-h1">다음글</span><span>{post?.next?.title}</span></div>
                            <hr className="hr2"/>
                        </div>
                    </SpinByW>
                </div>
            </div>
        </div>
    );
};

export default WikiArea;