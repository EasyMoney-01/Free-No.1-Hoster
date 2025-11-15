import express from "express";
import db from "../db.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import AdmZip from "adm-zip";
import { customAlphabet } from "nanoid";
import { downloadRepoZip } from "../utils/github.js";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 16);
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

const SITES_ROOT = process.env.SITES_DIR || path.join(process.cwd(), "sites");
function siteDir(ownerId, siteId) {
  return path.join(SITES_ROOT, ownerId, siteId);
}

router.post("/", (req, res) => {
  const { name } = req.body || {};
  if (!req.user || !req.user.id) return res.status(401).json({ error: "unauthorized" });
  if (!name) return res.status(400).json({ error: "missing_fields" });
  const id = nanoid();
  const created_at = Date.now();
  db.run("INSERT INTO sites (id, owner_id, name, created_at) VALUES (?, ?, ?, ?)", [id, req.user.id, name, created_at], function (err) {
    if (err) return res.status(500).json({ error: "db_error" });
    const dir = siteDir(req.user.id, id);
    fs.mkdirSync(dir, { recursive: true });
    res.json({ id, name });
  });
});

router.get("/", (req, res) => {
  if (!req.user || !req.user.id) return res.status(401).json({ error: "unauthorized" });
  db.all("SELECT id, name, created_at FROM sites WHERE owner_id = ? ORDER BY created_at DESC", [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: "db_error" });
    res.json({ sites: rows || [] });
  });
});

router.post("/:id/deploy", upload.single("bundle"), (req, res) => {
  const siteId = req.params.id;
  if (!req.user || !req.user.id) return res.status(401).json({ error: "unauthorized" });
  db.get("SELECT id FROM sites WHERE id = ? AND owner_id = ?", [siteId, req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: "db_error" });
    if (!row) return res.status(404).json({ error: "not_found" });
    if (!req.file) return res.status(400).json({ error: "missing_bundle" });
    const dir = siteDir(req.user.id, siteId);
    fs.mkdirSync(dir, { recursive: true });
    const zip = new AdmZip(req.file.buffer);
    zip.extractAllTo(dir, true);
    res.json({ status: "deployed" });
  });
});

router.post("/:id/deploy/github", async (req, res) => {
  const siteId = req.params.id;
  if (!req.user || !req.user.id) return res.status(401).json({ error: "unauthorized" });
  const { repo, ref, subdir } = req.body || {};
  if (!repo || typeof repo !== "string" || !repo.includes("/")) return res.status(400).json({ error: "invalid_repo" });
  db.get("SELECT id FROM sites WHERE id = ? AND owner_id = ?", [siteId, req.user.id], async (err, row) => {
    if (err) return res.status(500).json({ error: "db_error" });
    if (!row) return res.status(404).json({ error: "not_found" });
    try {
      const buf = await downloadRepoZip(repo, ref, process.env.GITHUB_TOKEN);
      const zip = new AdmZip(buf);
      const entries = zip.getEntries();
      if (!entries.length) return res.status(400).json({ error: "empty_archive" });
      const first = entries[0].entryName.split("/")[0];
      const prefix = subdir ? `${first}/${subdir.replace(/^\/+|\/+$/g, "")}/` : `${first}/`;
      const dir = siteDir(req.user.id, siteId);
      try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
      fs.mkdirSync(dir, { recursive: true });
      for (const e of entries) {
        const name = e.entryName;
        if (!name.startsWith(prefix)) continue;
        const rel = name.slice(prefix.length);
        if (!rel || rel.endsWith("/")) continue;
        const target = path.join(dir, rel);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        const data = e.getData();
        fs.writeFileSync(target, data);
      }
      res.json({ status: "deployed", source: { repo, ref: ref || null, subdir: subdir || null } });
    } catch (e) {
      res.status(500).json({ error: "fetch_failed" });
    }
  });
});

export default router;