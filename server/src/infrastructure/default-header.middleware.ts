import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DefaultHeaderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Max-Age', String(24 * 60 * 60 * 1000));
        next();
    }
}