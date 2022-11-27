import React, { useState} from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import { CadastrarMedicamento } from '../../controller/medicamentoController';
import {Input, TextArea as TextAreaInput} from '../../controls/TextInput';

export default function App() {

  const [NomeMedicamento, setNomeMedicamento] = useState('')
  const [Descricao, setDescricao] = useState('')
  const [Formula, setFormula] = useState('')

  async function Cadastrar()
  {
    let medicamento = {
        NomeMedicamento,
        Descricao,
        Formula
      }
    

    let result= await CadastrarMedicamento(medicamento)

    if (result.sucesso)
    {
    Swal.fire({
      icon: 'success',
      text: 'Medicamento cadastrado com sucesso'
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
    setNomeMedicamento('')
    setDescricao('')
    setFormula('')
  }

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.styledContainerMargin}> 
    <Input type="text" placeholder="Nome" value={NomeMedicamento} onInput={(e) => setNomeMedicamento(e.target.value)} LabelText={"Nome do Medicamento"}/>
 
    <TextAreaInput placeholder="Descrição" value={Descricao} onInput={(e) => setDescricao(e.target.value)} LabelText={"Descrição"}/>
 
    <Input type="text" placeholder="Formula" value={Formula} onInput={(e) => setFormula(e.target.value)} LabelText={"Formula"}/>
 
    </View>
    <TouchableOpacity style={styles.botaoVerde} onPress={Cadastrar} variant="primary" type="submit">
    <Text style={styles.textoBotaoVerde}>  Cadastrar </Text>
    </TouchableOpacity>
  </SafeAreaView>
  );
}

const styles = GetStyles()