import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Register from "./Register";
import { Record, RecordRequest, RecordResponse } from "../../../../api/record/model";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "../../../../components/TablePagination";

interface Props {
    recordResponse: RecordResponse | undefined,
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    done: (record: Record) => void,
    cancel: (record: Record) => void,
    request: RecordRequest,
    setRequest: Dispatch<SetStateAction<RecordRequest>>,
    findByFilter: (filter: RecordRequest) => void,
    cleanFields: () => void
}

const DesktopTable = ({ 
    recordResponse, 
    page, 
    setPage, 
    done, 
    cancel,
    request,
    setRequest,
    findByFilter,
    cleanFields
} : Props) => {
    const [totalPages, setTotalPages] = useState(0);
    
    const navigate = useNavigate();

    useEffect(() => {
        setTotalPages(recordResponse ? recordResponse.totalPages : 0);
        setPage(recordResponse ? recordResponse.number : 0);
    }, [recordResponse, setPage]);

    const handleChange = (e: any, fieldName: string) => {
        const { type, value } = e.target;

        if(type === 'radio') {
            handleRadio(fieldName);
        }else {
            setRequest((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        }
    };

    const handleRadio = (fieldName: string) => {
        if(fieldName === 'canceled') {
            setRequest({...request, canceled: !request.canceled, done: false});
        }else if(fieldName === 'done') {
            setRequest({...request, done: !request.done, canceled: false});
        }
    }

    const handleAdd = () => {
        navigate(PAGE.RECORD, {
            state: {
                request: request
            }
        })
    }

    return (
        <div className="d-none d-md-block">
            <Card bg="dark" text="white" className="mb-1">
                <Card.Header style={{ borderBottom: '1px solid white' }}>
                    <Form noValidate className="bg-dark text-light p-3">
                    <Row className="mb-3">
                        <Col sm={2}>
                            <Form.Group controlId="initialDate">
                                <Form.Label>Data Inicial</Form.Label>
                                <Form.Control value={request.initialDate} type="date" onChange={(e) => handleChange(e, 'initialDate')}/>
                            </Form.Group>
                        </Col>

                        <Col sm={2}>
                            <Form.Group controlId="finalDate">
                                <Form.Label>Data Final</Form.Label>
                                <Form.Control value={request.finalDate} type="date" onChange={(e) => handleChange(e, 'finalDate')}/>
                            </Form.Group>
                        </Col>

                        <Col sm={1} style={{ width: '120px' }}>
                            <Form.Group className="mt-5" controlId="canceled">
                                <Form.Check
                                    type="radio"
                                    name="state"
                                    label="Cancelado"
                                    value="canceled"
                                    aria-label="Cancelado"
                                    checked={request.canceled}
                                    onClick={(e) => handleChange(e, 'canceled')} 
                                    onChange={() => {}}
                                />
                            </Form.Group>
                        </Col>

                        <Col sm={1}>
                            <Form.Group className="mt-5" controlId="done">
                                <Form.Check
                                    type="radio"
                                    name="state"
                                    label="Concluído"
                                    value="done"
                                    aria-label="Concluído"
                                    checked={request.done}
                                    onClick={(e) => handleChange(e, 'done')} 
                                    onChange={() => {}}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group as={Col} controlId="service">
                                <Form.Label>Serviço</Form.Label>
                                <Form.Control value={request.service} onChange={(e) => handleChange(e, 'service')}/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="customer">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control value={request.customer} onChange={(e) => handleChange(e, 'customer')}/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="location">
                                <Form.Label>Local</Form.Label>
                                <Form.Control value={request.location} onChange={(e) => handleChange(e, 'location')}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    </Form>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="success" onClick={() => findByFilter(request)}><FontAwesomeIcon icon={faFilter} />{' Filtrar'}</Button>
                        <Button variant="danger" onClick={() => cleanFields()}><FontAwesomeIcon icon={faBroom} />{' Limpar'}</Button>
                    </div>
                </Card.Body>
            </Card>
            <Card bg="dark" text="white" className='mb-3'>
            <Card.Body>
                <Button variant="light" onClick={() => handleAdd()}><FontAwesomeIcon icon={faPlus} />{" Adicionar"}</Button>
            </Card.Body>
            <Table striped bordered hover variant="dark" responsive="lg" className="table-responsive">
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Local</th>
                        <th>Cliente</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recordResponse?.content.map((record, index) => (
                            <Register 
                                key={index} 
                                record={record} 
                                done={done} 
                                cancel={cancel}
                                request={request}
                            />
                        ))
                    }
                </tbody>
            </Table>
            <TablePagination totalPages={totalPages} page={page} setPage={setPage}/>
            </Card>
        </div>
    )
}

export default DesktopTable;