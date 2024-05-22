import Service from "../appwrite/config";
import { useState, useEffect } from "react";
import { Container,PostCard } from "../components";
export default function Allpost() {
    const [posts,setPost] = useState([]);
    useEffect(()=>{
        Service.getPosts([])
         .then((posts)=>{
            if(posts)setPost(posts.documents);
         })
    },[])
    return(
        <div className="w-full py-8 bg-gray-100">
        <Container>
            <div className="flex flex-wrap -mx-4">
                {
                    posts.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <PostCard {...post} className="shadow-lg rounded-lg overflow-hidden" />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
    
    )
}