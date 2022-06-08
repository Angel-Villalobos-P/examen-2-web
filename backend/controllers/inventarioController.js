import Inventario from "../models/Inventario.js";


export const createInventario = async (req, res, next) => {
  const inventario = new Inventario({
    ...req.body,
  });
  try {
    await inventario.save();
    res.status(200).json(inventario);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateInventario = async (req, res, next) => {
  try {
    const inventario = await Inventario.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(inventario);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteInventario = async (req, res, next) => {
  try {
    const inventario = await Inventario.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(inventario);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getInventarios = async (req, res, next) => {
  try {
    const inventarios = await Inventario.find({});
    res.json({
      inventarios,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
