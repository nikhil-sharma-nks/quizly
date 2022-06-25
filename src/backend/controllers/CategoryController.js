import { Response } from 'miragejs';
import { requiresAuth } from '../utils/authUtils';

/**
 * All the routes related to Category are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/categories
 * */

export const getAllCategoriesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    try {
      return new Response(200, {}, { categories: this.db.categories });
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

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/user/category/:categoryId
 * */

export const getCategoryHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  console.log({ user });
  if (user) {
    const { categoryId } = request.params;
    console.log({ categoryId });
    try {
      const category = schema.categories.findBy({ id: categoryId }).attrs;
      return new Response(200, {}, { category });
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
