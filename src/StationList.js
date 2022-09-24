import React from 'react';
import styled from'styled-components/native';
import PropTypes from 'prop-types';
import {Button,  Dimensions,} from 'react-native';
import { useState } from 'react';
import {DOMParser} from 'xmldom';
import Busstop from './Busstop';

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

const List = styled.ScrollView`
flex: 1;
width: ${({ width }) => width - 40}px;
`;

const StationList = ({ item, stationid, setStationid }) => {

    const [result, setResult] = useState([]);
    const width = Dimensions.get('window').width;
    
    const setstationid = (id) => () => {
        console.log(id);
        setStationid(id);
        console.log(stationid);
        searchBusstop();
    };

const searchBusstop = async()=>{
    console.log("working : ", stationid);
        try{
        var xhr = new XMLHttpRequest();
        const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
            const url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList'; /*URL*/
            var queryParams = `${url}?serviceKey=${API_KEY}&stationId=${stationid}`;
            xhr.open('GET', queryParams);
            xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
            let xmlParser = new DOMParser();
            let xmlDoc = xmlParser.parseFromString(this.responseText, "text/xml");
            let i = 0;
            let array = [];
            while(1){
              var tmpnode = new Object();
              tmpnode.index = i;
              tmpnode.locationNo1 = xmlDoc.getElementsByTagName("locationNo1")[i].textContent;
              tmpnode.predictTime1 = xmlDoc.getElementsByTagName("predictTime1")[i].textContent;
              tmpnode.locationNo2 = xmlDoc.getElementsByTagName("locationNo2")[i].textContent;
              tmpnode.predictTime2 = xmlDoc.getElementsByTagName("predictTime2")[i].textContent;
                  array.push(tmpnode);
              i++;
              if(xmlDoc.getElementsByTagName("stationId")[i]==undefined) break;
            }
            setResult(array);
            console.log(result);
          }
        } 
      xhr.send();
      }
      catch(err){
        alert(err);
      }
      if(result.length == 0){
        console.log("result is empty");
      }
  };


    return (
        <Container>
            <Content_name>{item.name}</Content_name>
            <Content_locate>{item.id}</Content_locate>
            <Content_locate>위치: {item.x}, {item.y}</Content_locate>
            <Button 
            title="press"
            onPress={setstationid(item.id)}>
            </Button>
                <List width={width}>
                {result.map(item => (
                  <Busstop item={item}/>
                ))}
              </List>
        </Container>
    );
};

StationList.propTypes = {
    item: PropTypes.object.isRequired,
};

export default StationList;