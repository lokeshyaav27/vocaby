import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseHelper } from '../helpers/api-response.helper';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Skip transformation for login route
        const request = context.switchToHttp().getRequest();
        if (request.url === '/auth/login') {
            return next.handle();
        }

        return next.handle().pipe(
            map(data => {
                return ApiResponseHelper.success(data);
            }),
        );
    }
}