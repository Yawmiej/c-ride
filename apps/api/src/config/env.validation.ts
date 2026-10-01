type Environment = Record<string, string | undefined>;

const requiredVariables = ['DATABASE_URL', 'JWT_SECRET', 'REDIS_URL'] as const;

export function validateEnvironment(config: Environment) {
  const missingVariables = requiredVariables.filter((key) => !config[key]);

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(', ')}`,
    );
  }

  return config;
}
