import { useEffect, useState } from "react";
import service from "../appwrite/config";
import {Container,PostCard} from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

export default function Home() {
    const authStatus = useSelector((state)=>state.auth.status);
    console.log("From Home",authStatus);
    <h1>If you are not seeing your post, please refresh!!!</h1>
    if(authStatus){
        const userData = useSelector((state)=>(state.auth.userData.userData));
        console.log("From Home",userData);
        const [posts,setPosts] = useState([]);
        useEffect(()=>{
            service.getPosts([Query.contains("userId", `${userData?.$id}`)])
            .then((posts)=>{
                if(posts)setPosts(posts.documents);
            })
        },[])
        if(posts.length===0){
            return(
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No posts found, please either add one or refresh the page!!
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }
        return(
            <div className="w-full py-10 rounded-lg ">
      <Container className="bg-blue-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
    
        )           
    }
    else{
        alert("Please login to view your posts");
    }
     
}