import React, { useEffect } from 'react'
import { useState } from 'react';
import { View,Text,StyleSheet,TextInput, Dimensions, FlatList, StatusBar, SafeAreaView } from 'react-native';
import {DOMParser} from 'xmldom';
import ReactDOM, { render } from 'react-dom';
import styled from 'styled-components/native';
import StationList from './StationList';

const List = styled.ScrollView`
flex: 1;
width: ${({ width }) => width - 40}px;
`;

function App() {

  const [station, setStation] = useState('');
  const [result, setResult] = useState([]);
  const width = Dimensions.get('window').width;
  const [stationid, setStationid] = useState('');
  //함수형 컴포넌트 const -> useEffect로 해결

  const handleStation = text => {
    setStation(text);
  }

  const searchStation = async()=>{
    console.log("working");
        try{
        var xhr = new XMLHttpRequest();
        const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
            const url = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationList'; /*URL*/
            var queryParams = `${url}?serviceKey=${API_KEY}&keyword=${station}`;
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
              tmpnode.id = xmlDoc.getElementsByTagName("stationId")[i].textContent;
              tmpnode.name = xmlDoc.getElementsByTagName("stationName")[i].textContent;
              tmpnode.x = xmlDoc.getElementsByTagName("x")[i].textContent;
              tmpnode.y = xmlDoc.getElementsByTagName("y")[i].textContent;
              array.push(tmpnode);
              i++;
              if(xmlDoc.getElementsByTagName("stationId")[i]==undefined) break;
            }
            setResult(array);
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

  useEffect(()=>{
    searchStation();
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>CatchBus</Text>
      <TextInput
     style={styles.input}
     placeholder='정류장 이름을 입력하세요'
     autoCorrect = {false}
     value = {station}
     onChangeText={handleStation}
     onSubmitEditing = {()=>searchStation()}
     multiline={false}
     returnKeyType="search"
      />
      <Text>{station}</Text>
      <Text>{result.name}</Text>
      <Text>{console.log(result)}</Text>
      <List width={width}>
        {result.map(item => (
          <StationList item={item}
          stationid={stationid}
          setStationid={setStationid}
          />
        ))}
      </List>
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
  fontsize:10
}
});


export default App;