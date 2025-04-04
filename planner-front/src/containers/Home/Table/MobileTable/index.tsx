import { Button, Table } from "react-bootstrap";
import Register from "./Register";
import { Record, RecordRequest, RecordResponse } from "../../../../api/record/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PAGE } from "../../../../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Filter from "./Filter";

import './style.css'

interface Props {
    recordResponse: RecordResponse | undefined,
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    done: (record: Record) => void,
    cancel: (record: Record) => void,
    setShowConfirmation: Dispatch<SetStateAction<boolean>>,
    setConfirmMessage: Dispatch<SetStateAction<string>>,
    setFunctionConfirm: Dispatch<SetStateAction<() => void>>,
    request: RecordRequest,
    setRequest: Dispatch<SetStateAction<RecordRequest>>,
    findByFilter: (filter: RecordRequest) => void,
    cleanFields: () => void
}

const MobileTable = ({ 
    recordResponse, 
    page, 
    setPage, 
    done, 
    cancel, 
    setShowConfirmation, 
    setConfirmMessage,
    setFunctionConfirm,
    request,
    setRequest,
    findByFilter,
    cleanFields
} : Props) => {
    const navigate = useNavigate();

    const [items, setItems] = useState<Record[]>([]);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [currentPage, setCurrentPage] = useState<number>();
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        if(recordResponse) {
            if(currentPage === undefined) {
                setCurrentPage(page);
                setItems(recordResponse.content);
            }else if (page > currentPage) {
                setCurrentPage(page);
                setItems((prevItems) => [...prevItems, ...recordResponse.content]);
            }else {
                setItems(recordResponse.content)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordResponse]);

    const getMoreItems = () => {
        setPage(page + 1);
    };

    const removeRecord = (record: Record) => {
        setItems(items.filter(item => item.id !== record.id));    
    }

    const handleAdd = () => {
        navigate(PAGE.RECORD, {
            state: {
                request: request
            }
        })
    }

    return (
        <div className="d-md-none">
            <div className="floating-button">
                <Button
                    variant="dark"
                    className="round-button"
                    onClick={() => setShowFilter(true)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                </Button>
            </div>
            <Button
                variant="dark"
                className="btn-lg fixed-bottom add-button"
                style={{ borderRadius: '0px', borderTop: '2px solid white' }}
                onClick={() => handleAdd()}
            >
                <FontAwesomeIcon icon={faPlus} />{" Adicionar"}
            </Button>

            <Filter 
                request={request} 
                setRequest={setRequest} 
                show={showFilter} 
                findByFilter={findByFilter} 
                setShowFilter={setShowFilter}
                cleanFields={cleanFields}
            />

            {isMobile && <InfiniteScroll
                dataLength={items.length}
                next={getMoreItems}
                hasMore={(page + 1) < (recordResponse?.totalPages || 0)}
                loader={<h4>Carregando...</h4>}
            >
            <Table striped bordered hover responsive="lg" className="table-responsive">
                <tbody>
                    {items.map((reg, index) => (
                        <tr key={index}>
                            <td><Register 
                                    record={reg} 
                                    done={done} 
                                    cancel={cancel}
                                    setShowConfirmation={setShowConfirmation} 
                                    setConfirmMessage={setConfirmMessage}
                                    setFunctionConfirm={setFunctionConfirm}
                                    removeRecord={removeRecord}
                                    request={request}
                                />
                            </td>
                        </tr>)
                    )}
                </tbody>
            </Table>
            </InfiniteScroll>}
        </div>
    )
}

export default MobileTable;