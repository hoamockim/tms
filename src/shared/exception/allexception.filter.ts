import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = exception.getStatus();
    const messageError =
      exception.message && exception.message.message
        ? exception.message.message
        : exception.message;
    if (!status) {
      status = 400;
    }

    response.status(status).json({
      message: messageError,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
