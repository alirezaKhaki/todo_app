import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async signUp(authDto: AuthDto): Promise<any> {
        return this.userRepository.signUp(authDto);
    }
    async singIn(authDto:AuthDto):Promise<any>{
       const username= await this.userRepository.singIn(authDto)
       if(!username) throw new UnauthorizedException("Invalid credentials");
       
    }
}
