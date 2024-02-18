import {Spin} from "antd";

const SpinByW = (props) => {
    const {loading} = props
    return (
        <div className={loading ? 'SpinByW-loading' : ''}><Spin spinning={loading}></Spin></div>
    );
};

export default SpinByW;