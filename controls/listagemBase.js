import React, { useState,useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, Text } from 'react-native';
import GetStyles, {SecundaryColor} from '../model/styles/getStyles';
import { Input } from './TextInput';
import BotaoVoltar from './buttons' 

export default function App({dados, nomePrincipal, nomePrincipalLabel, nomeSecundario, nomeSecundarioLabel, onItemPress, id= "id", filtroVisivel = true, novoItem={visivel:false, novoItemPress: () => {}, texto:""}, botaoVoltar}) {

  const [isLoading, setLoad] = useState(true);
  let Data= dados;
  const [filtro, setFiltro] = useState(dados);
  const [filtroText, setFiltroText] = useState('')

  function renderItem({ item })
   {
    return (
      
      <TouchableOpacity 
      onPress={() => onItemPress(item[id], item[nomePrincipal])}
      style={styles.lista}>
        <Text style={styles.textoLista}><b>{nomePrincipalLabel}</b> {item[nomePrincipal]}</Text>
        <Text style={styles.textoLista}><b>{nomeSecundarioLabel}</b> {item[nomeSecundario]}</Text>
    </TouchableOpacity>
    );
  };

  function AplicarFiltro(value)
  {
    setFiltroText(value)
    let newArray = []
    Data.forEach((item) =>{
      if(item[nomePrincipal].toString().startsWith(value))
      newArray.push(item)
    })

    setFiltro(newArray)
  }

    return (
      <View style={styles.containerNoPadding}>
        <View style={filtroVisivel? { backgroundColor: SecundaryColor}: {display: 'none'}}>
          <View style={styles.containerLinha}>
            <View style={botaoVoltar === undefined? {display: 'none'}:{backgroundColor:SecundaryColor, height: '10px', paddingBottom: '20px'}}>
              <BotaoVoltar Voltar={botaoVoltar}/>
            </View>
            <View style={{width: '80%'}}>
              <Input type="text" placeholder="Filtro" value={filtroText} onInput ={(e) => AplicarFiltro(e.target.value.trim())} LabelText={"Filtrar"}></Input>
            </View>
          </View>
        </View>
      <ScrollView>
        <View style={styles.container}>
        
                <FlatList
                  data={filtro}
                  renderItem={renderItem}
                  keyExtractor={(item) => item[id]}
              />
              <TouchableOpacity style={novoItem.visivel? styles.lista : {display: 'none'}}
                onPress={() => novoItem.novoItemPress()}>
                <Text style={styles.textoLista}>{novoItem.texto}</Text>
              </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
    );
}

const styles = GetStyles()