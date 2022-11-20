import React, { useState,useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListarPaciente } from '../../controller/pacienteController';
import getStyles from '../../model/styles/getStyles'
import ListagemBase from '../../controls/listagemBase'

export default function App({navigation}) {

  const [isLoading, setLoad] = useState(true);
  const [pacientes, setPacientes] = useState([]);

  function onPress(x) 
  {
    navigation.navigate('Atualizar', {
      userkey: x
    });
  }

  async function ObterTodosOsPacientes()
  {
    setLoad(true);
    let result = await ListarPaciente();
    if(result.sucesso)
    {
        setPacientes(result.data)
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
    navigation.addListener('focus', ObterTodosOsPacientes)
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
        dados={pacientes} 
        nomePrincipal= "NomePaciente"
        nomePrincipalLabel="Nome do Paciente: "
        nomeSecundario="Cpf"
        nomeSecundarioLabel= "CPF: "
        onItemPress={onPress} 
      />
    );
    }
  }

const styles = getStyles()