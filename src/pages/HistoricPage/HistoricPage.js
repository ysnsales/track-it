import styled from "styled-components"
import TopoMenu from "../TopoMenu"

export default function HistoricPage(){
    return(<>
        <TopoMenu />
        <PageContainer>
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
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