import ImagePicker from "@/components/admin/ImagePicker";
import Notice from "@/components/admin/Notice";
import { getPages } from "@/lib/content";
import { savePages } from "../../actions";

function Field({ name, label, value, area, hint }) {
  return (
    <div className="row one"><div>
      <label htmlFor={name}>{label}</label>
      {area ? <textarea id={name} name={name} defaultValue={value} maxLength={600} /> : <input id={name} name={name} defaultValue={value} maxLength={200} />}
      {hint && <p className="hint">{hint}</p>}
    </div></div>
  );
}

export default async function PagesAdminPage({ searchParams }) {
  const p = await getPages();
  return (
    <>
      <h1 className="adm-title">Page Text &amp; Images</h1>
      <p className="adm-sub">An empty field goes back to its original text.</p>
      <Notice saved={searchParams.saved} />
      <form action={savePages}>
        <div className="adm-card">
          <h2>Home page</h2>
          <Field name="heroTitle" label="Main heading" value={p.heroTitle} />
          <Field name="heroAccent" label="Highlighted part of the heading" value={p.heroAccent} />
          <Field name="heroIntro" label="Intro text" value={p.heroIntro} area />
          <div className="row one"><div>
            <span className="field-label">Main image</span>
            <ImagePicker name="heroImageId" imageId={p.heroImageId} />
          </div></div>
          <Field name="servicesIntro" label="Services intro (home and services pages)" value={p.servicesIntro} area />
        </div>
        <div className="adm-card">
          <h2>About page</h2>
          <Field name="aboutTitle" label="Heading" value={p.aboutTitle} />
          <Field name="aboutIntro" label="Intro text (also used in “Why Choose” on the home page)" value={p.aboutIntro} area />
        </div>
        <div className="adm-card">
          <h2>Google search text (SEO)</h2>
          <Field name="homeSeoTitle" label="Home page title" value={p.homeSeoTitle} hint="Best under 60 characters." />
          <Field name="homeSeoDescription" label="Home page description" value={p.homeSeoDescription} area hint="Best under 160 characters." />
          <Field name="aboutSeoTitle" label="About page title" value={p.aboutSeoTitle} />
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </form>
    </>
  );
}
