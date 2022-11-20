import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {Input, TextArea} from '../../controls/TextInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import {ObterMedicamento, DeletarMedicamento, AtualizarMedicamento } from '../../controller/medicamentoController';

export default function App(props) {
  const CodigoMedicamento = props.route.params.userkey
  const [NomeMedicamento, setNomeMedicamento] = useState('')
  const [Descricao, setDescricao] = useState('')
  const [Formula, setFormula] = useState('')

  const [isLoading, setLoad] = useState(true);

  let medicamento
  async function obterCadastro()
  {
    let result = await ObterMedicamento(CodigoMedicamento)
    if(!result.sucesso)
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      })
      Voltar()
    }
    medicamento = result.data
    setNomeMedicamento(medicamento.NomeMedicamento);
    setDescricao(medicamento.Descricao);
    setFormula(medicamento.Formula);

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
          text: 'Deseja deletar este medicamento?',
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
      let result = await DeletarMedicamento(CodigoMedicamento)
      if(result.sucesso)
      {
      Swal.fire({
        icon: 'success',
        text: 'Medicamento deletado com sucesso!'
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
    let medicamento = {
      CodigoMedicamento,
      NomeMedicamento,
      Descricao,
      Formula
    }

    let result = await AtualizarMedicamento(medicamento);

    if(result.sucesso)
    {
      setLoad(false)
      Swal.fire({
        icon: 'success',
        text: 'Medicamento atualizado com sucesso'
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
      
    <TouchableOpacity style={styles.botao} onPress={Voltar} variant="primary" type="submit">
    <Text style={styles.textoBotaoVerde}>  Voltar</Text>
    </TouchableOpacity>

    <View style={styles.styledContainerMargin}> 

    <Input type="text" placeholder="Nome" value={NomeMedicamento} onInput={(e) => setNomeMedicamento(e.target.value)} LabelText={"Nome do Medicamento"}/>
 
    <TextArea placeholder="Descrição" value={Descricao} onInput={(e) => setDescricao(e.target.value)} LabelText={"Descrição"}/>
 
    <Input type="text" placeholder="Formula" value={Formula} onInput={(e) => setFormula(e.target.value)} LabelText={"Formula"}/>
 
    </View>
    <TouchableOpacity style={styles.botaoVermelho} onPress={Deletar} type="submit">
      <Text style={styles.textoBotaoVerde}> Deletar </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.botaoVerde} onPress={AtualizarCadastro} type="submit">
      <Text style={styles.textoBotaoVerde}>  Atualizar </Text>
    </TouchableOpacity>
  </SafeAreaView>
  );
}

const styles = GetStyles()