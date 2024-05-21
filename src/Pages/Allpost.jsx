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
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                {
                    posts.map((post)=>(
                        <PostCard key={post.$id} {...post} />
                    ))
                }
                </div>
            </Container>
        </div>
    )
}