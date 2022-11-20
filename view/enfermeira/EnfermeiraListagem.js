import React, { useState,useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListarEnfermeira } from '../../controller/EnfermeiraController';
import GetStyles from '../../model/styles/getStyles';
import ListagemBase from '../../controls/listagemBase'

export default function App({navigation}) {

  const [isLoading, setLoad] = useState(true);
  const [Enfermeira, setEnfermeira] = useState([]);

  function onPress(x) 
   {
    
    navigation.navigate('Atualizar', {
      userkey: x
    });
  }
  
  async function ObterTodasAsEnfermeira()
  {
    setLoad(true);
    let result = await ListarEnfermeira();
    if(result.sucesso)
    {
        setEnfermeira(result.data)
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
    navigation.addListener('focus', ObterTodasAsEnfermeira)
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
        dados={Enfermeira} 
        nomePrincipal= "NomeEnfermeira"
        nomePrincipalLabel="Nome da Enfermeira: "
        nomeSecundario="Coren"
        nomeSecundarioLabel= "Coren: "
        onItemPress={onPress} 
      />
    );
    }
}

const styles = GetStyles()