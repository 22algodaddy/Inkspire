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
    }
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            if(userAccount){
                //if user account is created successfully, redirect user to login page
                return this.account.login({email, password});
            }
            else return userAccount;

        }catch(err){
            console.log(err);
        }
    }
    async login({email, password}){
        try{
            const session = await this.account.createEmailSession(email, password);
            return session;
        }catch(err){
            console.log(err);
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
            console.log(err);
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