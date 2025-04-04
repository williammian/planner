import { Button, Card, ListGroup } from "react-bootstrap";
import { formatDate, formatTime } from "../../../../../util/date";
import { Record, RecordRequest } from "../../../../../api/record/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../../../../../constants";

import './style.css';

interface Props {
    record: Record;
    done: (record: Record) => void,
    cancel: (record: Record) => void,
    setShowConfirmation: Dispatch<SetStateAction<boolean>>,
    setFunctionConfirm: Dispatch<SetStateAction<() => void>>,
    setConfirmMessage: Dispatch<SetStateAction<string>>,
    removeRecord: (record: Record) => void,
    request: RecordRequest
}

const Register = ({ 
    record, 
    done, 
    cancel, 
    setShowConfirmation, 
    setConfirmMessage,
    setFunctionConfirm,
    removeRecord,
    request
} : Props) => {
    const navigate = useNavigate();

    const handleDone = () => {
        setConfirmMessage(`Concluir ${record.service}?`)
        setFunctionConfirm(() => doneAndRemove);
        setShowConfirmation(true);
    }

    const handleCancel = () => {
        setConfirmMessage(`Cancelar ${record.service}?`)
        setFunctionConfirm(() => cancelAndRemove);
        setShowConfirmation(true);
    }

    const handleEdit = () => {
        navigate(PAGE.RECORD, {
            state: {
                record: record,
                request: request
            }
        })
    }

    const doneAndRemove = () => {
        done(record);
        removeRecord(record);
        setShowConfirmation(false);
    }

    const cancelAndRemove = () => {
        cancel(record);
        removeRecord(record);
        setShowConfirmation(false);
    }

    const showButtons = () : boolean => {
        return !record.canceled && !record.done;
    }

    return (
        <Card bg="dark" text="white" className='mb-3'>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    <span className="title">{record.service}</span>
                    {showButtons() && 
                        <span>
                            <Button variant="outline-success" size="sm" onClick={() => handleDone()}><FontAwesomeIcon icon={faCheck} /></Button>{' '}
                            <Button variant="outline-warning" size="sm" onClick={() => handleEdit()}><FontAwesomeIcon icon={faPen} /></Button>{' '}
                            <Button variant="outline-danger" size="sm" onClick={() => handleCancel()}><FontAwesomeIcon icon={faTrash} /></Button>
                        </span>
                    }
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>Data: {formatDate(record.dateTime)}</ListGroup.Item>
                <ListGroup.Item>Hora: {formatTime(record.dateTime)}</ListGroup.Item>
                <ListGroup.Item>Local: {record.location}</ListGroup.Item>
                <ListGroup.Item>Cliente: {record.customer}</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default Register;