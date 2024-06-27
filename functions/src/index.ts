import * as functions from 'firebase-functions';
import { recipesApp } from './apps/recipes';

export const recipes = functions
  .runWith({
    timeoutSeconds: 120,
    memory: '128MB',
  })
  .https.onRequest(recipesApp);
