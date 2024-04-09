
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const NavBar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#00a0b2", margin: "20px auto", padding: 10, maxWidth: 3000, width: "100%" }}> {/* Added marginBottom */}
      <ul style={{ display: "flex" }}>
        <Typography variant="h5" gutterBottom style={{ margin: 10 }}><Link to={'/'}>Home</Link></Typography>
        <Typography variant="h5" gutterBottom style={{ margin: 10 }}><Link to={'/settings'}>Settings</Link></Typography>
      </ul>
    </nav>
  );
};

export default NavBar;