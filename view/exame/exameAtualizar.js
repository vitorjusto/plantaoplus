import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {Input, TextArea} from '../../controls/TextInput';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import { ObterPaciente } from '../../controller/pacienteController';
import { ObterExame, DeletarExame, AtualizarExame } from '../../controller/exameController';
import BotaoVoltar from '../../controls/buttons'
import BotoesAlterar from '../../controls/botoesAlterar';

export default function App(props) {
  const CodigoExame = props.route.params.userkey
  const [CodigoPaciente, setCodigoPaciente] = useState('')
  const [NomePaciente, setNomePaciente] = useState('')
  const [NomeExame, setNomeExame] = useState('')
  const [DescricaoExame, setDescricao] = useState('')
  const [DataExame, setDataExame] = useState('')
  const [HoraExame, setHoraExame] = useState('')
  const [ResultadoExame, setResultadoExame] = useState('')
  const [isLoading, setLoad] = useState(true);

  async function obterCadastro()
  {
    let result = await ObterExame(CodigoExame)

    if(!result.sucesso)
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      })
      Voltar()
    }

    let exame = result.data
    
    setCodigoPaciente(exame.CodigoPaciente)
    let resultPaciente = await ObterPaciente(exame.CodigoPaciente)
    if(!result.sucesso)
    {
        Swal.fire({
            icon: 'error',
            text: result.mensagem
        })
        Voltar()
    }
    
    setNomeExame(exame.NomeExame)
    setDescricao(exame.DescricaoExame)
    setDataExame(exame.DataExame)
    setHoraExame(exame.HoraExame)
    setResultadoExame(exame.ResultadoExame)
    setNomePaciente(resultPaciente.data.NomePaciente)

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
          text: 'Deseja deletar este exame?',
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
      let result = await DeletarExame(CodigoExame)
      if(result.sucesso)
      {
      Swal.fire({
        icon: 'success',
        text: 'Exame deletado com sucesso!'
      })
      Voltar()
      }else
      {
        Swal.fire({
          icon: 'error',
          text: 'Não foi possivel deletar o Exame'
        })
        setLoad(false)
      }
  }

  async function AtualizarCadastro() {
    setLoad(true)
    let exame = {
      CodigoExame,
      CodigoPaciente,
      NomePaciente,
      DescricaoExame,
      NomeExame,
      HoraExame,
      DataExame,
      ResultadoExame,
    }

    let result = await AtualizarExame(exame);

    if(result.sucesso)
    {
      setLoad(false)
      Swal.fire({
        icon: 'success',
        text: 'Paciente atualizado com sucesso'
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
  <ScrollView>
    <SafeAreaView style={styles.container}>
    <View style={styles.containerMax}>
      <BotaoVoltar Voltar={Voltar}></BotaoVoltar>
    </View>
    <View style={styles.styledContainerMargin}> 
    <Input disabled={true} type="text" placeholder="Nome" value={NomePaciente} onInput={(e) => setNomePaciente(e.target.value)} LabelText={"Nome do Paciente"}/>
    
    <Input type="text" placeholder="Nome" value={NomeExame} onInput={(e) => setNomeExame(e.target.value)} LabelText={"Nome do Exame"}/>
 
    <TextArea type="text" placeholder="Descrição" value={DescricaoExame} onInput={(e) => setDescricao(e.target.value)} LabelText={"Desrcrição"}/>
    </View>
    <View style={styles.styledContainerMargin}> 
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
    
    <BotoesAlterar handleAtualizar={AtualizarCadastro} handleDeletar={Deletar}/>

    </SafeAreaView>
  </ScrollView>
  );
}

const styles = GetStyles()