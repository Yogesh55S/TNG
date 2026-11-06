"use client";

import { useState } from "react";
import { uploadImage } from "@/app/admin/actions";
import { resizeImage } from "@/lib/resizeImage";

// Uploads straight away, then stores the new id in a hidden field that the surrounding form saves.
export default function ImagePicker({ name, imageId, defaultLabel = "Using the default image" }) {
  const [id, setId] = useState(imageId || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("image", await resizeImage(file), "image.jpg");
      const result = await uploadImage(form);
      if (result.error) setError(result.error);
      else setId(result.id);
    } catch {
      setError("The upload failed. Please try a smaller image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="adm-img">
        {id ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin preview of an uploaded image
          <img src={`/api/images/${id}`} alt="Selected" />
        ) : (
          <div className="adm-img-empty">{defaultLabel}</div>
        )}
        <div className="adm-actions">
          <label className="btn btn-ghost btn-sm" style={{ margin: 0 }}>
            {busy ? "Uploading…" : "Choose Image"}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} disabled={busy} hidden />
          </label>
          {id && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setId("")}>Use Default Image</button>
          )}
        </div>
      </div>
      <input type="hidden" name={name} value={id} />
      {error && <p className="err-msg" role="alert">{error}</p>}
      <p className="hint">JPG, PNG or WebP. Click Save below to apply the change to the website.</p>
    </div>
  );
}
