import { ERROR_MESSAGES } from '@/shared/errors/error-messages';

type Environment = Record<string, string | undefined>;

const requiredVariables = ['DATABASE_URL', 'JWT_SECRET', 'REDIS_URL'] as const;

export function validateEnvironment(config: Environment) {
  const missingVariables = requiredVariables.filter((key) => !config[key]);

  if (missingVariables.length > 0) {
    throw new Error(
      ERROR_MESSAGES.MISSING_ENVIRONMENT_VARIABLES(missingVariables),
    );
  }

  return config;
}
