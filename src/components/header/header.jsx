import "./header.css"
import avatar from "../../../assets/avatar.jpeg"
const Header = () => {

    return (
    <header>
        <div className="content">
        <h1>Dashboard</h1>
        <div className="user">
            <h3>Admin</h3>
            <img src={avatar}/>
        </div>
        </div>
    </header>
    );
};


export default Header;