import authService from "../appwrite/config";
import {Link} from "react-router-dom"

export default function PostCard({$id,title,featuredImage}){//$id is synatx of appwrite $id as a whol represents id
    return(
        <Link to={`/post/${$id}`}>
            <div className="w-full max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden bg-white">
  <div className="w-full h-48">
    <img
      src={authService.getFilePreview(featuredImage)}
      className="w-full h-full object-cover"
      alt={title}
    />
  </div>
  <div className="p-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
  </div>
</div>

        </Link>
    )
}