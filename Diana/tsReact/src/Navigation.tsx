import { Link } from 'react-router-dom';
import './styles.css';
import LogoutButton from './Daily/LogoutButton';

const Navigation = () => {
    return ( 
        <nav  className='navbar'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/loan">Add Loan</Link></li>
            {/* <li><Link to="/contact">Contact</Link></li> */}
            {/* <li><Link to="/useeffect">Use Effect</Link></li> */}
            {/* <li><Link to="/bank">Redux</Link></li> */}
            <div>
          <nav className='logout'>
           <LogoutButton />
          </nav>
        </div>
          </ul>
        </nav>
     );
}
 
export default Navigation;
