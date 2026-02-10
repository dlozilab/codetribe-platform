import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, CircleUser } from 'lucide-react';
import '../App.css'; 

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLink = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  // Inline Styles
  const styles = {
    wrapper: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
    },
    bar: {
      backgroundColor: 'var(--white)',
      boxShadow: 'var(--shadow)',
      padding: '0 2%', // Adjusted padding
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    // REMOVED 'display: flex' from here so CSS can control it
    desktopMenu: {
      alignItems: 'center',
      gap: '20px',
      height: '100%',
    },
    link: {
      color: 'var(--tribal-dark)',
      fontWeight: '500',
      fontSize: '16px',
    },
    iconBtn: {
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--tribal-dark)',
      height: '40px',
      width: '40px',
    },
    mobileDropdown: {
      position: 'absolute',
      top: '70px',
      left: 0,
      width: '100%',
      backgroundColor: 'var(--white)',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      gap: '15px',
    },
    mobileLink: {
      fontSize: '18px',
      padding: '12px 0',
      borderBottom: '1px solid #f0f0f0',
      color: 'var(--tribal-dark)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      textAlign: 'left',
    }
  };

  return (
    <nav style={styles.wrapper}>
      {/* MAIN BAR */}
      <div style={styles.bar}>
        
        {/* LEFT: BRANDING */}
        <div style={styles.brand} onClick={() => navigate('/')}>
          <span style={{ color: 'var(--codetribe-green)' }}>Code</span>
          <span style={{ color: 'var(--tribal-dark)' }}>Tribe</span>
        </div>

        {/* --- RIGHT: DESKTOP MENU --- 
            Controlled by class .desktop-menu-area in App.css 
        */}
        <div className="desktop-menu-area" style={styles.desktopMenu}>
          
          <Link to="/waitlist" style={{ ...styles.link}}>
            Home
          </Link>

          <Link to="/waitlist" style={styles.link}>
            Apply
          </Link>
          
          <button 
            onClick={() => navigate('/waitlist')} 
            title="Staff Login"
            style={styles.iconBtn}
          >
            <CircleUser size={30} />
          </button>
        </div>

        {/* --- MOBILE HAMBURGER --- 
            Controlled by class .mobile-toggle-btn in App.css
        */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={styles.iconBtn}
        >
          {mobileMenuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* MOBILE DROPDOWN (Conditional Render) */}
      {mobileMenuOpen && (
        <div style={styles.mobileDropdown}>
          <button onClick={() => handleLink('/')} style={styles.mobileLink}>
            Home
          </button>
          <button onClick={() => handleLink('/apply')} style={styles.mobileLink}>
            Apply
          </button>
          <button 
            onClick={() => handleLink('/login')} 
            style={{ ...styles.mobileLink, borderBottom: 'none' }}
          >
            <CircleUser size={20} /> Staff Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;