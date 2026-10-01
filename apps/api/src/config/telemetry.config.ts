import { registerAs } from '@nestjs/config';

export default registerAs('telemetry', () => ({
  serviceName: process.env.OTEL_SERVICE_NAME ?? 'c-ride-api',
  otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
}));
