import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthCredentialsDto } from '../dto/auth.dto';
import { UserRepository } from '../repository/user.repository';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    const authCredentialsDto: AuthCredentialsDto = { username: "alireza", password: "password" };
    const mockUserRepository = {
        signUp: ((data: AuthCredentialsDto) => Promise.resolve(data)),
        validateUserPassword: ((data: AuthCredentialsDto) => {
            if (data.username == 'alireza')
                return Promise.resolve(data.username);
            Promise.reject('Invalid credentials');
        })
    };

    const mockJwtService = {
        sign: (() => 'access')
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UserRepository, JwtService],
        })
            .overrideProvider(UserRepository).useValue(mockUserRepository)
            .overrideProvider(JwtService).useValue(mockJwtService)
            .compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should signUp user', async () => {
        const data = await (authService.signUp(authCredentialsDto));
        expect(data).toEqual(authCredentialsDto);
    });

    it('should sign in', async () => {
        const data = await (authService.signIn(authCredentialsDto));
        expect(data).toEqual({ accessToken: "access" });
    });

    it('should throw Invalid credentials errors on signIn', async () => {
        try {
            const diffrentUser: AuthCredentialsDto = { username: 'diffrent user', password: "password" }
            const data = await (authService.signIn(diffrentUser));
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedException);
        };
    });
});
