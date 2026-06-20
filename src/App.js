import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [emri, setEmri] = useState("");
  const [rezultati, setRezultati] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analizo = async () => {
    if (!url || !emri) {
      setError("Fut URL dhe emrin e produktit!");
      return;
    }
    setLoading(true);
    setError("");
    setRezultati(null);

    try {
      const response = await fetch("http://127.0.0.1:8001/analizo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, emri })
      });
      const data = await response.json();
      setRezultati(data);
    } catch (e) {
      setError("API nuk u lidh — kontrollo serverin!");
    }
    setLoading(false);
  };
const exportPDF = async () => {
    const element = document.getElementById('rezultati-pdf');
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`AdBrain-${emri}.pdf`);
};
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px", fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", margin: 0 }}>🧠 AdBrain</h1>
        <p style={{ color: "#666", fontSize: "18px" }}>Product Intelligence AI — Meta Ads Hooks & Avatar Generator</p>
      </div>

      {/* INPUT */}
      <div style={{ background: "#f8f9fa", padding: "25px", borderRadius: "12px", marginBottom: "30px" }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Amazon Product URL (https://www.amazon.com/dp/...)"
          style={{ width: "100%", padding: "12px", fontSize: "15px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", boxSizing: "border-box" }}
        />
        <input
          value={emri}
          onChange={(e) => setEmri(e.target.value)}
          placeholder="Emri i produktit"
          style={{ width: "100%", padding: "12px", fontSize: "15px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", boxSizing: "border-box" }}
        />
        <button
          onClick={analizo}
          disabled={loading}
          style={{ width: "100%", padding: "14px", fontSize: "16px", backgroundColor: loading ? "#ccc" : "#000", color: "white", border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold" }}
        >
          {loading ? "⏳ Duke analizuar reviews..." : "🔍 Analizo Produktin"}
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>

      {/* REZULTATI */}
      {rezultati && (
        <div id="rezultati-pdf">
          
          {/* VERDICT */}
          <div style={{ background: rezultati.verdict === "TEST" ? "#d4edda" : "#f8d7da", padding: "20px", borderRadius: "12px", marginBottom: "20px", textAlign: "center" }}>
            <h2 style={{ margin: 0, fontSize: "28px" }}>
              {rezultati.verdict === "TEST" ? "✅ VERDICT: TEST" : "❌ VERDICT: SKIP"}
            </h2>
            <p style={{ margin: "8px 0 0", color: "#555" }}>{rezultati.arsyeja_verdict}</p>
            <p style={{ margin: "4px 0 0", color: "#888", fontSize: "14px" }}>Bazuar në {rezultati.reviews_count} reviews reale</p>
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <button
        onClick={exportPDF}
        style={{ padding: "12px 30px", fontSize: "15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
    >
        📄 Export PDF
    </button>
</div>
          {/* TRENDS */}
          {rezultati.trends && (
            <div style={{ background: "#f0f7ff", border: "1px solid #0066cc", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
              <h3>📈 Google Trends — 3 Muajt e Fundit</h3>
              <p><strong>Drejtimi:</strong> {rezultati.trends.drejtimi}</p>
              <p><strong>Score tani:</strong> {rezultati.trends.score}/100</p>
              <p><strong>Peak:</strong> {rezultati.trends.peak}/100</p>
            </div>
          )}
          {/* AVATAR */}
          <div style={{ background: "#fff", border: "1px solid #eee", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3>👤 Customer Avatar</h3>
            <p><strong>Age:</strong> {rezultati.avatar?.age}</p>
            <p><strong>Gender:</strong> {rezultati.avatar?.gender}</p>
            <p><strong>Situation:</strong> {rezultati.avatar?.situation}</p>
          </div>

          {/* HOOKS */}
          <div style={{ background: "#fff3cd", border: "1px solid #ffc107", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3>🎣 Meta Ads Hooks</h3>
            {rezultati.hooks?.map((hook, i) => (
              <div key={i} style={{ background: "white", padding: "12px", borderRadius: "8px", marginBottom: "8px", borderLeft: "4px solid #ffc107" }}>
                <strong>Hook {i + 1}:</strong> {hook}
              </div>
            ))}
          </div>

          {/* ANGLES */}
          <div style={{ background: "#cce5ff", border: "1px solid #004085", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3>🎯 Ad Angles</h3>
            {rezultati.angles?.map((angle, i) => (
              <div key={i} style={{ background: "white", padding: "12px", borderRadius: "8px", marginBottom: "8px", borderLeft: "4px solid #004085" }}>
                {angle}
              </div>
            ))}
          </div>

          {/* 4 KATEGORI */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            
            <div style={{ background: "#d4edda", padding: "20px", borderRadius: "12px" }}>
              <h3>✅ Avis Positifs</h3>
              {rezultati.avis_positifs?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>

            <div style={{ background: "#f8d7da", padding: "20px", borderRadius: "12px" }}>
              <h3>❌ Avis Négatifs</h3>
              {rezultati.avis_negatifs?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>

            <div style={{ background: "#e2d9f3", padding: "20px", borderRadius: "12px" }}>
              <h3>💭 Rêves</h3>
              {rezultati.reves?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>

            <div style={{ background: "#fff3cd", padding: "20px", borderRadius: "12px" }}>
              <h3>😰 Peurs</h3>
              {rezultati.peurs?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>

          </div>

          {/* OBJECTIONS + HIDDEN THOUGHTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ background: "#fff", border: "1px solid #eee", padding: "20px", borderRadius: "12px" }}>
              <h3>🚫 Objections</h3>
              {rezultati.objections?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
            <div style={{ background: "#fff", border: "1px solid #eee", padding: "20px", borderRadius: "12px" }}>
              <h3>🤫 Pensées Cachées</h3>
              {rezultati.pensees_cachees?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;