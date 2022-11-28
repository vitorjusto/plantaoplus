import { View, TouchableOpacity, Text } from "react-native"
import GetStyles from "../model/styles/getStyles"

export default function botoesAlterar({handleDeletar, handleAtualizar})
{
    return(
        <View style={styles.containerMax}>
        <View style={{display:"flex", flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.botaoVerdeNoMaxWidth} onPress={handleAtualizar} type="submit">
                <Text style={styles.textoBotaoVerde}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoVermelhoNoMaxWidth} onPress={handleDeletar} type="submit">
                <Text style={styles.textoBotaoVerde}>Deletar</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

let styles = GetStyles();