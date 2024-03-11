import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import appConfig from "../../../config/app.config";
import SpinByW from "src/components/SpinByW/SpinByW";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {formatDate} from "src/assets/js/util";
import Wiki_editor from "src/pages/Wiki/WikiArea/Wiki_editor";

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

const WikiArea = ({postId}) => {
    console.log('%c WikiArea Rendering', "color:red")
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const isOK_getPost = useRef(true);
    const titleInput = useRef();
    const editorRef = useRef(null);
    const contentState = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const msg = {
        fetchFail: '데이터를 가져오는데 실패하였습니다.',
        updtOK: '저장되었습니다.',
        updtFail: '저장 실패하였습니다.'
    }

    // 포스트 가져오기
    const { data: post, isLoading, error } = useQuery(['post', postId], () => api_getPost(postId),{enabled:isOK_getPost.current});
    if(isLoading) console.log("isLoading = ", isLoading);
    console.log("post = ", post);
    if(post) {
        isOK_getPost.current = false
        contentState.current = post.content
    }
    let errMsg = ''
    if (error) {
        errMsg = msg.fetchFail;
    }

    // 포스트 업데이트
    const { mutate, isLoading:isLoading_save=false } = useMutation(( data ) => api_updatePost(postId, data), {
        onSuccess: () => {
            isOK_getPost.current = true
            // 업데이트 성공 후 포스트 다시 가져오기
            queryClient.invalidateQueries(['post', postId]).then(r => {
                setIsEditing(false);
                console.log("post.title = ", post.title);
                alert(msg.updtOK)
            });
        },
        onError: ()=>{
            alert(msg.updtFail)
        }
    });



    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleEditorChange = (newEditorState) => {
        contentState.current = newEditorState;
    };
    const goToMain = () => {
        navigate('/')
    }
    const doSaveBtn = () => {
        const data = {
            title: titleInput.current.value,
            content: contentState.current
        }
        console.log("save data = ", data);
        mutate(data)
    }
    const doCancleBtn = () => {
        setIsEditing(false)
    }
    const moveTo = (postId) => {
        navigate('/wiki',{state:{index:postId}})
    }
    const dateFmt = (date) => {
        return formatDate(date,'YYYYMMDDHHmmss', 'YYYY-MM-DD HH:mm');
    }

    return (
        <div id="WikiArea">
            <div className="inner my-14">
                <div className="wiki__wrapper">
                    <div className="btnArea mb-5">
                        <div className="btnArea-left">
                            <div className="btn btn--black-reverse" onClick={goToMain}>메인으로</div>
                        </div>
                        <div className="btnArea-right">
                            {!isEditing ?
                                <div className=" btn btn--black-reverse" onClick={handleEdit}>수정</div>
                                :
                                <div className="flex">
                                    <div className=" btn btn--black-reverse" onClick={doSaveBtn}>저장</div>
                                    <div className=" btn btn--black-reverse" onClick={doCancleBtn}>취소</div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="pageName">Wiki Page</div>
                    <SpinByW loading={isLoading || isLoading_save} top_px={100} errMsg={errMsg}>
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
                                                type="text"
                                                className="title_content"
                                                ref={titleInput}
                                                name="title"
                                                defaultValue={post?.title}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="wiki__header-right">
                                    <div className="dateDiv mr-3"><div className="dateDiv__text">등록일시:&nbsp;</div><div className="dateDiv__date">{dateFmt(post?.instDT)}</div></div>
                                    <div className="dateDiv"><div className="dateDiv__text">수정일시:&nbsp;</div><div className="dateDiv__date">{dateFmt(post?.modfDT)}</div></div>
                                </div>
                            </div>
                            <hr className="hr4 mb-0"/>
                            <div className="wiki__content-body">
                                {
                                    !isLoading &&
                                    (!isEditing ?
                                    <div className="contentDiv p-4">
                                        <Wiki_editor key={post?.modfDT}
                                             toolbarHidden readOnly
                                             defaultContentState={contentState.current} />
                                    </div>
                                    :
                                    <div className="contentDiv">
                                        <div className="itemText mb-3">본문:&nbsp;</div>
                                        <div className="editor-wrapper p-4">
                                            <Wiki_editor editorRef={editorRef}
                                                         defaultContentState={contentState.current}
                                                         onContentStateChange={handleEditorChange}/>
                                        </div>
                                    </div>)
                                }
                            </div>
                            <hr className="hr2"/>
                            {
                                post?.prev?.title &&
                                    <><div className="wiki__movePost" onClick={()=>moveTo(post?.prev?.postId)}><span
                                        className="text text-noto-h1">이전글</span><span>{post?.prev?.title}</span></div>
                                        <hr className="hr2"/></>
                            }
                            {
                                post?.next?.title &&
                                    <><div className="wiki__movePost" onClick={()=>moveTo(post?.next?.postId)}><span
                                        className="text text-noto-h1">다음글</span><span>{post?.next?.title}</span></div>
                                        <hr className="hr2"/></>
                            }

                        </div>
                    </SpinByW>
                </div>
            </div>
        </div>
    );
};

export default WikiArea;