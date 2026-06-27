"use client";

import { useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

type SignatureCanvasFieldProps = {
  value: string;
  onChange: (dataUrl: string) => void;
};

export function SignatureCanvasField({ value, onChange }: SignatureCanvasFieldProps) {
  const padRef = useRef<SignatureCanvas>(null);
  const restoredRef = useRef(false);

  useEffect(() => {
    if (restoredRef.current || !value || !padRef.current) return;
    padRef.current.fromDataURL(value);
    restoredRef.current = true;
  }, [value]);

  const syncSignature = () => {
    const pad = padRef.current;
    if (!pad || pad.isEmpty()) {
      onChange("");
      return;
    }
    onChange(pad.toDataURL("image/png"));
  };

  const clearSignature = () => {
    padRef.current?.clear();
    onChange("");
  };

  return (
    <div className="tamay-signature-field">
      <label>
        Signature *
        <div className="tamay-signature-pad">
          <SignatureCanvas
            ref={padRef}
            penColor="#0b1f3a"
            canvasProps={{
              className: "tamay-signature-canvas",
              "aria-label": "Draw your signature",
            }}
            onEnd={syncSignature}
          />
        </div>
      </label>
      <button type="button" className="tamay-signature-clear" onClick={clearSignature}>
        Clear signature
      </button>
      <p className="tamay-note">Sign with your finger or mouse in the box above.</p>
    </div>
  );
}
