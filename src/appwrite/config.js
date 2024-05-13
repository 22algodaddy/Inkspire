import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(err){console.log(err);}

    }
    async updatePost(slug,{title,content, featuredImage, status, userId}){
        try{
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(err){console.log(err);}
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug);
                return true;
        }catch(err){console.log(err);return false;}
    }
    async getPosts(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }catch(err){console.log(err);}
    }
    async getPosts(queries=[Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }catch(err){console.log(err);}

    }
    async uploadFile(file){
        try{
            //this will return fileID
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(err){console.log(err);return false;}
    }
    async deleteFile(fileID){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        }catch(err){console.log(err);return false;}
    }
    getFilePreview(fileID){  //didn't made it async function because in document they had written like this only
        return  this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}
const service = new Service();
export default Service;
