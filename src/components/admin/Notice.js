export default function Notice({ saved, error }) {
  if (error) return <div className="adm-note bad" role="alert">{error}</div>;
  if (saved) return <div className="adm-note ok" role="status">Saved. The website has been updated.</div>;
  return null;
}
