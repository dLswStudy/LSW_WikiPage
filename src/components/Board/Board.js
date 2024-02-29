import moment from "moment";
import {useNavigate} from "react-router-dom";

const Board = ({columns, rowDatas, isVisibleHeader = true}) => {
    const navigate = useNavigate();
    const styleHandle = colInfo => {
        const styleData = {}
        if (colInfo.maxWidth) {
            styleData.maxWidth = colInfo.maxWidth
        }
        return styleData
    }
    const dataHandle = (colInfo, data) => {
        if (colInfo.type === 'dateTime') {
            return moment(data, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        } else {
            return data
        }
    }

    const toDetail = (index) => {
        navigate('/wiki', {state: {index: index}})
    }

    return <div id="Board">
        {
            rowDatas.length > 0
            &&
            <table>
                <thead className={`board__header ${isVisibleHeader ? 'flex' : 'hidden'} text-gray-900 border-double`}>
                <tr>
                    {columns.map(cInfo =>
                        <th style={styleHandle(cInfo)} key={cInfo.dataIndex}>
                            {cInfo.title}
                        </th>)}
                </tr>
                </thead>
                <tbody className="board__body">
                {rowDatas.map((rData, rowNum) =>
                    <tr key={rowNum} onClick={() => toDetail(rData.index)}>
                        {columns.map(cInfo2 =>
                            <td style={styleHandle(cInfo2)} key={rowNum + '-' + cInfo2.dataIndex}>
                                {dataHandle(cInfo2, rData[cInfo2.dataIndex])}
                            </td>)}
                    </tr>)
                }
                </tbody>
            </table>
        }

        <div className="board__pagination"></div>
    </div>;
};

export default Board;