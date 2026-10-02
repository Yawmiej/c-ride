import { UserRole } from '../../domain/enums/user-role.enum';

export interface RegisterUserCommand {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: UserRole;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[\s()-]/g, '');
}

export function toRegisterUserCommand(
  input: RegisterUserCommand,
): RegisterUserCommand {
  return {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: normalizeEmail(input.email),
    ...(input.phoneNumber === undefined
      ? {}
      : { phoneNumber: normalizePhoneNumber(input.phoneNumber) }),
    password: input.password,
    role: input.role,
  };
}
