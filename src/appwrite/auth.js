import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectid);
        this.account = new Account(this.client);
        console.log(this.account);
    }
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            if(userAccount){
                //if user account is created successfully, redirect user to login page
                return this.login({email, password});
            }
            else return userAccount;

        }catch(err){
            console.log(err);
        }
    }
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){  //this function retuns which user is logged in, suppose we directly clicked on the home page, account.get() retuns current user deatils
        try{
            const user = await this.account.get();
            if(user){
                return user;
            }
            else return null;
        }catch(err){
            throw err;
        }
    }
    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(err){
            console.log(err);
        }
    }
}
const authService = new AuthService();

export default authService;