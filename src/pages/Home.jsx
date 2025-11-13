import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { NAME, TAGLINE, SOCIAL, PROJECTS, SKILLS } from "../data";
import { Navbar, Footer, sectionStyle } from "../shared";

const FG = "#ffffff";

export default function Home() {
  return (
    <div className="scanlines">
      <div className="pixel-grid" />
      <Navbar />
      <Hero />
      <Projects />
      <SkillsSection />
      <About />
      <Contact />
      <Footer />
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
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1.05}
                enableDamping
                dampingFactor={0.06}
              />
            </Suspense>
          </Canvas>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            padding: 24,
            background:
              "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.9) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{ maxWidth: 900 }}
          >
            <h1
              className="flicker"
              style={{
                fontSize: 52,
                margin: "0 0 8px",
                letterSpacing: 0.5,
                textShadow:
                  "0 0 10px rgba(255,255,255,0.25), 0 2px 20px rgba(0,0,0,0.65)",
              }}
            >
              {NAME} — <span className="cursor">{TAGLINE}</span>
            </h1>
            <p
              style={{
                opacity: 0.9,
                fontSize: 18,
                lineHeight: 1.6,
                marginBottom: 18,
                textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              }}
            >
              I build animated web apps with immersive 3D and strong UX.
              Currently: leading, building, and learning at the intersection of
              code, design, and robotics.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href="#projects" style={ctaStyle("#fff")}>
                See my work
              </a>
              <SocialBar minimal />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialBar({ minimal = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {SOCIAL.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="pixel-border"
          style={{
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 8,
            padding: "8px 12px",
            opacity: minimal ? 0.9 : 1,
          }}
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={sectionStyle}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: 44, marginBottom: 24 }}
      >
        Projects
      </motion.h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      style={{
        textDecoration: "none",
        color: "inherit",
        transformStyle: "preserve-3d",
        display: "block",
        borderRadius: 16,
      }}
      className="pixel-card"
      initial={{ opacity: 0, y: 20, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
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
        boxShadow: hover
          ? "0 20px 50px rgba(255,255,255,0.08)"
          : "0 10px 40px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          height: 180,
          borderRadius: 16,
          marginBottom: 14,
          background: "linear-gradient(135deg, #0a0a0a, #111)",
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            filter: "blur(18px)",
          }}
        >
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.7} />
            <Float speed={2.6} floatIntensity={1.6} rotationIntensity={1.2}>
              <mesh>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                  metalness={0.2}
                  roughness={0.4}
                  color={FG}
                />
              </mesh>
            </Float>
          </Canvas>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
          }}
        />
      </div>
      <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
      <p style={{ opacity: 0.82, margin: 0 }}>{p.desc}</p>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {p.tech.map((t) => (
          <span
            key={t}
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: 12,
              opacity: 0.9,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={sectionStyle}>
      <h2 style={{ fontSize: 44, marginBottom: 14 }}>Skills</h2>
      <div style={{ display: "grid", gap: 14 }}>
        {SKILLS.map((i, idx) => (
          <div
            key={i.name}
            className="pixel-card"
            style={{ padding: 16 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <strong>{i.name}</strong>
              <span>{i.val}%</span>
            </div>
            <div
              style={{
                height: 10,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 2,
                overflow: "hidden",
                imageRendering: "pixelated",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${i.val}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: idx * 0.05 }}
                style={{
                  height: "100%",
                  background: "#fff",
                  boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={sectionStyle}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="pixel-card"
            style={{ padding: 0, overflow: "hidden", position: "relative" }}
          >
            <img
              src="/me.jpg"
              alt="Maria Timbuș"
              style={{
                display: "block",
                width: "100%",
                height: 480,
                objectFit: "cover",
                filter: "grayscale(100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                background: "rgba(0,0,0,0.6)",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <strong>Maria Timbuș</strong>
              <div style={{ opacity: 0.8, fontSize: 12 }}>
                Creative Technologist & Robotics Leader
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="pixel-card" style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0 }} className="flicker">
              About Me
            </h2>
            <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
              I’m a web developer and robotics team lead building high‑performance
              interfaces, immersive 3D experiences, and ML‑powered tools. At
              Quantum Robotics (FTC), I led 20+ teammates, shipped interactive
              seat‑maps, AI‑assisted dashboards, and ran 50+ outreach events.
            </p>
            <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
              I care about clarity, speed, and a little bit of flair—like this
              site’s pixel vibe and 3D motion. Let’s build something bold.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = React.useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("sent");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      style={{ ...sectionStyle, paddingBottom: 120 }}
    >
      <h2 style={{ fontSize: 44, marginBottom: 14 }}>Contact</h2>
      <div className="pixel-card" style={{ padding: 24 }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 12, marginTop: 16 }}
        >
          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Input name="name" label="Name" placeholder="Ada Lovelace" />
            <Input
              name="email"
              label="Email"
              placeholder="ada@lovelace.dev"
              type="email"
            />
          </div>
          <Input
            name="subject"
            label="Subject"
            placeholder="Let’s build something"
          />
          <Textarea
            name="message"
            label="Message"
            placeholder="Tell me about your idea…"
            rows={6}
          />
          <button
            type="submit"
            style={{
              ...ctaStyle("#fff"),
              border: "none",
              cursor: "pointer",
              alignSelf: "start",
            }}
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          {status === "sent" && (
            <div style={{ color: "#9cff9c" }}>Thanks! I’ll reply shortly.</div>
          )}
          {status === "error" && (
            <div style={{ color: "#ff9c9c" }}>
              Something went wrong. Try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function MonochromeKnot({ lively = true }) {
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

function Input({ label, ...props }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{label}</span>
      <input
        {...props}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 6,
          padding: "12px 14px",
          color: "#fff",
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
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 6,
          padding: "12px 14px",
          color: "#fff",
          outline: "none",
          resize: "vertical",
        }}
      />
    </label>
  );
}

function ctaStyle(color = "#fff") {
  return {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 6,
    border: `1px solid ${color}`,
    color: "#000",
    background: color,
    fontWeight: 800,
    letterSpacing: 0.4,
  };
}
