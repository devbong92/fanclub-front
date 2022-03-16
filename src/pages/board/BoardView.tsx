import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Board } from "../../components/dto/Board";
import '../../styles/scss/BoardView.scss';

function BoardView() {
    const { boardId } = useParams();
    let navigate = useNavigate();
    const [delShow,setDelShow] = useState(false);

    const handleClose = () => setDelShow(false);
    const handleShow = () => setDelShow(true);
    const handleConfirm = () => {
        delBoard(boardId);
    };
    

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

    const delBoard = async (id?: string) => {
        await axios.delete('/api/board/'+ id).then((res) => {            
            console.log(' succ => {}', res);
            setDelShow(false);
            if(res.status === 200){
                //TODO : alert, 부트스트랩 ALERT로 변경 예정 
                alert('정상적으로 삭제 되었습니다. \n'+res.data);
                navigate('/board/list');
            }else{
                alert('['+res.status+'] 잘못된 응답입니다. \n'+res.data);
            }
            
            
        }).catch((err => {
            console.log(' err => {}', err);
            setDelShow(false);
            alert('[ERROR]' + err);
        }));        
    }

    return (
        <>
            <div className="d-flex justify-content-end">
                <Button variant="info" onClick={() => navigate(`/board/edit/${boardId}`)}>수정</Button>
                <Button variant="danger" onClick={handleShow} >삭제</Button>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <h5>작성자 : {board?.createdBy}</h5>
                <h5>작성일자 : {moment(board?.createdAt).format('YYYY-MM-DD (HH:mm:ss)')}</h5>
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

            <Modal show={delShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>

            {/* <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> */}

        </>
    );
}

export default BoardView;