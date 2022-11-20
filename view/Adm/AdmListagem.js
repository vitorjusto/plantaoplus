import React, { useState,useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListarAdm } from '../../controller/Adm';
import GetStyles from '../../model/styles/getStyles';
import ListagemBase from '../../controls/listagemBase'

export default function App({navigation}) {

  const [isLoading, setLoad] = useState(true);
  const [Usuario, setUsuario] = useState([]);
  
  function onPress(x) 
   {
    
    navigation.navigate('Atualizar', {
      userkey: x
    });
  }

  async function ObterTodosOsUsuario()
  {
    setLoad(true);
    let result = await ListarAdm();
    if(result.sucesso)
    {
        setUsuario(result.data)
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
    navigation.addListener('focus', ObterTodosOsUsuario)
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
        dados={Usuario} 
        nomePrincipal= "Nome"
        nomePrincipalLabel="Nome do Adiministrador: "
        nomeSecundario="Login"
        nomeSecundarioLabel= "Login: "
        id="Login"
        onItemPress={onPress} 
      />
    );
    }
  }

const styles = GetStyles()