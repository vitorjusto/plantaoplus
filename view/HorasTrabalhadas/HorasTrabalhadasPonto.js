import React, { useState} from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import { CadastrarHorasTrabalhadas } from '../../controller/horasTrabalhadasController';
import {Input} from '../../controls/TextInput';

export default function App({email}) {

    const [HoraInicio, setHoraInicio] = useState('')

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
    <View> 

    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{width: '40%'}}>
        <Input type="time" value={HoraInicio} onInput={(e) => setHoraInicio(e.target.value)} LabelText={"Hora de entrada"}/>
      </View>
    </View>

    </View>
    <TouchableOpacity style={styles.botao}  variant="primary" type="submit">
    <Text>  Bater Ponto </Text>
    </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = GetStyles()