import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Cron, CronExpression } from '@nestjs/schedule';

const clientList: Set<Socket> = new Set();

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  get $server(): Server {
    return this.server;
  }

  @SubscribeMessage('clientToServer')
  async clientToServer(
    @ConnectedSocket() client: Socket,
    @MessageBody() clientData: any,
  ) {
    console.log('客户端：', clientData);

    client.send('hello hh');

    clientList.add(client);

    return {
      content: `你好${client.id}，我是sperains，很高兴为你服务！`,
    };
  }

  handleConnection(client: Socket) {
    console.log(`有人连接了：${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`有人断开了：${client.id}`);
  }

  @SubscribeMessage('connect')
  async connect(@ConnectedSocket() client: Socket) {
    console.log('connect', client.id);
  }

  @SubscribeMessage('disconnect')
  async disconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnect', client.id);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async sayHi() {
    clientList.forEach((c) => {
      console.log(c.id, c.disconnected);
    });

    this.server.emit('serverToClient', {
      count: clientList.size,
    });
  }
}
