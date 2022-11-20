import { ValidarPaciente } from "../validators/PacienteValidator"
import { CadastrarEndereco } from "./enderecoController"
import firebase from '../services/connectionFirebase'
import { ObterEndereco, DeletarEndereco, AtualizarEndereco } from "./enderecoController";

const result = {
    sucesso: false,
    mensagem: '',
    data: {}
}

export async function CadastrarPaciente(paciente)
{
var valido = await ValidarPaciente(paciente)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }

    let ref = firebase.firestore().collection('Paciente');

    await ref.add(paciente).then(() => {
    })
    .catch((err) => {
        
        console.error("Error occured: ", err);
        falha("erro ao cadastrar paciente")
        return result
    });
    sucesso()
    return result
}

export async function ListarPaciente()
{
    let pacientes = []
    let docs = firebase.firestore().collection('Paciente');
    await docs.get().then((res) => {
        if (res.empty) {
          falha('Não foi possivel buscar os pacientes')
          return result
        }

        let snapshot = res.docs;
        snapshot.forEach((doc) => {
            let paciente = doc.data();
            paciente.id = doc.id;
            if(paciente.NomePaciente !== "")
                pacientes.push(paciente)
            
          })
        
      }).catch(() => {
        falha("Não foi possivel buscar os pacientes3");
        return result;
      });

      sucesso(pacientes)
      return result;
}

export async function ObterPaciente(codigoPaciente)
{
    let user
    const docRef = firebase.firestore().collection('Paciente').doc(codigoPaciente)
    await docRef.get().then((res) => {
      if (res.exists) {
        user = res.data();
        sucesso(user)
      } else {
        falha('Não foi possivel buscar o cadastro')
        return result
      }
    });
    
    return result;
}

export async function DeletarPaciente(codigoPaciente)
{
    const docRef = firebase.firestore().collection('Paciente').doc(codigoPaciente)
    await docRef.delete().then(async () => {
            sucesso();
      }).catch(() =>{
        falha("não foi possivel deletar o paciente");
      })

    return result;
}

export async function AtualizarPaciente(paciente)
{
    var valido = await ValidarPaciente(paciente)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }

    const docUpdate = firebase.firestore().collection('Paciente').doc(paciente.CodigoPaciente);
    await docUpdate.set(paciente).then(() => {
       sucesso();

    })
    .catch((error) => {
      console.error(error);
      falha("Não foi possivel Atualizar a paciente")
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