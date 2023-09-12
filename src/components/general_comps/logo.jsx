import iconSun from '/icons/icons8-sun.svg';


export default function Logo() {
  return (
    <div className="logo-comp">
      <img src={iconSun} alt="iconSun" />
      <h1>AccuWeather</h1>
    </div>
  )
}
