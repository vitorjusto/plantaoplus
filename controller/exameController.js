import { ValidarExame } from '../validators/ValidarExame'
import firebase from '../services/connectionFirebase'

const result = {
    sucesso: false,
    mensagem: '',
    data: {}
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

export async function CadastrarExame(exame)
{
var valido = await ValidarExame(exame)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }

    let ref = firebase.firestore().collection('Exame');

    await ref.add(exame).then(() => {
    })
    .catch((err) => {
        
        console.error("Error occured: ", err);
        falha("erro ao cadastrar Exame")
        return result
    });
    sucesso()
    return result
}

export async function ListarExame()
{
    let Exames = []
    let docs = firebase.firestore().collection('Exame');
    await docs.get().then((res) => {
        if (res.empty) {
          falha('Não foi possivel buscar os Exames')
          return result
        }

        let snapshot = res.docs;
        snapshot.forEach((doc) => {
            let Exame = doc.data();
            Exame.id = doc.id;
            if(Exame.NomeExame !== "")
                Exames.push({NomeExame: Exame.NomeExame, CodigoExame: Exame.id, DataExame: new Date(`${Exame.DataExame} ${Exame.HoraExame}`)})
          })
          Exames.sort(function(a, b){return b.DataExame.getTime() - a.DataExame.getTime()})
      }).catch(() => {
        falha("Não foi possivel buscar os Exames");
        return result;
      });

      sucesso(Exames)
      return result;
}

export async function ObterExame(codigoExame)
{
    let user
    const docRef = firebase.firestore().collection('Exame').doc(codigoExame)
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

export async function DeletarExame(codigoExame)
{
    const docRef = firebase.firestore().collection('Exame').doc(codigoExame)
    await docRef.delete().then(async () => {
      }).catch(() =>{
        falha("não foi possivel deletar o Exame");
      })

      sucesso()
    return result;
}

export async function AtualizarExame(Exame)
{
    var valido = await ValidarExame(Exame)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }
    
    const docUpdate = firebase.firestore().collection('Exame').doc(Exame.CodigoExame);
    await docUpdate.set(Exame).then(() => {
       sucesso();
    })
    .catch((error) => {
      console.error(error);
      falha("Não foi possivel Atualizar o Exame")
    });

    return result
}