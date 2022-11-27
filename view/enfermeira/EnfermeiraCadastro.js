import React, { useState} from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import EnderecoCadastro from '../endereco/enderecoCadastro'
import Swal from 'sweetalert2'
import { CadastrarEnfermeira } from '../../controller/enfermeiraController';
import { Input, MaskInput } from '../../controls/TextInput';

export default function App() {
  const [nome, setNome] = useState('');
  const [coren, setCoren] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  async function Cadastrar()
  {
    let enfermeira = {
      NomeEnfermeira: nome,
      Coren: coren,
      Cargo: cargo,
      Telefone: telefone,
      email,
      Endereco:{
        Rua: rua,
        Numero: numero,
        Bairro: bairro,
        Cidade: cidade,
        CodigoEndereco: '' 

      }
    }

    let result= await CadastrarEnfermeira(enfermeira)

    if (result.sucesso)
    {
    Swal.fire({
      icon: 'success',
      text: 'Enfermeira cadastrado com sucesso'
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
    setCoren('');
    setCargo('');
    setTelefone('');
    setRua('');
    setNumero('');
    setCidade('');
    setEmail('');
  }

  return (
  <ScrollView>
    <SafeAreaView style={styles.container}>
    <View> 
    <View style={styles.styledContainerMargin}>
    <Input type="text" placeholder="Nome da enfermeira" value={nome} onInput ={(e) => setNome(e.target.value)} LabelText={"Nome da Enfermeira"}></Input>
    </View>
    <View style={styles.styledContainerMargin}>
    <Input type="text" placeholder={"Digite o email da enfermeira"} onInput ={(e) => setEmail(e.target.value)} LabelText={"Login"}></Input>
    <Text style={{padding: 10}}>A senha padrão é 123456</Text>
    
    <Input type="text" placeholder="Digite o número do Coren" value={coren}  onInput ={(e) => setCoren(e.target.value)} LabelText={"Numero do Coren"}></Input>

    <Input type="text" placeholder="Digite o cargo" value={cargo} onInput ={(e) => setCargo(e.target.value)} LabelText={"Cargo"}></Input>
    
    <MaskInput type="text" placeholder="Digite o telefone" value={telefone} mask={"(00)0000-0000"} onInput ={(e) => setTelefone(e.target.value)} LabelText={"Telefone"}></MaskInput>
    </View> 
       <EnderecoCadastro stateRua={{SetRua: setRua, Rua: rua}}
                         stateBairro={{SetBairro: setBairro, Bairro: bairro}}
                         stateNumero={{SetNumero: setNumero, Numero: numero}} 
                         stateCidade={{SetCidade: setCidade, Cidade: cidade}}></EnderecoCadastro>
       
    </View>
    <TouchableOpacity style={styles.botaoVerde} onPress={Cadastrar} variant="primary" type="submit">
      <Text style={styles.textoBotaoVerde}> Cadastrar </Text>
    </TouchableOpacity>
    </SafeAreaView>
  </ScrollView>
  );
}

const styles = GetStyles()