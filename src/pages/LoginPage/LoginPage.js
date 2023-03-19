import { Form } from "react-router-dom"
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import * as url from "../../assets/logo-completa.svg"
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { createContext } from 'react';

import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);



    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);


    function Login(e) {
        e.preventDefault();
        const post = { email, password }
        const promisePost = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", post);
        setLoading(true)
        promisePost.then(response => {
            setUser(response.data);
            navigate("/hoje");
            setLoading(false);
            console.log(response.data)
        }
        )
        promisePost.catch(error => {
            if (!error.response) {
                alert("Sem resposta do servidor");
            }else if (error.response.status === 401) {
                alert("Senha ou usuário incorretos");
            } else if (error.response.status === 422) {
                alert("O servidor não pode processar sua solicitação. Verifique se os dados foram preenchidos corretamente");
            } else {
                alert("O login falhou")
            }
            setLoading(false)
        })

    }

    return (
        <PageContainer>
            <Logo>
                <img src={url.default} />
            </Logo>
            <form onSubmit={Login}>
                <FormContainer>
                    <input
                        data-test="email-input"
                        id="email"
                        type="text"
                        required
                        placeholder="email"
                        disabled={loading ? true : false}
                        onChange={e => setEmail(e.target.value)}
                        pattern="^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,})+$"
                        title="Precisa ser um email valido. Exemplo (nome@dominio.com)"
                    />

                    <input
                        data-test="password-input"
                        id="senha"
                        type="password"
                        required
                        placeholder="senha"
                        disabled={loading ? true : false}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        data-test="login-btn"
                        type="submit"
                        disabled={loading ? true : false}>{loading ?
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                margin-bottom="10"
                                color="#FFFFFF"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={loading}
                                align-self="center"
                            />
                            : "Entrar"}</button>

                </FormContainer>
            </form>
            <Link data-test="signup-link" to={`/registro`}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #FFFFFF;
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14x;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;

        color: #52B6FF;

}
`

const Logo = styled.div`
margin-bottom: 36px;
`
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

input {
    width: 303px; 
    height: 45px;
    margin-bottom: 6px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0 10px;
    color: gray;

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    :focus{
        outline: 1px solid #D5D5D5;
    }
    ::-webkit-input-placeholder{
        color: #D5D5D5;
    }
    :hover{
    border: 1px solid #52B6FF;
}
}


button {
    color: #FFFFFF;
    background-color: #52B6FF;
    width: 303px;
    height: 45px;
    border-radius: 5px;
    border-style: none;
	padding: 0 10px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
}
`
