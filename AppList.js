import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AppItem from './AppItem';
import { SearchBar } from 'react-native-elements';
import Database from './Database';
 
export default function AppList({ route, navigation}) {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  
  useEffect(() => {
      Database.getItems().then(items => setItems(items));
  }, [route]); 

  function reloadData (){
    setValue('')
    Database.getItems().then(items => setItems(items));
  }


  function searchFilterFunction(text){
    setValue(text)
    const newData = items.filter(item => {
      const itemData = `${item.titulo.toUpperCase()} ${item.descricao.toUpperCase()} ${item.autor.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setItems(newData)
  }
  function renderHeader(){
    return (
      <SearchBar
        placeholder="Pesquisar..."
        placeholderTextColor={'#g5g5g5'}
        containerStyle={styles.searchStyle}
        round
        onChangeText={text => text.length > 0 ? searchFilterFunction(text) : reloadData()}
        autoCorrect={false}
        value={value}
      />
    );
    
  };


return (
  <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Portal de Noticias</Text>
      <FlatList
          contentContainerStyle={ items.length > 0 ? styles.itemsContainer : styles.itemsContainerVazio}
          showsHorizontalScrollIndicator={false}
          data={items}
          keyExtractor={(item)=>String(item.key)}
          renderItem={({item}) => 
        <AppItem 
          key={item.id} id={item.id} 
          itemTitulo={item.titulo + "\n"} 
          itemDescricao={item.descricao + "\n"} 
          itemAutor={item.autor} 
          navigation={navigation} 
          />
        }
        ListHeaderComponent={renderHeader()}
      />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53DCF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20
  },
  scrollContainer: {
    flex: 1,
    width: '90%'
  },
  itemsContainer: {
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    width: 360
  },
  itemsContainerVazio :{
    flex: 1,
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    width: 360
  },
  searchStyle:{
    backgroundColor:'#fff',
    borderWidth: 1, 
    borderRadius: 5
  },
  empty:{
    flex:1,
    backgroundColor: '#ffff'
  }
});
