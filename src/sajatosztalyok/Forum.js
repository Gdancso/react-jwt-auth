import React, { Component } from 'react';
import { Text, TextInput, View,TouchableOpacity,FlatList,ActivityIndicator,ScrollView,StyleSheet,SafeAreaView } from 'react-native-web';
const IP = require('./ipcim.js');


//const ipcim="http://192.168.2.106:8080";
export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true, dataSource2:[]}
    this.state = {

        ertekeles_nev: 'anonymous',
        ertekeles_uzenet:"",

    };
  }

  
  frissit =()=>{
    return fetch(IP.ipcim+'/ertekeles_uzenet')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

    });
    //alert(JSON.stringify(this.state.dataSource))
    //split

  })
  .catch((error) =>{
    console.error(error);
  });


 }

  felvitel=async ()=>{
    //alert("Megnyomva")
    let bemenet={
      bevitel1: this.state.ertekeles_nev,
      bevitel2: this.state.ertekeles_uzenet,
    }
 
    fetch(IP.ipcim+'/ertekeles', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((szoveg) => {

        //alert(szoveg)
        this.frissit()
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentDidMount(){
    this.frissit()
  }


  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      
      <View>
      <View style={{padding: 10,marginVertical:15,backgroundColor:"#484a4d",alignItems:"center",alignSelf:"center",width:500,borderRadius:20,marginLeft:20,marginRight:20}}>
         <Text style={{padding: 10, fontSize: 20,color:"white"}}>
         Név:
        </Text>
        
        <TextInput
          placeholderTextColor="#b3b3ff"
          style={{height: 40,color:"white",backgroundColor:"#585959",padding:10,borderRadius:10,height:40,textAlignVertical:"top"}}
          placeholder="Add meg a nevedet!"
          onChangeText={(ertekeles_nev) => this.setState({ertekeles_nev})}
          value={this.state.ertekeles_nev}
          //value={currentUser.username}
          
        />
         <Text style={{padding: 10, fontSize: 20,color:"white"}}>
         Komment:
        </Text>
        <TextInput
         placeholderTextColor="white"
          style={{height: 40,color:"white",backgroundColor:"#585959",padding:10,borderRadius:10,height:80,textAlignVertical:"top"}}
          placeholder="Add meg a kommentet!"
          onChangeText={(ertekeles_uzenet) => this.setState({ertekeles_uzenet})}
          value={this.state.ertekeles_uzenet}
        />

        <TouchableOpacity 
        onPress={async ()=>this.felvitel()}>
          <View style={{width:200,backgroundColor:"#585959",borderRadius:10,height:40,marginVertical:15}}>
            <Text style={{textAlign:"center",padding:10, color:"white",fontSize:"bold"}}>Felvitel</Text>
          </View>
        </TouchableOpacity>
       
      </View>
{/*Megjelenítés-------------------------------------------------------------------------------------------------------------------------*/}
      <View>
        <FlatList

          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={{borderWidth:1,marginVertical:5,borderRadius:10,padding:10,width:500,alignSelf:'center',backgroundColor:"#677180"}}>
            <Text style={{fontSize:25,padding:3,color:"white"}}>{item.ertekeles_uzenet} </Text>
            <Text style={{fontStyle:"italic",fontSize:20,padding:3}}>{item.ertekeles_nev} </Text>
            <Text style={{fontSize:15}}>{item.ertekeles_date.split ("T")[0].trim()} </Text>
          </View>
          
        }
          keyExtractor={({ertekeles_id}, index) => ertekeles_id}
        />
      </View>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 30,
    marginVertical:30,
    flexDirection:"row",
    flexWrap:"wrap",
    alignSelf: "center",
  },
});