import db from '../models';
import {
  registerSchema,
} from '../utils/validators';
import {
  successResponse,
  errorResponse,
  validate,
  validationErrorResponse,
  comparePassword,
  generateToken,
  generateVerificationLink,
  verifyToken,
  generateResetLink,
  hashPassword
} from '../utils/helpers';

const { Users } = db;


/**
 * The controllers for user route
 *
 * @class UsersController
 */
class UsersController {
  /**
   * User registration controller
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {Function} next
   * @memberof UsersController
   * @returns {undefined}
   */
  static register(req, res) {
    const { body } = req;
    validate(body, registerSchema)
    .then(async () => {
        try {
          const { dataValues: user } = await Users.create({
            ...body,
            hash: body.password
          });
          const token = generateToken({ id:body.id, username: body.username });
          user.token = token;
          delete user.hash;
          return successResponse(res, {success:true,  user: user }, 201);
        } catch (err) {
          return errorResponse(res, {success:false, message: "Something went wrong."}, 500)
        }
      })
      .catch(({ details }) => {
        validationErrorResponse(res, details, 400);
      });
  }


  /**
   * User Login
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {Function} next
   * @memberof UsersController
   * @returns {undefined}
   */
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!(email && password)) {
        return errorResponse(res, 'missing Email/Password', 400);
      }
      const rows = await Users.findOne({ where: { email } });
      if (!rows) {
        return errorResponse(res, 'incorrect Email/Password', 400);
      }
      const { id, username, hash } = rows.dataValues;
      if (!comparePassword(password, hash)) {
        return errorResponse(res, 'incorrect Email/Password', 400);
      }
      const token = generateToken({ id, username });
      rows.dataValues.token = token;
      delete rows.dataValues.hash;
      successResponse(res, {success:true,  user: rows.dataValues }, 200);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
  
}

export default UsersController;
