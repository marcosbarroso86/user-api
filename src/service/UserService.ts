import { Connection } from '../firebase/Connection'
import  JWTHandler from '../handlers/JWTHandler'

export class UserService {

    private firebase;

    constructor(){
        const connection = new Connection();
        this.firebase = connection.getFirebase();
    }
        
    public createUser = async (userEmail: string , password: string) => {   
        try {
            const { user } = await this.firebase.auth().createUserWithEmailAndPassword(userEmail, password)
            const userCredentials = this.buildUserCredentials(user.uid , user.email);
            return userCredentials;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
    
    public authenticateUser = async (userEmail: string , password: string) => {
        try {
            const { user } = await this.firebase.auth().signInWithEmailAndPassword(userEmail, password);
            const userCredencials =  this.buildUserCredentials(user.uid , user.email)
            return userCredencials;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
    
    private buildUserCredentials = (uid , email) => {
        const token = JWTHandler.createToken();
        const userCredentials = {
            uid , email , token
        }
        return userCredentials;
    }
}