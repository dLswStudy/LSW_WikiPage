import Board from "../../../components/Board/Board";
import {useRef, useState} from "react";

const MainArea = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const initialState = {
        title: "",
        content: "",
    }
    const [state, setState] = useState(initialState);

    const titleInput = useRef();
    const contentInput = useRef();

    const apiCreate = () => {
        console.log('api')
    }

    const cols = [
        {title: '제목', dataIndex: 'title'},
        {title: '등록일시', dataIndex: 'instDT', type: 'dateTime', maxWidth: 170},
        {title: '수정일시', dataIndex: 'modfDT', type: 'dateTime', maxWidth: 170},
    ]
    const [rowDatas, setRowDatas] = useState([
        {title: '가나다라마바사', instDT: '20230217203424', modfDT: '20230217203424'},
        {title: '애플워치', instDT: '20230218091224', modfDT: '20230218101524'},
    ]);

    const handleChangeState = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        if (state.title.length < 1) {
            alert("제목은 최소 1글자 이상 입력해 주세요.")
            titleInput.current.focus();
            return false;
        }

        if (state.content.length < 5) {
            alert("본문은 최소 5글자 이상 입력해 주세요.")
            contentInput.current.focus();
            return false;
        }

        apiCreate(state.title, state.content)
        alert("게시글 등록 성공")
        return true;
    }
    // 팝업 보이기
    const doAddBtn = () => {
        setIsPopupVisible(true)
    }
    // 팝업 숨기기
    const doHidden = () => {
        setIsPopupVisible(false)
    }
    // state 초기화 후 팝업 숨기기
    const doClose = () => {
        doHidden()
        setState(initialState)
    }
    // 작성 완료 버튼
    const doCompleteBtn = () => {
        if(handleSubmit())
            doClose()
    }
    // 팝업 외 클릭시 팝업 숨기기
    const doBehindLayer = () => {
        doHidden()
    }

    return (
        <div id="MainArea">
            <div className="inner my-14">
                <section className="BoardSection">
                    <div className="BoardSection__btnArea mb-5 flex justify-end">
                        <div className="addBtn btn btn--black-reverse" onClick={doAddBtn}>추가</div>
                    </div>
                    <Board columns={cols} rowDatas={rowDatas} />

                    <div className={`BoardSection__popup ${isPopupVisible ? '' : 'hidden'}`}>
                        <div className="popup__header">
                            <div className="header-left">강의 정보 추가</div>
                            <div className="header-right">
                                <span className="material-icons" onClick={doClose}>close</span>
                            </div>
                        </div>
                        <div className="popup__body">
                            <div className="popup__body__wrapper">
                                <div className="title">
                                    <div className="itemText">제목:&nbsp;</div>
                                    <input
                                        ref={titleInput}
                                        name="title"
                                        value={state.title}
                                        onChange={handleChangeState}
                                    />
                                </div>
                                <div className="content">
                                    <div className="itemText">본문:&nbsp;</div>
                                    <textarea
                                        ref = {contentInput}
                                        name="content"
                                        value={state.content}
                                        onChange={handleChangeState}
                                    />
                                </div>
                                <div className="btnArea">
                                    <div className="addBtn btn btn--black-reverse" onClick={doCompleteBtn}>작성 완료</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`popup_behindLayer ${isPopupVisible ? '' : 'hidden'}`} onClick={doBehindLayer}></div>
                </section>
            </div>

        </div>
    );
};

export default MainArea;