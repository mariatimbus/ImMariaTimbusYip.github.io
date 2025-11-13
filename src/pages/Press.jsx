import React from 'react';
import { motion } from 'framer-motion';
import { PRESS } from '../data';
import { Navbar, Footer, sectionStyle } from '../shared';

export default function Press() {
  return (
    <div>
      <Navbar />
      <section id="press" style={sectionStyle}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 44, marginBottom: 24 }}
        >
          Press
        </motion.h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {PRESS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <strong style={{ display: "block", marginBottom: 10 }}>
                {item.title}
              </strong>
              {item.type === "youtube" ? (
                <div
                  style={{
                    position: "relative",
                    paddingTop: "56.25%",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <iframe
                    src={item.embed}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  ></iframe>
                </div>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  Open article/video
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
