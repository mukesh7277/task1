import React,{useState} from "react";
import { useObserver } from "mobx-react-lite";
import { Button, Container, Text } from "@src/components/elements";
import { View } from "react-native";
import RNRestart from 'react-native-restart';
import { useBusinessContext } from "../BusinessState/BusinessStore";

const BusinessList = () => {
  const store = useBusinessContext();
  const startReload = ()=> RNRestart.Restart();

  return useObserver(() => (
      <Container style={{marginTop:20}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'pink',marginBottom:20,paddingLeft:10}}>Business Store</Text>
        {store.featured.map((bus) => (
          <View key={bus.id} style={{width:'100%',justifyContent:'center',paddingLeft:30}} >
            <Text style={{fontSize:18,fontWeight:'bold',color:'orange'}}>
              {bus.title}
            </Text>
            <Text style={{width:"50%",marginTop:5,marginBottom:10,color:'red',fontSize:12}} onPress={() => store.remove(bus.id)}>remove</Text>
          </View>
        ))}
        <Button onPress={startReload}><Text>Reload</Text></Button>
      </Container>
  ));
};

export default BusinessList;
