import { useLoaderData, Link} from "@remix-run/react";
import {redirect} from '@remix-run/node';
import { db } from '~/utils/db.server'
import {getUser} from '~/utils/session.server'

export const loader = async ({ params }) => {
    const post = await db.post.findUnique({
        where: { id: params.postId }
    })

    if (!post) throw new ERROR('POST NOT FOUND')

    const data = { post }
    return data
}


export const action = async ({request, params}) => {
    const form = await request.formData()
    if(form.get('_method') === 'delete'){
        const post = await db.post.findUnique({
            where: {id: params.postId},
        })

        if(!post) throw new Error('POST NOT FOUND');

        await db.post.delete({where: { id: params.postId }})

        return redirect('/posts')
    }
}


function Post() {
    const { post } = useLoaderData()

    return (
        <div>

            <div className="page-header">
                <h1>{post.title}</h1>
                <Link to='/posts' className="btn">
                    Back
                </Link>
            </div>

            <div className="page-content">
                {post.body}
            </div>

            <div className="page-footer">
                <form method="POST">
                    <input type="hidden" name="_method" value="delete" />
                    <button className='btn btn-delete'>Delete</button>
                </form>
            </div>

        </div>

    )
}

export default Post