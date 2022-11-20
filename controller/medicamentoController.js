import { ValidarMedicamento } from '../validators/MedicamentoValidator'
import firebase from '../services/connectionFirebase'

const result = {
    sucesso: false,
    mensagem: '',
    data: {}
}

export async function CadastrarMedicamento(medicamento)
{
var valido = await ValidarMedicamento(medicamento)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }

    let ref = firebase.firestore().collection('Medicamento');

    await ref.add(medicamento).then(() => {
    })
    .catch((err) => {
        
        console.error("Error occured: ", err);
        falha("erro ao cadastrar medicamento")
        return result
    });
    sucesso()
    return result
}

export async function ListarMedicamento()
{
    let medicamentos = []
    let docs = firebase.firestore().collection('Medicamento');
    await docs.get().then((res) => {
        if (res.empty) {
          falha('Não foi possivel buscar os medicamentos')
          return result
        }

        let snapshot = res.docs;
        snapshot.forEach((doc) => {
            let medicamento = doc.data();
            medicamento.id = doc.id;
            if(medicamento.NomeMedicamento !== "")
                medicamentos.push(medicamento)
            
          })
        
      }).catch(() => {
        falha("Não foi possivel buscar os medicamentos");
        return result;
      });

      sucesso(medicamentos)
      return result;
}

export async function ObterMedicamento(codigoMedicamento)
{
    let user
    const docRef = firebase.firestore().collection('Medicamento').doc(codigoMedicamento)
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

export async function DeletarMedicamento(codigoMedicamento)
{
    const docRef = firebase.firestore().collection('Medicamento').doc(codigoMedicamento)
    await docRef.delete().then(async () => {
      }).catch(() =>{
        falha("não foi possivel deletar o medicamento");
      })

      sucesso()
    return result;
}

export async function AtualizarMedicamento(medicamento)
{
    var valido = await ValidarMedicamento(medicamento)
    if(!valido.ehValido)
    {
        falha(valido.mensagem)
        return result
    }
    
    const docUpdate = firebase.firestore().collection('Medicamento').doc(medicamento.CodigoMedicamento);
    await docUpdate.set(medicamento).then(() => {
       sucesso();
    })
    .catch((error) => {
      console.error(error);
      falha("Não foi possivel Atualizar o medicamento")
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