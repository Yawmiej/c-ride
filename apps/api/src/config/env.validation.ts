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

  const firebaseVariables = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
  ] as const;
  const configuredFirebaseVariables = firebaseVariables.filter(
    (key) => config[key],
  );
  if (
    configuredFirebaseVariables.length > 0 &&
    configuredFirebaseVariables.length < firebaseVariables.length
  ) {
    throw new Error(
      ERROR_MESSAGES.MISSING_ENVIRONMENT_VARIABLES(
        firebaseVariables.filter((key) => !config[key]),
      ),
    );
  }

  return config;
}
