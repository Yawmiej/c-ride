import { BadRequestException } from '@nestjs/common';
import { createValidationPipe } from '../../../../common/validation/create-validation-pipe';
import { toRegisterUserCommand } from '../../application/commands/register-user.command';
import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';
import { UserStatus } from '../../domain/enums/user-status.enum';
import { toUserResponse } from '../mappers/user-response.mapper';
import { RegisterDto } from './register.dto';

describe('Registration input and response', () => {
  const input = {
    firstName: ' Ada ',
    lastName: ' Lovelace ',
    email: ' ADA@EXAMPLE.COM ',
    password: ' Password1! ',
    role: UserRole.RIDER,
  };
  const validate = (body: unknown): Promise<RegisterDto> =>
    createValidationPipe().transform(body, {
      type: 'body',
      metatype: RegisterDto,
    });

  it.each([UserRole.RIDER, UserRole.DRIVER])(
    'normalizes contact data and preserves the password for %s',
    async (role) => {
      const dto = await validate({
        ...input,
        role,
        phoneNumber: '+234 (801) 234-5678',
      });
      expect(toRegisterUserCommand(dto)).toEqual({
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        phoneNumber: '+2348012345678',
        password: input.password,
        role,
      });
    },
  );

  it('allows an omitted phone number and normalizes direct application input', async () => {
    const dto = await validate(input);
    expect(toRegisterUserCommand(dto).phoneNumber).toBeUndefined();
    expect(toRegisterUserCommand(input).email).toBe('ada@example.com');
  });

  it.each([
    { firstName: ' ' },
    { lastName: '' },
    { firstName: 123 },
    { email: 'invalid' },
    { phoneNumber: '08012345678' },
    { phoneNumber: null },
    { phoneNumber: '' },
    { phoneNumber: '+1234567890123456' },
    { password: 'Short1!' },
    { password: 'password1!' },
    { password: 'PASSWORD1!' },
    { password: 'Password!!' },
    { password: 'Password12' },
    { password: 'Password1 ' },
    { role: 'ADMIN' },
    { passwordHash: 'injected-hash' },
    { status: 'ACTIVE' },
  ])('rejects invalid input %j', async (changes) => {
    await expect(validate({ ...input, ...changes })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('returns validation errors without submitted credentials or nested data', async () => {
    try {
      await validate({
        ...input,
        password: 'secret-invalid-password',
        extra: { passwordHash: 'secret-nested-hash' },
      });
      throw new Error('Expected validation to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      const response = JSON.stringify(
        (error as BadRequestException).getResponse(),
      );
      expect(response).not.toContain('secret-invalid-password');
      expect(response).not.toContain('secret-nested-hash');
    }
  });

  it('serializes a safe user inside a nested response without internal props', () => {
    const user = new User({
      id: 'user-id',
      ...toRegisterUserCommand(input),
      phoneNumber: null,
      passwordHash: 'secret-hash',
      status: UserStatus.ACTIVE,
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    });
    const response = toUserResponse(user);
    expect(Object.keys(response)).toEqual([
      'id',
      'email',
      'firstName',
      'lastName',
      'phoneNumber',
      'role',
      'status',
      'createdAt',
      'updatedAt',
    ]);
    const json = JSON.stringify({ data: { user: response } });
    expect(json).not.toContain('password');
    expect(json).not.toContain('secret-hash');
    expect(json).not.toContain('props');
  });
});
