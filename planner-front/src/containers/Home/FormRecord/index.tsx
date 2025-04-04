import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import './style.css';
import { useEffect, useState } from "react";
import { Record } from "../../../api/record/model";
import { postRecord } from "../../../api/record";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE } from "../../../constants";
import Loading from "../../../components/Loading";

const FormRecord = () => {
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    const [formData, setFormData] = useState<Record>({
        id: undefined,
        service: '',
        customer: '',
        location: '',
        dateTime: '',
        done: false,
        canceled: false
    });
    const { state } = useLocation();

    useEffect(() => {
        if(state) {
            if(state.record) {
                let recordHistory = state.record as Record;
                setFormData(recordHistory);
            }
        }
    }, [state]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            save();
        }else {
            setValidated(true);
        };
    }

    const save = async () => {
        try {
            setLoading(true);
            await postRecord(formData);
            redirectToHome();
            setLoading(false);
        } catch (error) {
            console.log('erro ' + error);
            setLoading(false);
            setError("Não foi possível registrar, tente novamente mais tarde.")
        }
    }

    const redirectToHome = () => {
        navigate(PAGE.ROOT, {
            state: state
        });
    }

    const handleChange = (e: any, fieldName: string) => {
        const { value } = e.target;
        const formattedValue = fieldName === 'dateTime' ? adjustToUTC(value) : value;
    
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: formattedValue,
        }));
    };

    const adjustToUTC = (value: any) => {
        const adjustedDate = new Date(value + 'Z').toISOString();
        return adjustedDate.slice(0, 16);
    };

    return (
        <Container>
            {loading && <Loading loading={loading}/>}
            {error && <Alert variant="danger">{error}</Alert>}
             <Card bg="dark" text="white" className='mb-3'>
                <Card.Body className="cardBody">
                    <Card.Title>Cadastro</Card.Title>
                </Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-dark text-light p-3">
                    <Row className="mb-3">
                        <Form.Group controlId="service">
                            <Form.Label>Serviço</Form.Label>
                            <Form.Control required value={formData.service} maxLength={18} placeholder="Digite o nome do serviço" onChange={(e) => handleChange(e, 'service')}/>
                            <Form.Control.Feedback type="invalid">Obrigatório informar o serviço</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="customer">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control required value={formData.customer} maxLength={20} placeholder="Digite o nome do cliente" onChange={(e) => handleChange(e, 'customer')}/>
                            <Form.Control.Feedback type="invalid">Obrigatório informar o nome do cliente</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="location">
                            <Form.Label>Local</Form.Label>
                            <Form.Control required value={formData.location} maxLength={20} placeholder="Digite o local do serviço" onChange={(e) => handleChange(e, 'location')}/>
                            <Form.Control.Feedback type="invalid">Obrigatório informar o local do serviço</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Col xs={12} sm={4}>
                        <Row className="mb-3">
                            <Form.Group controlId="dateTime">
                                <Form.Label>Data e hora</Form.Label>
                                <Form.Control required value={formData.dateTime !== '' ? adjustToUTC(formData.dateTime) : ''} type="datetime-local" onChange={(e) => handleChange(e, 'dateTime')}/>
                                <Form.Control.Feedback type="invalid">Obrigatório informar a data e hora</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Col>
                    <div className="d-flex gap-2">
                        <Button className='mt-3 w-100' variant="light" onClick={redirectToHome}><FontAwesomeIcon icon={faArrowLeft} />{" Voltar"}</Button>
                        <Button className='mt-3 w-100' variant="light" type="submit"><FontAwesomeIcon icon={faFloppyDisk} />{" Salvar"}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default FormRecord;