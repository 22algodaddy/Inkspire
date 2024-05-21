import authService from "../appwrite/config";
import {Link} from "react-router-dom"

export default function PostCard({$id,title,featuredImage}){//$id is synatx of appwrite $id as a whol represents id
    return(
        <Link to={`/post/${$id}`}>
            <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                <div className="w-full max-w-sm mx-auto justify-center mb-4">
                    <img 
                    src={authService.getFilePreview(featuredImage)} 
                    className="w-full h-48 object-cover" 
                    alt={title} />
                </div>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
            </div>
        </Link>
    )
}