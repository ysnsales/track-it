import styled from "styled-components";
import axios from "axios";
import TopoMenu from "../TopoMenu";
import * as url from "../../assets/Group.svg";
import { confirmAlert } from 'react-confirm-alert';
import { ThreeDots } from 'react-loader-spinner';
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function HabitsPage() {
    const [name, setName] = useState("")
    const [days, setDays] = useState([])
    const [addHabit, setAddHabit] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [listHabits, setListHabits] = useState([])

    const [loading, setLoading] = useState(false)

    const user = useContext(UserContext);

    const week = ["D", "S", "T", "Q", "Q", "S", "S"];

    const header = {
        headers: {
            Authorization: `Bearer ${user.user.token}`,
        },
    };

    useEffect(() => {
        GetHabits();
    }, []);


    function GetHabits() {
        const promiseHabits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, header);
        promiseHabits.then((response) => {
            setListHabits(response.data);
        })
        promiseHabits.catch((error) => {
            console.log(error.response.data);
        })
    }

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
        GetHabits();

        if (name === "") {
            alert("Insira um nome para o hábito");
        }
        if (days.length != 0 && name != "") {
            setLoading(true)
            const post = { name, days };
            const promisePost = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", post, header);
            promisePost.then(response => {
                setLoading(false);
                setAddHabit(false);
                setDays([]);
                setName("");

            })
            promisePost.catch(error => {
                setLoading(true)
                console.log(error.response.data);
                setLoading(false);
                setAddHabit(false);
            })
        }
        GetHabits();
    }

    function Delete(id) {
        if (window.confirm('Você tem certeza que gostaria de deletar este hábito?')) {
            const promiseDelete = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, header)
            promiseDelete.then(response => {
                setListHabits(listHabits.filter(habit => habit.id != id));
            })
        }


    }
    return (
        <>
            <TopoMenu />
            <PageContainer>


                <Habits>
                    <h1>Meus Hábitos</h1>
                    <button data-test="habit-create-btn"
                        onClick={() => setAddHabit(true)}>+</button>
                </Habits>

                <AddHabit data-test="habit-create-container" addHabit={addHabit}>
                    <form>
                        <input
                            data-test="habit-name-input"
                            id="habit-name-input"
                            type="text"
                            placeholder="nome do hábito"
                            onChange={e => setName(e.target.value)}
                            disabled={loading}
                            value={name} />

                        <div>
                            {week.map((day, index) => (

                                <DayButton key={index}
                                    state={days.includes(index) ? "selecionado" : "disponivel"}>
                                    <button data-test="habit-day"
                                        onClick={() => SelectDays(index)}
                                        disabled={loading}
                                        type="button">
                                        {day}
                                    </button>
                                </DayButton>
                            ))}
                        </div>

                        <CancelSave disabled={disabled}>
                            <button data-test="habit-create-cancel-btn" style={{ background: "#FFFFFF", color: "#52B6FF" }}
                                type="button"
                                disabled={loading}
                                onClick={() => setAddHabit(false)}>
                                Cancelar
                            </button>

                            <button data-test="habit-create-save-btn" style={{ background: "#52B6FF", color: "#FFFFFF" }}
                                type="submit"
                                onClick={(e) => CreateHabit(e)}
                                disabled={loading ? true : false}>
                                {loading ?
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
                                    : "Salvar"}
                            </button>
                        </CancelSave>
                    </form>
                </AddHabit>

                <HabitsContainer>

                    {listHabits.length != 0 ?
                        <>
                            {listHabits.map((habit) => (
                                <div data-test="habit-container" key={habit.id}>
                                    <p data-test="habit-name">{habit.name}</p>
                                    <img data-test="habit-delete-btn" onClick={() => Delete(habit.id)} src={url.default} />
                                    <div>

                                        {week.map((day, index) => (

                                            <DayButton key={index}
                                                state={habit.days.includes(index) ? "selecionado" : "disponivel"}>
                                                <button
                                                    data-test="habit-day"
                                                    onClick={() => SelectDays(index)}
                                                    type="button">
                                                    {day}
                                                </button>
                                            </DayButton>
                                        ))}
                                    </div>


                                </div>
                            ))}
                        </>
                        : <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>

                    }
                </HabitsContainer>

            </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
width: 304px;
margin: 0 auto;
background-size: cover;
display: flex;
flex-direction: column;
padding: 98px 0 98px;
background-color: #E5E5E5;
justify-content: space-between;

    p{
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        box-sizing: border-box;
        color: #666666;
    }
`
const HabitsContainer = styled.div`
margin: 0 auto;
border-radius: 5px;

    div{
        height: 55px;
        width: 304px;
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 18px;
        background-color: #FFFFFF;
        div {
            display: flex;
            position: relative;
            bottom: 10px;
            padding: 0;
            height: 30px;
            flex-direction: row;
            width: 250px;
        }
        img{
            width: 13px;
            position: relative;
            bottom: 25px;
            left: 295px;
            margin: 0;
        }
        
    }

`

const Habits = styled.div`
width: 340px;
display: flex;
align-items: center;
justify-content: space-between;
margin: 0 auto 20px;
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
        padding: 0;

        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 29px;
        line-height: 34px;
    }
`

const AddHabit = styled.div`
width: 304px;
background: #FFFFFF;
border-radius: 5px;
display: ${props => props.addHabit ? "flex" : "none"};
flex-direction: row;
padding: 18px;
margin: 0 auto 20px;
    input{
        width: 283px;
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
        font-size: 20px;
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
    display: ${props => props.disabled ? "none" : "flex"};
    align-items: center;
    justify-content: center;

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
}
`