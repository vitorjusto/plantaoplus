import { ValidarEndereco } from "./EnderecoValidator"


export async function ValidarPaciente(paciente)
{
    const valido = {
        ehValido: false,
        mensagem: ''
    }
    if(paciente.NomePaciente == '')
    {
        valido.mensagem = "Nome do Paciente não pode ser vazio"
        return valido
    }else if(paciente.Telefone == '')
    {
        valido.mensagem = "Telefone não pode ser vazio"
        return valido
    }else if(paciente.Cpf == '')
    {
        valido.mensagem = "Cpf não pode ser vazio"
        return valido
    }else if(paciente.DataNasc == '')
    {
        valido.mensagem = "Data de nascimento não pode ser vazio"
        return valido
    }else
    {
        return await ValidarEndereco(paciente.Endereco)
    }
}