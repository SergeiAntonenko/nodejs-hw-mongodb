import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const validateMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!isValidObjectId(id)) {
      next(createHttpError(404, 'Contact not found'));
    }

    next();
  };

export default validateMongoId;
