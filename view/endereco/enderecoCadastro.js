
import { View, TextInput, Text} from 'react-native';
import GetStyles from '../../model/styles/getStyles'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, MaskInput } from '../../controls/TextInput';

export default function EnderecoControle({ stateRua, stateNumero,stateBairro, stateCidade})
{
    
  return (
    <View style={styles.containerNoPadding}>
    <View style={styles.styledContainer}>
        <Input type="text" placeholder="Digite seu endereço" value={stateRua.Rua} onInput ={(e) => stateRua.SetRua(e.target.value)} LabelText={"Rua"}></Input>
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      
      
      <View style={{width: '65%'}}>
        <Input type="text" placeholder="Digite seu bairro" value={stateBairro.Bairro} onInput ={(e) => stateBairro.SetBairro(e.target.value)} LabelText={"Bairro"}></Input>
      </View>
      <View style={{width: '30%'}}>
        <Input type="text" placeholder="Número" value={stateNumero.Numero} onInput ={(e) => stateNumero.SetNumero(e.target.value)} LabelText={"Numero"}></Input>

      </View>
    </View>

      <View>
      <Input type="text" placeholder="Digite o nome da cidade" value={stateCidade.Cidade} onInput ={(e) => stateCidade.SetCidade(e.target.value)} LabelText={"Cidade"}></Input>

      </View>
      </View>
  </View> 
  );
}

const styles = GetStyles()