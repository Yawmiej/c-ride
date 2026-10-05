# Firebase Cloud Messaging setup

The application boots without Firebase credentials, but push delivery is disabled until both sides are configured. Never commit a service-account JSON file or its private values.

## Firebase console

1. Create or select a Firebase project and add a Web app.
2. In **Project settings > Cloud Messaging**, create a Web Push certificate and copy its public VAPID key.
3. In **Project settings > Service accounts**, generate a new private key. Keep the downloaded JSON outside this repository.

## API environment

Copy these values from the service-account JSON into `apps/api/.env`:

```dotenv
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Keep the private key on one quoted line with literal `\n` characters. The API converts those sequences back to newlines. Set all three values together; a partial configuration is rejected at startup.

## Web environment

Copy the Web app config and VAPID key into `apps/web/.env`:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_VAPID_KEY=
```

These are public browser identifiers, not Firebase Admin credentials. Web push requires HTTPS in production; localhost is accepted during development. The built app serves `/firebase-messaging-sw.js` for background notifications.

## Verify the integration

1. Apply the generated Prisma migration, then start the API and web app with the environments above.
2. Sign in as a rider in a supported browser and choose **Enable notifications**. Accept the browser permission.
3. Confirm `POST /api/v1/devices` returns `201` and a `UserDevice` row exists for that rider. Repeating registration should update the same Firebase Installation ID (FID) rather than create a duplicate.
4. Create a ride, then accept it from a signed-in active driver session. The rider should receive **Ride accepted**. Starting and completing the ride should send the corresponding messages.
5. Check once with the rider tab focused (foreground toast) and once in the background (browser notification). Clicking the notification should open the rider’s ride page.

Real FCM delivery cannot be verified without valid project credentials, a VAPID key, and browser permission. Local build/API checks validate wiring only.

`POST /devices` derives the owner from the access token. Registering the same Firebase Installation ID (FID) again is idempotent; if a different authenticated account registers that browser installation, ownership is reassigned to that account.
