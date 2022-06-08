import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  impuesto: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Producto", productoSchema);
