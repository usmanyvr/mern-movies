import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = props => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [id, setId] = useState('')

    const onChangeName = e => {
        const name = e.target.value
        setName(name)
    }

    const onChangeId = e => {
        const id = e.target.value
        setId(id)
    }

    const login = () => {
        props.login({name: name, id: id})
        navigate('/')
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter username"
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter id'
                        value={id}
                        onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant='primary' onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login
