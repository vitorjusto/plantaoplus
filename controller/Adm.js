import firebase from '../services/connectionFirebase'

const result = {
    sucesso: false,
    mensagem: '',
    data: {}
  }

export async function CadastrarAdm(Adm)
{
    let ref = firebase.auth().createUserWithEmailAndPassword(Adm.Email, Adm.Senha)
    await ref.then((res) => {
        let ref2 = firebase.firestore().collection('usuario');
            ref2.add({
                Nome: Adm.Nome,
                Login: Adm.Email,
                ehAdm: true,
                Uid: res.user.uid
            }).then(() => {
            })}).catch(() =>{
    falha("Não foi possivel cadastrar")
    return result;
    })
    
    sucesso()
    return result;
}

export async function ListarAdm()
{
    let usuarios = []
    let docs = firebase.firestore().collection('usuario');
    await docs.get().then((res) => {
        if (res.empty) {
          falha('Não foi possivel buscar os Adiministradores')
          return result
        }

        let snapshot = res.docs;
        snapshot.forEach((doc) => {
            let usuario = doc.data();
            usuario.id = doc.id;
            if(usuario.Nome != "" && usuario.ehAdm)
                usuarios.push(usuario)
            
          })
        
      }).catch(() => {
        falha("Não foi possivel buscar os usuarios");
        return result;
      });

      sucesso(usuarios)
      return result;
}


export async function ObterUsuario(login)
{
    let usuario
    const docRef = firebase.firestore().collection('usuario').where('Login', '==', login)
    await docRef.get().then((res) => {
        usuario = res.docs[0].data();
    }).catch(() => {
      falha('Não foi possivel buscar o cadastro')
      return result}
    );
    sucesso(usuario)
    return result;
}

export async function DeletarUsuario(login)
{


    const docRef = firebase.firestore().collection('usuario').where('Login', '==', login)
    await docRef.get().then(async (res) => {

      DetelarUsuarioId(res.docs[0].id)

      }).catch(() =>{
        falha("não foi possivel deletar o Adiministrador");
      })

    sucesso()
    return result;
}

export async function DetelarUsuarioId(id)
{

  const docRef = firebase.firestore().collection('usuario').doc(id)
    await docRef.delete().then(async () => {
      firebase.auth().deleteUser()

      }).catch(() =>{
        falha("não foi possivel deletar o Adiministrador");
      })

}

export async function AtualizarUsuario(Usuario)
{
  try {
    
  
    const docUpdate = firebase.firestore().collection('usuario').where('Login', '==', Usuario.Login)
    docUpdate.get().then( (res) => {
      const docUpdate2 = firebase.firestore().collection('usuario').doc(res.docs[0].id);
      docUpdate2.set(Usuario).then(() => {
      })
    })
    .catch((error) => {
      console.error(error);
      falha("Não foi possivel Atualizar o Usuario")
    });
    
    sucesso();
    return result
  } catch (error) {
    console.error(error);
    falha("Não foi possivel Atualizar o Usuario")
  }
  }

function falha(texto)
{
  result.sucesso = false
    result.mensagem = texto
}

function sucesso(data)
{
    result.sucesso = true
    result.data = data
}