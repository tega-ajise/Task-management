import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { jwtConstants } from './constants';
import { JwtPayload, JwtVerificationResponse } from '@task-app/data';
import { ConfigService } from '@nestjs/config';

@Injectable()
// to protect all routes that require authentication first
// where their token gets validated
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // pull from .env
      // secretOrKey: jwtConstants.secret,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ?? 'defaultSecretKey',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtVerificationResponse> {
    // can do db lookups here to return more enriching info about user in the req.user property
    //(copilot): for example, if user is deleted in db but has a valid token, we can check that here
    //(copilot): and throw an UnauthorizedException
    // the return value gets appended to the request object
    // so can access it in controllers via req.user or using a custom decorator (@CurrentUser())
    return {
      userId: payload.sub,
      email: payload.username,
      role: payload.role,
      organization: payload.organization,
    };
  }
}
