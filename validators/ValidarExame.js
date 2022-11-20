export async function ValidarExame(Exame)
{
    const valido = {
        ehValido: false,
        mensagem: ''
    }
    if(Exame.CodigoPaciente == "")
    {
        valido.mensagem="Paciente não informado"
        return valido
    }else if(Exame.NomeExame == "")
    {
        valido.mensagem="Por favor informar o nome do exame"
        return valido
    }else if(Exame.DescricaoExame == "")
    {
        valido.mensagem="Campo descrição não pode ser vazio"
        return valido
    }else if(Exame.DataExame == "")
    {
        valido.mensagem="Por favor informe a data"
        return valido
    }else if(Exame.HoraExame == "")
    {
        valido.mensagem="Por favor informe a hora"
        return valido
    }else if(Exame.ResultadoExame == "")
    {
        valido.mensagem="Campo Resultado não pode ser vazio"
        return valido
    }

    valido.ehValido = true
    return valido
}