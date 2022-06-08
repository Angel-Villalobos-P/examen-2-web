import TipoPago from "../models/TipoPago.js";

export const createTipoPago = async (req, res, next) => {
  const tipoPago = new TipoPago({
    ...req.body,
  });
  try {
    await tipoPago.save();
    res.status(200).json(tipoPago);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateTipoPago = async (req, res, next) => {
  try {
    const tipoPago = await TipoPago.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(tipoPago);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteTipoPago = async (req, res, next) => {
  try {
    const tipoPago = await TipoPago.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(tipoPago);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getTipoPagos = async (req, res, next) => {
  try {
    const tiposPago = await TipoPago.find({});
    res.json({
      tiposPago,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
