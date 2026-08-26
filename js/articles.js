// Shared article-loading utilities used by index.html, archive.html, article.html
// Articles live in /articles/<slug>/article.json and are listed in /articles/index.json
// This is the exact structure the Windows "Story Exporter" desktop app produces.

const ARTICLES_INDEX = "articles/index.json";

async function loadArticleIndex(){
  try{
    const res = await fetch(ARTICLES_INDEX, {cache:"no-store"});
    if(!res.ok) throw new Error("index not found");
    const data = await res.json();
    // sort newest first
    data.sort((a,b) => new Date(b.date) - new Date(a.date));
    return data;
  }catch(err){
    console.warn("Could not load article index:", err);
    return [];
  }
}

async function loadArticle(slug){
  const res = await fetch(`articles/${slug}/article.json`, {cache:"no-store"});
  if(!res.ok) throw new Error("article not found: " + slug);
  return res.json();
}

function formatDate(iso){
  try{
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });
  }catch(e){ return iso; }
}

function articleImagePath(slug, filename){
  if(!filename) return "";
  return `articles/${slug}/images/${filename}`;
}

function excerpt(text, len=160){
  if(!text) return "";
  const clean = text.replace(/\s+/g," ").trim();
  return clean.length > len ? clean.slice(0,len).trim() + "…" : clean;
}
