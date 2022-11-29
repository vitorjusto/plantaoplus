import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { View, Text } from 'react-native';
import {useState} from 'react'
import GetStyles from '../model/styles/getStyles';

export function Input({type, placeholder, value, onInput, LabelText, disabled, visivel=true})
{
    if(disabled === undefined)
        disabled = false;
    
    function onType(event)
    {
        
        onInput(event)
    }

    function teste(e)
    {
        if(type.toUpperCase() === "Number")
        {
            debugger;
            e.cancelable = true
        }else
        {
            e.cancelable = false
        }

    }
    
    return(
        <View style={visivel? styles.input : {display: 'none'}}>
            <Text style={styles.labelText}>{LabelText}</Text>
            <Form.Control style={{borderRadius: '25px'}} onBeforeInput={teste} disabled={disabled} type={type} placeholder={placeholder} value={value} onInput ={onType} />
        </View>
    )
}

export function TextArea({placeholder, value, onInput, LabelText})
{
    return(
        <View style={styles.input}>
            <Form.Group>
            <Text style={styles.labelText}>{LabelText}</Text>
            <Form.Control style={{borderRadius: '25px'}} as="textarea" rows={3} placeholder={placeholder} onChange={onInput} value={value}></Form.Control>
            </Form.Group>
        </View>
    )
}

export function MaskInput({type, placeholder, value, onInput, LabelText, mask, maskedValue, setMaskedValue})
{


    let onValidInput = (e) => {
        let text = e.target.value
        let i = 0
        let isValid = true
        let textoValido = ""
        while(text.length > i)
        {
            if(mask.length === i)
            {
                isValid = false
                break;
            }
            if(isDigit(mask[i]) && isDigit(text[i]))
            {
                textoValido += text[i]
                i++;
                continue;
            }
            else if(isText(mask[i]) && isText(text[i]))
            {
                textoValido += text[i]
                i++;
                continue;
            }else if(isValidChar(mask[i]))
            {
                textoValido += mask[i]
                i++;
                continue;
            }
            
            isValid = false;
            break;
        }

        
        if(isValid)
        {
            if(isValidChar(mask[i]) && maskedValue.length <= textoValido.length)
            {
                textoValido += mask[i]
                
            }
            
            if(maskedValue.length > textoValido.length)
            {
                if(isValidChar(maskedValue[maskedValue.length - 1]))
                    textoValido = textoValido.slice(0, textoValido.length - 1)
            }
            setMaskedValue(textoValido)
            onInput(e)
        }
    }
    
    return(
        <Input style={{borderRadius: '25px'}} type={type} placeholder={placeholder} value={maskedValue} onInput={onValidInput} LabelText={LabelText}/>
    )
}

    
function isDigit(value)
{
    return Number.isInteger(Number(value))
}
    
function isText(value)
{
    return value.toUpperCase() !== value.toLowerCase()
}
    
function isValidChar(value)
{
    if(value === undefined)
        return false;
    return !(isDigit(value) || isText(value))
}

const styles = GetStyles()