// import ImgLogo from "/images/Screenshot 2023-09-10 222242.gif"
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function Logo() {
  return (
    <div className="logo-comp">
      <WbSunnyIcon sx={{ fontSize: 40, mr: 2}} />
      <h1>AccuWeather</h1>
      {/* <img src={ImgLogo} alt="logo" width={200}/> */}
    </div>
  )
}
