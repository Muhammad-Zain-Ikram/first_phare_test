import { Client, ID, Account } from "appwrite";
import conf from "../variables/conf";
class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {

        await this.account.createEmailPasswordSession(email, password);
        return await this.account.get();
      }
      else return user;
    } catch (error) {
      console.log("Error :: Creation Account", error);
    }
  }

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error found :: Login", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();      
      return user
    } catch (error) {
      return null
      }
  }

  
}


const authService = new AuthServices();

export default authService;
