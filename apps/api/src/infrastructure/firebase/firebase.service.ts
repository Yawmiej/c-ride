import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  App,
  cert,
  deleteApp,
  getApps,
  initializeApp,
} from 'firebase-admin/app';

@Injectable()
export class FirebaseService implements OnApplicationShutdown {
  private readonly app?: App;

  constructor(configService: ConfigService) {
    const projectId = configService.get<string>('firebase.projectId');
    const clientEmail = configService.get<string>('firebase.clientEmail');
    const privateKey = configService.get<string>('firebase.privateKey');

    if (projectId && clientEmail && privateKey) {
      this.app =
        getApps().find((app) => app.name === 'c-ride') ??
        initializeApp(
          {
            credential: cert({
              projectId,
              clientEmail,
              privateKey,
            }),
          },
          'c-ride',
        );
    }
  }

  getApp() {
    return this.app;
  }

  async onApplicationShutdown() {
    if (this.app) await deleteApp(this.app);
  }
}
