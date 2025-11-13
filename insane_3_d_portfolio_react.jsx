import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Environment, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

// =========================
// 3D ELEMENTS
// =========================
function TorusKnot({ position = [0, 0, 0], scale = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.y = t * 0.3;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.2;
  });
  return (
    <mesh ref={mesh} position={position} scale={scale} castShadow>
      <torusKnotGeometry args={[1, 0.35, 220, 32]} />
      <meshStandardMaterial metalness={0.9} roughness={0.15} color="#00ffff" />
    </mesh>
  );
}

function Particles() {
  const count = 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 + Math.random() * 18;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 18;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [count]);
  const pointsRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.02;
    if (pointsRef.current) pointsRef.current.rotation.y = t;
  });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

// Optional GLTF drop zone (replace "/model.glb" with your own in /public)
function FancyModel({ url = "/model.glb" }) {
  const { scene } = useGLTF(url, true);
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.15;
      ref.current.position.y = Math.sin(t * 0.8) * 0.1;
    }
  });
  return <primitive ref={ref} object={scene} scale={1.2} />;
}

// =========================
// UI HELPERS
// =========================
const sectionStyle = {
  width: "min(1200px, 92%)",
  margin: "0 auto",
  padding: "80px 0",
};

const cardStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 24,
  padding: 24,
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
};

// =========================
// COMPONENT
// =========================
export default function App() {
  return (
    <div style={{ background: "#05070d", color: "#e6faff", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

function Navbar() {
  const link = {
    color: "#e6faff",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 600,
  };
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(5,7,13,0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ ...sectionStyle, padding: "14px 0", display: "flex", gap: 16, alignItems: "center" }}>
        <a href="#hero" style={{ ...link, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "linear-gradient(135deg,#00ffff, #7cf9ff)",
            boxShadow: "0 0 24px #00ffff55",
            display: "inline-block",
          }} />
          <span style={{ letterSpacing: 1, fontWeight: 800 }}>dev.me()</span>
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {[
            { href: "#projects", label: "Projects" },
            { href: "#about", label: "About" },
            { href: "#skills", label: "Skills" },
            { href: "#contact", label: "Contact" },
          ].map((it) => (
            <a key={it.href} href={it.href} style={link}>
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ position: "relative" }}>
      <div style={{ height: "88vh", position: "relative" }}>
        {/* 3D Canvas */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Canvas camera={{ position: [0, 1.2, 6], fov: 50 }} shadows>
            <ambientLight intensity={0.35} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
            <Suspense fallback={<Html center>Loading 3D…</Html>}>
              <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
                <TorusKnot />
              </Float>
              {/* Drop your own GLB into /public/model.glb to enable this */}
              {/* <FancyModel url="/model.glb" /> */}
              <Particles />
              <Environment preset="city" />
              <OrbitControls enablePan={false} enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>

        {/* Headline overlay */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ maxWidth: 900 }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                marginBottom: 16,
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ opacity: 0.9 }}>🛠️ Web Dev • 3D • AI • React</span>
            </div>
            <h1 style={{ fontSize: 64, margin: "0 0 8px", letterSpacing: 1 }}>
              Building <span style={{ color: "#00ffff", textShadow: "0 0 24px #00ffff55" }}>insane</span> web
              experiences
            </h1>
            <p style={{ opacity: 0.85, fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
              I craft high‑performance, animated web apps with immersive 3D and smooth UX. Scroll to see selected
              projects, or drop me a message below.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#projects" style={ctaStyle("#00ffff")}>
                View Projects
              </a>
              <a href="#contact" style={ctaStyle("#ffffff")}>Contact Me</a>
            </div>
          </motion.div>
        </div>

        {/* Gradient vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 40% at 50% 30%, rgba(0,255,255,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 70% at 50% 100%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "OfficePlanner 3D",
      desc: "Interactive seat‑map with real‑time booking, glow states, auth, and analytics.",
      tech: ["React", "R3F", "Node", "Postgres"],
      link: "#",
    },
    {
      title: "LinkBeam",
      desc: "NFC contact hub with dynamic cards, analytics, and QR fallback.",
      tech: ["React", "Vite", "Firebase"],
      link: "#",
    },
    {
      title: "Spectra AI",
      desc: "Astro spectral classifier pipeline with 20% accuracy lift on DR19.",
      tech: ["Python", "TensorFlow", "FastAPI"],
      link: "#",
    },
  ];

  return (
    <section id="projects" style={sectionStyle}>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: 44, marginBottom: 24 }}>
        Featured Projects
      </motion.h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            style={{ ...cardStyle, textDecoration: "none", color: "inherit", transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 20, rotateX: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ y: -6, rotateX: 2, rotateY: 2 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={{
              height: 160,
              borderRadius: 16,
              marginBottom: 14,
              background: "linear-gradient(135deg, #06131a, #0b2630)",
              border: "1px solid rgba(255,255,255,0.08)",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.35, filter: "blur(20px)" }}>
                <Canvas camera={{ position: [0, 0, 4] }}>
                  <ambientLight intensity={0.6} />
                  <Float speed={2} floatIntensity={1.4}>
                    <mesh>
                      <icosahedronGeometry args={[1, 0]} />
                      <meshStandardMaterial metalness={0.8} roughness={0.2} color="#00ffff" />
                    </mesh>
                  </Float>
                </Canvas>
              </div>
              <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
            </div>
            <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
            <p style={{ opacity: 0.82, margin: 0 }}>{p.desc}</p>
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.tech.map((t) => (
                <span key={t} style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                  opacity: 0.9,
                }}>{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={sectionStyle}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
            <img src="/me.jpg" alt="Portrait" style={{ display: "block", width: "100%", height: 420, objectFit: "cover" }} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: 44, marginTop: 0 }}>About Me</h2>
          <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
            I’m a web developer focused on delightful interfaces, 3D visuals, and performance. I design and build
            React apps end‑to‑end: architecture, components, state, API integration, and deployment. Recently, I’ve
            shipped interactive 3D seat‑maps, AI‑assisted dashboards, and high‑impact marketing sites.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
            {["React", "TypeScript", "Three.js", "Node", "Postgres", "Python", "TensorFlow", "Figma"].map((s) => (
              <span key={s} style={{ border: "1px solid rgba(255,255,255,0.14)", padding: "6px 10px", borderRadius: 999, fontSize: 12, opacity: 0.9 }}>{s}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const items = [
    { name: "React & Frontend Architecture", val: 95 },
    { name: "Three.js / R3F & Animations", val: 90 },
    { name: "Node / APIs / Databases", val: 85 },
    { name: "UX & Visual Design", val: 88 },
  ];
  return (
    <section id="skills" style={sectionStyle}>
      <h2 style={{ fontSize: 44, marginBottom: 14 }}>Skills</h2>
      <div style={{ display: "grid", gap: 14 }}>
        {items.map((i) => (
          <div key={i.name} style={{ ...cardStyle }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong>{i.name}</strong>
              <span>{i.val}%</span>
            </div>
            <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${i.val}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ height: "100%", background: "linear-gradient(90deg,#00ffff,#7cf9ff)", boxShadow: "0 0 16px #00ffff66" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ ...sectionStyle, paddingBottom: 120 }}>
      <h2 style={{ fontSize: 44, marginBottom: 14 }}>Contact</h2>
      <div style={{ ...cardStyle }}>
        <p style={{ opacity: 0.85, marginTop: 0 }}>
          Want to collaborate or hire me? Email <a href="mailto:you@example.com" style={{ color: "#00ffff" }}>you@example.com</a>
          , or use the form below.
        </p>
        <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! I’ll reply shortly."); }} style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <Input label="Name" placeholder="Ada Lovelace" />
            <Input label="Email" placeholder="ada@lovelace.dev" type="email" />
          </div>
          <Input label="Subject" placeholder="Let’s build something wild" />
          <Textarea label="Message" placeholder="Tell me about your idea…" rows={6} />
          <button type="submit" style={{ ...ctaStyle("#00ffff"), border: "none", cursor: "pointer", alignSelf: "start" }}>Send</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "22px 0", textAlign: "center", opacity: 0.8 }}>
      <div style={{ width: "min(1200px,92%)", margin: "0 auto" }}>
        © {new Date().getFullYear()} Your Name — Built with React, R3F, and love.
      </div>
    </footer>
  );
}

// =========================
// UI SUBCOMPONENTS
// =========================
function Input({ label, ...props }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{label}</span>
      <input
        {...props}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 12,
          padding: "12px 14px",
          color: "#e6faff",
          outline: "none",
        }}
      />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{label}</span>
      <textarea
        {...props}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 12,
          padding: "12px 14px",
          color: "#e6faff",
          outline: "none",
          resize: "vertical",
        }}
      />
    </label>
  );
}

function ctaStyle(color = "#00ffff") {
  return {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 14,
    border: `1px solid ${color === "#ffffff" ? "rgba(255,255,255,0.4)" : color}`,
    color: color === "#ffffff" ? "#0b1a1f" : "#0b1a1f",
    background: color === "#ffffff" ? "#ffffff" : `linear-gradient(135deg, ${color}, #7cf9ff)`,
    boxShadow: "0 10px 24px rgba(0,255,255,0.25)",
    fontWeight: 800,
    letterSpacing: 0.4,
  };
}

// drei GLTF loader fallback
useGLTF.preload && useGLTF.preload("/model.glb");
