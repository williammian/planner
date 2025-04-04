import { Button } from "react-bootstrap";
import { Record, RecordRequest } from "../../../../../api/record/model";
import { formatDate, formatTime } from "../../../../../util/date";
import { Dispatch, SetStateAction } from "react";
import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../../../../../constants";

interface Props {
    record: Record,
    done: (record: Record) => void
    cancel: (record: Record) => void,
    setShowConfirmation: Dispatch<SetStateAction<boolean>>,
    setConfirmMessage: Dispatch<SetStateAction<string>>,
    setFunctionConfirm: Dispatch<SetStateAction<() => void>>,
    request: RecordRequest
}

const Register = ({ 
    record, 
    done, 
    cancel,
    setShowConfirmation, 
    setFunctionConfirm, 
    setConfirmMessage,
    request
 } : Props) => {
    const navigate = useNavigate();

    const handleDone = () => {
        setConfirmMessage(`Concluir ${record.service}?`)
        setFunctionConfirm(() => doneRecord);
        setShowConfirmation(true);
    }

    const handleCancel = () => {
        setConfirmMessage(`Cancelar ${record.service}?`)
        setFunctionConfirm(() => cancelRecord);
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

    const cancelRecord = () => {
        cancel(record);
        setShowConfirmation(false);
    }

    const doneRecord = () => {
        done(record);
        setShowConfirmation(false);
    }

    const disabledButtom = () : boolean => {
        return record.canceled || record.done;
    }

    return (
        <tr>
            <td>{record.service}</td>
            <td>{formatDate(record.dateTime)}</td>
            <td>{formatTime(record.dateTime)}</td>
            <td>{record.location}</td>
            <td>{record.customer}</td>
            <td>
                <Button variant="outline-success" disabled={disabledButtom()} size="sm" onClick={() => handleDone()}><FontAwesomeIcon icon={faCheck} /> Concluir</Button>{' '}
                <Button variant="outline-warning" disabled={disabledButtom()} size="sm" onClick={() => handleEdit()}><FontAwesomeIcon icon={faPen} /> Editar</Button>{' '}
                <Button variant="outline-danger" disabled={disabledButtom()} size="sm" onClick={() => handleCancel()}><FontAwesomeIcon icon={faXmark} /> Cancelar</Button>
            </td>
        </tr>
    )
}

export default Register;