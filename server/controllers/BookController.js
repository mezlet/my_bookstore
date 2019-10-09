import db from "../models";
import client from "../utils/redis";
import * as model from "../db/db";

import { postSchema,postUpdateSchema } from "../utils/validators";
import {
  successResponse,
  errorResponse,
  validate,
  validationErrorResponse
} from "../utils/helpers";

const { Books } = db;


class BooksController {

    /**
   * Create Book
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof BookController
   * @returns {undefined}
   */
  static create(req, res) {
    const { ...postData } = req.body;
    validate(postData, postSchema)
      .then(async () => {
        try {
          const books = await model.addBooks(Books, postData);
          if (books) {
            return successResponse(res, { succes: true, book: books }, 201);
          }
        } catch (error) {
          return errorResponse(res, {success:false, message: "Something went wrong."}, 500)
        }
      })
      .catch(({ details }) => {
        validationErrorResponse(res, details, 400);
      });
  }


    /**
   * Get All Books
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof BookController
   * @returns {undefined}
   */
  static async getBooks(req, res) {
    try {
      const books = await model.getBooks(Books);
      return successResponse(res, {sucess: true,data: books},200);
    } catch (error) {
      return errorResponse(res, {success:false, message: "Something went wrong."}, 500)
    }
  }

    /**
   * Update Book
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof BookController
   * @returns {undefined}
   */
  static updateBook(req, res) {
    validate(req.body, postUpdateSchema)
      .then(() => {
        try {
          const { id } = req.params;

          return model
            .editBook(Books, req.body, id)
            .then(response => {
              client.set(`book${id}`, JSON.stringify({ response }));
              return successResponse(res, {success: true, data: response}, 200);
            })
            .catch(error => {
              return errorResponse(res, { message: "Error updating book" });
            });
        } catch (error) {
          return errorResponse(res, { message: "Something went wrong." }, 500);
        }
      })
      .catch(({ details }) => {
        validationErrorResponse(res, details, 400);
      });
  }

    /**
   * GET Single Book
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof BookController
   * @returns {undefined}
   */
  static async getBook(req, res) {
    const { id } = req.params;
    try {
      return client.get(`book${id}`, (error, book) => {
        if (book) {
          return successResponse(
            res,
            {success:true, source: "cache", data: JSON.parse(book) },
            200
          );
        }
        return model
          .getBookById(Books, id)
          .then(({ dataValues }) => {
            client.set(`book${id}`, JSON.stringify({ ...dataValues }));
            return successResponse(res, {success:true, source:db, ...dataValues}, 200);
          })
          .catch(error => {
            errorResponse(res, { message: "Not Found" }, 404);
          });
      });
    } catch (error) {
      errorResponse(res, error, 500);
    }
  }

      /**
   * Delete Book
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof BookController
   * @returns {undefined}
   */
  static async deleteBook(req, res){
      try{
          const {id} = req.params;
          const book = await Books.findOne({ where:{ id } });
          if(!book){
              return errorResponse(res, {success:false, message: 'Book not found'},404);
          }
          const deleted = await book.destroy();
          if(deleted){
              await client.del('book');
              return successResponse(res, {success:true, message:'Delete was successful'}, 200)
          }
          return errorResponse(res, {success:false,message: 'Could not delete post'});
      }catch(error){
          return errorResponse(res, {success:false, message: "Something went wrong."}, 500)
      }
  }
}

export default BooksController;
