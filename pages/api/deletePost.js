import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0"
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
    try {
        const {user: {sub}} = await getSession(req, res);
        const client = await clientPromise;
        const db = client.db('BlogsStandard');
        const userProfile = await db.collection('user').findOne({
            auth0Id: sub,
        });
        const {postId} = req.body;
        await db.collection('post').deleteOne({
            userId: userProfile._id,
            _id: new ObjectId(postId),
        });
        res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
    }
    return;
})