import mongoose from "mongoose";

const facturaSchema = mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
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
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
  ],
});
export default mongoose.model("Factura", facturaSchema);
