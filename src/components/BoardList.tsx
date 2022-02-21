import { assertExpressionStatement } from "@babel/types";
import React, { useEffect } from "react";
import axios from 'axios';

const BoardList: React.FC = () => {

    useEffect(() => {
        getBoardList();
    }, [] );

    const getBoardList =async () => {

        const res = await axios.get("http://localhost:8080/board/list");
        console.log(res);
    }

    return (
        <div>
            boardList
        </div>

    );
};



export default BoardList;