import firebase from '../services/connectionFirebase'

const result = {
  sucesso: false,
  mensagem: '',
  data: {}
}

export async function CadastrarEndereco(endereco)
{
    let ref = firebase.firestore().collection('Endereco');
    var codigoEndereco = ''
    await ref.add({
      Rua: endereco.Rua,
      Bairro: endereco.Bairro,
      Cidade: endereco.Cidade,
      Numero: endereco.Numero,
    }).then((res) => {
      sucesso(res.id);
    })
    .catch((err) => {
      falha('')
      console.error("Error occured: ", err);
    });

    
    return result
}

export async function ObterEndereco(codigoEndereco)
{
  const docEndereco = firebase.firestore().collection('Endereco').doc(codigoEndereco)
   await docEndereco.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        sucesso(user)
        
      } else {
        falha("Não foi possivel buscar o cadastro")
      }
    });
    return result
}

export async function DeletarEndereco(codigoEndereco)
{
  
  const docEndereco = firebase.firestore().collection('Endereco').doc(codigoEndereco)
  await docEndereco.delete().then(() => {
    sucesso();
  }).catch(() => {
    falha('');
  })

  return result;
}

export async function AtualizarEndereco(endereco)
{
  const docUpdate = firebase.firestore().collection('Endereco').doc(endereco.CodigoEndereco);
  await docUpdate.set({
      Rua: endereco.Rua,
      Bairro: endereco.Bairro,
      Cidade: endereco.Cidade,
      Numero: endereco.Numero,
    }).then(() => {
      sucesso()
    }).catch((error) => {
      console.error(error);
      
      falha('');
    });

    return result;
}

function falha(texto)
{
    result.mensagem = texto
}

function sucesso(data)
{
    result.sucesso = true
    result.data = data
}