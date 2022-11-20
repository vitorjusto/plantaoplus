import firebase from '../services/connectionFirebase'
import { CadastrarEndereco, ObterEndereco, DeletarEndereco, AtualizarEndereco } from './enderecoController';
import { ValidarEnfermeira } from '../validators/EnfermeiraValidator';
import { cadastrarLogin } from './loginController';

const result = {
    sucesso: false,
    mensagem: '',
    data: {}
}

export async function CadastrarEnfermeira(enfermeira)
{
    var valido = await ValidarEnfermeira(enfermeira)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }

    let resultLogin = await cadastrarLogin(enfermeira.email)

    if(!resultLogin.sucesso)
    {
        falha("Erro ao cadastrar enfermeira")
        return result
    }

    let ref = firebase.firestore().collection('Enfermeira');

    await ref.add(enfermeira).then(async () => {
     
     
    })
    .catch((err) => {
        
        console.error("Error occured: ", err);
        falha("erro ao cadastrar enfermeira")
        return result
    });
    sucesso()
    return result
}

export async function ObterEnfermeira(codigoEnfermeira)
{
    let user
    const docRef = firebase.firestore().collection('Enfermeira').doc(codigoEnfermeira)
    await docRef.get().then((res) => {
      if (res.exists) {
        user = res.data();
        sucesso(user);
      } else {
        falha('Não foi possivel buscar o cadastro')
        return result
      }
    });
    
    return result;
}

export async function DeletarEnfermeira(codigoEnfermeira)
{
    const docRef = firebase.firestore().collection('Enfermeira').doc(codigoEnfermeira)
    await docRef.delete().then(async () => {
        
            sucesso();
      }).catch(() =>{
        falha("não foi possivel deletar a enfermeira");
      })

    return result;
}

export async function AtualizarEnfermeira(enfermeira)
{
    var valido = await ValidarEnfermeira(enfermeira)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }

    const docUpdate = firebase.firestore().collection('Enfermeira').doc(enfermeira.CodigoEnfermeira);
    await docUpdate.set(enfermeira).then(() => {
       sucesso();

    })
    .catch((error) => {
      console.error(error);
      falha("Não foi possivel Atualizar a enfermeira")
    });

    return result
}

export async function ListarEnfermeira()
{
    let Enfermeiras = []
    let docs = firebase.firestore().collection('Enfermeira');
    await docs.get().then((res) => {
        if (res.empty) {
          falha('Não foi possivel buscar as Enfermeiras')
          return result
        }

        let snapshot = res.docs;
        snapshot.forEach((doc) => {
            let Enfermeira = doc.data();
            Enfermeira.id = doc.id;
            if(Enfermeira.NomeEnfermeira !== "")
                Enfermeiras.push(Enfermeira)
          })
        
      }).catch(() => {
        falha("Não foi possivel buscar os Enfermeiras");
        return result;
      });

      sucesso(Enfermeiras)
      return result;
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