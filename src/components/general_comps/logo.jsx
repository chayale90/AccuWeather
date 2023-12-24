import iconSun from '/icons/icons8-sun.svg';
import "./logo.css"

export default function Logo() {
  return (
    <div className="logo-comp">
      <img src={iconSun} alt="iconSun" />
      <h1 className='logo-text'>Weather App</h1>
    </div>
  )
}
