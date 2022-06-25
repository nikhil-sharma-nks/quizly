import { Response } from 'miragejs';
import { requiresAuth } from '../utils/authUtils';

export const getAllQuizHandler = function () {
  try {
    return new Response(200, {}, { quizzes: this.db.quizzes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const getQuizHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  console.log({ user });
  const { quizId } = request.params;
  console.log(quizId);
  try {
    const quiz = schema.quizzes.findBy({ id: quizId }).attrs;
    return new Response(200, {}, { quiz });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
