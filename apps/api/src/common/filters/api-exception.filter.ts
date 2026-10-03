import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApplicationError } from '../../shared/errors/application-error';
import { ERROR_KINDS } from '../../shared/errors/error-kinds';
import { ERROR_MESSAGES } from '../../shared/errors/error-messages';

export interface ApiErrorResponse {
  statusCode: number;
  code: string;
  message: string | string[];
  path: string;
  timestamp: string;
}

interface HttpRequest {
  url: string;
}

interface HttpResponse {
  status(statusCode: number): { json(body: ApiErrorResponse): void };
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<HttpRequest>();
    const response = context.getResponse<HttpResponse>();
    const { statusCode, message } = this.toHttpError(exception);

    response.status(statusCode).json({
      statusCode,
      code: this.codeFor(statusCode),
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    } satisfies ApiErrorResponse);
  }

  private toHttpError(exception: unknown): {
    statusCode: number;
    message: string | string[];
  } {
    if (exception instanceof ApplicationError) {
      return {
        statusCode: this.statusForApplicationError(exception),
        message:
          exception.kind === ERROR_KINDS.AUTHENTICATION
            ? ERROR_MESSAGES.INVALID_AUTHENTICATION
            : exception.message,
      };
    }
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      return {
        statusCode: exception.getStatus(),
        message: this.messageFromHttpException(body, exception.message),
      };
    }

    this.logger.error(
      'Unhandled exception',
      exception instanceof Error ? exception.stack : undefined,
    );
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
  }

  private messageFromHttpException(
    body: string | object,
    fallback: string,
  ): string | string[] {
    if (typeof body === 'string') return body;
    if ('message' in body) {
      const { message } = body as { message?: unknown };
      if (typeof message === 'string') return message;
      if (Array.isArray(message))
        return message.filter(
          (item): item is string => typeof item === 'string',
        );
    }
    return fallback;
  }

  private codeFor(statusCode: number): string {
    const codes: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'VALIDATION_FAILED',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.CONFLICT]: 'CONFLICT',
    };
    return codes[statusCode] ?? 'INTERNAL_ERROR';
  }

  private statusForApplicationError(error: ApplicationError): HttpStatus {
    const statuses: Record<ApplicationError['kind'], HttpStatus> = {
      [ERROR_KINDS.AUTHENTICATION]: HttpStatus.UNAUTHORIZED,
      [ERROR_KINDS.FORBIDDEN]: HttpStatus.FORBIDDEN,
      [ERROR_KINDS.NOT_FOUND]: HttpStatus.NOT_FOUND,
      [ERROR_KINDS.CONFLICT]: HttpStatus.CONFLICT,
    };
    return statuses[error.kind];
  }
}
