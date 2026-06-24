import { useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const translations = {
  en: {
    title: "🧠 AdBrain",
    subtitle: "Product Intelligence AI — Meta Ads Hooks & Avatar Generator",
    urlPlaceholder: "Amazon Product URL (https://www.amazon.com/dp/...)",
    namePlaceholder: "Product name",
    analyzeBtn: "🔍 Analyze Product",
    analyzingBtn: "⏳ Analyzing reviews...",
    errorMsg: "Please enter URL and product name!",
    apiError: "API not connected — check server!",
    verdictTest: "✅ VERDICT: TEST",
    verdictSkip: "❌ VERDICT: SKIP",
    basedOn: "Based on",
    realReviews: "real reviews",
    trends: "📈 Google Trends — Last 3 Months",
    direction: "Direction",
    scoreNow: "Score now",
    peak: "Peak",
    avatar: "👤 Customer Avatar",
    age: "Age",
    gender: "Gender",
    situation: "Situation",
    hooks: "🎣 Meta Ads Hooks",
    angles: "🎯 Ad Angles",
    positifs: "✅ Positives",
    negatifs: "❌ Negatives",
    reves: "💭 Dreams",
    peurs: "😰 Fears",
    objections: "🚫 Objections",
    hidden: "🤫 Hidden Thoughts",
    exportPDF: "📄 Export PDF"
  },
  fr: {
    title: "🧠 AdBrain",
    subtitle: "IA d'Intelligence Produit — Hooks & Générateur d'Avatar Meta Ads",
    urlPlaceholder: "URL Produit Amazon (https://www.amazon.com/dp/...)",
    namePlaceholder: "Nom du produit",
    analyzeBtn: "🔍 Analyser le Produit",
    analyzingBtn: "⏳ Analyse en cours...",
    errorMsg: "Veuillez entrer l'URL et le nom du produit!",
    apiError: "API non connectée — vérifiez le serveur!",
    verdictTest: "✅ VERDICT: TESTER",
    verdictSkip: "❌ VERDICT: IGNORER",
    basedOn: "Basé sur",
    realReviews: "avis réels",
    trends: "📈 Google Trends — 3 Derniers Mois",
    direction: "Direction",
    scoreNow: "Score actuel",
    peak: "Pic",
    avatar: "👤 Avatar Client",
    age: "Âge",
    gender: "Genre",
    situation: "Situation",
    hooks: "🎣 Hooks Meta Ads",
    angles: "🎯 Angles Publicitaires",
    positifs: "✅ Avis Positifs",
    negatifs: "❌ Avis Négatifs",
    reves: "💭 Rêves",
    peurs: "😰 Peurs",
    objections: "🚫 Objections",
    hidden: "🤫 Pensées Cachées",
    exportPDF: "📄 Exporter PDF"
  },
  sq: {
    title: "🧠 AdBrain",
    subtitle: "AI Inteligjencë Produkti — Hooks & Gjenerator Avatari Meta Ads",
    urlPlaceholder: "URL Produkti Amazon (https://www.amazon.com/dp/...)",
    namePlaceholder: "Emri i produktit",
    analyzeBtn: "🔍 Analizo Produktin",
    analyzingBtn: "⏳ Duke analizuar...",
    errorMsg: "Fut URL dhe emrin e produktit!",
    apiError: "API nuk u lidh — kontrollo serverin!",
    verdictTest: "✅ VERDICT: TESTO",
    verdictSkip: "❌ VERDICT: SKIP",
    basedOn: "Bazuar në",
    realReviews: "reviews reale",
    trends: "📈 Google Trends — 3 Muajt e Fundit",
    direction: "Drejtimi",
    scoreNow: "Score tani",
    peak: "Peak",
    avatar: "👤 Avatar Klienti",
    age: "Mosha",
    gender: "Gjinia",
    situation: "Situata",
    hooks: "🎣 Meta Ads Hooks",
    angles: "🎯 Angles",
    positifs: "✅ Pozitive",
    negatifs: "❌ Negative",
    reves: "💭 Ëndrrat",
    peurs: "😰 Frika",
    objections: "🚫 Objeksione",
    hidden: "🤫 Mendime të Fshehura",
    exportPDF: "📄 Eksporto PDF"
  }
};

function App() {
  const [url, setUrl] = useState("");
  const [emri, setEmri] = useState("");
  const [rezultati, setRezultati] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("en");
  const t = translations[lang];

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

  const analizo = async () => {
    if (!url || !emri) {
      setError(t.errorMsg);
      return;
    }
    setLoading(true);
    setError("");
    setRezultati(null);
    try {
      const response = await fetch("https://adbrain-backend.onrender.com/analizo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, emri })
      });
      const data = await response.json();
      setRezultati(data);
    } catch (e) {
      setError(t.apiError);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px", fontFamily: "Arial" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", margin: 0 }}>{t.title}</h1>
        <p style={{ color: "#666", fontSize: "18px" }}>{t.subtitle}</p>
        <div style={{ marginTop: "15px" }}>
          <button onClick={() => setLang("en")} style={{ margin: "5px", padding: "8px 16px", backgroundColor: lang === "en" ? "#000" : "#eee", color: lang === "en" ? "white" : "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>🇬🇧 EN</button>
          <button onClick={() => setLang("fr")} style={{ margin: "5px", padding: "8px 16px", backgroundColor: lang === "fr" ? "#000" : "#eee", color: lang === "fr" ? "white" : "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>🇫🇷 FR</button>
          <button onClick={() => setLang("sq")} style={{ margin: "5px", padding: "8px 16px", backgroundColor: lang === "sq" ? "#000" : "#eee", color: lang === "sq" ? "white" : "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>🇦🇱 SQ</button>
        </div>
      </div>

      {/* INPUT */}
      <div style={{ background: "#f8f9fa", padding: "25px", borderRadius: "12px", marginBottom: "30px" }}>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t.urlPlaceholder} style={{ width: "100%", padding: "12px", fontSize: "15px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", boxSizing: "border-box" }} />
        <input value={emri} onChange={(e) => setEmri(e.target.value)} placeholder={t.namePlaceholder} style={{ width: "100%", padding: "12px", fontSize: "15px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", boxSizing: "border-box" }} />
        <button onClick={analizo} disabled={loading} style={{ width: "100%", padding: "14px", fontSize: "16px", backgroundColor: loading ? "#ccc" : "#000", color: "white", border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold" }}>
          {loading ? t.analyzingBtn : t.analyzeBtn}
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>

      {/* REZULTATI */}
      {rezultati && (
        <div id="rezultati-pdf">

          {/* VERDICT */}
          <div style={{ background: rezultati.verdict === "TEST" ? "#d4edda" : "#f8d7da", padding: "20px", borderRadius: "12px", marginBottom: "20px", textAlign: "center" }}>
            <h2 style={{ margin: 0, fontSize: "28px" }}>{rezultati.verdict === "TEST" ? t.verdictTest : t.verdictSkip}</h2>
            <p style={{ margin: "8px 0 0", color: "#555" }}>{rezultati.arsyeja_verdict}</p>
            <p style={{ margin: "4px 0 0", color: "#888", fontSize: "14px" }}>{t.basedOn} {rezultati.reviews_count} {t.realReviews}</p>
          </div>

          {/* EXPORT */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button onClick={exportPDF} style={{ padding: "12px 30px", fontSize: "15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>{t.exportPDF}</button>
          </div>

          {/* TRENDS */}
          {rezultati.trends && (
            <div style={{ background: "#f0f7ff", border: "1px solid #0066cc", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
              <h3>{t.trends}</h3>
              <p><strong>{t.direction}:</strong> {rezultati.trends.drejtimi}</p>
              <p><strong>{t.scoreNow}:</strong> {rezultati.trends.score}/100</p>
              <p><strong>{t.peak}:</strong> {rezultati.trends.peak}/100</p>
            </div>
          )}

          {/* AVATAR */}
          <div style={{ background: "#fff", border: "1px solid #eee", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3>{t.avatar}</h3>
            <p><strong>{t.age}:</strong> {rezultati.avatar?.age}</p>
            <p><strong>{t.gender}:</strong> {rezultati.avatar?.gender}</p>
            <p><strong>{t.situation}:</strong> {rezultati.avatar?.situation}</p>
          </div>

          {/* HOOKS */}
          <div style={{ background: "#fff3cd", border: "1px solid #ffc107", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3>{t.hooks}</h3>
            {rezultati.hooks?.map((hook, i) => (
              <div key={i} style={{ background: "white", padding: "12px", borderRadius: "8px", marginBottom: "8px", borderLeft: "4px solid #ffc107" }}>
                <strong>Hook {i + 1}:</strong> {hook}
              </div>
            ))}
          </div>

          {/* ANGLES */}
          <div style={{ background: "#cce5ff", border: "1px solid #004085", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3>{t.angles}</h3>
            {rezultati.angles?.map((angle, i) => (
              <div key={i} style={{ background: "white", padding: "12px", borderRadius: "8px", marginBottom: "8px", borderLeft: "4px solid #004085" }}>
                {angle}
              </div>
            ))}
          </div>

          {/* 4 KATEGORI */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div style={{ background: "#d4edda", padding: "20px", borderRadius: "12px" }}>
              <h3>{t.positifs}</h3>
              {rezultati.avis_positifs?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
            <div style={{ background: "#f8d7da", padding: "20px", borderRadius: "12px" }}>
              <h3>{t.negatifs}</h3>
              {rezultati.avis_negatifs?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
            <div style={{ background: "#e2d9f3", padding: "20px", borderRadius: "12px" }}>
              <h3>{t.reves}</h3>
              {rezultati.reves?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
            <div style={{ background: "#fff3cd", padding: "20px", borderRadius: "12px" }}>
              <h3>{t.peurs}</h3>
              {rezultati.peurs?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
          </div>

          {/* OBJECTIONS + HIDDEN */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ background: "#fff", border: "1px solid #eee", padding: "20px", borderRadius: "12px" }}>
              <h3>{t.objections}</h3>
              {rezultati.objections?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
            <div style={{ background: "#fff", border: "1px solid #eee", padding: "20px", borderRadius: "12px" }}>
              <h3>{t.hidden}</h3>
              {rezultati.pensees_cachees?.map((item, i) => <p key={i}>• {item}</p>)}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;