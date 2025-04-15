import { Button, Modal } from "react-bootstrap";
import { useRecord } from "../../context/RecordProvider";

const Confirmation = () => {
    const {
      showConfirmation,
      confirmMessage,
      functionConfirm,
      defaultFunction
    } = useRecord();

    return (
      <Modal
            show={showConfirmation}
            onHide={defaultFunction}
            backdrop={true}
        >
        <Modal.Header className="bg-dark text-white border border-1 border-white">
          <Modal.Title className="text-sm">
            {confirmMessage}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex gap-2">
            <Button variant="success" className="w-50" onClick={functionConfirm}>Sim</Button>
            <Button variant="danger" className="w-50" onClick={defaultFunction}>Não</Button>
        </Modal.Body>
      </Modal>    
    )
}

export default Confirmation;