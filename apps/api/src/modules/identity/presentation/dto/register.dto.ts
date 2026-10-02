import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  ValidateIf,
} from 'class-validator';
import {
  normalizeEmail,
  normalizePhoneNumber,
} from '../../application/commands/register-user.command';
import { UserRole } from '../../domain/enums/user-role.enum';

export class RegisterDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? normalizeEmail(value) : value,
  )
  @IsEmail()
  email!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? normalizePhoneNumber(value) : value,
  )
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message:
      'phoneNumber should include country code, for example +2348012345678',
  })
  phoneNumber?: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Matches(/[^a-zA-Z0-9\s]/, {
    message: 'password must contain a non-whitespace special character',
  })
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
