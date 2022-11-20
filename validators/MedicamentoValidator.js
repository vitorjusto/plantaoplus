export async function ValidarMedicamento(medicamento)
{
    const valido = {
        ehValido: false,
        mensagem: ''
    }
    if(medicamento.NomeMedicamento == '')
    {
        valido.mensagem = "Nome do Medicamento não pode ser vazio"
        return valido
    }else if(medicamento.Formula == '')
    {
        valido.mensagem = "Formula não pode ser vazio"
        return valido
    }

    valido.ehValido = true
    return valido
}