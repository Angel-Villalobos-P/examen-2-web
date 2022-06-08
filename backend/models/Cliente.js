import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
  cedula: {
    type: String,
    require: true,
  },
  nombre: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Cliente", clienteSchema);
