import mongoose from "mongoose";

const lineaDetalleSchema = mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
  },
  cantidad: {
    type: Number,
    required: true,
  },
  impuestos: {
    type: String,
    required: true,
  },
  subtotal: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});
export default mongoose.model("LineaDetalle", lineaDetalleSchema);
