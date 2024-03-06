import Wiki_editor from "src/pages/Wiki/WikiArea/Wiki_editor";
import SpinByW from "src/components/SpinByW/SpinByW";
import React, {useRef, useState} from "react";
import {convertToRaw} from "draft-js";
import axios from "axios";
import appConfig from "src/config/app.config";
import {useMutation, useQueryClient} from "react-query";
import ContentState from "draft-js/lib/ContentState";
import {timelog} from "src/assets/js/util";

const api_addPost = async (data) => {
    // await new Promise(resolve => setTimeout(resolve, 3000))
    return await axios.post(appConfig.apiPreUrl + '/Post', data)
};

export function Main_BoardAddPopup() {
    timelog('%c Main_BoardAddPopup Rendering', "color:Cyan")
    const titleInput = useRef();
    const editorRef = useRef(null);
    const queryClient = useQueryClient()

    const contentState = useRef(convertToRaw(ContentState.createFromText('')));
    // console.log("contentState = ", contentState.current);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const isBodyRender = useRef(true)
    const okMsg = '게시글 등록 성공';
    const failMsg = '게시글 등록 실패';

    // 포스트 등록 ReactQuery
    const {mutate, isLoading: isLoading_save = false} = useMutation(({data}) => api_addPost(data), {
        onSuccess: () => {
            doClose()
            // 업데이트 성공 후 포스트 다시 가져오기
            queryClient.invalidateQueries('post');
            alert(okMsg)
        },
        onError: () => {
            alert(failMsg)
        }
    });
    const handleSubmit = () => {
        timelog('등록하기')
        console.log("contentState.current = ", contentState.current);
        if (titleInput.current.value.length < 2) {
            alert("제목은 최소 2글자 이상 입력해 주세요.")
            titleInput.current.focus();
            return false;
        }

        //5보다 같거나 큰
        let eqlg5 = false
        for (const block of contentState.current.blocks) {
            if(block.text.trim().length >= 5){
                eqlg5 = true
                break;
            }
        }
        if(!eqlg5){
            alert("본문은 최소 5글자 이상 입력해 주세요.")
            editorRef.current.focus();
            return false;
        }

        const data = {
            title: titleInput.current.value,
            content: contentState.current
        }
        timelog("req data = ", data);
        mutate(data)
    }

    const handleEditorChange = (newEditorState) => {
        contentState.current = newEditorState;
    };

    const doClose = () => {
        doHidden()
        isBodyRender.current = false
    }
    // 팝업 숨기기
    const doHidden = () => {
        setIsPopupVisible(false)
    }
    // state 초기화 후 팝업 숨기기
    // 팝업 외 클릭시 팝업 숨기기
    const doBehindLayer = () => {
        doHidden()
    }
    // 팝업 보이기
    const doAddBtn = () => {
        setIsPopupVisible(true)
        isBodyRender.current = true
    }

    return <>
        <div className="BoardSection__btnArea mb-5 flex justify-end">
            <div className="addBtn btn btn--black-reverse" onClick={doAddBtn}>추가</div>
        </div>
        <div className={`BoardSection__popup ${isPopupVisible ? "" : "hidden"}`}>
            <div className="popup__header">
                <div className="header-left">강의 정보 추가</div>
                <div className="header-right">
                    <span className="material-icons" onClick={doClose}>close</span>
                </div>
            </div>
            {
                isBodyRender.current
                &&
                <div className="popup__body">
                    <div className="popup__body__wrapper">
                        <div className="title">
                            <div className="itemText">제목:&nbsp;</div>
                            <input
                                ref={titleInput}
                                name="title"
                            />
                        </div>
                        <div className="content">
                            <div className="itemText">본문:&nbsp;</div>
                            <Wiki_editor
                                editorRef={editorRef}
                                initialContentState={contentState.current}
                                onChange={handleEditorChange}/>
                        </div>
                        <div className="btnArea">
                            <SpinByW loading={isLoading_save}>
                                <div className="addBtn btn btn--black-reverse" onClick={handleSubmit}>등록하기</div>
                            </SpinByW>
                        </div>
                    </div>
                </div>
            }
        </div>
        <div className={`popup_behindLayer ${isPopupVisible ? "" : "hidden"}`}
             onClick={doBehindLayer}></div>
    </>;
}