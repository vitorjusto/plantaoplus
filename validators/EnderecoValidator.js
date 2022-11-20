

export async function ValidarEndereco(endereco)
{
    const valido = {
        ehValido: false,
        mensagem: ''
    }
    if(endereco.Rua == '')
    {
        valido.mensagem = "Rua não pode ser vazio"
        return valido
    }else if(endereco.Numero == '')
    {
        valido.mensagem = "Numero não pode ser vazio"
        return valido
    }else if(endereco.Cidade == '')
    {
        valido.mensagem = "Cidade da casa não pode ser vazio"
        return valido
    }else
    {
        valido.ehValido = true
        return valido
    }
}