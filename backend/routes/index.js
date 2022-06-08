import express from "express";
import { createCliente, deleteCliente, getClientes, updateCliente } from "../controllers/clienteController.js";
import { createFactura, deleteFactura, updateFactura, getFacturas } from "../controllers/FacturaController.js";
import { createInventario, deleteInventario, getInventarios, updateInventario } from "../controllers/inventarioController.js";
import { createProducto, deleteProducto, getProductos, updateProducto } from "../controllers/productoController.js";
import { createTipoPago, deleteTipoPago, getTipoPagos, updateTipoPago } from "../controllers/TipoPagoController.js";


const router = express.Router();

/**
 * Clientes CRUD
 */
router.post("/clientes", createCliente)
router.put("/clientes/:id", updateCliente);
router.delete("/clientes/:id", deleteCliente);
router.get("/clientes", getClientes);

/**
 * Producto CRUD
 */
router.post("/productos", createProducto)
router.put("/productos/:id", updateProducto);
router.delete("/productos/:id", deleteProducto);
router.get("/productos", getProductos);


/**
 * Tipo de pago CRUD
 */
router.post("/tipos-pago", createTipoPago)
router.put("/tipos-pago/:id", updateTipoPago);
router.delete("/tipos-pago/:id", deleteTipoPago);
router.get("/tipos-pago", getTipoPagos);

/**
 * Factura CRUD
 */
router.post("/facturas", createFactura)
router.put("/facturas/:id", updateFactura);
router.delete("/facturas/:id", deleteFactura);
router.get("/facturas", getFacturas);

/**
 * Inventario CRUD
 */
router.post("/inventarios", createInventario)
router.put("/inventarios/:id", updateInventario);
router.delete("/inventarios/:id", deleteInventario);
router.get("/inventarios", getInventarios);


export default router