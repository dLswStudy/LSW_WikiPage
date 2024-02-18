import moment from "moment";

const Board = ({columns, rowDatas, isVisibleHeader=true}) => {

    const styleHandle = colInfo => {
        const styleData = {}
        if(colInfo.maxWidth){
            styleData.maxWidth = colInfo.maxWidth
        }
        return styleData
    }
    const dataHandle = (colInfo, data)=>{
        if(colInfo.type === 'dateTime'){
            return moment(data, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        }else{
            return data
        }
    }

    return <div id="Board">
        <table>
            <thead className={`board__header ${isVisibleHeader?'flex':'hidden'} text-gray-900 border-double`}>
                <tr>
                    {columns.map(cInfo=>
                        <th style={styleHandle(cInfo)} key={cInfo.dataIndex}>
                            {cInfo.title}
                        </th>)}
                </tr>
            </thead>
            <tbody className="board__body">
                {rowDatas.map((rData, rowNum)=>
                    <tr key={rowNum}>
                        {columns.map(cInfo2=>
                            <td style={styleHandle(cInfo2)} key={rowNum+'-'+cInfo2.dataIndex}>
                                {dataHandle(cInfo2, rData[cInfo2.dataIndex])}
                            </td>)}
                    </tr>)}
            </tbody>
        </table>
        <div className="board__pagination"></div>
    </div>;
};

export default Board;