import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import { connectFunctionsEmulator } from '@firebase/functions';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { loadingSpinnerInterceptor } from './shared/loading-interceptor';
import { toastInterceptor } from './shared/toast-interceptor';
import { authInterceptor } from './shared/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();

      if (environment.useEmulators)
        connectFirestoreEmulator(firestore, 'localhost', 8091);

      return firestore;
    }),
    provideAuth(() => {
      const auth = getAuth();

      if (environment.useEmulators)
        connectAuthEmulator(auth, 'http://localhost:9099');

      return auth;
    }),
    provideStorage(() => {
      const storage = getStorage();

      if (environment.useEmulators)
        connectStorageEmulator(storage, 'localhost', 9199);

      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();

      if (environment.useEmulators)
        connectFunctionsEmulator(functions, 'localhost', 5001);

      return functions;
    }),
    provideHttpClient(
      withInterceptors([
        loadingSpinnerInterceptor,
        authInterceptor,
        toastInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
