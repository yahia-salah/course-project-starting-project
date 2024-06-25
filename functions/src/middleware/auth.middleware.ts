import * as functions from 'firebase-functions';
import { auth } from '../init';

export function getUserCredentialsMiddleware(req: any, res: any, next: any) {
  functions.logger.debug(
    `Attempting to extract user credentials from request.`
  );

  let jwt = req.headers.authorization;

  if (jwt) {
    jwt = jwt.replace('Bearer ', '');
    auth
      .verifyIdToken(jwt)
      .then((jwtPayload) => {
        req['uid'] = jwtPayload.uid;
        req['admin'] = jwtPayload.admin;

        functions.logger.debug(
          `Credentials: uid=${jwtPayload.uid}, admin=${jwtPayload.admin}`
        );

        next();
      })
      .catch((err) => {
        functions.logger.error('Error occurred while validating JWT', err);
        next();
      });
  } else {
    next();
  }
}
