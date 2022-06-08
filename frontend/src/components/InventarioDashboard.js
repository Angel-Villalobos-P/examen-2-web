import React, { useState, useContext, useEffect } from "react";
import "./InventarioDashboard.scss";
import clienteAxios from "../config/axios";
import { ModalContex } from "./context";
import { ModalForm } from "./ModalForm";

const InventarioDashboard = () => {
  const context = useContext(ModalContex);
  const [productos, setProductos] = useState([]);
  const [inventarios, setInventarios] = useState([]);
  const MODEL = {
    producto: productos,
    cantidad: "",
    min: "",
    max: "",
    gravado: "",
  };

  const [newProducto, setNewProducto] = useState(MODEL);

  const handleEdit = (prod) => {
    setNewProducto({ ...prod, producto: productos });
    context.handleShow();
  };

  const handleAgregar = () => {
    setNewProducto(MODEL);
    context.handleShow();
  };

  const getInventarios = () => {
    clienteAxios.get("/inventarios").then((response) => {
      setInventarios(response.data.inventarios);
    });
  };

  const getProductos = () => {
    clienteAxios.get("/productos").then((response) => {
      setProductos(response.data.productos);
    });
  };

  const agregar = (_producto) => {
    const { cantidad, gravado, min, max } = _producto;
    const { producto } = _producto;
    const prod = {
      producto: producto.nombre,
      cantidad,
      gravado,
      min,
      max,
    };
    clienteAxios.post("/inventarios", prod).then((response) => {
      setInventarios([...inventarios, response.data]);
    });
  };

  const editar = (prod) => {
    clienteAxios.put(`/inventarios/${prod._id}`, prod).then((response) => {
      if (response.data) {
        getProductos();
      } else {
        console.log("ERROR edit failed");
      }
    });
  };

  const eliminar = (id) => {
    clienteAxios.delete(`/inventarios/${id}`).then((response) => {
      if (response.data) {
        getInventarios();
      } else {
        console.log("ERROR deleted failed");
      }
    });
  };

  useEffect(() => {
    getInventarios();
    getProductos();
  }, []);

  const TableRow = ({ data }) => {
    return (
      <tr scope="col">
        <td>{data.index + 1}</td>
        <td>{data.producto}</td>
        <td>{data.cantidad}</td>
        <td>{data.min}</td>
        <td>{data.max}</td>
        <td>{data.gravado}</td>
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
    <div className="inventory-container">
      <div className="card">
        <div className="card-header">
          <div className="d-flex">
            <h2 className="m-0">Inventario</h2>
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
                title="Producto"
                model={newProducto}
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
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Cantidad Maxima</th>
                  <th scope="col">Cantidad Minima</th>
                  <th scope="col">Gravado o Excepto</th>
                </tr>
              </thead>
              <tbody>
                {!!inventarios &&
                  inventarios.map((prod, index) => {
                    return <TableRow data={{ ...prod, index }} key={index} />;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventarioDashboard;
