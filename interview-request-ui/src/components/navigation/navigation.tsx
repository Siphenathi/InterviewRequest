import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';
import OfferZenLogo from "../../images/Offerzen-logo.svg";
import './navigation.css' 

const NavigationBar = () => {

    return (
        <Navbar>
            <Navbar.Brand href="#home">
                <NavLink to="/">
                    <img className="oz-logo-image" alt="" src={OfferZenLogo}/>
                </NavLink>
            </Navbar.Brand>
        </Navbar>
    );
};

export default NavigationBar;