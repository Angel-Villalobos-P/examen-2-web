import React, { useState } from "react";
import ClientesDashboard from "../components/ClientesDashboard";
import FacturacionDashboard from "../components/FacturacionDashboard";
import InventarioDashboard from "../components/InventarioDashboard";
import ProductosDashboard from "../components/ProductosDashboard";
import TipoPagoDashboard from "../components/TipoPagoDashboard";
import "./Page.scss";
import { ModalContex } from "../components/context";

const Page = () => {
  const [isCLientes, setIsClientes] = useState(false);
  const [isProductos, setIsProductos] = useState(false);
  const [isInventario, setIsInventario] = useState(false);
  const [isFacturacion, setIsFacturacion] = useState(false);
  const [isTipoPago, setIsTipoPago] = useState(false);
  const [isRender, setisRender] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal((modal) => !modal);

  const handleClickClientes = () => {
    setIsClientes(true);
    setIsProductos(false);
    setIsInventario(false);
    setIsFacturacion(false);
    setIsTipoPago(false);
    setisRender(false);
  };
  const handleClickProductos = () => {
    setIsClientes(false);
    setIsProductos(true);
    setIsInventario(false);
    setIsFacturacion(false);
    setIsTipoPago(false);
    setisRender(false);
  };
  const handleClickInventario = () => {
    setIsClientes(false);
    setIsProductos(false);
    setIsInventario(true);
    setIsFacturacion(false);
    setIsTipoPago(false);
    setisRender(false);
  };
  const handleClickFacturacion = () => {
    setIsClientes(false);
    setIsProductos(false);
    setIsInventario(false);
    setIsFacturacion(true);
    setIsTipoPago(false);
    setisRender(false);
  };
  const handleClickTipoPago = () => {
    setIsClientes(false);
    setIsProductos(false);
    setIsInventario(false);
    setIsFacturacion(false);
    setIsTipoPago(true);
    setisRender(false);
  };
  return (
    <ModalContex.Provider value={{ showModal, handleShow }}>
      <div className="page vh-100">
        <div className="container-fluid">
          <div className="row vh-100">
            <div className="navops col-2 nav d-flex flex-column  ">
              <button
                type="button"
                className="btn btn-light mb-4"
                onClick={() => handleClickClientes()}
              >
                Clientes
              </button>
              <button
                type="button"
                className="btn btn-light mb-4"
                onClick={() => handleClickProductos()}
              >
                Productos
              </button>
              <button
                type="button"
                className="btn btn-light mb-4"
                onClick={() => handleClickInventario()}
              >
                Inventario
              </button>
              <button
                type="button"
                className="btn btn-light mb-4"
                onClick={() => handleClickFacturacion()}
              >
                Facturacion
              </button>
              <button
                type="button"
                className="btn btn-light mb-4"
                onClick={() => handleClickTipoPago()}
              >
                Tipo de Pago
              </button>
            </div>
            <div className="col-10 nav d-flex flex-column">
              {isRender ? <p>HOLA</p> : null}
              {isCLientes ? <ClientesDashboard /> : null}
              {isProductos ? <ProductosDashboard /> : null}
              {isInventario ? <InventarioDashboard /> : null}
              {isFacturacion ? <FacturacionDashboard /> : null}
              {isTipoPago ? <TipoPagoDashboard /> : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContex.Provider>
  );
};

export default Page;
