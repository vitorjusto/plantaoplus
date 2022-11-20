import { ValidarEndereco } from "./EnderecoValidator"


export async function ValidarEnfermeira(enfermeira)
{
    const valido = {
        ehValido: false,
        mensagem: ''
    }
    if(enfermeira.NomeEnfermeira == '')
    {
        valido.mensagem = "Nome da enfermeira não pode ser vazio"
        return valido
    }else if(enfermeira.Coren == '')
    {
        valido.mensagem = "Numero do Coren não pode estar vazio"
        return valido
    }else if(enfermeira.Cargo == '')
    {
        valido.mensagem = "Cargo não pode ser vazio"
        return valido
    }else if(enfermeira.Telefone == '')
    {
        valido.mensagem = "Telefone não pode ser vazio"
        return valido
    }else
    {
        return await ValidarEndereco(enfermeira.Endereco)
    }
}