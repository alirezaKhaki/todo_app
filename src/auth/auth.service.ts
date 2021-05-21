import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService:JwtService,
    ) { }

    async signUp(authDto: AuthDto): Promise<any> {
        return this.userRepository.signUp(authDto);
    }
    async singIn(authDto:AuthDto):Promise<{token:string}>{
       const username= await this.userRepository.singIn(authDto)
       if(!username) throw new UnauthorizedException("Invalid credentials");
       const payload: JwtPayload= {username};
       const token = this.jwtService.sign(payload);

       return {token};
    }
}
