import React, { useEffect } from "react";
import {  Button,Container,Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Board } from "../../components/dto/Board";
import { useState } from "react";

const BoardRegister: React.FC = () => {
    let navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const { boardId } = useParams();

    // modal 
    const [show, setShow] = useState(false);
    const [board, setBoard] = useState({
        title: "",
        content: "",
        boardType: "GENERAL",
        createdBy: "",
        boardId: 0 
    });

    useEffect(() => {
        console.log(" id => {} ", boardId);
        getBoard(boardId);

    }, []);

    const handleClose = () => setShow(false);
    const handleConfirm = () => {
        addBoard(board);
    };
    
    

    const handleSubmit = (event: any) => {
        
        // event 중복 방지 
        event.preventDefault();
        event.stopPropagation();

        // form validate check
        const form = event.currentTarget;
        if (!form.checkValidity()) {
        setValidated(false);
        return;
        }
        setValidated(true);

        const inputBoard = {
            title: form.titleInput.value,
            content: form.contentText.value,
            boardType: "GENERAL",
            createdBy: "1",
            boardId: board.boardId
        }

        // set state
        setBoard(inputBoard);

        // show confirm 
        setShow(true);
    };

    const addBoard = async (board : Board) => {

        if (board.boardId != null && board.boardId > 0){
            editBoard(board);
            return ;
        }
        await axios.post('/api/board', board).then((res) => {            
            console.log(' succ => {}', res);
            setShow(false);
            if(res.status === 200){
                //TODO : alert, 부트스트랩 ALERT로 변경 예정 
                alert('정상적으로 등록 되었습니다. \n'+res.data);
                navigate('/board/list');
            }else{
                alert('['+res.status+'] 잘못된 응답입니다. \n'+res.data);
            }
            
            
        }).catch((err => {
            console.log(' err => {}', err);
            setShow(false);
            alert('[ERROR]' + err);
        }));        
        
    }

    const editBoard = async (board : Board) => {

        await axios.put('/api/board/'+board.boardId, board).then((res) => {            
            console.log(' succ => {}', res);
            setShow(false);
            if(res.status === 200){
                //TODO : alert, 부트스트랩 ALERT로 변경 예정 
                alert('정상적으로 수정 되었습니다. \n'+res.data);
                navigate('/board/list');
            }else{
                alert('['+res.status+'] 잘못된 응답입니다. \n'+res.data);
            }
            
            
        }).catch((err => {
            console.log(' err => {}', err);
            setShow(false);
            alert('[ERROR]' + err);
        }));        
        
    }

    const getBoard = async (id? : string) => {
        if (id === undefined || null ) return false;
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
    
      

    return(
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}  >
                <Form.Group controlId="titleInput">
                <Form.Label>제목</Form.Label>
                    <Form.Control required placeholder="" defaultValue={board.title} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">제목을 입력하세요!!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="contentText">
                    <Form.Label>내용</Form.Label>
                    <Form.Control required as="textarea" rows={20} defaultValue={board.content} />
                </Form.Group>
                { 
                    boardId !== undefined && 
                    <Button variant="primary" onClick={() => navigate(-1) }>돌아가기</Button>
                }
                <Button variant="primary" type="submit" >
                    저장
                </Button>
                
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{ boardId !== undefined ? '수정' : '등록' }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ boardId !== undefined ? '수정' : '등록' }하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BoardRegister