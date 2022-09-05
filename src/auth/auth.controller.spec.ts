
import { Test, TestingModule } from '@nestjs/testing';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.dto';
import { User } from './user.entity';

describe('AuthController', () => {
    let authController: AuthController;
    // let authService: AuthService;
    const authDto: AuthCredentialsDto = { username: 'alireza.mkhaki', password: '0123456' };
    const user = { username: "alireza.mkhaki", password: "password", salt: 'salt', tasks: [] } as unknown as User
    const mockAuthService = {
        signUp: (x: AuthCredentialsDto) => x,
        signIn: (y: AuthCredentialsDto) => 'access token'
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        }).overrideProvider(AuthService).useValue(mockAuthService).compile();

        authController = module.get<AuthController>(AuthController);
    });


    it('should be defined', () => {
        expect(authController).toBeDefined()
    });

    it('should creat user', () => {
        expect(authController.signUp(authDto)).toEqual(authDto);
    });

    it('should return access token', () => {
        expect(authController.signIn(authDto)).toContain('access');
    });

    it('should return user', () => {
        expect(authController.test(user)).toEqual(user);
    });
});