import express = require('express');
import cors = require('cors');
import * as functions from 'firebase-functions';
import { Recipe } from '../models/recipe.model';
import * as _ from 'lodash';
import { /*auth,*/ db /*, storage*/ } from '../init';
import { getUserCredentialsMiddleware } from '../middleware/auth.middleware';

export const recipesApp = express();
recipesApp.use(cors({ origin: true }));
recipesApp.use(getUserCredentialsMiddleware);

recipesApp.put('/', async (req, res) => {
  functions.logger.debug(`Calling PUT recipes function.`);
  functions.logger.debug(`req.body`, req.body);

  if (!(<any>req)['uid']) {
    res.status(401).send('Unauthorized');
    return;
  }

  // Step 1: Delete all documents in the `recipes` collection
  const recipesRef = db.collection('recipes');
  const snapshot = await recipesRef.get();
  const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
  await Promise.all(deletePromises);

  // Step 2: Add new recipes to the collection
  const newRecipes = <Recipe[]>req.body; // Assuming this is an array of Recipe objects
  for (let i = 0; i < newRecipes.length; i++) {
    let docRef = await recipesRef.add(_.omit(newRecipes[i], 'id'));
    newRecipes[i].id = docRef.id;
  }

  functions.logger.debug(`All recipes replaced successfully.`);

  res.status(202).send(newRecipes);
});

recipesApp.get('/', async (req, res) => {
  functions.logger.debug(`Calling GET recipes function.`);

  if (!(<any>req)['uid']) {
    res.status(401).send('Unauthorized');
    return;
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  var recipesRef = await db.collection('recipes').get();
  var recipes = recipesRef.docs.map((doc) => {
    return <Recipe>{
      id: doc.id,
      ...doc.data(),
    };
  });

  res.status(200).send(recipes);
});

recipesApp.delete('/:id', async (req, res) => {
  functions.logger.debug(`Calling DELETE recipes function.`);
  functions.logger.debug(`Deleting document with ID: ${req.params.id}`);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await db.collection('recipes').doc(req.params.id).delete();

  res.status(204).send();
});
