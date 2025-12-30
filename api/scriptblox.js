export default async function handler(req, res) {
  const { q = "", page = "1" } = req.query;

  const url = q
    ? `https://scriptblox.com/api/script/search?q=${encodeURIComponent(q)}&page=${page}`
    : `https://scriptblox.com/api/script/fetch?page=${page}`;

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const text = await r.text();

    try {
      const json = JSON.parse(text);
      res.status(200).json(json);
    } catch {
      res.status(502).json({
        message: "Upstream did not return JSON",
        raw: text.slice(0, 200)
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
