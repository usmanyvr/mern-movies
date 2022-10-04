import React, {useState, useEffect} from 'react'
import MovieDataService from '../services/movies'
import {Link, useParams} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
import moment from 'moment'

const Movie = props => {
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    const getMovie = id => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }
    const {id} = useParams()

    console.log('id = ', id)
    console.log('user = ', props.user)

    useEffect(() => {
        getMovie(id)
    }, [id])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster+"/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                            </Card.Body>
                            {props.user && 
                                <Link to={"/movies/" + id + "/review"}>
                                    Add Review
                                </Link>
                            }
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        {movie.reviews.map((review, index) => {
                            return (
                                <Media key={index}>
                                    <Media.Body>
                                        <h5>{review.name + " reviewed on " + moment(review.date).format('Do MMMM YYYY')}</h5>
                                        <p>{review.text}</p>
                                        {props.user && props.user.name === review.name &&
                                            <Row>
                                                <Col>
                                                    <Link to={"/movies/" + id + "/review"}
                                                       state={{ currentReview: review }} >
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" 
                                                            onClick={() => deleteReview(review._id, index)} >Delete</Button>
                                                </Col>
                                            </Row>
                                        }
                                    </Media.Body>
                                </Media>
                            )    
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movie
