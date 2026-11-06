"use client";

import { useEffect, useState } from "react";
import { parseVideo } from "@/lib/video";

function VideoContent({ video }) {
  if (video.kind === "file") return <video src={video.src} controls autoPlay playsInline />;
  return (
    <iframe
      src={video.src}
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      title="Video testimonial"
    />
  );
}

export default function VideoTestimonials({ videos }) {
    const [active, setActive] = useState(null);
  const close = () => setActive(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="video-grid">
        {videos.map((t) => {
          const video = parseVideo(t.url);
          if (!video) return null;
          return (
            <article className="vcard" key={t.id}>
              <button
                className="vthumb"
                aria-label={`Play video testimonial from ${t.name}`}
                onClick={() => setActive(video)}
              >
                {video.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element -- remote video thumbnail
                  <img src={video.thumbnail} alt="" loading="lazy" />
                ) : (
                  <span className="init">{t.name[0]}</span>
                )}
                <span className="play">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
              <div className="vbody">
                <div className="stars">★★★★★</div>
                <blockquote>“{t.quote}”</blockquote>
                <div className="who">
                  <span className="av">{t.name[0]}</span>
                  <div>
                    <b>{t.name}</b>
                    <small>{t.service}</small>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div
        className={active === null ? "vmodal" : "vmodal open"}
        role="dialog"
        aria-modal="true"
        aria-label="Video testimonial"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button className="vclose" aria-label="Close" onClick={close}>×</button>
        <div className="vbox">{active && <VideoContent video={active} />}</div>
      </div>
    </>
  );
}
