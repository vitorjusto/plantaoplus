import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import { CadastrarHorasTrabalhadas } from '../../controller/horasTrabalhadasController';
import {Input} from '../../controls/TextInput';

export default function App({email, emailVisivel = true}) {

  const [DataTrabalhada, setDataTrabalhada] = useState('')
  const [HoraInicio, setHoraInicio] = useState('')
  const [HoraFim, setHoraFim] = useState('')

  async function Cadastrar()
  {
    let HorasTrabalhadas ={
      Email: email,
      DataTrabalhada,
      HoraInicio,
      HoraFim
    }    
    
    let result = await CadastrarHorasTrabalhadas(HorasTrabalhadas)

    if (result.sucesso)
    {
    Swal.fire({
      icon: 'success',
      text: 'Horas cadastrado com sucesso'
    })
    limparTela()
    }else
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      });
    }
  }

  function limparTela()
  {
    setDataTrabalhada(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
    setHoraInicio('')
    setHoraFim('')
  }

  return (
  <SafeAreaView style={styles.roundContainer}>
    <ScrollView>
    <View style={styles.styledContainer}> 
    <Input type="text" value={email} disabled={true} visivel={emailVisivel} onInput={(e) => setNomeMedicamento(e.target.value)} LabelText={"Email"}/>
 
    <Input type="date" value={DataTrabalhada} onInput={(e) => setDataTrabalhada(e.target.value)} LabelText={"Data Trabalhada"}/>

    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{width: '40%'}}>
        <Input type="time" value={HoraInicio} onInput={(e) => setHoraInicio(e.target.value)} LabelText={"Entrada"}/>
      </View>
      <View style={{width: '40%'}}>
        <Input type="time" value={HoraFim} onInput={(e) => setHoraFim(e.target.value)} LabelText={"Saida"}/>
      </View>
    </View>

    </View>
    <View style={{height:"10px"}}/>

    <TouchableOpacity style={styles.botao} onPress={Cadastrar} variant="primary" type="submit">
    <Text style={styles.textoBotaoVerde}>  Cadastrar Horas Trabalhadas </Text>
    </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = GetStyles()