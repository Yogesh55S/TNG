// Turns a pasted video link into something playable. Returns null for links we can't play.
export function parseVideo(url) {
  let parsed;
  try {
    parsed = new URL(String(url).trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  const host = parsed.hostname.replace(/^www\.|^m\./, "");

  if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com") {
    const id =
      host === "youtu.be"
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v") || (parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/) || [])[1];
    if (!/^[\w-]{11}$/.test(id || "")) return null;
    return {
      kind: "embed",
      src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }
  if (host === "vimeo.com") {
    const id = (parsed.pathname.match(/^\/(\d+)/) || [])[1];
    return id ? { kind: "embed", src: `https://player.vimeo.com/video/${id}?autoplay=1`, thumbnail: null } : null;
  }
  if (/\.(mp4|webm)$/i.test(parsed.pathname)) return { kind: "file", src: parsed.href, thumbnail: null };
  return null;
}
