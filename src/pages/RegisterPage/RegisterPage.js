import styled from "styled-components"
import axios from "axios";
import * as url from "../../assets/logo-completa.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { Image } from "../../App";
import { useContext } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    function Register(e) {
        e.preventDefault();
        setLoading(true)
        const post = { email, name, image, password }
        const promisePost = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", post);
        setLoading(true)
        promisePost.then(response => {
            console.log(response);
            navigate("/");
            setLoading(false);

        })

        promisePost.catch(error => {
            if (!error.response) {
                alert("Sem resposta do servidor")
            }if (error.response.status === 409){
                alert("Email já utilizado")
            }else {
                alert("O cadastro falhou. Verifique se os dados foram preenchidos corretamente")
            }
            setLoading(false);

        })
    }

    return (
        <PageContainer>
            <Logo>
                <img src={url.default} />
            </Logo>

            <form onSubmit={Register}>
                <FormContainer>
                    <input
                        data-test="email-input"
                        id="email"
                        type="text"
                        required
                        placeholder="email"
                        disabled={loading ? true : false}
                        onChange={e => setEmail(e.target.value)}
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

                    <input
                        data-test="user-name-input"
                        id="nome"
                        type="text"
                        required
                        placeholder="nome"
                        disabled={loading ? true : false}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        data-test="user-image-input"
                        id="foto"
                        type="link"
                        required
                        placeholder="foto"
                        disabled={loading ? true : false}
                        onChange={e => setImage(e.target.value)} />

                    <button
                        data-test="signup-btn"
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
                            : "Cadastrar"}</button>
                </FormContainer>
            </form>
            <Link to={`/`}>
                <p data-test="login-link" >Já tem uma conta? Faça login!</p>
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
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
}
`