import { IncomingMessage } from 'node:http';
import { AuthenticatedUser } from '../../application/types/authenticated-user';

export interface AuthenticatedRequest extends IncomingMessage {
  user?: AuthenticatedUser;
}
