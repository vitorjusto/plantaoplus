import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {Input, TextArea} from '../../controls/TextInput';
import GetStyles, {fontColor} from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import { ObterPaciente } from '../../controller/pacienteController';
import { CadastrarExame } from '../../controller/exameController';
import { AntDesign } from '@expo/vector-icons'; 
import BotaoVoltar from '../../controls/buttons'

export default function App(props) {
  const CodigoPaciente = props.route.params.userkey
  const [NomePaciente, setNomePaciente] = useState('')
  const [NomeExame, setNomeExame] = useState('')
  const [DescricaoExame, setDescricao] = useState('')
  const [DataExame, setDataExame] = useState('')
  const [HoraExame, setHoraExame] = useState('')
  const [ResultadoExame, setResultadoExame] = useState('')
  const [isLoading, setLoad] = useState(true);

  let paciente
  async function obterCadastroPaciente()
  {
    let result = await ObterPaciente(CodigoPaciente)
    if(!result.sucesso)
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      })
      Voltar()
    }
    paciente = result.data
    setNomePaciente(paciente.NomePaciente);

    setLoad(false);
  }

  async function Cadastrar()
  {
    let exame = {
        CodigoPaciente,
        NomeExame,
        DescricaoExame,
        DataExame,
        HoraExame,
        ResultadoExame,
      }
    let result= await CadastrarExame(exame)

    if (result.sucesso)
    {
    Swal.fire({
      icon: 'success',
      text: 'exame cadastrado com sucesso'
    })
      Voltar()
    }else
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      });
    }
  }
  
  useEffect(() => {
    obterCadastroPaciente()
  }, []);

  function Voltar()
  {
    props.navigation.goBack()
  }

  if(isLoading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red"/>
      </View>
    )
  }   
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      
      <View style={{width:35}}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={Voltar} variant="primary" type="submit">
          <AntDesign name='leftcircleo' size={30} color={fontColor}/>
        </TouchableOpacity>
      </View>
    <View style={styles.styledContainerMargin}> 
    <Input disabled={true} type="text" placeholder="Nome" value={NomePaciente} onInput={(e) => setNomePaciente(e.target.value)} LabelText={"Nome do Paciente"}/>
    
    <Input type="text" placeholder="Nome" value={NomeExame} onInput={(e) => setNomeExame(e.target.value)} LabelText={"Nome do Exame"}/>
 
    <TextArea type="text" placeholder="Descrição" value={DescricaoExame} onInput={(e) => setDescricao(e.target.value)} LabelText={"Desrcrição"}/>
    </View>
    <View style={styles.styledContainer}> 
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: "50%"}}>
            <Input type="date" value={DataExame} onInput={(e) => setDataExame(e.target.value)} LabelText={"Data"}/>
        </View>
        <View style={{width: "40%"}}>
            <Input type="time" value={HoraExame} onInput={(e) => setHoraExame(e.target.value)} LabelText={"Hora"}/>
        </View>
    </View>

    <TextArea type="text" placeholder="Resultado" value={ResultadoExame} onInput={(e) => setResultadoExame(e.target.value)} LabelText={"Resultado do exame"}/>
    </View>
    <TouchableOpacity style={styles.botaoVerde} onPress={Cadastrar}>
    <Text style={styles.textoBotaoVerde}>  Cadastrar </Text>
    </TouchableOpacity>

  </SafeAreaView>
    </ScrollView>
  );
}

const styles = GetStyles()