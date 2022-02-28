import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

const JSONWT_KEY = process.env.JSONWT_KEY;

const verifyAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, JSONWT_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('', {
          errors: [
            {
              uncategorizedErrors: 'Nieprawidłowy/nieaktualny token',
            },
          ],
        });
      }
    }
    throw new AuthenticationError('', {
      errors: [
        {
          uncategorizedErrors: 'Nie odnaleziono tokenu w formacie "Bearer <token>',
        },
      ],
    });
  }
  throw new AuthenticationError('', {
    errors: [
      {
        uncategorizedErrors: 'Nie odnaleziono nagłówka autoryzacyjnego',
      },
    ],
  });
};

export default verifyAuth;
