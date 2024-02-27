import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import appConfig from "../../../config/app.config";

const api_getPost = async (postIdx) => {
    return await axios.get(appConfig.apiPreUrl + '/Post/'+postIdx)
};

const WikiArea = () => {
    console.log('%c WikiArea Rendering', "color:red")
    const navigate = useNavigate();
    const location = useLocation();
    const index = location.state.index

    const [isModify, setIsModify] = useState(false);
    const [loading, setLoading] = useState(false);
    const initialState = {
        title: "",
        content: "",
    }
    const [state, setState] = useState(initialState);

    const titleInput = useRef();
    const contentInput = useRef();

    const fetchData = async (idx) => {
        try {
            setLoading(true)
            const res = await api_getPost(idx);
            setLoading(false)
            console.log('getPost res', res)
            setState(res.data)
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }
    useEffect(() => {
        fetchData(index);
    }, []);

    const handleChangeState = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const goToMain = () => {
        navigate('/')
    }
    const doModifyBtn = () => {
        console.log('ee')
    }
    const doSaveBtn = () => {
        console.log('ee')
    }

    return (
        <div id="WikiArea">
            <div className="inner my-14">
                <div className="btnArea mb-5">
                    <div className="btnArea-left">
                        <div className="addBtn btn btn--black-reverse" onClick={goToMain}>메인으로</div>
                    </div>
                    <div className="btnArea-right">
                        {!isModify?
                            <div className="addBtn btn btn--black-reverse" onClick={doModifyBtn}>수정</div>
                            :
                            <div className="addBtn btn btn--black-reverse" onClick={doSaveBtn}>저장</div>
                        }
                    </div>
                </div>
                <div className="wiki-body__wrapper">
                    <div className="pageName">Wiki Page</div>
                    <hr className="hr4"/>
                    <div className="wiki__header">
                        <div className="wiki__header-left">
                            {!isModify?
                                <div className="title_content">{state.title}</div>
                                :
                                <div className="titleDiv">
                                    <div className="title">제목:&nbsp;</div>
                                    <input
                                        className="title_content"
                                        ref={titleInput}
                                        name="title"
                                        value={state.title}
                                        onChange={handleChangeState}
                                    />
                                </div>
                            }
                        </div>
                        <div className="wiki__header-right">
                            <div className="instDate">{}</div>
                        </div>
                    </div>
                    <hr className="hr4"/>
                    <div className="wiki__content-body">
                        {!isModify?
                            <div className="content">{state.content}</div>
                            :
                            <div className="contentDiv">
                                <div className="itemText">본문:&nbsp;</div>
                                <textarea
                                    className="content"
                                    ref = {contentInput}
                                    name="content"
                                    value={state.content}
                                    onChange={handleChangeState}
                                />
                            </div>
                        }
                    </div>
                    <hr className="hr2"/>
                    <div className="wiki__movePost"><span className="text text-noto-h1">이전글</span><span>wselfwieokfjwoefj</span></div>
                    <hr className="hr2"/>
                    <div className="wiki__movePost"><span className="text text-noto-h1">다음글</span><span>kljfiwegvb</span></div>
                    <hr className="hr2"/>
                    {/*<div className="btnArea">*/}
                    {/*    <SpinByW loading={loadingW}/>*/}
                    {/*    <div className="addBtn btn btn--black-reverse" onClick={doCompleteBtn}>작성 완료</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default WikiArea;