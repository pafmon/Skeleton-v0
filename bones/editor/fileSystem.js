export async function saveToProjectFolder(filename, content) {
  const res = await fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content }),
  });
  if (res.ok) console.log(`[fs] saved ${filename}`);
  else console.error(`[fs] failed to save ${filename}`);
}
