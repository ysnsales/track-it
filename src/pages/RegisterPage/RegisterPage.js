import styled from "styled-components"
import axios from "axios";
import * as url from "../../assets/logo-completa.svg"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function RegisterPage() {
    const [email, setEmail]=useState("");
    const [name, setName]=useState("");
    const [image, setImage]=useState("");
    const [password, setPassword]=useState("");

    function Register(e){
        e.preventDefault();
        const post = {email, name, image, password}
        const promisePost = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", post);
        promisePost.then(response => console.log(response))
    }

    return (
        <PageContainer>
            <Logo>
                <img src={url.default} />
            </Logo>

            <form onSubmit={Register}>
                <FormContainer>
                    <input
                        data-test=""
                        id="email"
                        type="text"
                        required
                        placeholder="email" 
                        onChange={e => setEmail(e.target.value)}
                        />

                    <input
                        data-test=""
                        id="senha"
                        type="password"
                        required
                        placeholder="senha" 
                        onChange={e => setPassword(e.target.value)}
                        />

                    <input
                        data-test=""
                        id="nome"
                        type="text"
                        required
                        placeholder="nome" 
                        onChange={e => setName(e.target.value)}
                        />

                    <input
                        data-test=""
                        id="foto"
                        type="link"
                        required
                        placeholder="foto" 
                        onChange={e => setImage(e.target.value)}/>

                    <button type="submit">Cadastrar</button>
                </FormContainer>
            </form>
            <Link to={`/`}>
            <p>Já tem uma conta? Faça login!</p>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding-top: 70px;
    p{
        font-family: 'Lexend Deca';
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
        outline: none;
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

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
}
`