import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function colorMethod(method: string) {
  switch (method) {
    case 'GET':
      return C.cyan;
    case 'POST':
      return C.green;
    case 'PUT':
      return C.yellow;
    case 'PATCH':
      return C.magenta;
    case 'DELETE':
      return C.red;
    case 'OPTIONS':
      return C.blue;
    default:
      return C.gray;
  }
}
function colorStatus(status: number) {
  if (status >= 500) return C.red;
  if (status >= 400) return C.yellow;
  if (status >= 300) return C.cyan;
  return C.green;
}
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const { method, originalUrl, ip } = req;
      const status = res.statusCode;
      const length = res.get('content-length') || '-';

      const ms = Number(process.hrtime.bigint() - start) / 1_000_000;

      const methodStr = `${colorMethod(method)}${C.bold}${method}${C.reset}`;
      const statusStr = `${colorStatus(status)}${status}${C.reset}`;
      const timeStr = `${C.gray}${ms.toFixed(1)} ms${C.reset}`;
      const lenStr = `${C.gray}${length}b${C.reset}`;

      const now = new Date();
      const stamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

      console.log(
        `${methodStr} ${originalUrl} -> ${statusStr} ${timeStr} ${lenStr}` +
          `${C.gray} [${stamp}] IP: ${ip}${C.reset}`,
      );
    });
    next();
  }
}
