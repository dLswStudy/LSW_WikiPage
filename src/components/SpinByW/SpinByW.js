import {Spin} from "antd";
import styled from 'styled-components';

const SpinByW = ({loading, top_px=0, errMsg, children}) => {

    const StyledDiv = styled.div`
      .SpinByW {
        position: relative;
        min-height: ${top_px * 2}px;
      }

      .SpinByW-loading, .errMsgBox {
        position: absolute;
        left: 50%;
        top: ${top_px}px;
        transform: translate(-50%, -50%);
        /* 로딩 중 스타일 */
      }

      .SpinByW-loading + div {
        visibility: hidden;
      }
    `;

    return (
        <StyledDiv>
            <div className={`SpinByW`}>
                <div className={loading ? 'SpinByW-loading' : ''}><Spin spinning={loading}></Spin></div>
                {!errMsg && children}
                <div className="errMsgBox">{errMsg}</div>
            </div>
        </StyledDiv>
    );
};

export default SpinByW;