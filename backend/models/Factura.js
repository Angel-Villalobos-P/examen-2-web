import mongoose from "mongoose";

const lineaDetalle = mongoose.Schema({
  nombre: {
    type: String,
  },
  cantidad: {
    type: String,
  },
  impuestos: {
    type: String,
  },
  subtotal: {
    type: String,
  },
  total: {
    type: String,
  },
});

const facturaSchema = mongoose.Schema({
  cliente: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  subtotal: {
    type: String,
    required: true,
  },
  monto_total: {
    type: String,
    required: true,
  },
  impuestos: {
    type: String,
    required: true,
  },
  detalle: [lineaDetalle],
});
export default mongoose.model("Factura", facturaSchema);
