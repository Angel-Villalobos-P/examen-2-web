import mongoose from "mongoose";

const inventarioSchema = mongoose.Schema({
  producto: {
    type: String,
    required: true,
  },
  cantidad: {
    type: String,
    required: true,
  },
  min: {
    type: String,
    required: true,
  },
  max: {
    type: String,
    required: true,
  },
  gravado: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Inventario", inventarioSchema);
