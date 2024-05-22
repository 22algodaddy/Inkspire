import { useState,useEffect } from "react";
import {Container,PostForm} from "../components"
import service from "../appwrite/config";
import { useParams,useNavigate } from "react-router-dom";
export default function EditPost() {
    console.log("EditPost")
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate =useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPost(slug)
            .then((post)=>{
                console.log("Post from EditPost",post)
                if(post)setPost(post);
                else navigate("/")
            })
        }
    },[slug,navigate,setPost])
    console.log("Post-Form",post)
    return(
        post ? 
        (
            <div className="py-8">
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        )
        : null
    )
}