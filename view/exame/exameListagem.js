import React, { useState,useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListarExame } from '../../controller/ExameController';
import GetStyles from '../../model/styles/getStyles';
import ListagemBase from '../../controls/listagemBase';

export default function App({navigation}) {

  const [isLoading, setLoad] = useState(true);
  const [Exame, setExame] = useState([]);

  function onPress(x) 
  {
   navigation.navigate('AtualizarExame', {
     userkey: x
   });
 }

  async function ObterTodosOsExame()
  {
    setLoad(true);
    let result = await ListarExame();
    if(result.sucesso)
    {
      result.data.forEach((item) => {
        item.DataExameDisplay = `${item.DataExame.toLocaleDateString("pt-BR")} | ${item.DataExame.getHours()} : ${item.DataExame.getMinutes()}`
      })
      setExame(result.data)
    }else
    {
        Swal.fire({
            icon: 'error',
            text: result.mensagem
        })
    }
    setLoad(false)
  }

  useEffect(() => {
    navigation.addListener('focus', ObterTodosOsExame)
  }, [navigation]); 

    if(isLoading){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }else
    {
    return (
      <ListagemBase
        dados={Exame} 
        nomePrincipal= "NomeExame"
        nomePrincipalLabel="Nome do Exame: "
        nomeSecundario="DataExameDisplay"
        nomeSecundarioLabel= "Data: "
        onItemPress={onPress} 
        id = "CodigoExame"
      />
    );
  }
}

const styles = GetStyles()