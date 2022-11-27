import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import EnderecoCadastro from '../endereco/enderecoCadastro'
import Swal from 'sweetalert2'
import { ObterEnfermeira, DeletarEnfermeira, AtualizarEnfermeira } from '../../controller/enfermeiraController';
import { Input, MaskInput } from '../../controls/TextInput';
import BotaoVoltar from '../../controls/buttons'

export default function App(props) {
  const codigoEnfermeira = props.route.params.userkey
  const [nome, setNome] = useState('');
  const [coren, setCoren] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [isLoading, setLoad] = useState(true);

  let enfermeira
  async function obterCadastro()
  {
    let result = await ObterEnfermeira(codigoEnfermeira)
    if(!result.sucesso)
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      })
      Voltar()
    }
    enfermeira = result.data
    setNome(enfermeira.NomeEnfermeira);
    setCoren(enfermeira.Coren);
    setCargo(enfermeira.Cargo);
    setTelefone(enfermeira.Telefone);
    setRua(enfermeira.Endereco.Rua);
    setBairro(enfermeira.Endereco.Bairro);
    setCidade(enfermeira.Endereco.Cidade);
    setNumero(enfermeira.Endereco.Numero);
    setLoad(false);

  }
  
  useEffect(() => {
    obterCadastro()
  }, []);

  function Voltar()
  {
    props.navigation.navigate('Listagem')
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
      let result = await DeletarEnfermeira(codigoEnfermeira)
      if(result.sucesso)
      {
      Swal.fire({
        icon: 'success',
        text: 'Enfermeira deletado com sucesso!'
      })
      Voltar()
      }else
      {
        Swal.fire({
          icon: 'error',
          text: 'Não foi possivel deletar a Enfermeira'
        })
        setLoad(false)
      }
  }
  function Atualizar()
  {
    AtualizarCadastro()
  }

  async function AtualizarCadastro() {
    setLoad(true)
    let enfermeira = {
      NomeEnfermeira: nome,
      Coren: coren,
      Cargo: cargo,
      Telefone: telefone,
      CodigoEnfermeira: codigoEnfermeira,
      Endereco:{
        Rua: rua,
        Numero: numero,
        Bairro: bairro,
        Cidade: cidade, 

      }
    }

    let result = await AtualizarEnfermeira(enfermeira);

    if(result.sucesso)
    {
      Swal.fire({
        icon: 'success',
        text: 'Enfermeira atualizado com sucesso'
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
    <Input type="text" placeholder="Nome da enfermeira" value={nome} onInput ={(e) => setNome(e.target.value)} LabelText={"Nome da Enfermeira"}></Input>
    </View>
    <View style={styles.styledContainerMargin}>
    <Input type="text" placeholder="Digite o número do Coren" value={coren}  onInput ={(e) => setCoren(e.target.value)} LabelText={"Numero do Coren"}></Input>

    <Input type="text" placeholder="Digite o cargo" value={cargo} onInput ={(e) => setCargo(e.target.value)} LabelText={"Cargo"}></Input>
    
    <MaskInput type="text" placeholder="Digite o telefone" value={telefone} mask={"(00)0000-0000"} onInput ={(e) => setTelefone(e.target.value)} LabelText={"Telefone"}></MaskInput>
    </View>
       <EnderecoCadastro stateRua={{SetRua: setRua, Rua: rua}}
                         stateBairro={{SetBairro: setBairro, Bairro: bairro}}
                         stateNumero={{SetNumero: setNumero, Numero: numero}} 
                         stateCidade={{SetCidade: setCidade, Cidade: cidade}}></EnderecoCadastro>
       
    </View>

    
    <TouchableOpacity style={styles.botaoVermelho} onPress={Deletar} type="submit">
    <Text style={styles.textoBotaoVerde}>Deletar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.botaoVerde} onPress={Atualizar} type="submit">
    <Text style={styles.textoBotaoVerde}>Atualizar</Text>
    </TouchableOpacity>
    </SafeAreaView>
  </ScrollView>
  );
}

const styles = GetStyles()