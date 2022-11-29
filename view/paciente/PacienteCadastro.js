import React, { useState, useRef} from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import EnderecoCadastro from '../endereco/enderecoCadastro'
import Swal from 'sweetalert2'
import { CadastrarPaciente } from '../../controller/pacienteController';
import {Input, MaskInput} from '../../controls/TextInput';
import Accordion from 'react-bootstrap/Accordion';
import ListagemBase from '../../controls/listagemBase'

export default function App({navigation}) {
  const [nome, setNome] = useState('');
  const [DataNasc, setDataNasc] = useState('');
  const [Cpf, setCpf] = useState('');
  const [NumSus, setNumSus] = useState('');
  const [Pressao, setPressao] = useState('');
  const [Peso, setPeso] = useState('');
  const [Altura, setAltura] = useState('');
  const [Alergia, setAlergia] = useState('');
  const [telefone, setTelefone] = useState('');
  const [maskedValue, setMaskedValue] = useState('')
  const [maskedValuecpf, setMaskedValuecpf] = useState('')
  const [maskedValuesus, setMaskedValuesus] = useState('')
  const [maskedValuepressao, setMaskedValuepressao] = useState('')
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const [medicamentos, setMedicamentos] = useState([]);

  const medicamentoPress = (x, y) => {
    
    let medicamento = {};
    
    medicamentos.forEach((value) => {
      
      if(value.id === x)
      {
        medicamento = value;
      }
    })
    navigation.navigate('MedicamentoCadastro', {
      userkey: "",
      codigo: x,
      name: medicamento.NomeMedicamento,
      medicamentos: medicamentos,
      setMedicamentos: setMedicamentos,
      medicamento: medicamento
    });

    setMedicamentos([{NomeMedicamento: "s", quantidade: "1"}])
  };

  const novoMedicamento = () => {
    navigation.navigate('Medicamento', {
      onPressNavigation:'Cadastro',
      medicamentos: medicamentos,
      setMedicamentos: setMedicamentos
    });
    setMedicamentos([{NomeMedicamento: "s", quantidade: "1"}])
  }

  async function Cadastrar()
  {
    let paciente = {
      NomePaciente: nome,
      DataNasc: DataNasc,
      Cpf: Cpf,
      NumSus: NumSus,
      Pressao: Pressao,
      Peso: Peso,
      Altura: Altura,
      Alergia: Alergia,  
      Telefone: telefone,
      Endereco:{
        Rua: rua,
        Numero: numero,
        Bairro: bairro,
        Cidade: cidade,
        CodigoEndereco: '' 

      },
      Medicamentos: medicamentos
    }

    let result= await CadastrarPaciente(paciente)

    if (result.sucesso)
    {
    Swal.fire({
      icon: 'success',
      text: 'paciente cadastrado com sucesso'
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
    setNome('');
    setDataNasc('');
    setCpf('');
    setNumSus('');
    setPressao('');
    setPeso('');
    setAltura('');
    setAlergia('');
    setTelefone('');
    setTelefone('');
    setRua('');
    setBairro('');
    setNumero('');
    setCidade('');
    setMaskedValue('');
    setMaskedValuecpf('');
    setMaskedValuesus('');
    setMaskedValuepressao('');
    setMedicamentos([]);
  }

  return (
  <ScrollView>
    <SafeAreaView style={styles.container}>
    <View > 
    <View style={styles.styledContainerMargin}>
    <Input type="text" placeholder="Nome" value={nome} onInput={(e) => setNome(e.target.value)} LabelText={"Nome do Paciente"}/>

    <Input type="Date" placeholder="" value={DataNasc} onInput={(e) => setDataNasc(e.target.value)} LabelText={"Data De Nascimento"}/>

    <MaskInput type="text" maskedValue={maskedValuecpf} setMaskedValue={setMaskedValuecpf} placeholder="" value={Cpf} mask={"111,111,111-11"} onInput ={(e) => setCpf(e.target.value)} LabelText={"CPF"}/>

    <MaskInput type="text" maskedValue={maskedValue} setMaskedValue={setMaskedValue} placeholder="Telefone" value={telefone} mask={"(00)0000-0000"} onInput ={(e) => setTelefone(e.target.value)} LabelText={"Telefone"}></MaskInput>
    </View>
    
    <View style={styles.styledContainerMargin}> 
    <MaskInput type="text" maskedValue={maskedValuesus} setMaskedValue={setMaskedValuesus} placeholder="000 0000 0000" value={NumSus} mask={"000 0000 0000"} onInput ={(e) => setNumSus(e.target.value)} LabelText={"Numero do Sus"}></MaskInput>
     
    <MaskInput type="text" maskedValue={maskedValuepressao} setMaskedValue={setMaskedValuepressao} placeholder="" value={Pressao} mask={"00.0-00.0"} onInput={(e) => setPressao(e.target.value)} LabelText={"Pressão"}/>

    <Input type="Number" placeholder="" value={Peso} onInput={(e) => setPeso(e.target.value)} LabelText={"Peso"}/>
    
    <Input type="Number" placeholder="" value={Altura} onInput={(e) => setAltura(e.target.value)} LabelText={"Altura"}/>
    
    <Input type="text" placeholder="" value={Alergia} onInput={(e) => setAlergia(e.target.value)} LabelText={"Alergia"}/>
    </View>
    <View style={styles.styledContainerMargin}> 
    <Accordion defaultActiveKey="1" style={{paddingTop: "10px", paddingBottom: "10px"}}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Medicamentos</Accordion.Header>
        <Accordion.Body>
        <ListagemBase
        dados={medicamentos} 
        nomePrincipal= "NomeMedicamento"
        nomePrincipalLabel="Nome do Medicamento: "
        nomeSecundario="quantidade"
        nomeSecundarioLabel= "Quantidade: "
        onItemPress={medicamentoPress}
        filtroVisivel= {false}
        novoItem= {{visivel:true, novoItemPress: novoMedicamento, texto:"Novo Item"}}
      />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </View>
       <EnderecoCadastro stateRua={{SetRua: setRua, Rua: rua}}
                         stateBairro={{SetBairro: setBairro, Bairro: bairro}}
                         stateNumero={{SetNumero: setNumero, Numero: numero}} 
                         stateCidade={{SetCidade: setCidade, Cidade: cidade}}></EnderecoCadastro>
       
    </View>
    <TouchableOpacity style={styles.botaoVerde} onPress={Cadastrar} variant="primary" type="submit">
    <Text style={styles.textoBotaoVerde}>  Cadastrar</Text>
      </TouchableOpacity>
  </SafeAreaView>
  </ScrollView>
  );
}

const styles = GetStyles()