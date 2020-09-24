import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Database from './Database';
  
export default function AppFormEdit({ route, navigation}) {
  const id = route.params ? route.params.id : undefined;
  const [titulo, setTitulo] = useState(''); 
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');

  useEffect(() => {
    if(!route.params) return;
    setTitulo(route.params.titulo);
    setDescricao(route.params.descricao);
    setAutor(route.params.autor);
  }, [route])

  async function handleTituloChange(titulo){  await setTitulo(titulo); } 
  async function handleDescricaoChange(descricao){ await setDescricao(descricao); }
  async function handleAutorChange(autor){ await setAutor(autor); }
  async function handleButtonPress(){ 
    const listItem = {titulo , descricao, autor};

    if(titulo != '' && descricao != '' && autor != ''){
          Database.saveItem(listItem, id)
          .then(response => navigation.navigate("AppList", listItem));
          setTitulo('')
          setDescricao('')
          setAutor('')
    }else{
      Alert.alert(
        "Atenção",
        "Preencha todos os campos para prosseguir!",
        [
            {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
        ],
        { cancelable: false }
        );
    }
   
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Notícia</Text>
      <View style={styles.inputContainer}> 

        <TextInput 
          maxLength={70}
          multiline={true}
          style={styles.input} 
          onChangeText={handleTituloChange} 
          placeholder="Digite um titulo para notícia"
          clearButtonMode="always"
          value={titulo} /> 
        <TextInput
          multiline={true} 
          style={styles.inputDescricao} 
          onChangeText={handleDescricaoChange} 
          placeholder="Descreva a noticía aqui" 
          clearButtonMode="always"
          value={descricao} /> 

        <TextInput 
          maxLength={30}
          multiline={true}
          style={styles.input} 
          onChangeText={handleAutorChange} 
          placeholder="Autor(a)" 
          clearButtonMode="always"
          value={autor}/> 
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
            <View style={styles.buttonContainer}>
              <Icon name="save" size={22} color="white" />
              <Text style={styles.buttonText}>Editar</Text> 
            </View>
          </TouchableOpacity> 
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53DCF5',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width:360,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  inputDescricao: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: "row"
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});
