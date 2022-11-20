import React, { useState,useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListarMedicamento } from '../../controller/medicamentoController';
import GetStyles,{SecundaryColor}  from '../../model/styles/getStyles';
import ListagemBase from '../../controls/listagemBase'

export default function App({navigation, route}) {

  const [isLoading, setLoad] = useState(true);
  const [Medicamento, setMedicamento] = useState([]);
  
  function onPress(x, name) 
   {
    
    navigation.navigate('MedicamentoCadastro', {
      codigo: 0,
      userkey: x,
      name: name,
      medicamentos: route.params.medicamentos,
      setMedicamentos: route.params.setMedicamentos,
      componenteAtualizar: route.params.componenteAtualizar
    });
  }

  function Voltar()
  {
    navigation.goBack()
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
      <View>
        
        <ListagemBase
          dados={Medicamento} 
          nomePrincipal= "NomeMedicamento"
          nomePrincipalLabel="Nome do Medicamento: "
          nomeSecundario="Formula"
          nomeSecundarioLabel= "Formula: "
          onItemPress={onPress}
          botaoVoltar={Voltar}
        />
      </View>
    );
    }
  }

const styles = GetStyles()