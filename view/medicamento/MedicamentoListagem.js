import React, { useState,useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListarMedicamento } from '../../controller/medicamentoController';
import GetStyles from '../../model/styles/getStyles';
import ListagemBase from '../../controls/listagemBase'

export default function App({navigation}) {

  const [isLoading, setLoad] = useState(true);
  const [Medicamento, setMedicamento] = useState([]);
  
  function onPress(x) 
   {
    
    navigation.navigate('Atualizar', {
      userkey: x
    });
  }

  async function ObterTodosOsMedicamento()
  {
    setLoad(true);
    let result = await ListarMedicamento();
    if(result.sucesso)
    {
        setMedicamento(result.data)
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
    navigation.addListener('focus', ObterTodosOsMedicamento)
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
        dados={Medicamento} 
        nomePrincipal= "NomeMedicamento"
        nomePrincipalLabel="Nome do Medicamento: "
        nomeSecundario="Formula"
        nomeSecundarioLabel= "Formula: "
        onItemPress={onPress} 
      />
    );
    }
  }

const styles = GetStyles()