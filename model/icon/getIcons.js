import icon_enfermeiro from '../../assets/icons/icon_enfermeiro_paciente_light.png';
import icon_enfermeiro_blue from '../../assets/icons/icon_enfermeiro_paciente_blue.png';
import exames_icon_blue from '../../assets/icons/icon_exames_blue.png';
import exames_icon from '../../assets/icons/icon_exames_light.png';
import config_icon_blue from '../../assets/icons/icon_config_blue.png';
import config_icon from '../../assets/icons/icon_config_light.png';
import horasTrabalhadas_icon_blue from '../../assets/icons/icon_horasTrabalhadas_blue.png';
import horasTrabalhadas_icon from '../../assets/icons/icon_horasTrabalhadas_light.png';
import medicamento_icon_blue from '../../assets/icons/icon_medicamento_blue.png';
import medicamento_icon from '../../assets/icons/icon_medicamento_light.png';
import home_icon_blue from '../../assets/icons/icon_home_blue.png';
import home_icon from '../../assets/icons/icon_home_light.png';
import exit from '../../assets/icons/icon_exit.png'

class imagem
{
  constructor(img, imgBlue)
  {
    this.img = img;
    this.imgBlue = imgBlue;
  }

  getImage(isLight)
  {
    if(isLight)
      return this.img;
    
    return this.imgBlue;
  }
}

let imagensArray = new Map([
  ["enfermeiro", new imagem(icon_enfermeiro, icon_enfermeiro_blue)],
  ["exame", new imagem(exames_icon, exames_icon_blue)],
  ["config", new imagem(config_icon, config_icon_blue)],
  ["horasTrabalhadas", new imagem(horasTrabalhadas_icon, horasTrabalhadas_icon_blue)],
  ["medicamento", new imagem(medicamento_icon, medicamento_icon_blue)],
  ["home", new imagem(home_icon, home_icon_blue)],
  ["exit", new imagem(exit, exit)],
])

export default function icone(img, focused)
{
  return(<img style={{width: 30, height: 30}}  src={imagensArray.get(img).getImage(focused)} alt=""/>)
}
