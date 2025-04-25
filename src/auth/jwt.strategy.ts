import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

type Payload = { sub: number, email: string }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private configService: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('SECRET_KEY') as string,
            ignoreExpiration: false,
        })
    }

    async validate(payload: Payload) {
        return true
    }
}