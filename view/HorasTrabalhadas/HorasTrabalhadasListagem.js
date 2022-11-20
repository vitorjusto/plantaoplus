import React, { useState,useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListarHorasTrabalhadas } from '../../controller/horasTrabalhadasController';
import GetStyles from '../../model/styles/getStyles';
import ListagemBase from '../../controls/listagemBase'

export default function App({navigation, email, adm}) {

  const [isLoading, setLoad] = useState(true);
  const [HorasTrabalhadas, setHorasTrabalhadas] = useState([]);

  function onPress(item) 
  {
    navigation.navigate('Atualizar', {
      userkey: item
    });
  }

  async function ObterTodosOsHorasTrabalhadas()
  {
    setLoad(true);
    let result = await ListarHorasTrabalhadas(email, adm);
    if(result.sucesso)
    {
      result.data.forEach((item) => {
        item.DataTrabalhadaDisplay = `${new Date(item.DataTrabalhada).toLocaleDateString("pt-BR")}`
      })
        setHorasTrabalhadas(result.data)
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
    navigation.addListener('focus', ObterTodosOsHorasTrabalhadas)
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
        dados={HorasTrabalhadas} 
        nomePrincipal= "DataTrabalhadaDisplay"
        nomePrincipalLabel="Data: "
        onItemPress={onPress}
        id = "CodigoHorasTrabalhadas" 
      />
    );
    }
  }

const styles = GetStyles()