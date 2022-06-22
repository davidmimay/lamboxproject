# lamboxproject

lamboxproject is an Angular PWA powered by Firebase.

- [Live Demo](https://lamboxproject.web.app/)

![](./src/assets/social-preview.png)

## Features

- Angular 9.x + Firebase
- Installable PWA
- Angular Material + Theme
- OAuth Signup with Firebase
- CRUD cards with Firestore

## Usage

1.  Run

- `git clone https://github.com/davidmimay/lamboxproject.git lamboxproject`
- `cd lamboxproject`
- `npm install`

2.  Create a project at https://firebase.google.com/ and grab your web config:

![](./src/assets/firebase-config.png)

3.  Add the config to your Angular environment

#### src/environments/

Update the `environment.prod.ts` and `environment.ts` files. 

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'APIKEY',
    authDomain: 'DEV-APP.firebaseapp.com',
    databaseURL: 'https://DEV-APP.firebaseio.com',
    projectId: 'DEV-APP',
    storageBucket: 'DEV-APP.appspot.com',
    messagingSenderId: '...',
    appId: '...',
  }
};
```

5.  Run `ng serve`.

## Source

This project was made from https://fireship.io video lessons and courses. A highly recommended platform.

- [Source code](https://github.com/codediodeio/angular-firestarter)
- [Learn more](https://firestarter.fireship.io/)

## Developing
🟠 Subscribe to youtube to access unlisted videos. 
[Source 1](https://github.com/googleapis/google-api-nodejs-client#oauth2-client)
[Source 2](https://developers.google.com/youtube/v3/docs/subscriptions/list?apix_params=%7B%22part%22%3A%5B%22snippet%2CcontentDetails%22%5D%2C%22forChannelId%22%3A%22UC_x5XG1OV2P6uZZ5FSM9Ttw%22%2C%22mine%22%3Atrue%7D&apix=true)
[Github](https://github.com/S0lr4c3733/epitech-area/blob/c11dfece3cb9128b221a73202a9066bc3e7bc9ac/api/routes/youtube/channel/channel.controller.ts)
[Github2](https://github.com/hendryfoe/youtube-importer-exporter/blob/c44659cffd212683941a69ad97567b336dfbb544/pages/api/youtube/import-subscriptions.ts)
[Video](https://fireship.io/lessons/google-calendar-api-with-firebase/)

🟠 3D models: source[https://stackblitz.com/edit/angular-testing-model-viewer-jhwnn8]
🟠 Profile link render lamboxproject.web.app/{{user.uid}}