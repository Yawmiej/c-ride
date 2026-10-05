import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    app: INestApplicationContext,
    private readonly webOrigin: string,
  ) {
    super(app);
  }

  override create(
    port: number,
    options?: Parameters<IoAdapter['create']>[1],
  ): ReturnType<IoAdapter['create']> {
    return super.create(port, {
      ...options,
      cors: { origin: this.webOrigin },
    } as NonNullable<Parameters<IoAdapter['create']>[1]>);
  }
}
