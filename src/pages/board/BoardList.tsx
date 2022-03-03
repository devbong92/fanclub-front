import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Board } from "../../components/dto/Board";
import { Badge, Button, Col, Pagination, Row } from "react-bootstrap";
import '../../styles/scss/BoardList.scss';
import { useNavigate } from "react-router-dom";
import moment, { now } from "moment";
import 'moment/locale/ko';


const BoardList: React.FC = (props : any) => {
    const [boardList, setBoardList] = useState<Array<Board>>([]);
    const [calcPage, setCalcPage] = useState(1);
    const [pages, setPages] = useState<Array<any>>([]);
    const [totalElements,setTotalElements] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        getBoardList(1);
    }, [] );

    const getBoardList = async (searchPage:number) => {

        /**
         * package.json 파일에 proxy 설정을 추가하여 CORS 설정을 하면, 도메인 없이 호출 가능. 
         * const res = await axios.get("http://localhost:8080/api/board/list"); 에서
         * const res = await axios.get("/api/board/list"); 으로 변경 
         */
        
        // JPA 에서 제공하는 pagenable의 page처리가 0부터 시작하기 때문에 -1 진행 
        let params = "page=" + ( searchPage > 0 ? searchPage -1 : 0); 
        await axios.get("/api/board/list?"+params).then((res) =>{

        setBoardList(res.data.content);        
        /**
         * pagination
         */
        let pageItems = new Array<any>();
        let pageNumber = res.data.pageable.pageNumber ;
        let totalPage = res.data.totalPages;
        let startPage = pageNumber+1 > 2 ? pageNumber-1 : 1 ;
        let lastPage = startPage + 4 > totalPage ? totalPage : startPage + 4 ;
        

        console.log("lastPage : "+lastPage);
        console.log("totalPage : "+totalPage);
        if(lastPage - startPage < 4){
          console.log("?");
          startPage = lastPage -4 ;
        } 
        setTotalElements(res.data.totalElements);
        setCalcPage(res.data.number * res.data.size);


        console.log(" data => {} ",res.data);
        if(res.data.last){
          pageItems.push(
            <Pagination.First key={0} onClick={() => getBoardList(0)} />
          );
        }


        console.log("pageNumber : {}  >> {}",pageNumber, pageNumber-2 );
        console.log(" startPage => {}",startPage);
        console.log(" ??? {} ",pageNumber+1 > 2 ? pageNumber-1 : 1);

        for (let number = startPage ; number <= lastPage; number++) {
          
          pageItems.push(
            <Pagination.Item onClick={() => getBoardList(number)} key={number} active={number === pageNumber+1}>
              {number}
            </Pagination.Item>,
          );
        }
        if(res.data.first){
          pageItems.push(
            <Pagination.Last key={totalPage+1} onClick={() => getBoardList(totalPage)}/>
          );
        }
        setPages(pageItems);

        }).catch((err => {
          console.log(' err => {}', err);
          alert('[ERROR]' + err);
      }));   
        

    }

    return (
        <>
          <Row className="mb-3 justify-content-end">
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate('/board/add')}>등 록</Button>
            </Col>
          </Row>
          {
            boardList.map((board: Board, index) =>
              <Row className="py-2 board" key={board.boardId} onClick={() => navigate(`/board/${board.boardId}`)}>
                <Col xs={1} >{totalElements - (calcPage + index)}</Col>
                <Col xs={7}>{ moment(board.createdAt) > moment().subtract(1,'days') && <Badge >new</Badge> } {board.title}</Col>
                <Col xs={2} className="text-right">{board.boardType}</Col>
                <Col xs={2} className="text-right">{moment(board.createdAt).format('YYYY-MM-DD')}</Col>
                
              </Row>)
          }

          <Pagination>{pages}</Pagination>

        </>
      );
    
};



export default BoardList;