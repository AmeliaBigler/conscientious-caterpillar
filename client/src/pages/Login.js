import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const [login] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (email !== '' && password !== '') {
            //Use the useMutation hook to validate the form data
            try {
                const { data } = await login({
                    variables: { email, password },
                });
                Auth.login(data.login.token);
            } catch (error) {
                alert("Log in failed. Try again.");
            }
            setEmail('');
            setPassword('');
        }
    }

    return (
        <Form
            name='basic'
            labelCol={{
                span:8,
            }}
            wrapperCol={{
                span:16,
            }}
            style={{
                maxWidth:600,
            }}>
            <Form.Item
                label='Email'
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'email'
                    }
                ]}
                >
                <Input 
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'password'
                    }
                ]}
                >
                <Input 
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Item>

            <Form.Item>
                <Button htmlType='submit' onClick={handleFormSubmit}> Login </Button>
            </Form.Item>
            
        </Form>
    );
}