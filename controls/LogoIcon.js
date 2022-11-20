import img from '../assets/icons/logo_plantao_plus_icon.png'
import imgFull from '../assets/icons/logo_plantao_plus.png'

export default function App() {
  return (
      <img style={{width: 100, height: 102}} src={img} alt=""/>
  );
}

export function allLogo()
{
  return (
    <img style={{width: 207, height: 213, marginLeft:"auto", marginRight:"auto"}} src={imgFull} alt=""/>
);
}

