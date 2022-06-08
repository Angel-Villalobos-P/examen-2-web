import mongoose from "mongoose";

const inventarioSchema = mongoose.Schema({
  Producto: {
    type: String,
    require: true,
  },
  producto: {
    type: String,
    required: true,
  },
  cantidad: {
    type: String,
    required: true,
  },
  cantidad_minima: {
    type: String,
    required: true,
  },
  cantidad_maxima: {
    type: String,
    required: true,
  },
  gravado_excento: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Inventario", inventarioSchema);
