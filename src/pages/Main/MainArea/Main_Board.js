import SpinByW from "src/components/SpinByW/SpinByW";
import Board from "src/components/Board/Board";
import React from "react";

export function Main_Board(props) {
    console.log('%c Main_Board Rendering', "color:pink");
    return (
        <>

            <SpinByW loading={props.loading} top_px={100}>
                <Board columns={props.columns} rowDatas={props.rowDatas} errMsg={props.errMsg}/>
            </SpinByW>
        </>
    );
};

