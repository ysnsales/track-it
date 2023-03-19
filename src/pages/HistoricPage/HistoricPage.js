import styled from "styled-components";
import TopoMenu from "../TopoMenu";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";
import { useEffect, useState } from "react"

export default function HistoricPage() {
    const [date, setDate] = useState(new Date());

    return (<>
        <TopoMenu />
        <PageContainer>
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            {/*<CalendarContainer
                onChange={setDate}
                locale="pt-BR"
                value={date}
                formatDay={(locale, date) => dayjs(date).format('DD')}
                style={{ background: "red" }}>

    </CalendarContainer> */}
        </PageContainer>

    </>
    )
}

const PageContainer = styled.div` 
width: 304px;
margin: 0 auto;
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

const CalendarContainer = styled(Calendar)`
width: 335px;
border-radius: 10px;
padding:10px;
font-family:  'Lexend Deca', sans-serif;
font-weight: bold;
font-size: 18px;
.react-calendar__tile {
    color: #000;
    text-align: center;
    font-size: 0.8rem;
    padding: 10px;
    }
`