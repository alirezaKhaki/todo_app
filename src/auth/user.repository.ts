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
        
        await user.save();

        return { "msg": "user created" }
    }
}