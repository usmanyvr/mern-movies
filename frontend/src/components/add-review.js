import React, { useState } from 'react'
import MovieDataService from '../services/movies'
import { Link, useParams, useLocation } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddReview = props => {
    let editing = false
    let initialReviewState = ''
    const location = useLocation()

    if (location.state && location.state.currentReview) {
        editing = true
        initialReviewState = location.state.currentReview.text
    }

    const [review, setReview] = useState(initialReviewState)

    const [submitted, setSubmitted] = useState(false)

    const onChangeReview = e => {
        const review = e.target.value
        setReview(review)
    }

    console.log('props = ', props)

    let { id } = useParams()
    console.log('location = ', location)
    console.log('initialReviewState = ', initialReviewState)

    const saveReview = () => {
        let data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: id
        }

        if (editing) {
            data.review_id = location.state.currentReview._id
            MovieDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true)
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            MovieDataService.createReview(data)
                .then(response => {
                    setSubmitted(true)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={'/movies/' + id}>Back to Movie</Link>
                </div>) : (
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? 'Edit' : 'Create'} Review</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            value={review}
                            onChange={onChangeReview}
                        />
                    </Form.Group>
                    <Button variant='primary' onClick={saveReview}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    )
}

export default AddReview
