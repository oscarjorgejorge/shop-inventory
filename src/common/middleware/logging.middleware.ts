import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    let message = `${req.method} ${req.originalUrl}`;
    
    if (req.body && Object.keys(req.body).length > 0) {
      message += `\nBody: ${JSON.stringify(req.body, null, 2)}`;
    }

    if (Object.keys(req.query).length > 0) {
      message += `\nQuery: ${JSON.stringify(req.query, null, 2)}`;
    }

    this.logger.log(message);

    next();
  }
}