import { compareHash, hashPassword } from "../../utils/bcrypt";
import { userCreatedInterface } from "./user.controller";
import type { UserInterface } from "./user.dao";

import UserDao from "./user.dao";
import { UserValidation } from "./user.validation";

class UserService{
    private DAO = new UserDao();
    private Validation = new UserValidation();

    async createUser(data:UserInterface): Promise<userCreatedInterface>{
        this.Validation.validateData(data);

        const hashedPassword =await hashPassword(data.password);
        data.password = hashedPassword;
        const result = await this.DAO.createUser(data);
        return {
            user: [result.newUser as UserInterface],
            token: result.token
        }
    };

    async login(data: UserInterface){
        const user = await this.getUserByEmail(data.email);

        if (!user) {
            throw new Error("Usuario no encontrado, verifique el correo")
        }
        const userPassword = user[0].password?.toString()
        if(!userPassword){
            throw new Error("Debe ingresar su contrasena")
        }

        const verifyPassword =await compareHash(data.password, userPassword.toString());        

        return user;
    }

    async getUserById(id:string){
        const user = await this.DAO.getUserByID(id);
        return user
    }

    async getUserByEmail(email:string){
        const user = await this.DAO.getUserByEmail(email)
        return user
    }

}

export default UserService