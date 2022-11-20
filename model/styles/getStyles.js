import { StyleSheet} from 'react-native';

export const BackgroundColor = 'rgb(250, 250, 250)';
export const SecundaryColor = 'rgb(230, 230, 230)';
export const fontColor = 'rgb(150, 150, 150)';
export const SecundaryColorAlpha = 'rgba(255, 255, 255, 0.1)' 
export const DarkerColor = 'rgb(63, 68, 201)';
export const Green = 'rgb(121, 210, 121)';
export const Red = 'rgb(255, 120, 120)';

export default function GetStyles()
{
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: BackgroundColor
        },
        roundContainer: {
          flex: 1,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: BackgroundColor,
          borderRadius: "25px"
        },

        containerNoPadding:{
          flex: 1,
          backgroundColor: BackgroundColor
        },
        containerNoFlex:{
          paddingLeft: 20,
          paddingRight: 20,
        },
        containerMiddle:{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: BackgroundColor,
          justifyContent: 'space-evenly'
        },
        styledContainer:{
          backgroundColor: SecundaryColor,
          padding: "10px",
          borderRadius: "25px"
        },
        styledContainerMargin:{
          backgroundColor: SecundaryColor,
          padding: "10px",
          borderRadius: "25px",
          marginBottom: 10
        },

        input:{
          paddingBottom: 10,
          paddingTop: 10
        },
        loader: {
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',    
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: BackgroundColor
        },
        lista:{
          backgroundColor: SecundaryColor,
          marginBottom: '10px',
          padding: 20,
          borderRadius: '20px'
        },
        textoLista:{
          color: "rgb(77, 77, 77)",
          fontSize: 20,
          marginBottom: 10
        },
        botao:{
          marginTop: "20px",
          marginBottom: "20px",
          textAlign: 'center',
          backgroundColor: DarkerColor,
          height: 40,
          paddingTop: 7,
          borderRadius: 20,
        },
        botaoVoltar:{
          marginBottom: "20px",
          textAlign: 'center',
          height: 40,
          paddingTop: 7,
          borderRadius: 20,
        },
        botaoVerde:{
          marginTop: "20px",
          marginBottom: "20px",
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: Green,
          height: 40,
          borderRadius: 20,
          color: "white"
        },
        textoBotaoVerde:{
          color: "white",
        },
        botaoVermelho:{
          marginTop: "20px",
          marginBottom: "20px",
          textAlign: 'center',
          backgroundColor: Red,
          height: 40,
          borderRadius: 20,
          color: "white",
          display: 'flex',
          justifyContent: 'center',
        },
        texto:{
          fontSize: 20,
          paddingBottom: 10
        },
        title:{
          color: fontColor,
          fontSize: '30px',
          marginBottom: '20px'
        },
        titleMenor:{
          color: fontColor,
          fontSize: '20px',
          marginBottom: '20px'
        },
        labelText:{
          color: fontColor,
          fontWeight: 'bold',
          marginBottom: '7px',
          paddingLeft: '2px'
        },
        linkText:{
          color: 'blue',
          paddingTop: '10px'
        },
        containerLinha:{
          
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        },
        containerLinhaSemPadding:{
          
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        } 

      });

    return styles
}