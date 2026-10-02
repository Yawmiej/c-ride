import { User, UserEntity } from '../../domain/entities/user.entity';

export function toUserResponse(user: User): UserEntity {
  return user.toSafeObject();
}
