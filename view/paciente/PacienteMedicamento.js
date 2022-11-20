import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {Input, TextArea} from '../../controls/TextInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles, {fontColor} from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import {ObterMedicamento, DeletarMedicamento, AtualizarMedicamento } from '../../controller/medicamentoController';
import { AntDesign } from '@expo/vector-icons'; 

export default function App(props) {
  const CodigoMedicamento = props.route.params.userkey
  const CodigoMedicamentoPaciente = props.route.params.codigo
  const [NomeMedicamento, setNomeMedicamento] = useState(props.route.params.name)
  const [Descricao, setDescricao] = useState('')
  const [Formula, setFormula] = useState('')
  const [quantidade, setQuantidade] = useState(0)
  const [periodo, setPeriodo] = useState('')
  const [isLoading, setLoad] = useState(false);

  let medicamento
  async function obterCadastro()
  {
    if(CodigoMedicamentoPaciente === 0)
    {
      await buscarCadastro();
      return
    }

    let medicamento = props.route.params.medicamento
    
    setDescricao(medicamento.Descricao)
    setFormula(medicamento.Formula)
    setQuantidade(medicamento.quantidade)
    setPeriodo(medicamento.periodo)

  }
  
  async function buscarCadastro()
  {
    setLoad(true);
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
          text: 'Deseja remover este medicamento?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonText: 'Sim',
          denyButtonText: 'Não'
      }).then((result) => {
          
          if (result.isConfirmed) {
            DeletarCadastro()
          }
      })
    
  }
  
  async function DeletarCadastro() {
    let lista = props.route.params.medicamentos

      lista.forEach((value, index) => {
      
        if(value.id === CodigoMedicamentoPaciente)
        {
          lista.splice(index, 1);
        }
      })
        props.route.params.setMedicamentos(lista)

        if(props.route.params.componenteAtualizar === true)
        {
          props.navigation.navigate("Atualizar")
        }else
        {
          props.navigation.popToTop()
        }
  }

  function Validar()
  {
    if(quantidade <= 0)
    {
      Swal.fire({
        text: 'Quantidade não pode ser menor ou igual a zero',
        icon: 'error',
    })
      return false;
    }
    if(periodo === "")
    {
      Swal.fire({
        text: 'Periodo não pode ser vazio!',
        icon: 'error',
        })
      return false;
    }
    return true;
  }

  async function AtualizarCadastro() {
    
    if(!Validar())
      return;

    let lista = props.route.params.medicamentos
    if(CodigoMedicamentoPaciente === 0)
    {
      lista.push({id: Date.now(), NomeMedicamento, Descricao, Formula, quantidade, periodo})
    }else
    {
      let medicamento = {}
      lista.forEach((value, index) => {
      
        if(value.id === CodigoMedicamentoPaciente)
        {
          lista.splice(index, 1);
        }
      })
        lista.push({id: Date.now(), NomeMedicamento, Descricao, Formula, quantidade, periodo})

    }
        props.route.params.setMedicamentos(lista)
        if(props.route.params.componenteAtualizar === true)
        {
          props.navigation.navigate("Atualizar")
        }else
          props.navigation.popToTop()
    
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

    <Input type="text" placeholder="Nome" disabled={true} value={NomeMedicamento} onInput={(e) => setNomeMedicamento(e.target.value)} LabelText={"Nome do Medicamento"}/>
 
    <TextArea placeholder="Descrição" disabled={true} value={Descricao} onInput={(e) => setDescricao(e.target.value)} LabelText={"Descrição"}/>
 
    <Input type="text" placeholder="Formula" disabled={true} value={Formula} onInput={(e) => setFormula(e.target.value)} LabelText={"Formula"}/>
 
    </View>
    <View style={styles.styledContainerMargin}>
    <Input type="number" placeholder={"quantidade"} LabelText={"Quantidade"} onInput={(e) => setQuantidade(e.target.value)} value={quantidade}/>
    <Input type="text" placeholder={"periodo"} LabelText={"Periodo"} onInput={(e) => setPeriodo(e.target.value)} value={periodo}/>  
    </View> 

    <TouchableOpacity style={styles.botaoVerde} onPress={AtualizarCadastro} type="submit">
      <Text style={styles.textoBotaoVerde}>{CodigoMedicamentoPaciente === 0? "Adicionar": "Alterar"}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={CodigoMedicamentoPaciente === 0? {display: 'none'}: styles.botaoVermelho} onPress={Deletar} variant="danger" type="submit">
      <Text style={styles.textoBotaoVerde}>Remover</Text>
    </TouchableOpacity>
  </SafeAreaView>
  </ScrollView>
  );
}

const styles = GetStyles()