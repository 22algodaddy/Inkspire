import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {Button, Select, Input, RTE} from "../index";
import {appwriteService} from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}){
    const navigate = useNavigate();
    const {register,handleSubmit,watch,setValue,getValues,control} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.slug || "",
            status:post?.status || "active",
            content:post?.content || "",
        }
    });
    const userData = useSelector((state)=>(state.user.userData));
    const submit = async (data) => {
        if(post){
            const file = await data.image[0]?appwriteService.uploadFile(data.image[0]) :null;
            if(file)appwriteService.deleteFile(post.featuredImage);
            const DBfile = await appwriteService.updatePost(post.$id,
                {...data,
                featuredImage: file?file.$id:undefined
            });
            if(DBfile) navigate(`/post/${DBfile.$id}`);
        }
        else{
            //if there is no post, it means user is creating new post
            const file = await appwriteService.uploadFile(data.image[0]);
            if(file){
                const fileID = file.$id;
                data.featuredImage = fileID;
                const DBfile = await appwriteService.createPost({
                    ...data,
                    userId:userData.$id
                });
                if(DBfile) navigate(`/post/${DBfile.$id}`);
            }
        }
    }
    const slugTransform = useCallback((value)=>{
        if(value && typeof value === "string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g,"-")
            .replace(/\s/g,"-")
        }
        else return ""
    },[]);
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}