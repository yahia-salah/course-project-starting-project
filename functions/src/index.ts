import * as functions from 'firebase-functions';
import { recipesApp } from './apps/recipes';

export const recipes = functions.https.onRequest(recipesApp);
