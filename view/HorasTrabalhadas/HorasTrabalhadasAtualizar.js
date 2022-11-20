import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, ActivityIndicator, Text} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import { ObterHorasTrabalhadas, DeletarHorasTrabalhadas, AtualizarHorasTrabalhadas } from '../../controller/horasTrabalhadasController';
import {Input} from '../../controls/TextInput';
import BotaoVoltar from '../../controls/buttons'

export default function App(props) {
  const CodigoHorasTrabalhadas = props.route.params.userkey
  const [DataTrabalhada, setDataTrabalhada] = useState('')
  const [HoraInicio, setHoraInicio] = useState('')
  const [HoraFim, setHoraFim] = useState('')
  const [Email, setEmail] = useState('')
  const [isLoading, setLoad] = useState(true);

  let horasTrabalhadas
  async function obterCadastro()
  {
    let result = await ObterHorasTrabalhadas(CodigoHorasTrabalhadas)

    if(!result.sucesso)
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      })
      Voltar()
    }
    horasTrabalhadas = result.data
    
    setDataTrabalhada(horasTrabalhadas.DataTrabalhada)
    setHoraInicio(horasTrabalhadas.HoraInicio)
    setHoraFim(horasTrabalhadas.HoraFim)
    setEmail(horasTrabalhadas.Email)

    setLoad(false);
  }
  
  useEffect(() => {
    obterCadastro()
  }, []);


  function Voltar()
  {
    props.navigation.goBack()
  }

  async function Deletar()
  {
      await Swal.fire({
          text: 'Deseja deletar este cadastro?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonText: 'Sim',
          denyButtonText: 'Não'
      }).then((result) => {
          
          if (result.isConfirmed) {
            DeletarCadastro()
          } else if (result.isDenied) {
            Swal.fire('', 'Não será deletado', 'info')
          }
      })
    
  }
  
  async function DeletarCadastro() {
    setLoad(true)
      let result = await DeletarHorasTrabalhadas(CodigoHorasTrabalhadas)
      if(result.sucesso)
      {
      Swal.fire({
        icon: 'success',
        text: 'Horas deletado com sucesso!'
      })
      Voltar()
      }else
      {
        Swal.fire({
          icon: 'error',
          text: 'Não foi possivel deletar o Paciente'
        })
        setLoad(false)
      }
  }

  async function AtualizarCadastro() {
    setLoad(true)
    let HorasTrabalhadas = {
      CodigoHorasTrabalhadas,
      DataTrabalhada,
      HoraInicio,
      HoraFim,
      Email
    }

    let result = await AtualizarHorasTrabalhadas(HorasTrabalhadas);

    if(result.sucesso)
    {
      setLoad(false)
      Swal.fire({
        icon: 'success',
        text: 'Horas atualizado com sucesso'
      })
      Voltar()
    }else
    {
    setLoad(false)
    Swal.fire({
      icon: 'error',
      text: result.mensagem
    })
    }
  }

  if(isLoading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red"/>
      </View>
    )
  }

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
    <View>
    <BotaoVoltar Voltar={Voltar}/>
    <View style={styles.styledContainer}> 
    <Input type="text" value={Email} disabled={true} onInput={(e) => setNomeMedicamento(e.target.value)} LabelText={"Email"}/>
 
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
    </View>
    <TouchableOpacity style={styles.botaoVermelho} onPress={Deletar} type="submit">
    <Text style={styles.textoBotaoVerde}>  Deletar </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.botaoVerde} onPress={AtualizarCadastro} type="submit">
    <Text style={styles.textoBotaoVerde}>  Atualizar </Text>
    </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = GetStyles()