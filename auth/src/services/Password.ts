import * as crypto from "node:crypto";

export class Password {
    static async toHash(password: string): Promise<string>{
        const salt = crypto.randomBytes(8).toString('hex')
        const buffer = await new Promise<Buffer>((resolve, reject)=>{
            crypto.scrypt(password, salt, 64, (err, derivedKey)=>{
                if (err){
                    reject(err)
                }
                resolve(derivedKey)
            })
        })
        return `${buffer.toString("hex")}.${salt}`
    }

    static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean>{
        const [hashedPassword, salt] = storedPassword.split('.')
        const buffer = await new Promise<Buffer>((resolve, reject)=>{
            crypto.scrypt(suppliedPassword, salt, 64, (err, derivedKey)=>{
                if (err){
                    reject(err)
                }
                resolve(derivedKey)
            })
        })
        return buffer.toString('hex') === hashedPassword
    }
}