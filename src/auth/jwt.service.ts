
import { AuthGuard } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err: null, user: boolean, info?: { message: string }): any {
        // You can throw an exception based on either "info" or "err" arguments

        if (err || !user) {
            throw err || new UnauthorizedException(info?.message);
        }

        return user;
    }
}