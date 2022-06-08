import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { ModalContex } from "./context";
import { ModalForm } from "./ModalForm";
import "./TipoPagoDashboard.scss";

const TipoPagoDashboard = () => {
  const MODEL = {
    nombre: "",
    valor: "",
  };
  const context = useContext(ModalContex);
  const [tiposPago, setTiposPago] = useState([]);
  const [tipoPago, setTipoPago] = useState(MODEL);

  const handleEdit = (tipoPago) => {
    setTipoPago({ ...tipoPago });
    context.handleShow();
  };

  const handleAgregar = () => {
    setTipoPago(MODEL);
    context.handleShow();
  };

  const getTipoPagos = () => {
    clienteAxios.get("/tipos-pago").then((response) => {
      setTiposPago(response.data.tiposPago);
    });
  };

  const agregar = (tipoPago) => {
    clienteAxios.post("/tipos-pago", tipoPago).then((response) => {
      setTiposPago([...tiposPago, response.data]);
    });
  };

  const editar = (tipoPagoToEdit) => {
    clienteAxios
      .put(`/tipos-pago/${tipoPagoToEdit._id}`, tipoPagoToEdit)
      .then((response) => {
        if (response.data) {
          getTipoPagos();
        } else {
          console.log("ERROR edit failed");
        }
      });
  };

  const eliminar = (id) => {
    clienteAxios.delete(`/tipos-pago/${id}`).then((response) => {
      if (response.data) {
        getTipoPagos();
      } else {
        console.log("ERROR deleted failed");
      }
    });
  };

  useEffect(() => {
    getTipoPagos();
  }, []);

  const TableRow = ({ data }) => {
    return (
      <tr scope="col">
        <td>{data.index + 1}</td>
        <td>{data.nombre}</td>
        <td>{data.valor}</td>
        <td>
          <button
            type="button"
            className="btn btn-secondary btn-sm mx-2"
            onClick={() => handleEdit(data)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => eliminar(data._id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="tipopago-container">
      <div className="card">
        <div className="card-header">
          <div className="d-flex">
            <h2 className="m-0">Tipo de Pago</h2>
            <span className="span-card"></span>
            <ModalContex.Provider value={context}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAgregar}
              >
                Agregar
              </button>
              <ModalForm
                title="Tipo de Pago"
                model={tipoPago}
                agregar={agregar}
                editar={editar}
              />
            </ModalContex.Provider>
          </div>
        </div>
        <div className="card-body">
          <div className="mt-3 px-3">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Identificador</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {!!tiposPago &&
                  tiposPago.map((tipoPago, index) => {
                    return (
                      <TableRow data={{ ...tipoPago, index }} key={index} />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipoPagoDashboard;
