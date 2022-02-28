import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Board } from "../../components/dto/Board";
import { Button, Col, Row } from "react-bootstrap";
import '../../styles/scss/BoardList.scss';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import 'moment/locale/ko';


const BoardList: React.FC = (props : any) => {
    const [boardList, setBoardList] = useState<Array<Board>>([]);
    let navigate = useNavigate();

    useEffect(() => {
        getBoardList();
    }, [] );

    const getBoardList = async () => {

        /**
         * package.json 파일에 proxy 설정을 추가하여 CORS 설정을 하면, 도메인 없이 호출 가능. 
         * const res = await axios.get("http://localhost:8080/api/board/list"); 에서
         * const res = await axios.get("/api/board/list"); 으로 변경 
         */
        const res = await axios.get("/api/board/list");
        console.log(res);
        setBoardList(res.data);
    }

    return (
        <>
          <Row className="mb-3 justify-content-end">
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate('/board/add')}>등 록</Button>
            </Col>
          </Row>
          {
            boardList.map((board: Board) =>
              <Row className="py-2 board" key={board.boardId} onClick={() => navigate(`/board/${board.boardId}`)}>
                <Col xs={8}>{board.title}</Col>
                <Col xs={2} className="text-right">{board.boardType}</Col>
                <Col xs={2} className="text-right">{moment(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Col>
              </Row>)
          }
        </>
      );
    
};



export default BoardList;