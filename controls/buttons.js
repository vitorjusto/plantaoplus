import { AntDesign } from '@expo/vector-icons'; 
import GetStyles, {fontColor} from '../model/styles/getStyles';
import {  View, TouchableOpacity} from 'react-native';

export default function App({Voltar})
{
    return(
        <View style={{width:35}}>
            <TouchableOpacity style={styles.botaoVoltar} onPress={Voltar} variant="primary" type="submit">
                <AntDesign name='leftcircleo' size={30} color={fontColor}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = GetStyles()