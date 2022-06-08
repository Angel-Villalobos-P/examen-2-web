import React, { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ModalContex } from "./context";

export const ModalForm = ({title, model, agregar, editar }) => {
  const context = useContext(ModalContex);
  const [data, setData] = useState(model);

  const inputs = Object.keys(model);

  const onInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const isEmpty = () => {
    const values = Object.values(model);
    let isEmpty = true;

    values.forEach((val) => {
      if (val != "") {
        isEmpty = false;
      }
    });
    return isEmpty;
  };

  const guardar = () => {
    if (isEmpty()) {
      agregar(data);
    } else {
      editar(data);
    }
    context.handleShow();
  };

  useEffect(() => {
    setData(model);
  }, [context.showModal]);

  return (
    <Modal show={context.showModal} onHide={context.handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Woohoo, you're reading this text in a modal!
        {!!inputs &&
          inputs.map((label, index) => {
            if (label != "_id" && label != "index" && label!= "__v") {
              return (
                <div
                  className="mb-3 input-group d-flex flex-column"
                  key={index}
                >
                  <label className="label">{label}</label>
                  <input
                    type="text"
                    name={label}
                    className="input-control"
                    onChange={onInputChange}
                    value={data[label]}
                  />
                </div>
              );
            }
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={context.handleShow}>
          Close
        </Button>
        <Button variant="primary" onClick={() => guardar()}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
