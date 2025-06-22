import { Client, ID, Databases, Query } from "appwrite";
import conf from "../variables/conf";

class Services {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async addData({ gender, user_class, responses, user_id, phone, institute,time }) {
    try {
      const avai = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          user_class,
          responses,
          user_id,
          gender,
          phone,
          time,
          institute
        }
      );
    } catch (error) {
      console.error("Error in :: Database", error);
    }
  }

  async getData(queries = []) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw error
    }
  }

  async updateData(user_id, responses, time) {
    try {
      if (this.getData) {
        const query = await this.getData([Query.equal("user_id", user_id)]);
  
        if (query.documents.length > 0) {
          const documentId = query.documents[0].$id;
  
          await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            documentId,
            { responses, time }
          );
  
          return true
        }
        return false
      }
    } catch (error) {
      throw error
    }
  }

  getDataByUserId = async (userId) => {
  try {
    if (!userId) return [];
    const res = await this.database.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [Query.equal("user_id", userId)]
    );
    return res.documents;
  } catch (error) {
    if (error.message.includes("Attribute not found in schema: user_id")) {
      console.warn("user_id not found in schema yet. Likely no data exists for new user.");
      return [];
    }
    console.error("Error getting user data:", error);
    return [];
  }
};

}

const services = new Services();
export default services;
