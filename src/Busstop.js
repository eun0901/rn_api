import React from 'react';
import styled from'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
flex-direction: column;
align-items: center;
background-color: ${({ theme }) => theme.itemBackground};
border-radius: 10px;
padding: 5px;
margin: 3px 0px;
`;

const Content_name = styled.Text`
flex: 1;
font-size: 20px;
`;

const Content_locate = styled.Text`
flex: 1;
font-size: 15px;
`;
const Busstop = ({ item }) => {
    return (
        <Container>
            <Content_name>첫번째차량 위치 정보: {item.locationNo1}</Content_name>
            <Content_locate>첫번째차량 도착예상시간: {item.predictTime1}</Content_locate>
            <Content_name>두번째차량 위치 정보: {item.locationNo2}</Content_name>
            <Content_locate>두번째차량 도착예상시간: {item.predictTime2}</Content_locate>
        </Container>
    );
};

Busstop.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Busstop;