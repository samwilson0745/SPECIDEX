import { Link } from 'react-router-dom';

const Home = () => {
  return ( 
    <div className="home" style={{backgroundImage: 'url(' + require('../background.jpg') + ')',
    backgroundSize: 'contain cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    }}>
      <div className="hero">
      <h1>SPECIDEX</h1>  
      <br />  
      <h4>See something ?    Have a picture ? 
        One click and <br/>You know What it is !</h4>
        <div className="buttons">
        <Link to = "/upload"><div className="button">Upload</div></Link>
        <Link to = "/webcam"><div className="button">
Web-cam</div></Link>
        </div>
        <br />
        <br />
        </div>
      
    </div>
   );
}
 
export default Home;