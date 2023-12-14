import { Link } from "react-router-dom";
import "./home.css"

function Footer() {

    return (

        <div className="footercontainer">
            <div className="footer">
            <Link to="/"><p className="FooterHead">IET</p></Link>
                <div className="footerlinks">
                   <Link to="/browse/" onClick={()=> window.scrollTo(0, 0)}><p>Browse | </p></Link>
                   <Link to="/profile/" onClick={()=> window.scrollTo(0, 0)}><p>| Profile | </p></Link>
                   <Link to="/login/" onClick={()=> window.scrollTo(0, 0)}><p>| Login |</p></Link>
                   <Link to="/register/" onClick={()=> window.scrollTo(0, 0)}><p>| Register</p></Link>
                </div>
            </div>
        </div>

    );

}
export default Footer;