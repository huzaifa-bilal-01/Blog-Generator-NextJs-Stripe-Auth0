import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from '../lib/mongodb';

export const getAppProps = async (ctx) => {
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db('BlogsStandard');
    const user = await db.collection('user').findOne({
        auth0Id: userSession.user.sub,
    });

    if(!user){
        return{
            availableTokens: 0,
            posts: [],
        }
    }

    const posts = await db.collection('post').find({
        userId: user._id,
    }).sort({
        createdAt: -1,
    }).toArray();

    return {
        availableTokens: user.availableTokens,
        posts: posts.map(({ createdAt, _id, userId, ...rest }) => ({
            _id: _id.toString(),
            createdAt: createdAt.toString(),
            ...rest,
          })),
          postId: ctx.params?.postId || null, 
    };
}