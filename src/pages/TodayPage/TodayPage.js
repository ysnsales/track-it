import styled from "styled-components"
import TopoMenu from "../TopoMenu"
import axios from "axios";
import dayjs from "dayjs";

import { useContext } from "react";
import { UserContext } from "../UserContext";
import { PercentContext } from "../PercentContext";

import { useEffect, useState } from "react";
import * as url from "../../assets/Vector.svg";



export default function TodayPage() {
    const user = useContext(UserContext);
    const { percent, setPercent } = useContext(PercentContext);

    const [habitsToday, setHabitsToday] = useState([]);
    const [isDone, setIsDone] = useState();
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState()

    const header = {
        headers: {
            Authorization: `Bearer ${user.user.token}`,
        },
    };

    const date = dayjs().date();
    const month = dayjs().month();
    const day = dayjs().day();
    const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]


    useEffect(() => {
        HabitsToday();
    }, []);

    useEffect(() => {
        let done = 0;
        let total = 0;
        if (habitsToday.length) {
            habitsToday?.forEach(habit => {
                total++;
                if (habit.done) {
                    done++;
                }
            })

        }
        console.log(isDone)
        if (total != 0) {
            const percentValue = done / total * 100;
            setPercent(percentValue);
            setIsDone(Math.round(percentValue));
        }else {
            setIsDone(0)
        }


    }, [habitsToday]);

    function HabitsToday() {
        const promiseHabits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, header);
        promiseHabits.then((response) => {
            setHabitsToday(response.data);
        })
        promiseHabits.catch((error) => {
            console.log(error.response.data);
        })

    }

    function CheckHabit(e, id, done) {
        e.preventDefault();
        setLoading(true)
        HabitsToday();
        const promiseCheck = !done ?
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, header)
            :
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, header);

        promiseCheck.then((response) => {
            console.log(response.data);
            setLoading(false)
        })
        promiseCheck.catch((error => {
            console.log(error.response.data);
            setLoading(false)
        }))
        HabitsToday();
    }


    return (
        <>
            <TopoMenu />
            <PageContainer>
                <h1 data-test="today">{week[day]}, {date}/{months[month]}</h1>
                <p data-test="today-counter" style={isDone === 0 ? { color: "#BABABA" } : { color: "#8FC549" }}>{isDone === 0 ? "Nenhum hábito concluído ainda" : `${isDone}% dos hábitos concluídos`}</p>

                <Habits>
                    {habitsToday.map((habit) => (
                        <div data-test="today-habit-container" key={habit.id}>
                            <h1 data-test="today-habit-name" >{habit.name}</h1>
                            <p>Sequência atual: <P data-test="today-habit-sequence" green={habit.done}> {habit.currentSequence} {habit.currentSequence > 1 ? "dias" : "dia"}</P></p>
                            <p>Seu recorde:<B data-test="today-habit-record" green={habit.currentSequence===habit.highestSequence && habit.highestSequence >0}> {habit.highestSequence} {habit.highestSequence > 1 ? "dias" : "dia"} </B> </p>
                            <CheckButton done={habit.done}> 
                                <button data-test="today-habit-check-btn"
                                    disabled={loading}
                                    onClick={(event) => CheckHabit(event, habit.id, habit.done)}>
                                    <img src={url.default} />
                                </button>
                            </CheckButton>
                        </div>


                    ))}
                </Habits>
            </PageContainer>
        </>
    )
}

const PageContainer = styled.div` 
width: 304px;
display: flex;
flex-direction: column;
justify-content: center;
padding: 98px 18px;
margin: 0 auto;
h1{
    
    font-family: 'Lexend Deca', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;
}
p{
    font-family: 'Lexend Deca', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 22px;
color: #BABABA;
;
}`

const Habits = styled.div`

margin: 17px auto;
div{
    width: 320px;
    height: 74px;
    padding: 10px;
    margin-bottom: 10px;
    background: #FFFFFF;
    border-radius: 5px;
}
h1{
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    margin-bottom: 7px;
}
p{  
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #666666;
}
`

const CheckButton = styled.div`
 max-width: 69px;
    max-height: 69px;
    position: relative;
    bottom: 70px;
    left: 240px;
button{
    width: 69px;
    height: 69px;
    background: ${props => props.done ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    &:disabled {
			background: ${props => props.done ? "#8FC549" : "#EBEBEB"};
			opacity: 0.7;
		}
}
`
const B = styled.span`
color: ${props => props.green ? "#8FC549;" : "#666666;"};
`

const P =  styled.span`
color: ${props => props.green ? "#8FC549;" : "#666666;"};
`