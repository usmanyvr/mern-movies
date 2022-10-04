import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews) {
            return
        }

        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('comments')
        } catch(e) {
            console.error('unable to establish connnection handle in reviewDAO: ', e)
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                email: user.email,
                date: date,
                text: review,
                movie_id: ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc)
        } catch(e) {
            console.error('unable to post review ', e);
            return { error: e}
        }
    }

    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                {_id: ObjectId(reviewId)},
                {$set: {text: review, date: date}}
            )
            return updateResponse
        } catch(e) {
            console.error('unable to update review: ', e);
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId)
            })
            return deleteResponse
        } catch(e) {
            console.error('unable to delete review ', e)
            return { error: e }
        }
    }
}