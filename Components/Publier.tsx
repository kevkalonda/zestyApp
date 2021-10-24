import { StatusBar } from 'expo-status-bar';
import React, {useEffect } from 'react'
import { StyleSheet,SafeAreaView, Image, FlatList, Dimensions, Text ,View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import getImageAleatoirApi from './api';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');

export default function Publier(){
  /*Gestion de la base de donnée
    -on initialise notre base à un tableau vide
    -on cree un dictionnaire 'ensembleDeMots' pour memoriser partiellement les informations avant de l'ajouter dans notre tableau base de donnée
    -une constante pour liker et dislike toutes les images
    -une constante pour stocker le text saisie par l'utilisateur
  */
  const [data, setdata] = React.useState([]);
  const ensembleDeMots={
      id: 0,
      mot:"",
      img: "",
      date: "",

    }
  const [like, setLike] = React.useState(false);
  const [motAndId, setmot] =React.useState({
    mot:"",
  })

  var image=""; /*stochkage de l'image fourni par l'API*/

  //traitement de donné de l'API
  const imageAleatoire=()=>{
    getImageAleatoirApi().then(donnee=>{
      image = donnee.file;
      console.log(image);
    });
  }
  //aimer toutes les photos
  const aimerUnePhoto = () => {
        setLike(!like);
    }
    /* l'appel à la fonction imageAleatoire() est mis en commentaire parce que l'api fournit pose un probleme
    'Access-Control-Allow-Origin'
    */
  const onePress=()=>{
    //l'image et le text ne peux s'afficher uniquement si l'utilisateur saisie quelque chose
    if(motAndId.mot != ""){
        //imageAleatoire();
        ensembleDeMots.id = 1 + (Math.random() * (99999-1));
        ensembleDeMots.mot = motAndId.mot;
        ensembleDeMots.date = new Date().toLocaleString();
        //ensembleDeMots.img = image;
        ensembleDeMots.img = "https://source.unsplash.com/random/300x200?sig=${"  + (Math.random()) + "}";
        setdata(data=> data.concat(ensembleDeMots));
        setmot({ ["mot"]: "" });
      }
  }
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.container2}>
            <TextInput
            style={styles.input}
            placeholder="Quoi de neuf ?"
            value={motAndId.mot}
              onChangeText={(text) => setmot({ ['mot']: text })}
            />
            <TouchableOpacity style={styles.button}  onPress={()=>onePress()}>
              <Text style={styles.buttonText} >Publier</Text>
            </TouchableOpacity>
          </View>

            <SafeAreaView style={styles.containerImg}>
            <ScrollView>
              <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item})=>
                        <View style={styles.containerViewImg}>
                              <Text style={styles.text}>{item.mot}</Text>
                              <Image
                                style={styles.tinyLogo}
                                source={{ uri: item.img }}
                            />
                            <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
                                <Text style={styles.text}>{item.date}</Text>
                                <TouchableOpacity onPress={() => alert("Merci d'avoir partager :)")}>
                                    <Icon name={'ios-paper-plane-sharp'} size={25} color={'black'} style={{ marginTop: 5 }}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert("Merci d'avoir Commenter :)")}>
                                    <Icon name={'ios-chatbox-ellipses'} size={25} color={'black'} style={{ marginTop: 5 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => aimerUnePhoto()}>
                                    <Icon name={(like === false) ? 'ios-heart-outline' : 'ios-heart-sharp'} size={25} color={(like === false) ? 'black' : 'red'} style={{marginTop:5}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    />
                  </ScrollView>
              </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
      marginTop: "10%",
      marginBottom: "3%"
  },
  containerImg:{
    width: "80%",
    marginLeft: "10%",
    flexDirection: "column-reverse"
  },
  containerViewImg:{
    marginBottom:"5%",
  },
  text:{
    fontSize: 16,
    color:"black",
    marginBottom:"3%"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tinyLogo: {
   width: "100%",
   height: 150,
 },
  input: {
      width: "80%",
      height: 45,
      borderRadius: 1,
      fontSize: 16,
      padding:"3%",
      backgroundColor: '#FAFCFA',
      marginTop: "5%",
      marginBottom:"1%",
      marginLeft:"10%",
    },
  button:{
    width: "20%",
    height: 30,
    marginLeft:"70%",
    borderRadius: 9,
    marginTop:3,
    backgroundColor: '#FEEE06',
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText:{
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  }
});
