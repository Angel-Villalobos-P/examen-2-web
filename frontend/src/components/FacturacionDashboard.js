import React, { useContext, useState, useEffect } from "react";
import { ModalContex } from "./context";
import FacturaForm from "./FacturaForm";
import { ModalForm } from "./ModalForm";
import "./FacturacionDashboard.scss";
import clienteAxtios from "../config/axios";

const FacturacionDashboard = () => {
  const context = useContext(ModalContex);
  const [showFacturaForm, setShowFacturaForm] = useState(false);
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    clienteAxtios.get("/facturas").then((response) => {
      setFacturas(response.data.facturas);
    });
  }, []);

  //const handleShow = () => setShowModal((modal) => !modal);
  const handleAgregar = () => {
    setShowFacturaForm((showForm) => !showForm);
  };

  const TableRow = ({ data }) => {
    return (
      <tr scope="col">
        <td>{data.index + 1}</td>
        <td>{data.fecha}</td>
        <td>{data.cliente}</td>
        <td>{data.monto_total}</td>
      </tr>
    );
  };

  return (
    <div className="factura-container">
      {!showFacturaForm ? (
        <div className="card">
          <div className="card-header">
            <div className="d-flex">
              <h2 className="m-0">Facturas</h2>
              <span className="span-card"></span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAgregar}
              >
                Agregar
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="mt-3 px-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {!!facturas &&
                    facturas.map((factura, index) => {
                      return (
                        <TableRow data={{ ...factura, index }} key={index} />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {showFacturaForm ? <FacturaForm handleShow={handleAgregar} /> : null}
    </div>
  );
};

export default FacturacionDashboard;
