import { Dispatch, SetStateAction } from "react";
import { RecordRequest } from "../../../../../api/record/model";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
    show: boolean,
    request: RecordRequest,
    setRequest: Dispatch<SetStateAction<RecordRequest>>,
    findByFilter: (filter: RecordRequest) => void,
    setShowFilter: Dispatch<SetStateAction<boolean>>,
    cleanFields: () => void
}

const Filter = ({ 
    show, 
    request, 
    setRequest, 
    findByFilter, 
    setShowFilter,
    cleanFields 
} : Props) => {

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

    const find = () => {
        setRequest({...request, page: 0})
        findByFilter(request);
        setShowFilter(false);
    }

    return (
        <Modal
            show={show}
            onHide={() => setShowFilter(false)}
            backdrop={true}
        >
        <Modal.Header className="bg-dark text-white border border-1 border-white">
          <Modal.Title className="text-sm">
            Filtros
          </Modal.Title>
        </Modal.Header>
        
        <Form noValidate className="bg-dark rounded-bottom-3 border border-1 border-white border-top-0 text-light p-3">
          
            <Col xs={12}>
                <Form.Group controlId="initialDate">
                    <Form.Label>Data Inicial</Form.Label>
                    <Form.Control value={request.initialDate} type="date" onChange={(e) => handleChange(e, 'initialDate')}/>
                </Form.Group>
            </Col>

            <Col className="mt-2" xs={12}>
                <Form.Group controlId="finalDate">
                    <Form.Label>Data Final</Form.Label>
                    <Form.Control value={request.finalDate} type="date" onChange={(e) => handleChange(e, 'finalDate')}/>
                </Form.Group>
            </Col>

            <Col className="mt-1" xs={12}>
            <Form.Group as={Col} controlId="service">
                <Form.Label>Serviço</Form.Label>
                <Form.Control value={request.service} onChange={(e) => handleChange(e, 'service')}/>
            </Form.Group>
            </Col>

            <Col className="mt-2" xs={12}>
            <Form.Group controlId="customer">
                <Form.Label>Cliente</Form.Label>
                <Form.Control value={request.customer} onChange={(e) => handleChange(e, 'customer')}/>
            </Form.Group>
            </Col>

            <Col className="mt-2" xs={12}>
                <Form.Group controlId="location">
                    <Form.Label>Local</Form.Label>
                    <Form.Control value={request.location} onChange={(e) => handleChange(e, 'location')}/>
                </Form.Group>
            </Col>
              
            <Row className="mt-2">
                <Col>
                    <Form.Group className="mt-1" controlId="canceled">
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

                <Col>
                    <Form.Group className="mt-1" controlId="done">
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
            <div className="mt-3 d-flex gap-2">
                <Button variant="success" className="w-50" onClick={() => find()}><FontAwesomeIcon icon={faFilter} />{" Filtrar"}</Button>
                <Button variant="danger" className="w-50" onClick={() => cleanFields()}><FontAwesomeIcon icon={faBroom} />{" Limpar"}</Button>
            </div>
        </Form>
      </Modal>    
    )
}

export default Filter;