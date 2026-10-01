import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App, cert, getApps, initializeApp } from 'firebase-admin/app';

@Injectable()
export class FirebaseService {
  private readonly app?: App;

  constructor(configService: ConfigService) {
    const projectId = configService.get<string>('firebase.projectId');
    const clientEmail = configService.get<string>('firebase.clientEmail');
    const privateKey = configService.get<string>('firebase.privateKey');

    if (projectId && clientEmail && privateKey) {
      this.app =
        getApps()[0] ??
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
    }
  }

  getApp() {
    return this.app;
  }
}
