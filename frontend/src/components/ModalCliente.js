import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const ModalCliente = ({isshow, handleClose}) => {
    //const [show, setShow] = useState(isshow);

   
    //const handleShow = () => setShow(true);

    return (
        <Modal show={isshow} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {/*<Button variant="primary" onClick={isNew ? () => handleCreate() : () => handleEdit()}>{isNew ? 'Crear' : 'Guardar Cambios'}</Button>*/}
            <Button variant="primary" >save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCliente