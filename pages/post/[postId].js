import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { getAppProps } from "../../utils/getAppProps";
import { useState } from "react";
import { useRouter } from "next/router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Post(props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deletePost`, {
        method: "POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify({ postId: props.id }),
      })
      const data = await response.json()
      if(data.success){
        router.push(`/post/new`)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return(

    <div className="overflow-auto h-full">
      <div className="w-full">
        <form className="max-[768px]:w-full m-4 bg-slate-100 p-8 pt-0 rounded-md border border-slate-200">
          <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
            SEO Title and Meta Description
          </div>

          <div className="p-4 my-2 border border-stone-200 rounded-sm">
            <div className="text-indigo-500 text-2xl font-bold">{props.title}</div>
            <div className="mt-2">{props.metaDescription}</div>
          </div>

          <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
            keywords
          </div>

          <div className="flex flex-wrap pt-2 gap-1">
            {props.keywords.split(",").map((keyword, index) => (
              <div key={index} className="p-2 rounded-full bg-purple-900 text-white">
                <FontAwesomeIcon icon={faHashtag} />{keyword}
              </div>
            ))}
          </div>

          <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
            Blog Post
          </div>
          <div dangerouslySetInnerHTML={{__html: props.postContent || ""}} />
          <div className="my-4">
            {!deleteConfirm && (
                <button className="btn bg-red-500 hover:bg-red-700" onClick={()=> setDeleteConfirm(true)}>
                Delete Post
                <FontAwesomeIcon className="mx-2" icon={faTrash} />
              </button>  
              )}
              {deleteConfirm && (
                <div>
                  <p className="p-2 bg-red-300 text-center">Are you sure you want to delete this post?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="btn bg-stone-600 hover:bg-stone-700" onClick={()=> setDeleteConfirm(false)} > 
                      Cancel
                    </button>
                    <button className="btn bg-red-500 hover:bg-red-700" onClick={handleDelete}>
                      Confrim Delete
                    </button>
                  </div>
                </div>
              )}
          </div>
        </form>
      </div>    
    </div>
  )
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){

      const props = await getAppProps(ctx);
    
      const userSession = await getSession(ctx.req, ctx.res);
      const client = await clientPromise;
      const db = client.db('BlogsStandard');
      const user = await db.collection('user').findOne({
        auth0Id: userSession.user.sub,
      });
      const post = await db.collection('post').findOne({
        _id: new ObjectId(ctx.params.postId),
        userId: user._id,
      });

      if (!post) {
        return {
          redirect: {
            destination: '/post/new',
            permanent: false,
          },
        };
      }

      return {
        props: {
          id: ctx.params.postId,
          postContent: post.postContent,
          title: post.title,
          metaDescription: post.metaDescription,
          keywords: post.keywords,
          ...props,
        }
      }
    }
  });
  