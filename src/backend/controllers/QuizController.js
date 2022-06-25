import { Response } from 'miragejs';
import { requiresAuth } from '../utils/authUtils';

export const getAllQuizHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
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
  }
  return new Response(
    404,
    {},
    {
      errors: ['The email you entered is not Registered. Not Found error'],
    }
  );
};

export const getQuizHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { quizId } = request.params;
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
  }
  return new Response(
    404,
    {},
    {
      errors: ['The email you entered is not Registered. Not Found error'],
    }
  );
};
