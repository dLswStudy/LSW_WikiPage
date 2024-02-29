import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import WikiArea from "./WikiArea/WikiArea";
import {useLocation} from "react-router-dom";

const Wiki = () => {
    console.log('%c Wiki Rendering', "color:blue")
    const location = useLocation();
    const postId = location.state.index

    return (
        <div id="Wiki">
            <WikiArea postId={postId}/>
        </div>
    );
};

export default Wiki;