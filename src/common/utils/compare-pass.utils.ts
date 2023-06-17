import * as bcrypt from 'bcrypt';
export const  comparePasswords= async(password: string, hashedPassword: string): Promise<boolean> =>{
    const result = await bcrypt.compare(password, hashedPassword);
    console.log(result);
    return result;
}