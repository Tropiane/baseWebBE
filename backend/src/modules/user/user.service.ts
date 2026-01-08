import { compareHash, hashPassword } from "../../utils/bcrypt";
import { userCreatedInterface } from "./user.controller";
import type { UserInterface } from "./user.dao";

import UserDao from "./user.dao";
import { UserLibrary } from "./user.library";

class UserService{
    private DAO = new UserDao();
    private Validation = new UserLibrary();

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
        
        if(!data.password){
            throw new Error("Debe ingresar su contrasena")
        }
        const userPassword = user.password;
        if(!userPassword){
            throw new Error("Contrasena incorrecta")
        }
        const verifyPassword =await compareHash(data.password, userPassword.toString());        

        if(!verifyPassword){
            throw new Error("Contrasena incorrecta")
        }
        return user;
    }

    async setRefreshToken(id: string, token: string){
        await this.DAO.setRefreshToken(id, token);
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