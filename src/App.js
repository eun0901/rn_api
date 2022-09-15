import React from 'react'
import { useState, useEffect } from 'react';
import { View,Text,StyleSheet,TextInput,Dimensions } from 'react-native';
import {DOMParser} from 'xmldom';
import styled from 'styled-components/native';

function App() {
  const [station, setStation] = useState('');
  const [result, setResult] = useState([]);
  const width=Dimensions.get('window').width;

 const printList = async()=>{
  try{
      <View style={styles.container}>
        {console.log(result)}
      {result.map(item => {
          <Container>
            <Content_name>{item.name}</Content_name>
            <Content_locate>위치: {item.x}, {item.y}</Content_locate>
        </Container>
      }
      )
    }
      </View>
  }
  catch(err){
    alert(err)
  }
};


  const searchStation = async()=>{
      try{
        var xhr = new XMLHttpRequest();
        var url = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationList'; /*URL*/
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D'; /*Service Key*/
        queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(station); /**/
        xhr.open('GET', url + queryParams);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
            let xmlParser = new DOMParser();
            let xmlDoc = xmlParser.parseFromString(this.responseText, "text/xml");
            let i = 0;
            while(1){
              var tmpnode = new Object();
              
              console.log(i)
              tmpnode.id = xmlDoc.getElementsByTagName("stationId")[i].textContent;
              tmpnode.name = xmlDoc.getElementsByTagName("stationName")[i].textContent;
              tmpnode.x = xmlDoc.getElementsByTagName("x")[i].textContent;
              tmpnode.y = xmlDoc.getElementsByTagName("y")[i].textContent;

             result.push(tmpnode);
              setResult(result);
              i++;
              if(xmlDoc.getElementsByTagName("stationId")[i]==undefined) break;
            }
          }
        }
      xhr.send();
      }
      catch(err){
        alert(err);
      }
  };

  return(
    <View style={styles.container}>
      <Text style={styles.title}>CatchBus</Text>
      <TextInput
     style={styles.input}
     placeholder='정류장 이름을 입력하세요'
     value={station}
     onChangeText={(text) => setStation(text)} 
     onSubmitEditing={searchStation}
     returnKeyType="search"
      />
      <View style={styles.container}>{console.log("this is", result)}</View>
    </View>
  );
}

const styles=StyleSheet.create({
input:{
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
},
container:{
  flex:1,
  alignItems:'center'
},
text:{
fontsize:10,
alignItems:'center'
},
title:{
  margin:10,
  fontsize:30
}
});
const List = styled.ScrollView`
flex: 1;
width: ${({width})=> width - 40}px;
`;
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


export default App;