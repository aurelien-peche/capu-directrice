/* Moteur du jeu « Directrice d'un jour » — jeu fictif pédagogique */
(function(){
"use strict";
const KEY = "gl-amiens-directrice-v1";
const TEINTES = {or:"#C9A24A", emeraude:"#3E9C7A", rose:"#D88A9B", bleu:"#7FA7D9"};
const J = window.JEU;
const app = document.getElementById("app");
const params = new URLSearchParams(location.search);

/* ---------- état ---------- */
function neuf(){
  return {v:1, prenom:"", teinte:"or", test:false,
    jauges:{clients:70, equipe:65, stock:70, caisse:75},
    rel:{}, flags:{}, mots:[], fait:{}, log:[], maths:[], libres:[], rencontres:[],
    enCours:null, debutJour:null, vue:"jours", semaineVue:1};
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || neuf(); } catch(e){ S = neuf(); }
if (params.get("test") === "1") S.test = true;
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
function setTeinte(){ document.documentElement.style.setProperty("--accent", TEINTES[S.teinte] || TEINTES.or); }
setTeinte();

/* ---------- outils ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const clamp = v => Math.max(0, Math.min(100, Math.round(v)));
const val = (x) => typeof x === "function" ? x(S) : x;
function aujourdhui(){
  try { return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Paris",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()); }
  catch(e){ return new Date().toISOString().slice(0,10); }
}
const MOIS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
function dateFr(d){ const [y,m,j] = d.split("-").map(Number); return j + " " + MOIS[m-1]; }
// Texte enrichi : [[cle|texte]] = mot du lexique ; {p} = prénom ; paragraphes séparés par une ligne vide
function rich(t){
  t = val(t) || "";
  t = esc(t).replace(/\{p\}/g, esc(S.prenom || "toi"));
  t = t.replace(/\[\[([a-z]+)\|([^\]]+)\]\]/g, (m,k,txt) => `<button type="button" class="term" data-mot="${k}">${txt}</button>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  return t.split(/\n\n/).map(p => `<p>${p.replace(/\n/g,"<br>")}</p>`).join("");
}
function initiales(id){
  const p = J.persos[id]; if (!p || !p.nom) return "";
  const n = p.nom.replace(/^M\. /,"").split(" ");
  return (n[0][0] + (n[1] ? n[1][0] : "")).toUpperCase();
}
function whoHtml(id, heure){
  let h = heure ? `<div class="time">${esc(heure)}</div>` : "";
  if (!id || id === "narr") return h;
  const p = J.persos[id];
  if (S.rencontres.indexOf(id) < 0 && J.persos[id]) { S.rencontres.push(id); }
  return h + `<div class="who"><div class="av" aria-hidden="true">${initiales(id) || "?"}</div><div><div class="n">${esc(p.nom)}</div><div class="r">${esc(p.role)}</div></div></div>`;
}
function apprendre(k){ if (k && J.lexique[k] && S.mots.indexOf(k) < 0) S.mots.push(k); }

/* ---------- semaines et jours ---------- */
function tousJours(){ const out=[]; (J.semaines||[]).forEach(se => se.jours.forEach(j => out.push(Object.assign({semaine:se.num}, j)))); return out; }
function statut(j){
  if (S.fait[j.id]) return "fait";
  const all = tousJours(); const i = all.findIndex(x => x.id === j.id);
  const prevOk = i === 0 || S.fait[all[i-1].id];
  const dateOk = S.test || aujourdhui() >= j.date;
  if (prevOk && dateOk) return "dispo";
  return dateOk ? "attente" : "lock";
}
function scenesDe(j){ return j.scenes.filter(sc => !sc.si || sc.si(S)); }

/* ---------- rendu général ---------- */
const ORN = `<svg class="orn" aria-hidden="true" viewBox="0 0 140 22" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent)"><path d="M0 11h52"/><path d="M88 11h52"/><path d="M70 1 80 11 70 21 60 11z"/><path d="M70 6 75 11 70 16 65 11z"/></svg>`;
function header(sousTitre){
  return `<header class="top">${ORN}<div class="kicker">Amiens · Rue des Trois-Cailloux</div><h1>Galeries Lafayette</h1><div class="sub">${esc(sousTitre||"")}</div>
  <button type="button" class="settings-btn" data-act="reglages" aria-label="Réglages"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button></header>`;
}
function gaugesHtml(ref){
  return `<div class="gauges">` + Object.keys(J.jauges).map(k => {
    const v = S.jauges[k], d = ref ? v - ref[k] : 0;
    const ds = d > 0 ? `<span class="d up">↑ +${d}</span>` : d < 0 ? `<span class="d down">↓ ${d}</span>` : `<span class="d"></span>`;
    return `<button type="button" class="gauge" data-jauge="${k}" aria-label="${J.jauges[k].l} : ${v} sur 100"><span class="v">${v}</span><span class="bar"><i style="width:${v}%"></i></span><span class="l">${J.jauges[k].l}</span>${ds}</button>`;
  }).join("") + `</div>`;
}
const ICON = {
  jours:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  equipe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  carnet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  bilan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>'
};
function nav(){
  const it = [["jours","Ma semaine"],["equipe","Équipe"],["carnet","Carnet"],["bilan","Bilan"]];
  return `<nav class="nav" aria-label="Menu">` + it.map(([k,l]) => `<button type="button" data-vue="${k}" class="${S.vue===k?"on":""}" ${S.vue===k?'aria-current="page"':""}>${ICON[k]}${l}</button>`).join("") + `</nav>`;
}
const FOOT = `<p class="foot">Jeu de simulation fictif et pédagogique, sans lien avec l’enseigne. Les personnes, les marques et les chiffres internes sont inventés.</p>`;

function render(){
  save();
  if (!S.prenom) return renderAccueil();
  if (S.enCours) return renderScene();
  const v = S.vue;
  let body = v === "equipe" ? vueEquipe() : v === "carnet" ? vueCarnet() : v === "bilan" ? vueBilan() : vueJours();
  app.innerHTML = header(v==="jours" ? "Tu es la directrice" : "") + `<main class="main">${body}${FOOT}</main>` + nav();
  window.scrollTo(0,0);
}

/* ---------- accueil ---------- */
function renderAccueil(){
  app.innerHTML = header("Simulation métier") + `<main class="main">
  <div class="frame"><div class="in">
    <h2 class="center">Directrice d’un grand magasin</h2>
    <div class="txt">${rich("Pendant 4 semaines, tu deviens la directrice des Galeries Lafayette d’Amiens : 40 salariés, 4 étages, des dizaines de marques… et Noël qui approche.\n\nChaque jour, une situation t’attend. Tes décisions ont des conséquences, parfois des jours plus tard. Tu apprendras aussi les mots du métier.")}</div>
    <label class="lab">Ton prénom<input type="text" id="prenom" autocomplete="given-name" maxlength="20"></label>
    <div class="lab">Ta teinte<div class="sw" role="group" aria-label="Choisir la teinte">${Object.keys(TEINTES).map(k=>`<button type="button" data-teinte="${k}" class="${S.teinte===k?"on":""}" style="background:${TEINTES[k]}" aria-label="${k}"></button>`).join("")}</div></div>
    <button type="button" class="btn" data-act="go">Je prends mon poste</button>
  </div></div>${FOOT}</main>`;
}

/* ---------- vues ---------- */
function vueJours(){
  let h = gaugesHtml(null);
  (J.semaines||[]).forEach(se => {
    h += `<div class="sect">Semaine ${se.num} · ${esc(se.titre)}</div><div class="days">`;
    se.jours.forEach(j => {
      const st = statut(Object.assign({semaine:se.num}, j));
      const lbl = st==="fait" ? "Terminé" : st==="dispo" ? "Disponible maintenant" : st==="attente" ? "Termine d’abord le jour précédent" : "Disponible le " + dateFr(j.date);
      h += `<button type="button" class="day ${st==="fait"?"done":st==="dispo"?"now":"lock"}" ${st==="dispo"||st==="fait"?`data-jour="${j.id}"`:'aria-disabled="true"'}><span class="dn">${esc(j.court)}</span><span><span class="dt">${esc(j.titre)}</span><br><span class="ds">${dateFr(j.date)} · ${lbl}</span></span></button>`;
    });
    h += `</div>`;
  });
  const prochain = (J.prochaine||"");
  if (prochain) h += `<p class="sub center" style="margin-top:14px">${esc(prochain)}</p>`;
  return h;
}
function vueEquipe(){
  let h = `<div class="sect">Les personnages principaux</div><div class="grid2">`;
  Object.keys(J.persos).filter(k => J.persos[k].principal).forEach(k => {
    const p = J.persos[k], r = S.rel[k] || 0, f = Math.max(0, Math.min(5, r + 3));
    h += `<button type="button" class="card" data-perso="${k}"><div class="av" aria-hidden="true">${initiales(k)}</div><span class="n">${esc(p.nom)}</span><span class="r">${esc(p.role)}</span><span class="trust" aria-label="Confiance ${f} sur 5">${[0,1,2,3,4].map(i=>`<i class="${i<f?"f":""}"></i>`).join("")}</span></button>`;
  });
  h += `</div><div class="sect">Déjà rencontrés</div><div class="list">`;
  S.rencontres.filter(k => J.persos[k] && !J.persos[k].principal && J.persos[k].nom && k!=="client").forEach(k => {
    h += `<button type="button" class="li" style="background:none;border:none;border-bottom:1px solid var(--line);color:var(--ink);width:100%;text-align:left" data-perso="${k}"><span>${esc(J.persos[k].nom)}</span><span class="r">${esc(J.persos[k].role)}</span></button>`;
  });
  h += `</div><p class="sub" style="margin-top:12px">L’équipe compte 40 salariés et environ 60 vendeurs des marques. Tu les découvriras au fil des jours.</p>`;
  return h;
}
function vueCarnet(){
  let h = `<div class="sect">Mon carnet de mots · ${S.mots.length}</div>`;
  if (!S.mots.length) h += `<p class="sub">Les mots du métier apparaîtront ici au fil des jours.</p>`;
  h += `<div class="list">` + S.mots.map(k => `<button type="button" class="li" style="background:none;border:none;border-bottom:1px solid var(--line);color:var(--ink);width:100%;text-align:left" data-mot="${k}"><span><b>${esc(J.lexique[k].mot)}</b></span><span class="r">Voir</span></button>`).join("") + `</div>`;
  h += `<div class="sect">${esc(J.metier.titre)}</div><div class="list">` + J.metier.lignes.map(l => `<div class="li"><span><b>${esc(l[0])}</b></span><span class="r">${esc(l[1])}</span></div>`).join("") + `</div>`;
  return h;
}
function semaineFinie(n){ const se = (J.semaines||[]).find(s => s.num===n); return se && se.jours.every(j => S.fait[j.id]); }
function vueBilan(){
  const se = (J.semaines||[]).filter(s => semaineFinie(s.num));
  let h = gaugesHtml(null);
  const ok = S.maths.filter(m => m.ok).length;
  h += `<div class="frame"><div class="in center"><div class="sect" style="margin:0">Calculs réussis</div><div class="big">${ok} / ${S.maths.length}</div><div class="sub">${S.mots.length} mots dans ton carnet · ${Object.keys(S.fait).length} jours joués</div></div></div>`;
  if (!se.length) { h += `<p class="sub center">Le bilan de la semaine s’ouvre le samedi, après ta dernière journée.</p>`; }
  se.forEach(s => {
    h += `<div class="sect">Bilan de la semaine ${s.num}</div><div class="txt">${rich(s.bilan ? s.bilan(S) : "")}</div>`;
    h += `<button type="button" class="btn" style="margin-top:12px" data-act="partager" data-sem="${s.num}">Envoyer mon bilan à papa</button>`;
  });
  return h;
}

/* ---------- jouer une journée ---------- */
function lancer(id){
  const j = tousJours().find(x => x.id === id); if (!j) return;
  if (S.fait[id]) { revoir(j); return; }
  if (S.pause && S.pause.jour === id) { S.enCours = S.pause; S.pause = null; render(); return; }
  S.enCours = {jour:id, i:0, phase:"q", essais:0};
  S.debutJour = JSON.parse(JSON.stringify(S.jauges));
  render();
}
function revoir(j){
  const lignes = S.log.filter(l => l.jour === j.id);
  modal(`<h3>${esc(j.titre)}</h3><div class="list">${lignes.map(l=>`<div class="li"><span>${esc(l.q)}</span><span class="r">${esc(l.r)}</span></div>`).join("") || '<p class="sub">Journée terminée.</p>'}</div><button type="button" class="btn" data-act="fermer">Fermer</button>`);
}
function scCourante(){
  const j = tousJours().find(x => x.id === S.enCours.jour);
  const sc = scenesDe(j);
  return {j, sc, s: sc[S.enCours.i]};
}
function renderScene(){
  const {j, sc, s} = scCourante();
  if (!s) return finJour(j);
  const e = S.enCours;
  if ((s.fx || s.set || s.rel) && !e.applied && ["choix","calcul","qcm","libre"].indexOf(s.type) < 0) { e.chips = appliquer(val(s.fx), val(s.rel), val(s.set)); e.applied = true; }
  let h = `<header class="top"><div class="kicker">${esc(j.court)} ${dateFr(j.date)} · ${esc(j.titre)}</div></header><main class="main">` + gaugesHtml(S.debutJour);
  h += `<div class="frame"><div class="in">${whoHtml(s.qui, val(s.heure))}<div class="txt">${rich(s.texte)}</div>` + (e.chips && e.phase === "q" ? e.chips : "");
  if (e.phase === "q") {
    if (s.type === "choix") {
      h += `<div class="choices">` + s.choix.filter(c => !c.si || c.si(S)).map((c,i) => `<button type="button" class="ch" data-choix="${s.choix.indexOf(c)}"><span class="k">${"ABCDE"[i]}</span><span>${esc(val(c.t))}</span></button>`).join("") + `</div>`;
    } else if (s.type === "calcul") {
      h += `<label class="lab">${esc(s.label || "Ta réponse")}<div class="row"><input type="text" id="rep" inputmode="decimal" autocomplete="off"><span>${esc(s.unite||"")}</span></div></label>`;
      if (e.essais > 0) h += `<div class="hint">${rich(s.indice)}</div>`;
      h += `<button type="button" class="btn" data-act="valider">Valider</button>`;
    } else if (s.type === "qcm") {
      if (e.essais > 0) h += `<div class="hint">${rich(s.indice)}</div>`;
      h += `<div class="choices">` + s.options.map((o,i) => `<button type="button" class="ch" data-qcm="${i}"><span class="k">${"ABCDE"[i]}</span><span>${esc(o)}</span></button>`).join("") + `</div>`;
    } else if (s.type === "libre") {
      h += `<label class="lab">${esc(s.label || "Écris ta réponse")}<textarea id="libre" rows="4" maxlength="400" placeholder="${esc(s.placeholder||"")}"></textarea></label><button type="button" class="btn" data-act="libre">Envoyer</button>`;
    } else if (s.type === "mot") {
      const m = J.lexique[s.mot];
      h += `<div class="hint"><b>${esc(m.mot)}</b> : ${esc(m.def)}<br><i>Exemple : ${esc(m.ex)}</i></div><button type="button" class="btn" data-act="suite">Je l’ajoute à mon carnet</button>`;
    } else {
      h += `<button type="button" class="btn" data-act="suite">${esc(s.bouton || "Continuer")}</button>`;
    }
  } else {
    h += `<div class="fb">${e.fbHtml || ""}</div><button type="button" class="btn" data-act="suite">Continuer</button>`;
  }
  h += `</div></div><p class="sub center">Situation ${e.i+1} sur ${sc.length}</p><button type="button" class="btn ghost" data-act="pause" style="margin-top:10px;min-height:44px;font-size:14px">Pause</button></main>`;
  app.innerHTML = h;
  window.scrollTo(0,0);
  save();
}
function appliquer(fx, rel, set){
  const avant = JSON.parse(JSON.stringify(S.jauges));
  Object.keys(fx||{}).forEach(k => { S.jauges[k] = clamp(S.jauges[k] + fx[k]); });
  Object.keys(rel||{}).forEach(k => { S.rel[k] = Math.max(-3, Math.min(3, (S.rel[k]||0) + rel[k])); });
  Object.assign(S.flags, set||{});
  const chips = Object.keys(fx||{}).filter(k => S.jauges[k] !== avant[k]).map(k => { const d = S.jauges[k]-avant[k]; return `<span class="chip ${d>0?"up":"down"}">${J.jauges[k].l} ${d>0?"+":""}${d}</span>`; })
    .concat(Object.keys(rel||{}).map(k => `<span class="chip ${rel[k]>0?"up":"down"}">Confiance de ${esc(/^M\. /.test(J.persos[k].nom) ? J.persos[k].nom : J.persos[k].nom.split(" ")[0])} ${rel[k]>0?"↑":"↓"}</span>`));
  return chips.length ? `<div class="chips">${chips.join("")}</div>` : "";
}
function suite(){
  const e = S.enCours, {s} = scCourante();
  if (e.phase === "q" && s && s.type === "mot") apprendre(s.mot);
  if (s && s.mot && s.type !== "mot") apprendre(s.mot);
  e.i += 1; e.phase = "q"; e.essais = 0; e.fbHtml = ""; e.applied = false; e.chips = "";
  render();
}
function choisir(idx){
  const {j, s} = scCourante(), c = s.choix[idx];
  const chips = appliquer(c.fx, c.rel, c.set);
  if (c.mot) apprendre(c.mot);
  S.log.push({jour:j.id, q:s.resume || "Décision", r:val(c.court || c.t)});
  S.enCours.phase = "fb";
  S.enCours.fbHtml = `<div class="sub">Ton choix : ${esc(val(c.t))}</div><div class="txt">${rich(c.retour)}</div>` + chips;
  render();
}
function nombre(x){ return parseFloat(String(x).replace(/\s/g,"").replace(",", ".").replace(/[^0-9.\-]/g,"")); }
function valider(){
  const {j, s} = scCourante(), e = S.enCours;
  const x = nombre((document.getElementById("rep")||{}).value);
  if (isNaN(x)) { const i = document.getElementById("rep"); if (i){ i.focus(); i.setAttribute("aria-invalid","true"); } return; }
  const bon = Math.abs(x - s.reponse) <= (s.tolerance || 0.001);
  corriger(j, s, bon, String(x));
}
function corriger(j, s, bon, saisie){
  const e = S.enCours;
  if (!bon && e.essais === 0) { e.essais = 1; render(); return; }
  S.maths.push({jour:j.id, q:s.resume || "Calcul", ok:bon, essais:e.essais+1, saisie});
  if (s.mot) apprendre(s.mot);
  const fx = bon ? (s.fxOk||null) : (s.fxKo||null);
  const chips = fx ? appliquer(fx) : "";
  e.phase = "fb";
  e.fbHtml = (bon ? `<div class="ok">${e.essais ? "Bien rattrapé !" : "Exact !"}</div>` : `<div class="ko">Pas tout à fait.</div>`) + `<div class="txt">${rich(s.explication)}</div>` + chips;
  render();
}
function qcm(i){ const {j, s} = scCourante(); corriger(j, s, i === s.bonne, s.options[i]); }
function libre(){
  const {j, s} = scCourante(), t = (document.getElementById("libre")||{}).value || "";
  if (t.trim().length < 3) { document.getElementById("libre").focus(); return; }
  S.libres.push({jour:j.id, q:s.resume || "Réponse libre", r:t.trim()});
  S.enCours.phase = "fb";
  S.enCours.fbHtml = `<div class="txt">${rich(s.retour || "C’est noté.")}</div><div class="hint">Ta réponse est gardée dans ton bilan de la semaine.</div>`;
  render();
}
function finJour(j){
  S.fait[j.id] = true;
  const ref = S.debutJour;
  const motsJour = (j.scenes||[]).map(x => x.mot).filter(Boolean);
  app.innerHTML = header("Fin de la journée") + `<main class="main">${gaugesHtml(ref)}
  <div class="frame"><div class="in"><h2 class="center">${esc(j.titre)} : terminé</h2><div class="txt">${rich(j.fin)}</div>
  ${motsJour.length?`<div class="hint">Nouveaux mots : ${motsJour.map(k=>esc(J.lexique[k].mot)).join(", ")}</div>`:""}
  <button type="button" class="btn" data-act="retour">Retour à ma semaine</button></div></div>${FOOT}</main>`;
  S.enCours = null; S.debutJour = null; save();
  window.scrollTo(0,0);
}

/* ---------- partage du bilan ---------- */
function texteBilan(n){
  const se = J.semaines.find(s => s.num === n), ids = se.jours.map(j => j.id);
  let t = `Bilan de ${S.prenom}, directrice des Galeries Lafayette d’Amiens (semaine ${n})\n\n`;
  t += `Jauges : Clients ${S.jauges.clients}, Équipe ${S.jauges.equipe}, Stock ${S.jauges.stock}, Caisse ${S.jauges.caisse}\n`;
  const m = S.maths.filter(x => ids.indexOf(x.jour) >= 0);
  t += `Calculs réussis : ${m.filter(x=>x.ok).length} sur ${m.length}\nMots appris : ${S.mots.map(k=>J.lexique[k].mot).join(", ")}\n\nMes décisions :\n`;
  S.log.filter(l => ids.indexOf(l.jour) >= 0).forEach(l => { t += `- ${l.q} : ${l.r}\n`; });
  t += `\nMes réponses écrites :\n`;
  S.libres.filter(l => ids.indexOf(l.jour) >= 0).forEach(l => { t += `- ${l.q} : « ${l.r} »\n`; });
  t += `\nMes calculs :\n`;
  m.forEach(x => { t += `- ${x.q} : ${x.ok ? "réussi" : "raté"} (${x.essais} essai${x.essais>1?"s":""}, réponse ${x.saisie})\n`; });
  const code = {s:n, j:S.jauges, r:S.rel, f:S.flags};
  let c = ""; try { c = btoa(unescape(encodeURIComponent(JSON.stringify(code)))); } catch(e){}
  t += `\nCode pour la suite : ${c}\n`;
  return t;
}
function partager(n){
  const t = texteBilan(n), enc = encodeURIComponent(t);
  modal(`<h3>Envoyer mon bilan</h3><p class="sub">Choisis comment l’envoyer. Papa le donnera à Claude pour préparer la semaine suivante.</p>
  ${navigator.share ? `<button type="button" class="btn" data-act="share-natif">Partager…</button>` : ""}
  <a class="btn ghost" style="text-align:center;text-decoration:none" href="https://wa.me/?text=${enc}" target="_blank" rel="noopener">WhatsApp</a>
  <a class="btn ghost" style="text-align:center;text-decoration:none" href="sms:?&body=${enc}">SMS</a>
  <a class="btn ghost" style="text-align:center;text-decoration:none" href="mailto:?subject=${encodeURIComponent("Bilan semaine "+n)}&body=${enc}">E-mail</a>
  <button type="button" class="btn ghost" data-act="copier">Copier le texte</button>
  <textarea id="bilan-txt" rows="6" readonly>${esc(t)}</textarea>
  <button type="button" class="btn ghost" data-act="fermer">Fermer</button>`);
  S._share = t;
}

/* ---------- modales ---------- */
function modal(html){
  const m = document.createElement("div"); m.className = "modal"; m.setAttribute("role","dialog"); m.setAttribute("aria-modal","true");
  m.innerHTML = `<div class="sheet">${html}</div>`;
  m.addEventListener("click", ev => { if (ev.target === m) m.remove(); });
  document.body.appendChild(m);
  const b = m.querySelector("button, a, textarea"); if (b) b.focus();
}
function reglages(){
  modal(`<h3>Réglages</h3><div class="lab">Teinte<div class="sw">${Object.keys(TEINTES).map(k=>`<button type="button" data-teinte="${k}" class="${S.teinte===k?"on":""}" style="background:${TEINTES[k]}" aria-label="${k}"></button>`).join("")}</div></div>
  <label class="row" style="gap:10px"><input type="checkbox" id="test" ${S.test?"checked":""}> Mode test : tous les jours ouverts (pour les parents)</label>
  <button type="button" class="btn ghost" data-act="reset">Recommencer depuis le début</button>
  <button type="button" class="btn" data-act="fermer">Fermer</button>`);
}

/* ---------- événements ---------- */
document.addEventListener("click", ev => {
  const t = ev.target.closest("button, a"); if (!t) return;
  const d = t.dataset;
  if (d.mot) { const m = J.lexique[d.mot]; apprendre(d.mot); save(); modal(`<div class="kicker">Mon carnet</div><h3>${esc(m.mot)}</h3><p>${esc(m.def)}</p><p class="hint"><i>Exemple : ${esc(m.ex)}</i></p><button type="button" class="btn" data-act="fermer">J’ai compris</button>`); return; }
  if (d.jauge) { const g = J.jauges[d.jauge]; modal(`<h3>${esc(g.l)} : ${S.jauges[d.jauge]} / 100</h3><p>${esc(g.def)}</p><button type="button" class="btn" data-act="fermer">Fermer</button>`); return; }
  if (d.perso) { const p = J.persos[d.perso]; modal(`<div class="who"><div class="av">${initiales(d.perso)}</div><div><div class="n">${esc(p.nom)}${p.age?", "+p.age+" ans":""}</div><div class="r">${esc(p.role)}</div></div></div><p>${esc(p.desc)}</p><button type="button" class="btn" data-act="fermer">Fermer</button>`); return; }
  if (d.teinte) { S.teinte = d.teinte; setTeinte(); save(); document.querySelectorAll("[data-teinte]").forEach(b => b.classList.toggle("on", b.dataset.teinte === S.teinte)); return; }
  if (d.vue) { S.vue = d.vue; render(); return; }
  if (d.jour) { lancer(d.jour); return; }
  if (d.choix !== undefined) { choisir(Number(d.choix)); return; }
  if (d.qcm !== undefined) { qcm(Number(d.qcm)); return; }
  switch (d.act) {
    case "go": { const v = (document.getElementById("prenom").value||"").trim(); if (!v) { document.getElementById("prenom").focus(); return; } S.prenom = v; render(); break; }
    case "suite": suite(); break;
    case "valider": valider(); break;
    case "libre": libre(); break;
    case "retour": S.vue = "jours"; render(); break;
    case "pause": S.vue = "jours"; S.pause = S.enCours; S.enCours = null; render(); break;
    case "reglages": reglages(); break;
    case "fermer": { const m = t.closest(".modal"); if (m) m.remove(); render(); break; }
    case "reset": if (confirmReset()) { S = neuf(); setTeinte(); document.querySelectorAll(".modal").forEach(m=>m.remove()); render(); } break;
    case "partager": partager(Number(d.sem)); break;
    case "share-natif": navigator.share({title:"Mon bilan", text:S._share}).catch(()=>{}); break;
    case "copier": { const ta = document.getElementById("bilan-txt"); ta.select(); try { navigator.clipboard.writeText(ta.value); t.textContent = "Copié !"; } catch(e){ document.execCommand("copy"); t.textContent = "Copié !"; } break; }
  }
});
let resetArme = false;
function confirmReset(){ if (resetArme) return true; resetArme = true; const b = document.querySelector('[data-act="reset"]'); if (b) b.textContent = "Appuie encore pour tout effacer"; return false; }
document.addEventListener("change", ev => { if (ev.target.id === "test") { S.test = ev.target.checked; save(); } });
document.addEventListener("keydown", ev => {
  if (ev.key === "Enter" && ev.target.id === "rep") valider();
  if (ev.key === "Enter" && ev.target.id === "prenom") document.querySelector('[data-act="go"]').click();
  if (ev.key === "Escape") { const m = document.querySelector(".modal"); if (m) m.remove(); }
});
window.JEU_RENDER = render;
render();
})();
