import { useState, useRef } from "react";

const COLORS = {
  navy: "#080074",
  brown: "#877653",
  cream: "#FFF8E7",
  green: "#00A408",
  lightGreen: "#D6F2D6",
  purple: "#C465D4",
  lightPurple: "#F0DCF5",
  black: "#000000",
  tan: "#E8DFC8",
  blue: "#2277FF",
  white: "#FFFFFF",
};

const ROUTES = [
  { id: 1, from: "Walker Hall", to: "Hillman Hall", lastChecked: "2.2", distance: "0.3 mi" },
  { id: 2, from: "Crow Hall", to: "Duncker Hall", lastChecked: "2.5", distance: "350 ft" },
  { id: 3, from: "Olin Library", to: "Siegel Hall", lastChecked: "N/A", distance: "0.3 mi" },
  { id: 4, from: "Steinberg Hall", to: "Jubel Hall", lastChecked: "2.1", distance: "0.8 mi" },
];

const CONDITIONS = [
  { id: "clear", label: "Clear / No Issues" },
  { id: "minor", label: "Minor damage (cracks, small potholes)" },
  { id: "major", label: "Major damage (large potholes, buckling)" },
  { id: "debris", label: "Debris or obstruction" },
  { id: "water", label: "Standing water or flooding" },
  { id: "ice", label: "Ice or snow cover" },
  { id: "other", label: "Other" },
];

const JOURNEY_OPTIONS = [
  { emoji: "😬", label: "Danger zone" },
  { emoji: "🤔", label: "Better be careful" },
  { emoji: "😇", label: "Easy-peasy" },
];

const heading = {
  fontFamily: "'Times New Roman', Times, serif",
  fontStyle: "italic",
  fontSize: 24,
  fontWeight: 400,
  color: "#C465D4",
  margin: 0,
};

const body16 = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 16,
  lineHeight: 1.6,
  color: "#000000",
  margin: 0,
};

const body12 = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 12,
  lineHeight: 1.5,
  color: "#000000",
  margin: 0,
};

export default function RoadSafetySurvey() {
  const [step, setStep] = useState(0);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [journey, setJourney] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [conditions, setConditions] = useState([]);
  const [otherText, setOtherText] = useState("");
  const fileRef = useRef(null);

  const route = ROUTES.find((r) => r.id === selectedRoute);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const toggleCondition = (id) => {
    setConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const reset = () => {
    setStep(0);
    setMake("");
    setModel("");
    setYear("");
    setSelectedRoute(null);
    setJourney(null);
    setPhoto(null);
    setPhotoName("");
    setConditions([]);
    setOtherText("");
  };

  const handleSubmit = () => {
    setStep(9);
    setTimeout(() => setStep(10), 2200);
  };

  const conditionLabels = conditions
    .map((id) => CONDITIONS.find((c) => c.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.cream,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Top status bar area */}
      <div style={{ height: 44, flexShrink: 0, width: "100%", maxWidth: 390 }} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: "0 20px",
          paddingBottom: 80,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 390,
          boxSizing: "border-box",
        }}
      >
        {/* SCREEN 0: WELCOME */}
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 25 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: COLORS.green,
                  flexShrink: 0,
                }}
              />
              <h1 style={heading}>Road Safety Survey</h1>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <p style={{ ...body16, textDecoration: "underline" }}>Welcome to the Road Safety Survey!</p>
              <p style={body16}>
                Thank you for your contribution in helping to check road conditions on campus so others know it's safe to travel.
              </p>
              <p style={body16}>
                Before you begin, make sure you are in a safe location and conditions allow you to travel.
              </p>
            </div>
          </div>
        )}

        {/* SCREEN 1: CONSENT */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 25 }}>Before we start,</h1>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <p style={body16}>
                This is a research activity conducted by the students in the MDes program.
              </p>
              <p style={body16}>
                The photos and information you provide will only be used to assess the user interaction.
              </p>
              <p style={body16}>
                Your data will not be shared outside the research team. No personally identifying information is stored with your submission.
              </p>
              <p style={body16}>By continuing, you agree to participate.</p>
            </div>
          </div>
        )}

        {/* SCREEN 2: VEHICLE */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 25 }}>Vehicle information</h1>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <p style={body16}>
                Different vehicles handle road conditions differently, and at different speeds.
              </p>
              <p style={body16}>
                This helps us understand how conditions affect travel depending on what you drive.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                {[
                  { val: make, set: setMake, placeholder: "Make (e.g. Toyota)" },
                  { val: model, set: setModel, placeholder: "Model (e.g. Camry)" },
                  { val: year, set: setYear, placeholder: "Year (e.g. 2018)" },
                ].map((f, i) => (
                  <input
                    key={i}
                    type="text"
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      fontSize: 16,
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      border: `1.5px solid ${COLORS.purple}`,
                      borderRadius: 4,
                      background: COLORS.lightPurple,
                      outline: "none",
                      boxSizing: "border-box",
                      color: COLORS.black,
                    }}
                  />
                ))}
              </div>
              <p style={body16}>(Leave blank if walking)</p>
            </div>
          </div>
        )}

        {/* SCREEN 3: ROUTE SELECTION */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 12 }}>Route selection</h1>
            <p style={{ ...body16, marginBottom: 25 }}>
              Select a route to begin. Start with the one you feel the most comfortable checking!
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                flex: 1,
                alignContent: "start",
              }}
            >
              {ROUTES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoute(r.id)}
                  style={{
                    background: selectedRoute === r.id ? COLORS.lightGreen : COLORS.cream,
                    border: selectedRoute === r.id
                      ? `2px solid ${COLORS.green}`
                      : `1.5px solid ${COLORS.lightGreen}`,
                    borderRadius: 4,
                    padding: 12,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    position: "relative",
                    minHeight: 100,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 400, color: COLORS.black, lineHeight: 1.3 }}>
                    {r.from} to {r.to}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 400, color: COLORS.black, lineHeight: 1.4 }}>
                    Last checked: {r.lastChecked}
                    <br />
                    Distance: {r.distance}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      right: 10,
                      fontSize: 14,
                      color: COLORS.green,
                    }}
                  >
                    →
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 4: PREVIEW ROUTE */}
        {step === 4 && route && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 25 }}>Preview your route</h1>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <div>
                <p style={body16}>Please review the route before heading out.</p>
                <p style={{ ...body16, marginTop: 8 }}>
                  Travel to the starting point when you are ready.
                </p>
              </div>
              <p style={{ ...body16, textDecoration: "underline" }}>
                Safety note: If conditions seem unsafe at any point, stop and return to a safe location. You can exit this task at any time.
              </p>
              <div
                style={{
                  background: COLORS.lightGreen,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: 4,
                  padding: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ ...body16, fontWeight: 400 }}>
                    {route.from} to {route.to}
                  </span>
                  <span style={{ ...body12, color: COLORS.black }}>Distance: {route.distance}</span>
                </div>
                <div style={{ ...body12, color: COLORS.black, marginBottom: 10 }}>
                  Last checked: {route.lastChecked}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 120,
                    background: `linear-gradient(135deg, ${COLORS.lightGreen}, #c5d4a0, ${COLORS.lightGreen})`,
                    borderRadius: 4,
                    border: `1px solid ${COLORS.green}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ ...body12, color: COLORS.black }}>Map preview</span>
                </div>
                <p style={{ ...body12, color: COLORS.black, marginTop: 10 }}>
                  You will arrive in 6 minutes
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 5: HAVE YOU ARRIVED */}
        {step === 5 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 25 }}>Have you arrived?</h1>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <p style={body16}>
                Please keep the app open while you navigate to your destination.
              </p>
              <p style={body16}>
                Once you have reached the starting point of your route, let us know.
              </p>
              <p style={body16}>Take a moment to assess the area before continuing.</p>
              <div
                style={{
                  background: COLORS.lightGreen,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: 4,
                  padding: 16,
                }}
              >
                <p style={{ ...body16, fontWeight: 400, marginBottom: 14, textAlign: "center" }}>
                  How was the journey
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                  {JOURNEY_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setJourney(i)}
                      style={{
                        background: journey === i ? COLORS.lightPurple : COLORS.cream,
                        border: journey === i
                          ? `2px solid ${COLORS.purple}`
                          : `1px solid ${COLORS.green}`,
                        borderRadius: 6,
                        padding: "10px 8px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        minWidth: 80,
                        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      }}
                    >
                      <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                      <span style={{ fontSize: 10, color: COLORS.black, textAlign: "center", lineHeight: 1.3 }}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 6: PHOTO CAPTURE */}
        {step === 6 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 25 }}>Photo capture</h1>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <p style={body16}>
                Take a photo that shows the full width of the road surface.
              </p>
              <div>
                <p style={{ ...body16, marginBottom: 10 }}>Try to include:</p>
                <ul style={{ ...body16, margin: 0, paddingLeft: 20 }}>
                  <li style={{ marginBottom: 4 }}>The road surface itself</li>
                  <li style={{ marginBottom: 4 }}>Any visible hazards or damage</li>
                  <li>Enough context to identify the location</li>
                </ul>
              </div>
              {photo && (
                <div style={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${COLORS.green}` }}>
                  <img
                    src={photo}
                    alt="Captured road"
                    style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                  />
                </div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                style={{
                  padding: "12px 16px",
                  background: COLORS.lightPurple,
                  border: `1.5px solid ${COLORS.purple}`,
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 16,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  color: COLORS.black,
                  textAlign: "left",
                }}
              >
                {photo ? `✓ ${photoName}` : "Upload file"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhoto}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}

        {/* SCREEN 7: WHAT DO YOU SEE */}
        {step === 7 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 25 }}>What do you see?</h1>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
              <p style={body16}>Options (select one or more):</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CONDITIONS.map((c) => (
                  <div key={c.id}>
                    <button
                      onClick={() => toggleCondition(c.id)}
                      style={{
                        display: "inline-block",
                        padding: "8px 14px",
                        background: conditions.includes(c.id) ? COLORS.lightPurple : COLORS.cream,
                        border: `1.5px solid ${conditions.includes(c.id) ? COLORS.purple : COLORS.purple}`,
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 14,
                        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                        color: COLORS.black,
                        textAlign: "left",
                      }}
                    >
                      {c.label}
                    </button>
                    {c.id === "other" && conditions.includes("other") && (
                      <input
                        type="text"
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        placeholder="Please describe..."
                        style={{
                          display: "block",
                          marginTop: 8,
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: 14,
                          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                          border: `1.5px solid ${COLORS.purple}`,
                          borderRadius: 4,
                          background: COLORS.lightPurple,
                          outline: "none",
                          boxSizing: "border-box",
                          color: COLORS.black,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 8: REVIEW */}
        {step === 8 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <h1 style={{ ...heading, marginBottom: 25 }}>Review and submit</h1>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <p style={body16}>Confirm everything looks right before submitting.</p>
              <div
                style={{
                  background: COLORS.lightGreen,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: 4,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={body16}>
                  Route: {route ? `${route.from} – ${route.to}` : "—"}
                </div>
                <div style={body16}>
                  Condition: {conditionLabels || "[not selected]"}
                </div>
                <div style={body16}>
                  Notes: {otherText || "[none]"}
                </div>
                <div style={body16}>
                  Photo:{" "}
                  {photo ? (
                    <img
                      src={photo}
                      alt="Submission"
                      style={{
                        display: "block",
                        marginTop: 6,
                        width: "100%",
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 4,
                        border: `1px solid ${COLORS.green}`,
                      }}
                    />
                  ) : (
                    "[no photo]"
                  )}
                </div>
                <div style={body16}>
                  Date: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 9: UPLOADING */}
        {step === 9 && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <h1 style={{ ...heading, color: COLORS.green }}>Uploading...</h1>
            <p style={body16}>Please wait while we upload your survey.</p>
            <div
              style={{
                width: 200,
                height: 3,
                background: COLORS.lightGreen,
                borderRadius: 2,
                overflow: "hidden",
                marginTop: 8,
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: COLORS.green,
                  borderRadius: 2,
                  animation: "progressBar 2s ease forwards",
                }}
              />
            </div>
          </div>
        )}

        {/* SCREEN 10: THANK YOU */}
        {step === 10 && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 25 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: COLORS.green,
                  flexShrink: 0,
                }}
              />
              <h1 style={heading}>Road Safety Survey</h1>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 25 }}>
              <p style={body16}>Thank you for your participation.</p>
              <p style={body16}>This route is now verified for others.</p>
              <p style={body16}>
                Your neighbors can use this information to plan safer travel.
              </p>
              <div style={{ height: 1, background: COLORS.tan, marginTop: 10 }} />
              <button
                onClick={reset}
                style={{
                  padding: "12px 20px",
                  background: COLORS.green,
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 16,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  color: COLORS.white,
                  fontWeight: 500,
                  alignSelf: "flex-start",
                }}
              >
                Check another route
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      {step !== 9 && step !== 10 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: COLORS.cream,
            borderTop: `1px solid ${COLORS.tan}`,
            display: "flex",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 390,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <div>
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.green,
                    padding: 0,
                  }}
                >
                  &lt; Back
                </button>
              )}
            </div>

            <div>
              {step === 0 && (
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: "10px 24px",
                    background: COLORS.green,
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.white,
                    fontWeight: 500,
                  }}
                >
                  Begin
                </button>
              )}
              {step >= 1 && step <= 3 && (
                <button
                  onClick={() => {
                    if (step === 3 && !selectedRoute) return;
                    setStep((s) => s + 1);
                  }}
                  disabled={step === 3 && !selectedRoute}
                  style={{
                    padding: "10px 24px",
                    background: step === 3 && !selectedRoute ? COLORS.tan : COLORS.green,
                    border: "none",
                    borderRadius: 4,
                    cursor: step === 3 && !selectedRoute ? "not-allowed" : "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.white,
                    fontWeight: 500,
                  }}
                >
                  Next
                </button>
              )}
              {step === 4 && (
                <button
                  onClick={() => setStep(5)}
                  style={{
                    padding: "10px 20px",
                    background: COLORS.green,
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.white,
                    fontWeight: 500,
                  }}
                >
                  I'm heading out
                </button>
              )}
              {step === 5 && (
                <button
                  onClick={() => setStep(6)}
                  style={{
                    padding: "10px 20px",
                    background: COLORS.green,
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.white,
                    fontWeight: 500,
                  }}
                >
                  I've arrived
                </button>
              )}
              {step === 6 && (
                <button
                  onClick={() => {
                    if (!photo) return;
                    setStep(7);
                  }}
                  disabled={!photo}
                  style={{
                    padding: "10px 24px",
                    background: !photo ? COLORS.tan : COLORS.green,
                    border: "none",
                    borderRadius: 4,
                    cursor: !photo ? "not-allowed" : "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.white,
                    fontWeight: 500,
                  }}
                >
                  Next
                </button>
              )}
              {step === 7 && (
                <button
                  onClick={() => {
                    if (conditions.length === 0) return;
                    setStep(8);
                  }}
                  disabled={conditions.length === 0}
                  style={{
                    padding: "10px 24px",
                    background: conditions.length === 0 ? COLORS.tan : COLORS.green,
                    border: "none",
                    borderRadius: 4,
                    cursor: conditions.length === 0 ? "not-allowed" : "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.white,
                    fontWeight: 500,
                  }}
                >
                  Next
                </button>
              )}
              {step === 8 && (
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "10px 24px",
                    background: COLORS.green,
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 16,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: COLORS.white,
                    fontWeight: 500,
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        ::placeholder {
          color: #C465D4;
          opacity: 0.8;
        }
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}
