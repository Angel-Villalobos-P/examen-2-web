import React, { useState, useContext, useEffect } from "react";
import clienteAxios from "../config/axios";
import { ModalContex } from "./context";
import "./ProductosDashboard.scss";
import { ModalForm } from "./ModalForm";

const ProductosDashboard = () => {
  const MODEL = { nombre: "", impuesto: "", precio:"" };

  const context = useContext(ModalContex);
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState(MODEL);

  const handleEdit = (prod) => {
    setProducto({ ...prod });
    context.handleShow();
  };

  const handleAgregar = () => {
    setProducto(MODEL);
    context.handleShow();
  };

  const getProductos = () => {
    clienteAxios.get("/productos").then((response) => {
      setProductos(response.data.productos);
    });
  };

  const agregar = (producto) => {
    clienteAxios.post("/productos", producto).then((response) => {
      setProductos([...productos, response.data]);
    });
  };

  const editar = (productoToEdit) => {
    clienteAxios
      .put(`/productos/${productoToEdit._id}`, productoToEdit)
      .then((response) => {
        if (response.data) {
          getProductos();
        } else {
          console.log("ERROR edit failed");
        }
      });
  };

  const eliminar = (id) => {
    clienteAxios.delete(`/productos/${id}`).then((response) => {
      if (response.data) {
        getProductos();
      } else {
        console.log("ERROR deleted failed");
      }
    });
  };

  useEffect(() => {
    getProductos();
  }, []);

  const TableRow = ({ data }) => {
    return (
      <tr scope="col">
        <td>{data.index + 1}</td>
        <td>{data.nombre}</td>
        <td>{data.impuesto}</td>
        <td>{data.precio}</td>
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
    <div className="product-container">
      <div className="card">
        <div className="card-header">
          <div className="d-flex">
            <h2 className="m-0">Productos</h2>
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
                model={producto}
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
                  <th scope="col">Nombre</th>
                  <th scope="col">Impuesto</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>
                {!!productos &&
                  productos.map((producto, index) => {
                    return (
                      <TableRow data={{ ...producto, index }} key={index} />
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

export default ProductosDashboard;
