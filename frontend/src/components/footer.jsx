import React from 'react';
import '../App.css'; 

const Footer = () => {
  return (
    <footer style={{ 
        display: 'flex', 
        justifyContent: "space-between", 
        alignItems: 'center', 
        paddingLeft: "2%", 
        backgroundColor: "#073f4e",
        color: "white",
        flexWrap: 'wrap', // Ensures it looks good on mobile
        gap: '20px' 
    }}>

        {/* LEFT SIDE: Copyright & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
                &copy; {new Date().getFullYear()} <strong>CodeTribe Academy</strong>. 
                <span> All rights reserved.</span>
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '15px',color:"white" }}>
                <i className="fa fa-facebook-official" style={{cursor: 'pointer', opacity: 0.9}}></i>
                <i className="fa fa-instagram" style={{cursor: 'pointer', opacity: 0.9}}></i>
                <i className="fa fa-linkedin" style={{cursor: 'pointer', opacity: 0.9}}></i>
                <i className="fa fa-twitter" style={{cursor: 'pointer', opacity: 0.9}}></i>
            </div>
        </div>

        {/* RIGHT SIDE: Logo */}
        <div>
            <a 
                href="https://mlab.co.za" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'white' 
                }}
            >
                <span style={{ 
                    fontSize: '10px', 
                    opacity: 0.7, 
                    marginRight: '10px', 
                    letterSpacing: '1px', 
                    textAlign: 'right',
                    lineHeight: '1.2' 
                }}>
                    POWERED <br/> BY
                </span>
                <img 
                    src="/mlab.jpg" 
                    alt="mLab" 
                    style={{ 
                        height: '80px', 
                        border: 'none', 
                        display: 'block' 
                    }} 
                />
            </a>
        </div>

    </footer>
  );
};

export default Footer;