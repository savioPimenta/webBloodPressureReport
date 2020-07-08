import React, { Component } from 'react';

import { Redirect } from "react-router-dom";

import { Form, FormGroup, Label, Input } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import '../fonts/Raleway-Regular.ttf'

import './Form.css'

import logo from '../assets/images/logo.png'


class FormLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            senha: '',
            redirect: false,
            pacientes: []
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSenhaChange = (event) => {
        this.setState({
            senha: event.target.value
        })
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.email === "fabriciopelucci@gmail.com" && this.state.senha === "fabriciopelucci" && this.state.redirect === true)
            return <Redirect to='/dashboard' />
        return (
            <Form className="login-form">
                <img src={logo} alt="Logo" className="logo-form" />
                <FormGroup>
                    <Input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        id="email"
                        className="input-form-login" />
                    <Label className="label-form-login">Digite seu e-mail</Label>

                </FormGroup>
                <FormGroup>
                    <Input
                        type="senha"
                        name="senha"
                        placeholder="Senha"
                        value={this.state.senha}
                        onChange={this.handleSenhaChange}
                        id="senha"
                        className="input-form-login" />
                    <Label className="label-form-login">Digite sua senha</Label>
                </FormGroup>
                <button className="button-form-login" onClick={this.setRedirect}>
                    Login
                </button>
            </Form>
        );
    }
}

export default FormLogin;
