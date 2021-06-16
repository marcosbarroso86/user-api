import * as jwt from 'jsonwebtoken';

class JWTHandler {

    constructor(){}

    public createToken = () => {
        const expiresIn = 60 * 60; // an hour
        const secret = this.getSecretKey()
        const dataStoredInToken = {
          _id: Math.random,
        };
        return jwt.sign(dataStoredInToken, secret, { expiresIn })
        
    }

    public verify = async (token:string) => {
        const secret = this.getSecretKey();
        let payload:any = {}
        try {
            payload = await jwt.verify(token , secret);
        }catch {
            throw new Error();
        }
        return payload;
    }


    private getSecretKey = () => {
        return process.env.JWT_SECRET || "my_secret_key";
    }
}

export default new JWTHandler()