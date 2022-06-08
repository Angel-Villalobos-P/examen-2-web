import React, { useEffect, useState, useContext } from "react";
import clienteAxios from "../config/axios";
import DropDown from "./DropDown";
import { ModalContex } from "./context";
import { ModalForm } from "./ModalForm";

const FacturaForm = ({ handleShow }) => {
  const context = useContext(ModalContex);
  const [date, setDate] = useState();
  const [clientes, setClientes] = useState([]);
  const [clienteSelected, setClienteSelected] = useState({});
  const [totales, setTotales] = useState({});

  const [productos, setProductos] = useState([]);
  const [lineaDetalle, setLineaDetalle] = useState({});
  const [lineasDetalle, setLineasDetalle] = useState([]);

  const agregar = () => {
    const facturaNueva = crearFactura();
    clienteAxios.post("/facturas", facturaNueva).then((response) => {
      console.log(response.data);
      handleShow();
    });
  };

  const crearFactura = () => {
    if (Object.keys(clienteSelected).length === 0) {
      alert("Debe selccionar un cliente");
      return;
    }
    const factura = {
      cliente: clienteSelected.nombre,
      fecha: date,
      subtotal: totales.subtotal,
      monto_total: totales.total,
      impuestos: totales.impuestos,
      detalle: lineasDetalle,
    };

    return factura;
  };

  const crearLinea = (linea) => {
    const { cantidad } = linea;
    const { producto } = linea;
    const subtotal = parseInt(producto.precio) * cantidad;
    const iva = parseInt(producto.impuesto) / 100;
    const impuesto = subtotal * iva;
    const total = subtotal + impuesto;
    return {
      nombre: producto.nombre,
      cantidad,
      impuesto,
      subtotal,
      total,
    };
  };

  const agregarlinea = (linea) => {
    const lineaDetalle = crearLinea(linea);
    setLineasDetalle([...lineasDetalle, lineaDetalle]);
  };

  const MODEL = {
    producto: productos,
    cantidad: "",
  };

  const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const handleAgregar = () => {
    setLineaDetalle(MODEL);
    context.handleShow();
  };

  const getClientes = () => {
    clienteAxios.get("/clientes").then((response) => {
      setClientes(response.data.clientes);
    });
  };
  const getProductos = () => {
    clienteAxios.get("/productos").then((response) => {
      setProductos(response.data.productos);
    });
  };
  const testData = [
    { cedula: "1234", nombre: "cliente 1" },
    { cedula: "5678", nombre: "cliente 2" },
  ];

  useEffect(() => {
    setDate(getCurrentDate());
    getClientes();
    getProductos();
  }, []);

  useEffect(() => {
    let impuestos = 0;
    let subtotal = 0;
    let total = 0;

    lineasDetalle.forEach((detalle) => {
      impuestos += detalle.impuesto;
      subtotal += detalle.subtotal;
      total += detalle.total;
    });

    setTotales({
      impuestos,
      subtotal,
      total,
    });
  }, [lineasDetalle]);

  const TableRow = ({ data }) => {
    return (
      <tr scope="col">
        <td>{data.index + 1}</td>
        <td>{data.nombre}</td>
        <td>{data.cantidad}</td>
        <td>{data.impuesto}</td>
        <td>{data.subtotal}</td>
        <td>{data.total}</td>
      </tr>
    );
  };

  return (
    <div className=".factura-form">
      <div className="row">
        <div className="col-12 d-flex">
          <button className="btn btn-volver btn-secondary" onClick={handleShow}>
            Volver
          </button>
          <h1>Nueva factura</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-9">
          <div className="form">
            <div className="form-group mb-3 d-flex flex-column align-items-start">
              <label>Fecha: {date}</label>
            </div>
            <div className="form-group mb-3 d-flex flex-column align-items-start">
              <label htmlFor="cantidad">Cliente</label>
              <DropDown
                items={clientes}
                handleSelect={setClienteSelected}
                itemSelected={clienteSelected}
                title="Clientes"
              />
            </div>
          </div>
        </div>
        <div className="col-3">
          <p>Impuestos: {totales.impuestos}</p>
          <p>Subtotal: {totales.subtotal}</p>
          <p>Total: {totales.total}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card-body">
            <div className="mt-3 px-3">
              <ModalContex.Provider value={{ ...context }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">N°</th>
                      <th scope="col">Producto</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Impuesto</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Total</th>
                      <th scope="col">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={handleAgregar}
                        >
                          Agregar
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!lineasDetalle &&
                      lineasDetalle.map((lineaDetalle, index) => {
                        return (
                          <TableRow
                            data={{ ...lineaDetalle, index }}
                            key={index}
                          />
                        );
                      })}
                  </tbody>
                </table>
                <ModalForm
                  title="Nueva línea"
                  model={lineaDetalle}
                  agregar={agregarlinea}
                />
              </ModalContex.Provider>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button className="btn btn-primary" onClick={() => agregar()}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacturaForm;
