import { UserInterface } from "./user.dao";

export class UserValidation{
    private library = new Library
    validateData(data:UserInterface){
        this.library.getAllData(data);
        this.library.getEmail(data);
        this.library.getPassword(data);
    }
}

class Library{
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