import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoPage() {
  const navigate = useNavigate();

  return (
    // Main Container: Takes up full screen height (100vh) to center everything
    <div className="w3-display-container w3-light-grey" style={{ height: '100vh' }}>
      
      <div className="w3-display-middle w3-center">
        {/* Big 404 Text */}
        <h1 className="w3-jumbo w3-animate-top w3-text-grey" style={{ fontWeight: 'bold' }}>
          404
        </h1>
        
        {/* Separator Line */}
        <hr className="w3-border-grey" style={{ margin: 'auto', width: '50%' }} />
        
        {/* Message */}
        <h3 className="w3-center w3-animate-right">Page Not Found</h3>
        <p className="w3-center w3-large w3-text-dark-grey">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="w3-button w3-black w3-hover-blue w3-round-large w3-large w3-margin-top w3-animate-opacity"
        >
          <i className="fa fa-home" style={{ marginRight: '8px' }}></i>
          Back to Home
        </button>
      </div>

    </div>
  );
}