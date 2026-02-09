import { useNavigate } from 'react-router-dom';

export default function NoPage() {
  const navigate = useNavigate();

  return (
      <section style={{height:"100%",width:"100%",padding:"2%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        
        <div style={{ textAlign: "center", maxWidth: "600px", fontFamily: "Segoe UI, sans-serif" }}>
            
            {/* Technical Error */}
            <h1 style={{ fontSize: "100px", margin: 0, color: "#005F60", lineHeight: "1" }}>404</h1>
            <p style={{ fontSize: "24px", color: "#333", fontWeight: "bold", margin: "10px 0" }}>
                Page Not Found
            </p>

            {/* Separator */}
            <hr style={{ width: "60%", margin: "20px auto", borderTop: "1px solid #ccc" }} />

            {/* Normal English Explanation */}
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
                We couldn't find the page you were looking for. It may have been removed, renamed, or you might have typed the link incorrectly.
            </p>

            {/* Back Home Button */}
            <button 
                onClick={() => navigate('/')}
                style={{ 
                    padding: "12px 30px", 
                    backgroundColor: "#005F60", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px", 
                    fontSize: "16px", 
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                }}
            >
                Go Back Home
            </button>
            
        </div>

      </section>
  );
}