import { Button, Modal } from "react-bootstrap";

interface Props {
    title: string,
    show: boolean,
    functionConfirm: () => void,
    functionCancel: () => void
}

const Confirmation: React.FC<Props> = ({ title, show, functionConfirm, functionCancel }) => {
    return (
        <Modal
            show={show}
            onHide={functionCancel}
            backdrop={true}
        >
        <Modal.Header className="bg-dark text-white border border-1 border-white">
          <Modal.Title className="text-sm">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex gap-2">
            <Button variant="success" className="w-50" onClick={functionConfirm}>Sim</Button>
            <Button variant="danger" className="w-50" onClick={functionCancel}>Não</Button>
        </Modal.Body>
      </Modal>    
    )
}

export default Confirmation;