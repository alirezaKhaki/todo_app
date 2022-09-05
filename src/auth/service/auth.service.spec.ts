import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { AuthCredentialsDto } from '../dto/auth.dto';
import { UserRepository } from '../repository/user.repository';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    const authCredentialsDto: AuthCredentialsDto = { username: "alireza", password: "password" };

    const mockUserRepository = {
        signUp: jest.fn((data: AuthCredentialsDto) => Promise.resolve(data)),
        validateUserPassword: jest.fn((data: AuthCredentialsDto) => {
            if (data.username == 'alireza')
                return Promise.resolve(data.username);
            throw new UnauthorizedException('Invalid credentials');
        })
    };

    const mockJwtService = {
        sign: jest.fn(() => 'access')
    };

    beforeEach(async () => {
        try {
            const module: TestingModule = await Test.createTestingModule({
                providers: [AuthService, UserRepository, JwtService],
            })
                .overrideProvider(UserRepository).useValue(mockUserRepository)
                .overrideProvider(JwtService).useValue(mockJwtService)
                .compile();

            authService = module.get<AuthService>(AuthService);
        } catch (error) {

        };
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(mockUserRepository).toBeDefined();
    });

    it('should signUp user', async () => {
        try {
            const data = await (authService.signUp(authCredentialsDto));

            expect(data).toEqual(authCredentialsDto);

            expect(mockUserRepository.signUp).toHaveBeenCalled();
            expect(mockUserRepository.signUp).toHaveBeenCalledWith(authCredentialsDto);
        } catch (error) {
            console.error(error);
        };
    });

    it('should sign in', async () => {
        try {
            const data = await (authService.signIn(authCredentialsDto));

            expect(data).toEqual({ accessToken: "access" });

            expect(mockUserRepository.validateUserPassword).toHaveBeenCalled();
            expect(mockUserRepository.validateUserPassword).toHaveBeenCalledWith(authCredentialsDto);
        } catch (error) {
            console.log(error);
        }
    });

    it('should throw Invalid credentials errors on signIn', async () => {
        try {
            const diffrentUser: AuthCredentialsDto = { username: 'diffrent user', password: "password" }
            const data = await (authService.signIn(diffrentUser));

            expect(mockUserRepository.validateUserPassword).toHaveBeenCalled();
            expect(mockUserRepository.validateUserPassword).toHaveBeenCalledWith(diffrentUser);
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedException);
        };
    });
});
