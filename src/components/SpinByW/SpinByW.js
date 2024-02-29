import {Spin} from "antd";
import {useEffect, useRef, useState} from "react";

const SpinByW = ({loading, top_px = 0, errMsg, children}) => {
    const chdr = useRef(null)
    const isVisibleChdr = !(loading || errMsg)
    const [height, setHeight] = useState(top_px);

    useEffect(() => {
        console.log("chdr.current.offsetHeight = ", chdr.current.offsetHeight);
        if(chdr.current.offsetHeight !== 0)
            setHeight(chdr.current.offsetHeight / 2)
    }, [chdr.current]);

    return (
        <div className="SpinByW" style={{position: 'relative', minHeight: `${top_px * 2}px`}}>
            {
                loading &&
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: `${height}px`,
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Spin spinning={loading}></Spin>
                </div>
            }
            <div ref={chdr} className={isVisibleChdr ? 'visible' : 'invisible'}>
                {children}
            </div>
            {errMsg &&
                <div className="errMsgBox" style={{
                    position: 'absolute',
                    left: '50%',
                    top: `${top_px}px`,
                    transform: 'translate(-50%, -50%)',
                }}>
                    {errMsg}
                </div>
            }
        </div>
    );
};

export default SpinByW;