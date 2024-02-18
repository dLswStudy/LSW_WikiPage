import Board from "../../../components/Board/Board";
import {useState} from "react";

const MainArea = () => {
    const cols = [
        {title:'제목', dataIndex:'title'},
        {title:'등록일시', dataIndex:'instDT', type:'dateTime', maxWidth:170},
        {title:'수정일시', dataIndex:'modfDT', type:'dateTime', maxWidth:170},
    ]
    const [rowDatas, setRowDatas] = useState([
        {title:'가나다라마바사', instDT:'20230217203424', modfDT:'20230217203424'},
        {title:'애플워치', instDT:'20230218091224', modfDT:'20230218101524'},
    ]);
    return (
        <div id="MainArea">
            <div className="inner">
                <section className="Board">
                    <div className="Board__btnArea mt-14 bg-indigo-300 h-12 text-right">
                        <button>추가</button>
                    </div>
                    <Board columns={cols} rowDatas={rowDatas}/>
                </section>

            </div>
        </div>
    );
};

export default MainArea;