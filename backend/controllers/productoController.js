import Producto from "../models/Producto.js";

export const createProducto = async (req, res, next) => {
  const producto = new Producto({
    ...req.body,
  });
  try {
    await producto.save();
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    res.json({
      productos,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
