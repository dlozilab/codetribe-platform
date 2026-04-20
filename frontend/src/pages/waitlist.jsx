import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient'; 
import { MapPin, Code2, Laptop, CheckCircle, CalendarClock } from 'lucide-react';

// CONFIG
const PROJECT_TAG = "CodeTribe-Recruitment-2026"; 
const API_URL = "https://codetribe-server.onrender.com/waitlist"; 

const Waitlist = () => {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // 1. Check LocalStorage
    const hasApplied = localStorage.getItem('codetribe_waitlist_joined');
    if (hasApplied === 'true') {
      setJoined(true);
      return;
    }

    // 2. Auth State Listener (Cleans Stale URLs)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && !joined) {
        // Clear the URL hash/params to prevent "stale URL" errors on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
        handleServerRegistration(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [joined]);

  // 3. Server Registration Logic
  const handleServerRegistration = async (user) => {
    try {
      setLoading(true);

      const urlParams = new URLSearchParams(window.location.search);
      const sourceParam = urlParams.get('ref') || urlParams.get('source');
      const referrer = document.referrer ? new URL(document.referrer).hostname : null;
      const finalSource = sourceParam || referrer || 'Direct/Unknown';

      const payload = {
        programme_name: PROJECT_TAG,
        email: user.email,
        name: user.user_metadata.full_name,
        google_id: user.id,
        img_url: user.user_metadata.avatar_url,
        source: finalSource
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status === 409) {
        setJoined(true);
        localStorage.setItem('codetribe_waitlist_joined', 'true');
        // Sign out only after successful DB entry
        await supabase.auth.signOut();
      } else {
        console.error("Server error:", await response.text());
      }

    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href }
    });
  };

  const styles = {
    // Page Wrapper for sticky footer resolution
    pageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    mainContent: {
      flex: 1, // Pushes footer to bottom
    },
    bannerSection: {
      width: '100%',
      overflow: 'hidden',
    },
    bannerImg: {
      width: '100%',
      maxHeight: '400px', // Prevents banner from swallowing the screen on high res
      objectFit: 'cover',
      objectPosition: 'center'
    },
    contentSection: {
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      color: '#333'
    },
    header: {
      textAlign: 'center',
      maxWidth: '800px',
      marginBottom: '50px'
    },
    title: {
      fontSize: '2.5rem',
      color: '#005F60', 
      fontWeight: 'bold',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    ctaBox: {
      backgroundColor: '#f9f9f9',
      padding: '40px',
      borderRadius: '16px',
      border: '1px solid #eee',
      textAlign: 'center',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      marginBottom: '60px'
    },
    googleBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: 'white',
      color: '#333',
      border: '1px solid #ccc',
      borderRadius: '50px',
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    detailsSection: {
      padding: '60px 20px',
      backgroundColor: '#fcfcfc',
      borderTop: '1px solid #eee'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    colTitle: {
      color: '#2D3E50',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    badge: {
      display: 'inline-block',
      backgroundColor: '#e6f4ea',
      color: '#005F60',
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      margin: '0 5px 5px 0',
      border: '1px solid #ccebdb'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.mainContent}>
        {/* SECTION 1: HERO BANNER */}
        <section style={styles.bannerSection}>
          <img 
              src="/codetribe bannerr.png" 
              alt="CodeTribe Academy Banner" 
              style={styles.bannerImg} 
          />
        </section>

        {/* SECTION 2: SIGN UP / STATUS */}
        <section style={styles.contentSection}>
          <div style={styles.header}>
              <h1 style={styles.title}>
                  The Future of Tech is <span style={{color: '#8DC63F'}}>You.</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
                  CodeTribe is equipping the next generation of African software developers with practical, industry-ready skills.
                  <br/><strong>Recruitment for the next intake begins in approximately 2 months.</strong>
              </p>
          </div>

          <div style={styles.ctaBox}>
              {joined ? (
                  <div style={{ animation: 'fadeIn 0.5s' }}>
                      <CheckCircle size={60} color="#8DC63F" style={{ margin: '0 auto 20px' }} />
                      <h2 style={{ fontSize: '24px', color: '#2D3E50', marginBottom: '10px' }}>You're on the list!</h2>
                      <p style={{ color: '#666' }}>We'll email you as soon as recruitment starts.</p>
                  </div>
              ) : (
                  <div>
                      <CalendarClock size={48} color="#005F60" style={{ margin: '0 auto 15px' }} />
                      <h2 style={{ fontSize: '22px', color: '#2D3E50', marginBottom: '10px' }}>Get Early Access</h2>
                      <p style={{ color: '#666' }}>Join the waiting list to get notified first.</p>
                      
                      <button 
                          onClick={handleGoogleLogin} 
                          disabled={loading}
                          style={styles.googleBtn}
                      >
                          {loading ? 'Processing...' : (
                              <>
                                  <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                  Join Waitlist with Google
                              </>
                          )}
                      </button>
                      <p style={{ fontSize: '13px', color: '#999', marginTop: '20px' }}>
                          No spam. Recruitment updates only.
                      </p>
                  </div>
              )}
          </div>
        </section>

        {/* SECTION 3: INFO GRID */}
        <section style={styles.detailsSection}>
          <div style={styles.grid}>
              <div>
                  <h3 style={styles.colTitle}><Code2 size={24} color="#8DC63F"/> What is CodeTribe?</h3>
                  <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
                      CodeTribe is a software development training program designed to equip aspiring developers with practical, industry-ready skills through hands-on learning and real-world projects.
                  </p>
              </div>

              <div>
                  <h3 style={styles.colTitle}><MapPin size={24} color="#8DC63F"/> Campuses</h3>
                  <div>
                      {['Soweto', 'Tshwane', 'Tembisa', 'Pietermaritzburg', 'Kimberley', 'Ga-Rankuwa', 'Limpopo', 'Online'].map(loc => (
                          <span key={loc} style={styles.badge}>{loc}</span>
                      ))}
                  </div>
              </div>

              <div>
                  <h3 style={styles.colTitle}><Laptop size={24} color="#8DC63F"/> The Outcome</h3>
                  <p style={{ lineHeight: '1.6', color: '#555' }}>
                      We empower participants to become confident developers who can contribute meaningfully to the tech industry.
                  </p>
              </div>
          </div>
        </section>
      </div>
      {/* Footer can go here and will sit at the bottom */}
    </div>
  );
};

export default Waitlist;