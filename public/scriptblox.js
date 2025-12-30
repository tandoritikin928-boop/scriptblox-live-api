let keyword = "";
let timer = null;

async function fetchScripts() {
  const url = keyword
    ? `/api/scriptblox?q=${encodeURIComponent(keyword)}`
    : `/api/scriptblox`;

  const res = await fetch(url);
  const data = await res.json();

  const status = document.getElementById("status");
  const results = document.getElementById("results");

  if (data.message && !data.result) {
    status.textContent = data.message;
    return;
  }

  status.textContent = "更新中…";
  results.innerHTML = "";

  for (const s of data.result.scripts) {
    const el = document.createElement("div");
    el.innerHTML = `
      <h3>${s.title}</h3>
      <p>Game: ${s.game?.name ?? "Universal"}</p>
      <p>Views: ${s.views}</p>
      <pre>${(s.script || "").slice(0, 300)}</pre>
      <hr>
    `;
    results.appendChild(el);
  }
}

function search() {
  keyword = document.getElementById("search").value;
  fetchScripts();
  auto();
}

function auto() {
  if (timer) clearInterval(timer);
  timer = setInterval(fetchScripts, 10000); // 10秒更新
}

fetchScripts();
auto();
