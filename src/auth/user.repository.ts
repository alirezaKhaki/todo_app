import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { from } from "rxjs";
import { EntityRepository, Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt"
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authDto: AuthDto): Promise<any> {
        const { username, password } = authDto;

        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.salt = salt
        user.password = await this.hashPass(password, salt);

        try {
            await user.save();
            return { "msg": "user created" };
        } catch (error) {
            if (error.code == 23505) {// dubplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
    private async hashPass(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

}
