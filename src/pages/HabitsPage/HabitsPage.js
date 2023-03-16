import styled from "styled-components"
import axios from "axios";
import TopoMenu from "../TopoMenu"

import { useContext } from "react";
import { UserContext } from "../UserContext";

import { useEffect, useState } from "react";


export default function HabitsPage() {
    const [name, setName] = useState("")
    const [days, setDays] = useState([])
    const [addHabit, setAddHabit] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const  user = useContext(UserContext);
    console.log(name)
    console.log(days)

    const week = ["D", "S", "T", "Q", "Q", "S", "S"];

    const header = {headers: {
        Authorization: `Bearer ${user.user.token}`,
      },}
      console.log(header);


    function SelectDays(index) {
        let newDays = [...days];

        if (!days.includes(index)) {
            setDays([...days, index]);
        } else {
            newDays.splice(newDays.indexOf(index), 1);
            setDays(newDays);

        }
    }

    function CreateHabit(e) {
        e.preventDefault();
        if (days.length != 0 && name != "") {
            const post = { name, days };
            console.log(post)
            const promisePost = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", post, header);
            promisePost.then(response => console.log(response.data))
        }
    }

    return (
        <>
            <TopoMenu />
            <PageContainer>


                <Habits>
                    <h1>Meus Hábitos</h1>
                    <button
                        onClick={() => setAddHabit(true)}>+</button>
                </Habits>

                <AddHabit addHabit={addHabit}>
                    <form onSubmit={CreateHabit}>
                        <input
                            data-test=""
                            id=""
                            type="text"
                            placeholder="nome do hábito"
                            onChange={e => setName(e.target.value)} />
                        <div>
                            {week.map((day, index) => (

                                <DayButton key={index}
                                    state={days.includes(index) ? "selecionado" : "disponivel"}>
                                    <button
                                        onClick={() => SelectDays(index)}
                                        type="button">
                                        {day}
                                    </button>
                                </DayButton>
                            ))}
                        </div>

                        <CancelSave disabled={disabled}>
                            <button style={{ background: "#FFFFFF", color: "#52B6FF" }}
                                type="button">
                                Cancelar
                            </button>

                            <button style={{ background: "#52B6FF", color: "#FFFFFF" }}
                                type="submit">
                                Salvar
                            </button>
                        </CancelSave>
                    </form>
                </AddHabit>

                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>

            </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
width: 100%;
height: 100vw;
display: flex;
flex-direction: column;
padding-top: 98px;
background-color: #E5E5E5;
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        padding: 0 18px;
        box-sizing: border-box;
        margin-top: 20px;

        color: #666666;
    }
`

const Habits = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 18px 0;
box-sizing: border-box;

    h1{
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
    button {
        width: 40px;
        height: 35px;
        background: #52B6FF;
        color: #FFFFFF;
        border-radius: 5px;
        border-style: none;
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 29px;
        line-height: 34px;
    }
`

const AddHabit = styled.div`
width: 340px;
background: #FFFFFF;
border-radius: 5px;
display: ${props => props.addHabit ? "flex" : "none"};
flex-direction: row;
padding: 18px;
margin: 20px auto 0;
    input{
        width: 303px;
        height: 45px;
        padding: 0 10px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: gray;
        //margin: 20px 18px 0;
        :focus{
            outline: none;
    }
        ::-webkit-input-placeholder{
            color: #D5D5D5;
    }
        :hover{
            border: 1px solid #52B6FF;
}
    }div {
        display: flex;
        flex-direction: row;
    }

`


const DayButton = styled.div`
    button{
        width: 30px;
        height: 30px;
        margin-right: 4px;
        margin-top: 4px;
        box-sizing: border-box;

        background-color: ${props => (props.state === "selecionado") ? "#D5D5D5" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        color:${props => (props.state === "selecionado") ? "#FFFFFF" : "#D5D5D5"};

        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
    }
`

const CancelSave = styled.div`
display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: end;
margin-top: 30px;
button{
    min-width: 84px;
    margin-left: 30px;
    height: 35px;
    min-width: 84px;
    border: none;
    border-radius: 5px;
    display: ${props => props.disabled ? "none" : "true"};

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
}
`