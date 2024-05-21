import { useState,useEffect } from "react";
import {Conatiner,PostForm} from "../../components"
import service from "../../appwrite/config";
import { useParams,useNavigate } from "react-router-dom";
export default function EditPost() {
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate =useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPost(slug)
            .then((post)=>{
                if(post)setPost(post);
                else navigate("/")
            })
        }
    },[slug,setPost,navigate])
    return(
        post ? 
        (
            <div className="py-8">
                <Conatiner>
                    <PostForm post={post} />
                </Conatiner>
            </div>
        )
        : null
    )
}