import { ValidarHorasTrabalhadas } from '../validators/HorasTrabalhadasValidator'
import firebase from '../services/connectionFirebase'

const result = {
    sucesso: false,
    mensagem: '',
    data: {}
}

export async function CadastrarHorasTrabalhadas(HorasTrabalhadas)
{
var valido = await ValidarHorasTrabalhadas(HorasTrabalhadas)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }

    let ref = firebase.firestore().collection('HorasTrabalhadas');

    await ref.add(HorasTrabalhadas).then(() => {
    })
    .catch((err) => {
        
        console.error("Error occured: ", err);
        falha("erro ao cadastrar as Horas")
        return result
    });
    sucesso()
    return result
}

export async function ListarHorasTrabalhadas(email, adm)
{
    let HorasTrabalhadas = []
    let docs = firebase.firestore().collection('HorasTrabalhadas');
    await docs.get().then((res) => {
        if (res.empty) {
          falha('Não foi possivel buscar as Horas')
          return result
        }

        let snapshot = res.docs;
        snapshot.forEach((doc) => {
            let horasTrabalhadas = doc.data();
            horasTrabalhadas.CodigoHorasTrabalhadas = doc.id;
            if(horasTrabalhadas.DataTrabalhada !== "" && (horasTrabalhadas.Email === email || adm))
                HorasTrabalhadas.push(horasTrabalhadas)
            
          })
        
      }).catch(() => {
        falha("Não foi possivel buscar as Horas");
        return result;
      });
      
      sucesso(HorasTrabalhadas)
      return result;
}

export async function ObterHorasTrabalhadas(codigoHorasTrabalhadas)
{
    let user
    const docRef = firebase.firestore().collection('HorasTrabalhadas').doc(codigoHorasTrabalhadas)
    await docRef.get().then((res) => {
      if (res.exists) {
        user = res.data();
      } else {
        falha('Não foi possivel buscar o cadastro')
        return result
      }
    });
    
    sucesso(user)
    
    return result;
}

export async function DeletarHorasTrabalhadas(codigoHorasTrabalhadas)
{
    const docRef = firebase.firestore().collection('HorasTrabalhadas').doc(codigoHorasTrabalhadas)
    await docRef.delete().then(async () => {
      }).catch(() =>{
        falha("não foi possivel deletar o HorasTrabalhadas");
      })

      sucesso()
    return result;
}

export async function AtualizarHorasTrabalhadas(HorasTrabalhadas)
{
    var valido = await ValidarHorasTrabalhadas(HorasTrabalhadas)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }
    
    const docUpdate = firebase.firestore().collection('HorasTrabalhadas').doc(HorasTrabalhadas.CodigoHorasTrabalhadas);
    await docUpdate.set(HorasTrabalhadas).then(() => {
       sucesso();
    })
    .catch((error) => {
      console.error(error);
      falha("Não foi possivel Atualizar o HorasTrabalhadas")
    });

    return result
}

function falha(texto)
{
    result.mensagem = texto
    result.sucesso = false
    result.data = {}
}

function sucesso(data)
{
    result.sucesso = true
    result.data = data
}