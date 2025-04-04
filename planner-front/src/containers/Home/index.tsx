import { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Record, RecordRequest, RecordResponse } from "../../api/record/model";
import { getRecords, postRecord } from "../../api/record";
import DesktopTable from "./Table/DesktopTable";
import MobileTable from "./Table/MobileTable";
import Loading from "../../components/Loading";
 import Confirmation from "../../components/Confirmation";
import { today } from "../../util/date";
import { useLocation } from "react-router-dom";
import { RecordProvider, useRecord } from "../../context/RecordProvider";

const Home = () => {
    const {error, setError} = useRecord();
    const [loading, setLoading] = useState(false);
    const [recordResponse, setRecordResponse] = useState<RecordResponse>();
    const [page, setPage] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmMessage, setConfirmMessage] = useState<string>("");
    const [functionConfirm, setFunctionConfirm] = useState<() => void>(() => defaultFunction);
    const defaultFilter: RecordRequest = {
        service: '',
        customer: '',
        location: '',
        initialDate: today(),
        finalDate: today(),
        done: false,
        canceled: false,
        page: page,
        size: 10    
    }
    const [request, setRequest] = useState<RecordRequest>(defaultFilter);
    const { state } = useLocation();

    useEffect(() => {
        if(state) {
            if(state.request) {
                let requestHistory = state.request as RecordRequest;
                findByFilter({...requestHistory, page});
                setRequest(requestHistory);
            }
        }else {
            findByFilter({ ...request, page});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, state])

    const findByFilter = async (filter: RecordRequest) => {
        try {
            setLoading(true);
            setRecordResponse(await getRecords(filter));
            setLoading(false);
        } catch (error) {
            console.log('erro ' + error);
            setLoading(false);
            setError("Não foi possível listar os itens, tente novamente mais tarde.")
        }
    }

    const save = async (record: Record) => {
        try {
            setLoading(true);
            await postRecord(record);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if(record.id) {
                setError(`Não foi possível atualizar o registro ${record.id}, tente novamente mais tarde.`);
            }else {
                setError(`Não foi possível registrar, tente novamente mais tarde.`);
            }
        }
    }

    const done = async (record: Record) => {
        await save({...record, done: true})
        await findByFilter(request);
    }

    const cancel = async (record : Record) => {
        await save({...record, canceled: true});
        await findByFilter(request);
    }

    function defaultFunction() {
        setShowConfirmation(false);
    }

    const cleanFields = () => {
        setRequest(defaultFilter);
    }

    return (
        <Container>
            {loading && <Loading loading={loading}/>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Confirmation title={confirmMessage} show={showConfirmation} functionConfirm={functionConfirm} functionCancel={defaultFunction}/>
            <Row className="justify-content-md-center">
                <Col xs lg="12" className="mb-3">
                    <DesktopTable 
                        recordResponse={recordResponse} 
                        page={page} 
                        setPage={setPage} 
                        done={done} 
                        cancel={cancel}
                        setShowConfirmation={setShowConfirmation} 
                        setFunctionConfirm={setFunctionConfirm}
                        setConfirmMessage={setConfirmMessage}
                        request={request}
                        setRequest={setRequest}
                        findByFilter={findByFilter}
                        cleanFields={cleanFields}
                    />
                    <MobileTable 
                        recordResponse={recordResponse} 
                        page={page} 
                        setPage={setPage} 
                        done={done} 
                        cancel={cancel}
                        setShowConfirmation={setShowConfirmation} 
                        setFunctionConfirm={setFunctionConfirm}
                        setConfirmMessage={setConfirmMessage}
                        request={request}
                        setRequest={setRequest}
                        findByFilter={findByFilter}
                        cleanFields={cleanFields}
                    />
                </Col>
            </Row>
        </Container>
    )
}

const HomeWithProvider = () => {
    return (
        <RecordProvider>
            <Home />
        </RecordProvider>
    )
}

export default HomeWithProvider;