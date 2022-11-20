export async function ValidarHorasTrabalhadas(HorasTrabalhadas)
{
    const valido = {
        ehValido: false,
        mensagem: ''
    }
    if(HorasTrabalhadas.DataTrabalhada == '')
    {
        valido.mensagem = "Data não pode ser vazio"
        return valido
    }else if(HorasTrabalhadas.HoraInicio == '' || HorasTrabalhadas.HoraFim == '')
    {
        valido.mensagem = "Hora(s) não pode(m) ser vazio(s)"
        return valido
    }

    valido.ehValido = true
    return valido
}