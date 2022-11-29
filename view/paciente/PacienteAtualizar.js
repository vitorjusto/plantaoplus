import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {Input, MaskInput} from '../../controls/TextInput'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles, {fontColor} from '../../model/styles/getStyles'
import EnderecoCadastro from '../endereco/enderecoCadastro'
import Swal from 'sweetalert2'
import { ObterPaciente, DeletarPaciente, AtualizarPaciente } from '../../controller/pacienteController';
import BotaoVoltar from '../../controls/buttons'
import Accordion from 'react-bootstrap/Accordion';
import ListagemBase from '../../controls/listagemBase'

export default function App(props) {
  const [codigoPaciente, setCodigo] = useState('')
  const [nome, setNome] = useState('');
  const [DataNasc, setDataNasc] = useState('');
  const [Cpf, setCpf] = useState('');
  const [NumSus, setNumSus] = useState('');
  const [Pressao, setPressao] = useState('');
  const [Peso, setPeso] = useState('');
  const [Altura, setAltura] = useState('');
  const [Alergia, setAlergia] = useState('');
  const [telefone, setTelefone] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [maskedValue, setMaskedValue] = useState('')
  const [maskedValuecpf, setMaskedValuecpf] = useState('')
  const [maskedValuesus, setMaskedValuesus] = useState('')
  const [maskedValuepressao, setMaskedValuepressao] = useState('')
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [isLoading, setLoad] = useState(true);

  let paciente
  async function obterCadastro()
  {
    let result = await ObterPaciente(props.route.params.userkey)
    if(!result.sucesso)
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      })
      Voltar()
    }
    paciente = result.data
    setNome(paciente.NomePaciente);
    setDataNasc(paciente.DataNasc);
    setAlergia(paciente.Alergia);
    setAltura(paciente.Altura);
    setCpf(paciente.Cpf);
    setNumSus(paciente.NumSus);
    setPeso(paciente.Peso);
    setPressao(paciente.Pressao);
    setTelefone(paciente.Telefone);
    setRua(paciente.Endereco.Rua);
    setBairro(paciente.Endereco.Bairro);
    setCidade(paciente.Endereco.Cidade);
    setNumero(paciente.Endereco.Numero);
    setMedicamentos(paciente.Medicamentos)
    setMaskedValue(paciente.Telefone);
    setMaskedValuecpf(paciente.Cpf);
    setMaskedValuesus(paciente.NumSus);
    setMaskedValuepressao(paciente.Pressao);
    setLoad(false);

  }

  const medicamentoPress = (x, y) => {
    let medicamento = {};
    
    medicamentos.forEach((value) => {
      
      if(value.id === x)
      {
        medicamento = value;
      }
    })

    props.navigation.navigate('MedicamentoCadastro', {
      userkey: "",
      codigo: x,
      name: medicamento.NomeMedicamento,
      medicamentos: medicamentos,
      setMedicamentos: setMedicamentos,
      medicamento: medicamento,
      componenteAtualizar: true,
    });

    setMedicamentos([{NomeMedicamento: "s", quantidade: "1"}])
  };

  const novoMedicamento = () => {
    props.navigation.navigate('Medicamento', {
      onPressNavigation:'Cadastro',
      medicamentos: medicamentos,
      setMedicamentos: setMedicamentos,
      componenteAtualizar: true
    });
    setMedicamentos([{NomeMedicamento: "s", quantidade: "1"}])
  }
  
  useEffect(() => {
    setCodigo(props.route.params.userkey)
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
      let result = await DeletarPaciente(codigoPaciente)
      if(result.sucesso)
      {
      Swal.fire({
        icon: 'success',
        text: 'Paciente deletado com sucesso!'
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
    let paciente = {
      NomePaciente: nome,
      Alergia: Alergia,
      Altura: Altura,
      Cpf: Cpf,
      NumSus: NumSus,
      Peso: Peso,
      Pressao: Pressao,
      Telefone: telefone,
      DataNasc: DataNasc,
      CodigoPaciente: codigoPaciente,
      Endereco:{
        Rua: rua,
        Numero: numero,
        Bairro: bairro,
        Cidade: cidade,
      },
      Medicamentos: medicamentos
    }

    let result = await AtualizarPaciente(paciente);

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
    <View> 
      <View style={styles.styledContainerMargin}>
        <Input type="text" placeholder="Nome" value={nome} onInput={(e) => setNome(e.target.value)} LabelText={"Nome do Paciente"}/>

        <Input type="Date" placeholder="" value={DataNasc} onInput={(e) => setDataNasc(e.target.value)} LabelText={"Data De Nascimento"}/>

        <MaskInput type="text" maskedValue={maskedValuecpf} setMaskedValue={setMaskedValuecpf} placeholder="" value={Cpf} mask={"111,111,111-11"} onInput ={(e) => setCpf(e.target.value)} LabelText={"CPF"}/>

        <MaskInput type="text" maskedValue={maskedValue} setMaskedValue={setMaskedValue} placeholder="Telefone" value={telefone} mask={"(00)0000-0000"} onInput ={(e) => setTelefone(e.target.value)} LabelText={"Telefone"}></MaskInput>
      </View>
      <View style={styles.styledContainerMargin}>
        <MaskInput type="text" maskedValue={maskedValuesus} setMaskedValue={setMaskedValuesus} placeholder="000 0000 0000" value={NumSus} mask={"000 0000 0000"} onInput ={(e) => setNumSus(e.target.value)} LabelText={"Numero do SUS"}></MaskInput>
     
        <MaskInput type="text" maskedValue={maskedValuepressao} setMaskedValue={setMaskedValuepressao} placeholder="" value={Pressao} mask={"00.0-00.0"} onInput={(e) => setPressao(e.target.value)} LabelText={"Pressão"}/>

        <Input type="Number" placeholder="" value={Peso} onInput={(e) => setPeso(e.target.value)} LabelText={"Peso"}/>
    
        <Input type="Number" placeholder="" value={Altura} onInput={(e) => setAltura(e.target.value)} LabelText={"Altura"}/>
    
        <Input type="Number" placeholder="" value={Alergia} onInput={(e) => setAlergia(e.target.value)} LabelText={"Alergia"}/>
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
    <TouchableOpacity style={styles.botaoVermelho} onPress={Deletar} variant="danger" type="submit">
    <Text style={styles.textoBotaoVerde}>Deletar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.botaoVerde} onPress={AtualizarCadastro} variant="success" type="submit">
      <Text style={styles.textoBotaoVerde}>Atualizar</Text>
    </TouchableOpacity>
  </SafeAreaView>
  </ScrollView>
  );
}

const styles = GetStyles()