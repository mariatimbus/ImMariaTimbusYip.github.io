import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { TAGLINE, NAME, SOCIAL, PROJECTS, PRESS } from "./data";

const BG = "#000000";
const FG = "#ffffff";

const sectionStyle = { width: "min(1200px, 92%)", margin: "0 auto", padding: "80px 0" };
const cardStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 24, padding: 24, backdropFilter: "blur(10px)" };

export default function App() {
  return (
    <div style={{ background: BG, color: FG, minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Projects />
      <Press />
      <About />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

function Navbar() {
  const link = { color: FG, textDecoration: "none", padding: "10px 14px", borderRadius: 12, fontWeight: 600 };
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ ...sectionStyle, padding: "14px 0", display: "flex", gap: 16, alignItems: "center" }}>
        <a href="#hero" style={{ ...link, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: FG, display: "inline-block" }} />
          <span style={{ letterSpacing: 1, fontWeight: 800 }}>{NAME}</span>
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {[
            { href: "#projects", label: "Projects" },
            { href: "#press", label: "Press" },
            { href: "#about", label: "About" },
            { href: "#blog", label: "Blog" },
            { href: "#contact", label: "Contact" },
          ].map((it) => (
            <a key={it.href} href={it.href} style={link}>{it.label}</a>
          ))}
          <a href="/Timbus Maria CV .pdf" download style={{ ...link, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 999 }}>Résumé ⬇</a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ position: "relative" }}>
      <div style={{ height: "80vh", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Canvas camera={{ position: [0, 1.2, 6], fov: 52 }} shadows>
            <ambientLight intensity={0.45} />
            <directionalLight position={[6, 6, 6]} intensity={1.1} castShadow color={FG} />
            <directionalLight position={[-6, 4, -3]} intensity={0.4} color={FG} />
            <Suspense fallback={null}>
              <Float speed={2.6} rotationIntensity={1.25} floatIntensity={1.25}>
                <MonochromeKnot lively />
              </Float>
              <Environment preset="city" />
              <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.0} enableDamping dampingFactor={0.06} />
            </Suspense>
          </Canvas>
        </div>
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ maxWidth: 900 }}>
            <h1 style={{ fontSize: 52, margin: "0 0 8px", letterSpacing: 0.5 }}>{NAME} — <span style={{ color: FG }}>{TAGLINE}</span></h1>
            <p style={{ opacity: 0.8, fontSize: 18, lineHeight: 1.6, marginBottom: 18 }}>I build animated web apps with immersive 3D and strong UX. Currently: leading, building, and learning at the intersection of code, design, and robotics.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#projects" style={ctaStyle(FG)}>See my work</a>
              <SocialBar minimal />
            </div>
          </motion.div>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 40% at 50% 30%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)", pointerEvents: "none" }} />
      </div>
    </section>
  );
}

function SocialBar({ minimal=false }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
      {SOCIAL.map(s => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(255,255,255,0.4)", borderRadius: 999, padding: "8px 12px", opacity: minimal?0.9:1 }}>
          {s.label}
        </a>
      ))}
    </div>
  );
}

// PROJECTS
function Projects() {
  return (
    <section id="projects" style={sectionStyle}>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ fontSize: 44, marginBottom: 24 }}>Projects</motion.h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.title} index={i}>
            <div>
              <div style={{ height: 180, borderRadius: 16, marginBottom: 14, background: "linear-gradient(135deg, #0a0a0a, #111)", border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.35, filter: "blur(18px)" }}>
                  <Canvas camera={{ position: [0, 0, 4] }}>
                    <ambientLight intensity={0.7} />
                    <Float speed={2.6} floatIntensity={1.6} rotationIntensity={1.2}>
                      <mesh><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial metalness={0.2} roughness={0.4} color={FG} /></mesh>
                    </Float>
                  </Canvas>
                </div>
                <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
              </div>
              <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
              <p style={{ opacity: 0.82, margin: 0 }}>{p.desc}</p>
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.tech.map((t) => (<span key={t} style={{ border: "1px solid rgba(255,255,255,0.18)", padding: "6px 10px", borderRadius: 999, fontSize: 12, opacity: 0.9 }}>{t}</span>))}
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {p.links?.map((l) => (<a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(255,255,255,0.5)", borderRadius: 10, padding: "6px 10px", textDecoration: "none" }}>{l.label}</a>))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

// PRESS
function Press() {
  return (
    <section id="press" style={sectionStyle}>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ fontSize: 44, marginBottom: 24 }}>Press</motion.h2>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
        {PRESS.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.05 }} style={{ ...cardStyle }}>
            <strong style={{ display: "block", marginBottom: 10 }}>{item.title}</strong>
            {item.type === "youtube" ? (
              <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <iframe src={item.embed} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></iframe>
              </div>
            ) : (
              <a href={item.href} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Open article/video</a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TiltCard({ children, index }) {
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      style={{ ...cardStyle, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setXy({ x, y });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{
        rotateY: hover ? (xy.x - 0.5) * 10 : 0,
        rotateX: hover ? (0.5 - xy.y) * 8 : 0,
        y: hover ? -6 : 0,
        boxShadow: hover ? "0 20px 50px rgba(255,255,255,0.08)" : "0 10px 40px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </motion.div>
  );
}

// ABOUT
function About() {
  return (
    <section id="about" style={sectionStyle}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
            <img src="/me.jpg" alt="Portrait" style={{ display: "block", width: "100%", height: 420, objectFit: "cover", filter: "grayscale(100%)" }} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: 44, marginTop: 0 }}>About Me</h2>
          <p style={{ opacity: 0.8, lineHeight: 1.7 }}>I’m a web developer and robotics team lead building high‑performance interfaces, immersive 3D experiences, and ML‑powered tools.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
            {["React","TypeScript","Three.js","Node","Postgres","Python","TensorFlow","Figma"].map((s) => (<span key={s} style={{ border: "1px solid rgba(255,255,255,0.18)", padding: "6px 10px", borderRadius: 999, fontSize: 12, opacity: 0.9 }}>{s}</span>))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// BLOG (stub)
function Blog() {
  const posts = [
    { title: "Designing for uncertainty (rulebook @ 3:07am)", date: "2025-10-30", link: "#" },
    { title: "Interactive seat maps with R3F: patterns", date: "2025-11-08", link: "#" },
  ];
  return (
    <section id="blog" style={sectionStyle}>
      <h2 style={{ fontSize: 44, marginBottom: 14 }}>Writing</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {posts.map((p)=> (
          <a key={p.title} href={p.link} style={{ ...cardStyle, display: "block", textDecoration: "none", color: "inherit" }}>
            <strong>{p.title}</strong>
            <div style={{ opacity: 0.7 }}>{p.date}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// CONTACT
function Contact() {
  return (
    <section id="contact" style={{ ...sectionStyle, paddingBottom: 120 }}>
      <h2 style={{ fontSize: 44, marginBottom: 14 }}>Contact</h2>
      <div style={{ ...cardStyle }}>
        <p style={{ opacity: 0.8, marginTop: 0 }}>Let’s collaborate. Email <a href="mailto:timbus.maria.alexandra@gmail.com" style={{ color: FG, textDecoration: "underline" }}>timbus.maria.alexandra@gmail.com</a> or find me here:</p>
        <SocialBar />
        <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! I’ll reply shortly."); }} style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <Input label="Name" placeholder="Ada Lovelace" />
            <Input label="Email" placeholder="ada@lovelace.dev" type="email" />
          </div>
          <Input label="Subject" placeholder="Let’s build something" />
          <Textarea label="Message" placeholder="Tell me about your idea…" rows={6} />
          <button type="submit" style={{ ...ctaStyle(FG), border: "none", cursor: "pointer", alignSelf: "start" }}>Send</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "22px 0", textAlign: "center", opacity: 0.8 }}>
      <div style={{ width: "min(1200px,92%)", margin: "0 auto" }}>
        © {new Date().getFullYear()} {NAME} — Monochrome Edition.
      </div>
    </footer>
  );
}

// 3D Object
function MonochromeKnot({ lively = false }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = lively ? 0.5 : 0.2;
    const bob = lively ? 0.35 : 0.2;
    mesh.current.rotation.x = t * (speed + 0.15);
    mesh.current.rotation.y = t * (speed + 0.25);
    mesh.current.position.y = Math.sin(t * 1.2) * bob;
    mesh.current.position.x = Math.cos(t * 0.6) * (lively ? 0.4 : 0.2);
    mesh.current.position.z = Math.sin(t * 0.6) * (lively ? 0.4 : 0.2);
    const s = 1 + (lively ? 0.08 : 0.04) * Math.sin(t * 2);
    mesh.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.1} castShadow>
      <torusKnotGeometry args={[1, 0.35, 220, 32]} />
      <meshStandardMaterial metalness={0.25} roughness={0.35} color={FG} />
    </mesh>
  );
}

// Inputs & CTA
function Input({ label, ...props }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{label}</span>
      <input {...props} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "12px 14px", color: FG, outline: "none" }} />
    </label>
  );
}
function Textarea({ label, ...props }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{label}</span>
      <textarea {...props} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "12px 14px", color: FG, outline: "none", resize: "vertical" }} />
    </label>
  );
}
function ctaStyle(color = FG) {
  return { display: "inline-block", padding: "12px 18px", borderRadius: 14, border: `1px solid ${color}`, color: "#000", background: color, fontWeight: 800, letterSpacing: 0.4 };
}
