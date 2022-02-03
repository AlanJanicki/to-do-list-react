import { AuthenticationError } from 'apollo-server';
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
        throw new AuthenticationError('Nieprawidłowy/nieaktualny token');
      }
    }
    throw new Error('Nie odnaleziono tokenu w formacie "Bearer <token>"');
  }
  throw new Error('Nie odnaleziono nagłówka autoryzacyjnego');
};

export default verifyAuth;
