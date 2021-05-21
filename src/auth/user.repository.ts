import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authDto: AuthDto): Promise<any> {
        const { username, password } = authDto;

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            if (error.code == 23505) {// dubplicate username
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException();
                
            }

        }

        return { "msg": "user created" }
    }
}