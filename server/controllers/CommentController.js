import db from "../models";
import client from "../utils/redis";
import * as model from "../db/db";

import { commentSchema } from "../utils/validators";
import {
  successResponse,
  errorResponse,
  validate,
  validationErrorResponse
} from "../utils/helpers";

const { Comment, Books } = db;

class CommentsController {

  static  createComment(req, res) {
    const { id } = req.params;
    const { ...comment } = req.body;
    validate(comment, commentSchema)
      .then(async () => {
        try {
          const book = await model.getBookById(Books, id);
          if (!book) errorResponse(res, { message: "book not found" }, 404);

          const createComment = await Comment.create({ book_id: id, ...comment });

          return createComment
            ? successResponse(
                res,
                {
                  message: "comment posted successfully",
                  data: createComment
                },
                200
              )
            : successResponse(res, {success:true, message: "could not post comment" }, 408);
        } catch (error) {
          return errorResponse(res, {success:false, message: "Something went wrong."}, 500)
        }
      })
      .catch(({ details }) => {
        validationErrorResponse(res, details, 400);
      });
  }

  static getComments(req, res) {
    try {
      const { id } = req.params;

      return client.get("`comment${id}`", async (error, result) => {
        if (result) {
          return successResponse(res, { data: result }, 200);
        }
        const comments = await Comment.findAll({ where: { book_id: id } });
        if (!comments) {
          return res.json("comment not found");
        }
        client.set(`comment${id}`, JSON.stringify({ comments }));
        return successResponse(res, {success:true, data: comments }, 200);
      });
    } catch (error) {
      return errorResponse(res, {success:false, message: "Something went wrong."}, 500)
    }
  }
}

export default CommentsController;
