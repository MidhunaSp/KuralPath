const KURAL_JSON_URL = "D:\\VSCODE\\KuralPath\\thirukkural.json";

let kuralCache = null;

async function getAllKurals() {
  if (kuralCache) return kuralCache;
  const res = await fetch(KURAL_JSON_URL);
  const data = await res.json();
  kuralCache = data.kural;
  return kuralCache;
}

export async function getKuralByNumber(number) {
  const all = await getAllKurals();
  const raw = all.find(k => k.Number === number);
  if (!raw) return null;
  return {
    number: raw.Number,
    chapter: raw.chapter || "",
    section: raw.section || "",
    kural_tamil: `${raw.Line1}\n${raw.Line2}`,
    explanation_tamil: raw.mv || raw.sp || "",
    explanation_english: raw.explanation || raw.Translation || "",
  };
}

export const TOTAL_KURALS = 1330;