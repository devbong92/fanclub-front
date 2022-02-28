import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Board } from "../../components/dto/Board";
import '../../styles/scss/BoardView.scss';

function BoardView() {
    const { boardId } = useParams();
    let navigate = useNavigate();

    const [board, setBoard] = useState<Board>({
        title: "",
        content: "",
        boardType: "GENERAL",
        createdBy: ""
    });

    useEffect(() => {
        console.log(" id => {} ", boardId);
        getBoard(boardId);

    }, []);

    const getBoard = async (id? : string) => {
        await axios.get('/api/board/'+id).then((res) => {            
            console.log(' succ => {}', res);
            if(res.status === 200){
                console.log(' data => {}',res.data);
                setBoard(res.data);
            }else{
                alert('['+res.status+'] 잘못된 응답입니다. \n'+res.data);
            }
        }).catch((err => {
            console.log(' err => {}', err);
            alert('[ERROR]' + err);
        }));        

    }


    return (
        <>
            <div className="d-flex justify-content-between mt-3">
                <h5>{board?.createdBy}</h5>
                <h5>{moment(board?.createdAt).format('YYYY-MM-DD')}</h5>
            </div>
            <Card className="p-3 my-3">
                <Card.Title className="pb-2" style={{borderBottom: '1px solid #dddddd'}}>{board?.title}</Card.Title>
                <Card.Text>
                {board?.content}
                </Card.Text>
            </Card>
            
            <Row className="justify-content-center mt-3">
                <Button variant="primary" onClick={() => navigate(-1) }>돌아가기</Button>
            </Row>
            {/* <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> */}

        </>
    );
}

export default BoardView;