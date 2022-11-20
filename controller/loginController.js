import firebase from '../services/connectionFirebase'

const result = {
    sucesso: false,
    mensagem: '',
    data: {}
}

export async function cadastrarLogin(login)
{
     let ref = firebase.auth().createUserWithEmailAndPassword(login, '123456')
        await ref.then(await cadastrarLoginTabela(login)).catch(() =>{
        falha("Não foi possivel cadastrar")
        return result;
        })

    return result
}

async function cadastrarLoginTabela(login)
{
    let ref2 = firebase.firestore().collection('usuario');
        ref2.add({
            Login: login,
            ehAdm: false
        }).then((res) => {
            sucesso(res.id)
            return result;
        })
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