import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, backdropFilter: "blur(20px)", ...style }}>
      {children}
    </div>
  );
}

const steps = [
  { id: 1, label: "Welcome", desc: "Set up your voice profile for Torque Vision AI" },
  { id: 2, label: "Voice Sample", desc: "Read the prompt aloud so we can calibrate your voice" },
  { id: 3, label: "Noise Test", desc: "We'll check ambient noise levels in your environment" },
  { id: 4, label: "Command Test", desc: "Try a few voice commands to verify recognition" },
  { id: 5, label: "Complete", desc: "Your voice profile is ready" },
];

const prompts = [
  "Fleet Commander, show me today's maintenance schedule.",
  "Pull up vehicle GMC-7729 diagnostics.",
  "Order brake pads for Unit F150-2241.",
];

export default function VoiceCalibration() {
  const [step, setStep] = useState(1);
  const [recording, setRecording] = useState(false);
  const [done, setDone] = useState(false);
  const [bars, setBars] = useState(Array(24).fill(4));
  const navigate = useNavigate();

  useEffect(() => {
    if (!recording) return;
    const interval = setInterval(() => {
      setBars(Array(24).fill(0).map(() => Math.random() * 48 + 4));
    }, 80);
    const timeout = setTimeout(() => {
      setRecording(false);
      setDone(true);
      clearInterval(interval);
    }, 3000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [recording]);

  const handleNext = () => {
    if (step < 5) { setStep(step + 1); setDone(false); }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(173,198,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(77,142,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 520, position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: "#adc6ff", letterSpacing: 2, marginBottom: 4 }}>
            TORQUE VISION AI
          </div>
          <div style={{ fontSize: 11, color: "#8c909f", letterSpacing: 3 }}>VOICE CALIBRATION</div>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {steps.map((s) => (
            <div
              key={s.id}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: step > s.id ? "#adc6ff" : step === s.id ? "linear-gradient(90deg, #adc6ff, #4d8eff)" : "rgba(255,255,255,0.1)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>

        <GlassCard style={{ padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#adc6ff", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            Step {step} of {steps.length} — {steps[step - 1].label}
          </div>
          <p style={{ color: "#8c909f", fontSize: 13, margin: "0 0 28px", lineHeight: 1.5 }}>
            {steps[step - 1].desc}
          </p>

          {step === 1 && (
            <div>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(173,198,255,0.1)", border: "2px solid rgba(173,198,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 36, color: "#adc6ff" }}>mic</span>
              </div>
              <p style={{ color: "#cac4d0", fontSize: 13, lineHeight: 1.6, margin: "0 0 24px" }}>
                Voice calibration takes about 2 minutes. Find a quiet space and speak naturally when prompted.
              </p>
              <button onClick={handleNext} style={{ padding: "12px 32px", background: "#adc6ff", border: "none", borderRadius: 12, color: "#002e6a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
                Let's Begin
              </button>
            </div>
          )}

          {(step === 2 || step === 4) && (
            <div>
              <div style={{ padding: "14px 16px", background: "rgba(173,198,255,0.05)", border: "1px solid rgba(173,198,255,0.15)", borderRadius: 12, marginBottom: 24, textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#8c909f", marginBottom: 6 }}>Read aloud:</div>
                <div style={{ fontSize: 14, color: "#e5e2e1", lineHeight: 1.5, fontStyle: "italic" }}>
                  "{step === 4 ? prompts[1] : prompts[0]}"
                </div>
              </div>

              {/* Waveform */}
              <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginBottom: 24 }}>
                {bars.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: recording ? h : 4,
                      borderRadius: 2,
                      background: done ? "#4ade80" : recording ? "#adc6ff" : "rgba(173,198,255,0.2)",
                      transition: recording ? "height 0.08s" : "height 0.3s, background 0.3s",
                    }}
                  />
                ))}
              </div>

              {!done ? (
                <button
                  onClick={() => setRecording(true)}
                  disabled={recording}
                  style={{
                    padding: "12px 32px",
                    background: recording ? "rgba(173,198,255,0.1)" : "#adc6ff",
                    border: "none",
                    borderRadius: 12,
                    color: recording ? "#adc6ff" : "#002e6a",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: recording ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    margin: "0 auto",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{recording ? "graphic_eq" : "mic"}</span>
                  {recording ? "Listening…" : "Start Recording"}
                </button>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#4ade80", marginBottom: 16, fontWeight: 600 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
                    Sample captured successfully
                  </div>
                  <button onClick={handleNext} style={{ padding: "12px 32px", background: "#adc6ff", border: "none", borderRadius: 12, color: "#002e6a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 20px" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(173,198,255,0.05)", border: "2px solid rgba(173,198,255,0.15)", animation: "expandRing 2s ease-out infinite" }} />
                <div style={{ position: "absolute", inset: 12, borderRadius: "50%", background: "rgba(173,198,255,0.08)", border: "2px solid rgba(173,198,255,0.25)", animation: "expandRing 2s ease-out 0.4s infinite" }} />
                <div style={{ position: "absolute", inset: 24, borderRadius: "50%", background: "rgba(173,198,255,0.1)", border: "2px solid rgba(173,198,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#adc6ff" }}>graphic_eq</span>
                </div>
              </div>
              <p style={{ color: "#cac4d0", fontSize: 13, margin: "0 0 20px" }}>
                Analyzing ambient noise… Stay quiet for a moment.
              </p>
              <div style={{ padding: "10px 16px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 10, marginBottom: 20, fontSize: 12, color: "#4ade80" }}>
                ✓ Noise level: 28dB — Excellent environment detected
              </div>
              <button onClick={handleNext} style={{ padding: "12px 32px", background: "#adc6ff", border: "none", borderRadius: 12, color: "#002e6a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
                Next Step
              </button>
            </div>
          )}

          {step === 5 && (
            <div>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "2px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 30px rgba(74,222,128,0.15)" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 36, color: "#4ade80" }}>verified</span>
              </div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: "#4ade80", margin: "0 0 8px" }}>Voice Profile Ready</h3>
              <p style={{ color: "#8c909f", fontSize: 13, lineHeight: 1.5, margin: "0 0 24px" }}>
                Torque Vision AI will now recognize your voice with 97.4% accuracy across all commands.
              </p>
              {[["Voice Match Score", "97.4%", "#4ade80"], ["Noise Tolerance", "Excellent", "#4ade80"], ["Command Set", "108 commands", "#adc6ff"]].map(([k, v, c]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13 }}>
                  <span style={{ color: "#8c909f" }}>{k}</span>
                  <span style={{ color: c, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <button onClick={() => navigate("/automotive/fleet")} style={{ marginTop: 24, padding: "12px 32px", background: "#adc6ff", border: "none", borderRadius: 12, color: "#002e6a", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>
                Go to Fleet Commander
              </button>
            </div>
          )}
        </GlassCard>
      </div>

      <style>{`
        @keyframes expandRing { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 0; transform: scale(1.3); } }
      `}</style>
    </div>
  );
}
