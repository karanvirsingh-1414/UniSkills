import React from 'react';
import { useNavigate } from 'react-router-dom';
const Landing = () => {
    const navigate = useNavigate();
    const features = [
        { icon: "🔄", title: "Live Skill Exchange", desc: "Instantly match with peers. Trade your knowledge for dynamic platform credits securely." },
        { icon: "🛡️", title: "Verified Mentors", desc: "Every transaction builds your reputation. Prove your expertise with your ecosystem rating." },
        { icon: "💳", title: "Internal Economy", desc: "A custom credit wallet ensures fair value exchange. No real money required, just pure knowledge." },
        { icon: "📊", title: "Real-time Dashboard", desc: "Monitor campus learning statistics and live requests globally through a gorgeous glassmorphic lens." }
    ];
    const steps = [
        { num: "01", text: "Create your profile & list your skills." },
        { num: "02", text: "Browse the hub for mentors or students." },
        { num: "03", text: "Transfer credits to begin a 1-on-1 session." },
        { num: "04", text: "Earn credits by completing teaching sessions." }
    ];
    return (
        <div style={{ background: '#07090f', minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
            {}
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 10%', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(7, 9, 15, 0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ fontSize: '26px', fontWeight: '900', background: 'linear-gradient(135deg, #a64cff, #6222b5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', letterSpacing: '-1px' }} onClick={() => window.scrollTo(0,0)}>
                    U+S UniSkills
                </div>
                {}
                <div style={{ display: 'flex', gap: '35px', alignItems: 'center', color: '#cbd5e1', fontWeight: '600', fontSize: '15px' }}>
                    <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#cbd5e1'}>Home</span>
                    <span onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#cbd5e1'}>About Ecosystem</span>
                    <span onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#cbd5e1'}>Features</span>
                    <span onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#cbd5e1'}>Contact Us</span>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => navigate('/auth')} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.3s' }} onMouseOver={(e)=>e.target.style.background='rgba(255,255,255,0.1)'} onMouseOut={(e)=>e.target.style.background='transparent'}>Log In</button>
                    <button onClick={() => navigate('/auth')} style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 5px 15px rgba(59, 130, 246, 0.3)' }}>Get Started</button>
                </div>
            </nav>
            {}
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '85vh', textAlign: 'center', padding: '0 20px', position: 'relative' }}>
                <div style={{ border: '1px solid rgba(168, 85, 247, 0.4)', background: 'rgba(168, 85, 247, 0.1)', padding: '8px 20px', borderRadius: '30px', color: '#d8b4fe', fontWeight: 'bold', fontSize: '13px', marginBottom: '30px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    🚀 REVOLUTIONIZING CAMPUS LEARNING
                </div>
                <h1 style={{ fontSize: '75px', margin: '0 0 25px 0', background: 'linear-gradient(to right, #ffffff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800', letterSpacing: '-2px', maxWidth: '900px', lineHeight: '1.05' }}>
                    The Universal Skill Exchange Ecosystem
                </h1>
                <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '700px', lineHeight: '1.6', marginBottom: '50px' }}>
                    Connect with peers, master new skills, and earn real internal credits. UniSkills transforms your campus networking into a dynamic, real-time knowledge marketplace.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={() => navigate('/auth')} style={{ background: '#f8fafc', color: '#07090f', border: 'none', padding: '18px 45px', borderRadius: '12px', fontSize: '18px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)', transition: 'transform 0.2s' }} onMouseOver={(e)=>e.target.style.transform='scale(1.05)'} onMouseOut={(e)=>e.target.style.transform='scale(1)'}>
                        Enter the Platform
                    </button>
                    <button onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})} style={{ background: 'transparent', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.3)', padding: '18px 45px', borderRadius: '12px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e)=>{e.target.style.background='rgba(255,255,255,0.05)'; e.target.style.transform='scale(1.05)'}} onMouseOut={(e)=>{e.target.style.background='transparent'; e.target.style.transform='scale(1)'}}>
                        Learn More ↓
                    </button>
                </div>
                {}
                <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '500px', height: '500px', background: '#9d4edd', filter: 'blur(200px)', opacity: 0.3, zIndex: -1 }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '500px', height: '500px', background: '#3a86ff', filter: 'blur(200px)', opacity: 0.3, zIndex: -1 }}></div>
            </main>
            {}
            <section id="features" style={{ padding: '100px 10%', background: 'linear-gradient(180deg, #07090f 0%, rgba(26,29,36,0.3) 100%)', zIndex: 1, position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                    <h2 style={{ fontSize: '45px', margin: '0 0 20px 0', fontWeight: '800', letterSpacing: '-1px' }}>Why Join UniSkills?</h2>
                    <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>Everything you need to thrive in a decentralized campus ecosystem without spending real money.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    {features.map((f, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', padding: '40px 30px', borderRadius: '24px', transition: 'all 0.4s ease', cursor: 'default' }} onMouseOver={(e)=>{e.currentTarget.style.transform='translateY(-10px)'; e.currentTarget.style.background='rgba(255,255,255,0.06)'}} onMouseOut={(e)=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.background='rgba(255,255,255,0.03)'}}>
                            <div style={{ fontSize: '50px', marginBottom: '25px', display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '16px' }}>{f.icon}</div>
                            <h3 style={{ fontSize: '24px', margin: '0 0 15px 0', fontWeight: '700' }}>{f.title}</h3>
                            <p style={{ color: '#94a3b8', lineHeight: '1.7', margin: 0, fontSize: '16px' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            {}
            <section id="about" style={{ padding: '120px 10%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '20%', left: '30%', width: '600px', height: '600px', background: '#3b82f6', filter: 'blur(250px)', opacity: 0.15, zIndex: -1 }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '45px', margin: '0 0 20px 0', fontWeight: '800', letterSpacing: '-1px' }}>How It Works</h2>
                    <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>Four incredibly simple steps to start mastering new skills or growing your digital platform wallet.</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '25px' }}>
                    {steps.map((step, i) => (
                        <div key={i} style={{ flex: '1 1 200px', maxWidth: '280px', background: 'linear-gradient(135deg, rgba(88,28,135,0.1), rgba(15,23,42,0.5))', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '40px 30px', borderRadius: '24px', textAlign: 'center', position: 'relative', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
                            <div style={{ fontSize: '70px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', position: 'absolute', top: '10px', right: '20px', lineHeight: 1 }}>
                                {step.num}
                            </div>
                            <div style={{ fontSize: '26px', fontWeight: '900', background: 'linear-gradient(135deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px', display: 'inline-block' }}>
                                Phase {step.num}
                            </div>
                            <p style={{ color: '#e2e8f0', fontSize: '17px', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            {}
            <footer id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '50px 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#040508' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '22px', fontWeight: '900', color: '#e2e8f0', letterSpacing: '-0.5px' }}>U+S UniSkills</div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>© 2026 UniSkills Platform.<br/>Powered by students, for students.</div>
                </div>
                <div style={{ display: 'flex', gap: '30px', color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
                    <span style={{ cursor: 'pointer' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#94a3b8'}>Privacy Policy</span>
                    <span style={{ cursor: 'pointer' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#94a3b8'}>Terms of Service</span>
                    <span style={{ cursor: 'pointer' }} onMouseOver={(e)=>e.target.style.color='white'} onMouseOut={(e)=>e.target.style.color='#94a3b8'}>Support Dashboard</span>
                </div>
            </footer>
        </div>
    );
};
export default Landing;
