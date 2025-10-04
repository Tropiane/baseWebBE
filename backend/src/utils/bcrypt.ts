import bcrypt from "bcrypt";

const SALT_ROUNDS =10;

const hashPassword = async (password: string): Promise<string>=>{
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt)

    return hash
}

const compareHash = async (password: string, hashedPassword: string): Promise<boolean>=>{
    return bcrypt.compare(password, hashedPassword)
}

export {
    hashPassword,
    compareHash
}