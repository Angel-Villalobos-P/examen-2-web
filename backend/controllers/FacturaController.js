import Factura from "../models/Factura.js";

export const createFactura = async (req, res, next) => {
  const factura = new Factura({
    ...req.body,
  });
  try {
    await factura.save();
    res.status(200).json(factura);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateFactura = async (req, res, next) => {
  try {
    const factura = await Factura.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(factura);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteFactura = async (req, res, next) => {
  try {
    const factura = await Factura.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(factura);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getFacturas = async (req, res, next) => {
  try {
    const facturas = await Factura.find({});
    res.json({
      facturas,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
