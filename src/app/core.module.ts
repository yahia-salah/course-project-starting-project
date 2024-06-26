import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFunctions } from '@angular/fire/functions';
import { provideStorage } from '@angular/fire/storage';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { environment } from '../environments/environment';
import { authInterceptor } from './auth/auth-interceptor';
import { loadingSpinnerInterceptor } from './shared/loading-interceptor';
import { toastInterceptor } from './shared/toast-interceptor';

@NgModule({
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
})
export class CoreModule {}
