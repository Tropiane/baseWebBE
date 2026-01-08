import { UserInterface } from "./user.dao";

export class UserLibrary{

    private validation = new UserValidation;

    validateData(data:UserInterface){
        this.validation.getAllData(data);
        this.validation.getEmail(data);
        this.validation.getPassword(data);
    }

}

class UserValidation{
        getAllData(data:UserInterface){
        if(!data){
            throw new Error("Debe completar todos los campos")
        }
    }

    getEmail(data:UserInterface){
        if(!data.email || data.email.length == 0){
            throw new Error("Debe ingresar un correo electronico")
        }
    }

    getPassword(data:UserInterface){
        if(!data.password || data.password.length == 0){
            throw new Error("Debe ingresar una contrasena")
        }
    }
}