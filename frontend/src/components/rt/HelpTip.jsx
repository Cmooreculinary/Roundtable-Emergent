import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// Shows once per section per browser
export default function HelpTip({ section, text, position = "top-right" }) {
  const key = `rt-help-${section}`;
  const [show, setShow] = useState(() => !localStorage.getItem(key));

  useEffect(() => {
    if (show) {
      const t = setTimeout(() => {}, 0);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!show) return null;

  const dismiss = () => {
    localStorage.setItem(key, "1");
    setShow(false);
  };

  const positionStyle =
    position === "top-right"
      ? { top: 16, right: 16 }
      : position === "bottom-right"
        ? { bottom: 120, right: 16 }
        : { top: 16, left: 16 };

  return (
    <div className="help-tip" style={positionStyle} data-testid={`help-${section}`}>
      <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
        <div style={{ flex: 1, fontSize: 12, lineHeight: 1.5 }}>{text}</div>
        <button onClick={dismiss} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 2 }}>
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
