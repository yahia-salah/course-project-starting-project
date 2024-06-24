// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: 'AIzaSyCBCMNk6M0RlLX9Ew-LsXJbXQIrpKRtojg',
    authDomain: 'course-project-starting.firebaseapp.com',
    projectId: 'course-project-starting',
    storageBucket: 'course-project-starting.appspot.com',
    messagingSenderId: '694916823968',
    appId: '1:694916823968:web:554346da1649c8155602c5',
  },
  api: {
    baseUrl: 'http://localhost:5001/course-project-starting/us-central1',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
