import styled from "styled-components"

import { Image } from "../App";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { PercentContext } from "./PercentContext";

import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


export default function Topo() {
    const user = useContext(UserContext);
    const percent = useContext(PercentContext);
    const navigate = useNavigate();
    return (
        <>
            <ContainerTopo data-test="header">
                <h1>TrackIt</h1>
                <img src={user.user.image} />
            </ContainerTopo>

            <ContainerMenu data-test="menu">
                <h1 data-test="habit-link" onClick={() => navigate("/habitos")}>Hábitos</h1>

                <div data-test="today-link" onClick={() => navigate("/hoje")}>
                    <CircularProgressbar
                        value={percent.percent}
                        text={"Hoje"}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#FFFFFF",
                            pathColor: "#FFFFFF",
                            trailColor: "transparent",
                        })}
                    /></div>
                <h1 data-test="history-link" onClick={() => navigate("/historico")}>Histórico</h1>

            </ContainerMenu>
        </>
    )
}

const ContainerTopo = styled.div`
    width: 100%;
    height: 70px;
    position: fixed;
    top:0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #126BA5;
    z-index: 2;
    h1{        
        font-family: 'Playball', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        margin-left: 18px;
        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 98px;
        margin-right: 18px;
    }
`

const ContainerMenu = styled.div`
    z-index: 2;
    width: 100%;
    max-height: 70px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    padding: 0 35px;
    box-sizing: border-box;
    h1{
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }
    div {
        width: 91px;
        height: 91px;
        border-radius: 50%;
        background-color: #52B6FF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #FFFFFF;
        margin-bottom: 35px;
       
    }

`