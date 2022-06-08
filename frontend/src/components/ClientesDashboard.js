import React, { useState, useContext, useEffect } from "react";
import clienteAxios from "../config/axios";
import "./ClientesDashboard.scss";
import { ModalContex } from "./context";
import { ModalForm } from "./ModalForm";

const ClientesDashboard = () => {
  const MODEL = { cedula: "", nombre: "" };

  const context = useContext(ModalContex);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState(MODEL);

  const handleEdit = (client) => {
    setCliente({ ...client });
    context.handleShow();
  };

  const handleAgregar = () => {
    setCliente(MODEL);
    context.handleShow();
  };

  const getClientes = () => {
    clienteAxios.get("/clientes").then((response) => {
      setClientes(response.data.clientes);
    });
  };

  const agregar = (cliente) => {
    clienteAxios.post("/clientes", cliente).then((response) => {
      setClientes([...clientes, response.data]);
    });
  };

  const editar = (clienteToEdit) => {
    clienteAxios
      .put(`/clientes/${clienteToEdit._id}`, clienteToEdit)
      .then((response) => {
        if (response.data) {
          getClientes();
        } else {
          console.log("ERROR edit failed");
        }
      });
  };

  const eliminar = (id) => {
    clienteAxios.delete(`/clientes/${id}`).then((response) => {
      if (response.data) {
        getClientes();
      } else {
        console.log("ERROR deleted failed");
      }
    });
  };

  useEffect(() => {
    getClientes();
  }, []);

  const TableRow = ({ data }) => {
    return (
      <tr scope="col">
        <td>{data.index + 1}</td>
        <td>{data.cedula}</td>
        <td>{data.nombre}</td>
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
    <React.Fragment>
      <div className="client-container">
        <div className="card">
          <div className="card-header">
            <div className="d-flex">
              <h2 className="m-0">Clientes</h2>
              <span className="span-card"></span>
              <ModalContex.Provider value={{ ...context }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAgregar}
                >
                  Agregar
                </button>
                <ModalForm
                  title="Cliente"
                  model={cliente}
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
                    <th scope="col">Cedula</th>
                    <th scope="col">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {!!clientes &&
                    clientes.map((cliente, index) => {
                      return (
                        <TableRow data={{ ...cliente, index }} key={index} />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientesDashboard;
