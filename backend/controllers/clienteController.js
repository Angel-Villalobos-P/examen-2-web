import Cliente from "../models/Cliente.js";

export const createCliente = async (req, res, next) => {
  const cliente = new Cliente({
    ...req.body,
  });
  try {
    await cliente.save();
    res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find({});
    res.json({
      clientes,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
