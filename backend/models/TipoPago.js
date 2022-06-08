import mongoose from "mongoose";

const tipoPagoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  valor: {
    type: String,
    required: true,
  },
});
export default mongoose.model("TipoPago", tipoPagoSchema);
