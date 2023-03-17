import styled from "styled-components"
import TopoMenu from "../TopoMenu"
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import * as url from "../../assets/Vector.svg";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import HabitsPage from "../HabitsPage/HabitsPage";


export default function TodayPage() {
    const [habitsToday, setHabitsToday] = useState([]);
    const [isDone, setIsDone] = useState();
    const [loading, setLoading] = useState(false)

    const user = useContext(UserContext);

    const header = {
        headers: {
            Authorization: `Bearer ${user.user.token}`,
        },
    };
    const date = dayjs().date();
    const month = dayjs().month();
    const day = dayjs().day();
    const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    useEffect(() => {

        const promiseHabits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, header);
        promiseHabits.then((response) => {
            setHabitsToday(response.data);
        })
        promiseHabits.catch((error) => {
            console.log(error.response.data);
        })
    }, [habitsToday]);

    function CheckHabit(id, done, e) {
        e.preventDefault();
        setLoading(true)
        console.log(done);

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

    }


    return (
        <>
            <TopoMenu />
            <PageContainer>
                <h1>{week[day]}, {date}/{month + 1}</h1>

                <Habits>
                    {habitsToday.map((habit) => (
                        <div key={habit.id}>
                            <h1>{habit.name}</h1>
                            <p>Sequência atual:</p>
                            <p>Seu recorde:</p>
                            <CheckButton done={habit.done}>
                                <button
                                    disabled={loading}
                                    onClick={(event) => CheckHabit(habit.id, habit.done, event)}>
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
justify-content: center;
padding: 98px 18px;
h1{
    font-family: 'Lexend Deca', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
margin-bottom: 17px;


color: #126BA5;
}
p{
    font-family: 'Lexend Deca', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;

color: #666666;
}`

const Habits = styled.div`
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

const CheckButton = styled.div `
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
}
`
