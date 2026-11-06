"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { resizeImage } from "@/lib/resizeImage";

const STEPS = ["Your details", "Addresses", "Date & items", "Extras & photos"];
const SERVICES = [
  "House removal",
  "Flat / apartment removal",
  "Office removal",
  "Furniture removal",
  "Man & Van",
  "Packing and moving",
  "Courier / delivery service",
  "Other",
];
const PROPERTY_TYPES = ["House", "Flat / Apartment", "Bungalow", "Office / Commercial", "Storage unit", "Other"];
const FLOORS = ["Ground", "1st", "2nd", "3rd", "4th", "5th+"];
const LIFT = ["No", "Yes"];
const PARKING = [
  "Driveway / private parking",
  "On-street parking",
  "Permit / restricted parking",
  "Loading bay",
  "Not sure",
];
const TIMES = [
  "Early morning (6am – 9am)",
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 5pm)",
  "Evening (5pm – 9pm)",
  "Night (9pm onwards)",
  "Any time",
];
const SPECIAL_ITEMS = [
  "Piano",
  "Large wardrobe",
  "Fragile furniture",
  "Artwork",
  "Glass items",
  "Antiques",
  "Unusually heavy items",
];
const EXTRAS = [
  ["Packing assistance", "Packing assistance"],
  ["Dismantling / reassembly", "Dismantling / reassembly of furniture"],
  ["Loading / unloading", "Loading / unloading assistance"],
  ["Packing materials", "Packing materials"],
];
const MAX_PHOTOS = 10;

async function submitQuote(form) {
  const data = new FormData(form);
  data.delete("photos");
  const files = [...form.elements.photos.files].slice(0, MAX_PHOTOS);
  const resized = await Promise.all(files.map((file) => resizeImage(file)));
  resized.forEach((image) => data.append("photos", image, "photo.jpg"));
  const res = await fetch("/api/quote", { method: "POST", body: data });
  if (!res.ok) throw new Error("Request failed");
}

function Select({ id, name, options }) {
  return (
    <select id={id} name={name}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Chip({ name, value, label }) {
  return (
    <label className="chip">
      <input type="checkbox" name={name} value={value} />
      <span>{label}</span>
    </label>
  );
}

function Legend({ step, children }) {
  return (
    <legend>
      <span className="step">{step}</span>
      {children}
    </legend>
  );
}

export default function QuoteForm({ site }) {
  const formRef = useRef(null);
  const serviceRef = useRef(null);
  const successRef = useRef(null);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [today, setToday] = useState();
  const [previews, setPreviews] = useState([]);
  const [sending, setSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
    const service = new URLSearchParams(window.location.search).get("service");
    if (service && serviceRef.current) serviceRef.current.value = service;
  }, []);

  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  useEffect(() => {
    if (sentCount > 0) successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [sentCount]);

  const fieldClass = (name) => (name in errors ? "err" : undefined);
  const fieldError = (name) => (errors[name] ? <div className="err-msg">{errors[name]}</div> : null);

  function validate(index) {
    const panel = formRef.current.querySelectorAll(".panel")[index];
    const next = {};
    let first = null;
    panel.querySelectorAll("[required]").forEach((field) => {
      if (field.checkValidity()) return;
      first ||= field;
      next[field.name] =
        field.type === "checkbox"
          ? "Please tick this box so we can respond to your enquiry."
          : field.type === "email" && field.validity.typeMismatch
            ? "Please enter a valid email address, like name@example.com."
            : "Please fill in this field.";
    });
    setErrors(next);
    first?.focus();
    return !first;
  }

  function goTo(index) {
    setStep(index);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleInput(e) {
    const { name } = e.target;
    if (name in errors && e.target.checkValidity()) {
      setErrors(({ [name]: _cleared, ...rest }) => rest);
    }
  }

  function handlePhotos(e) {
    setPreviews([...e.target.files].slice(0, MAX_PHOTOS).map((file) => URL.createObjectURL(file)));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate(step)) return;
    // Pressing Enter on an earlier step moves forward rather than submitting a partial form.
    if (step < STEPS.length - 1) {
      goTo(step + 1);
      return;
    }
    setSending(true);
    setFailed(false);
    try {
      await submitQuote(formRef.current);
      formRef.current.reset();
      setPreviews([]);
      goTo(0);
      setSentCount((n) => n + 1);
    } catch {
      setFailed(true); // Keep what they typed so they can retry.
    } finally {
      setSending(false);
    }
  }

  const panelClass = (index) => (step === index ? "panel active" : "panel");
  const backButton = (
    <button type="button" className="btn btn-ghost" onClick={() => goTo(step - 1)}>← Back</button>
  );
  const nextButton = (
    <button type="button" className="btn btn-primary" onClick={() => validate(step) && goTo(step + 1)}>Continue →</button>
  );

  return (
    <section className="quote" id="quote">
      <div className="container">
        <div className="quote-wrap">
          <form className="quote-form" ref={formRef} noValidate onInput={handleInput} onSubmit={handleSubmit}>
            <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <p className="hint" style={{ marginBottom: 18 }}>
              Takes about 2 minutes · Fields marked <span className="req">*</span> are required
            </p>

            <div className="progress">
              {STEPS.map((label, j) => (
                <div className={j <= step ? "done" : undefined} key={label}>
                  Step {j + 1}<span> · {label}</span>
                </div>
              ))}
            </div>

            <div className={panelClass(0)}>
              <fieldset>
                <Legend step={1}>Customer Details</Legend>
                <div className="row">
                  <div>
                    <label htmlFor="f-name">Full name <span className="req">*</span></label>
                    <input id="f-name" name="name" required className={fieldClass("name")} />
                    {fieldError("name")}
                  </div>
                  <div>
                    <label htmlFor="f-phone">Contact number <span className="req">*</span></label>
                    <input id="f-phone" type="tel" name="phone" required className={fieldClass("phone")} />
                    {fieldError("phone")}
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="f-email">Email address <span className="req">*</span></label>
                    <input id="f-email" type="email" name="email" required className={fieldClass("email")} />
                    {fieldError("email")}
                  </div>
                  <div>
                    <label htmlFor="f-contact_method">Preferred contact method</label>
                    <Select id="f-contact_method" name="contact_method" options={["Phone", "Email", "Text / WhatsApp"]} />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <Legend step={2}>Service Required</Legend>
                <div className="row one">
                  <div>
                    <select name="service" aria-label="Service required" ref={serviceRef} required className={fieldClass("service")}>
                      <option value="">— Please select a service —</option>
                      {SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    {fieldError("service")}
                  </div>
                </div>
              </fieldset>
              <div className="form-nav"><span />{nextButton}</div>
            </div>

            <div className={panelClass(1)}>
              <fieldset>
                <Legend step={3}>Collection Details</Legend>
                <div className="row">
                  <div>
                    <label htmlFor="f-col_address">Collection address <span className="req">*</span></label>
                    <input id="f-col_address" name="col_address" required className={fieldClass("col_address")} />
                    {fieldError("col_address")}
                  </div>
                  <div>
                    <label htmlFor="f-col_postcode">Postcode <span className="req">*</span></label>
                    <input id="f-col_postcode" name="col_postcode" required className={fieldClass("col_postcode")} />
                    {fieldError("col_postcode")}
                  </div>
                </div>
                <div className="row three">
                  <div><label htmlFor="f-col_type">Property type</label><Select id="f-col_type" name="col_type" options={PROPERTY_TYPES} /></div>
                  <div><label htmlFor="f-col_floor">Floor number</label><Select id="f-col_floor" name="col_floor" options={FLOORS} /></div>
                  <div><label htmlFor="f-col_lift">Lift available?</label><Select id="f-col_lift" name="col_lift" options={LIFT} /></div>
                </div>
                <div className="row">
                  <div><label htmlFor="f-col_parking">Parking / loading access</label><Select id="f-col_parking" name="col_parking" options={PARKING} /></div>
                  <div>
                    <label htmlFor="f-col_access">Stairs or access restrictions</label>
                    <input id="f-col_access" name="col_access" placeholder="e.g. narrow staircase, long walk" />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <Legend step={4}>Delivery Details</Legend>
                <div className="row">
                  <div>
                    <label htmlFor="f-del_address">Destination address <span className="req">*</span></label>
                    <input id="f-del_address" name="del_address" required className={fieldClass("del_address")} />
                    {fieldError("del_address")}
                  </div>
                  <div>
                    <label htmlFor="f-del_postcode">Postcode <span className="req">*</span></label>
                    <input id="f-del_postcode" name="del_postcode" required className={fieldClass("del_postcode")} />
                    {fieldError("del_postcode")}
                  </div>
                </div>
                <div className="row three">
                  <div><label htmlFor="f-del_type">Property type</label><Select id="f-del_type" name="del_type" options={PROPERTY_TYPES} /></div>
                  <div><label htmlFor="f-del_floor">Floor number</label><Select id="f-del_floor" name="del_floor" options={FLOORS} /></div>
                  <div><label htmlFor="f-del_lift">Lift available?</label><Select id="f-del_lift" name="del_lift" options={LIFT} /></div>
                </div>
                <div className="row">
                  <div><label htmlFor="f-del_parking">Parking / loading access</label><Select id="f-del_parking" name="del_parking" options={PARKING} /></div>
                  <div>
                    <label htmlFor="f-del_access">Special access instructions</label>
                    <input id="f-del_access" name="del_access" placeholder="e.g. key collection, gate code" />
                  </div>
                </div>
              </fieldset>
              <div className="form-nav">{backButton}{nextButton}</div>
            </div>

            <div className={panelClass(2)}>
              <fieldset>
                <Legend step={5}>Moving Date &amp; Time</Legend>
                <div className="row">
                  <div>
                    <label htmlFor="f-date">Preferred moving date <span className="req">*</span></label>
                    <input id="f-date" type="date" name="date" min={today} required className={fieldClass("date")} />
                    {fieldError("date")}
                  </div>
                  <div><label htmlFor="f-time">Preferred collection time</label><Select id="f-time" name="time" options={TIMES} /></div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="f-flexible">Is the date/time flexible?</label>
                    <Select id="f-flexible" name="flexible" options={["Yes", "No", "Slightly (± a few days)"]} />
                  </div>
                  <div>
                    <label htmlFor="f-alt_date">Alternative date (if available)</label>
                    <input id="f-alt_date" type="date" name="alt_date" min={today} />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <Legend step={6}>Items to Be Moved</Legend>
                <div className="row one">
                  <div>
                    <label htmlFor="f-items">Please list the main items</label>
                    <textarea id="f-items"
                      name="items"
                      placeholder="e.g. 2 sofas, 3 beds, 2 wardrobes, dining table & 6 chairs, 3 mattresses, 2 TVs, washing machine, fridge freezer, desk..."
                    />
                    <p className="hint">For example: sofas, beds, wardrobes, tables, chairs, mattresses, TVs, appliances, desks, boxes and other furniture.</p>
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="f-boxes">Approximate number of boxes/bags</label>
                    <Select id="f-boxes" name="boxes" options={["None", "1 – 10", "11 – 25", "26 – 50", "51 – 100", "100+"]} />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <Legend step={7}>Large or Special Items</Legend>
                <div className="chips">
                  {SPECIAL_ITEMS.map((item) => (
                    <Chip name="special" value={item} label={item} key={item} />
                  ))}
                </div>
                <div className="row one" style={{ marginTop: 14 }}>
                  <div>
                    <label htmlFor="f-special_notes">Anything requiring special handling?</label>
                    <input id="f-special_notes" name="special_notes" placeholder="Please describe" />
                  </div>
                </div>
              </fieldset>
              <div className="form-nav">{backButton}{nextButton}</div>
            </div>

            <div className={panelClass(3)}>
              <fieldset>
                <Legend step={8}>Additional Services</Legend>
                <div className="chips">
                  {EXTRAS.map(([value, label]) => (
                    <Chip name="extras" value={value} label={label} key={value} />
                  ))}
                </div>
                <div className="row one" style={{ marginTop: 14 }}>
                  <div>
                    <label htmlFor="f-extras_other">Other requirements</label>
                    <input id="f-extras_other" name="extras_other" />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <Legend step={9}>Photos</Legend>
                <label className="upload" htmlFor="photos">
                  <input type="file" id="photos" name="photos" accept="image/*" multiple onChange={handlePhotos} />
                  <div style={{ fontSize: "2rem" }} />
                  <strong>Upload photos of the items you need to move.</strong>
                  <p className="hint">This helps us estimate the vehicle size, manpower and time required. JPG/PNG, up to 10 images.</p>
                </label>
                <div className="previews">
                  {previews.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element -- local blob: preview URLs
                    <img src={src} alt="" key={src} />
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <Legend step={10}>Additional Information</Legend>
                <textarea name="info" aria-label="Additional information" placeholder="Please tell us anything else we should know about your move." />
              </fieldset>

              <label className="consent">
                <input type="checkbox" name="consent" required className={fieldClass("consent")} />{" "}
                <span>
                  I agree that my details will be used to respond to my enquiry and arrange my requested service, as described in the{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </span>
              </label>
              {fieldError("consent")}
              <div className="form-nav">
                {backButton}
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={sending}>
                  {sending ? "Sending…" : "Send My Quote Request"}
                </button>
              </div>
            </div>
            {failed && (
              <div className="err-box" role="alert">
                We couldn&apos;t send your request. Please try again, or call us on <a href={site.phoneHref}>{site.phone}</a>.
              </div>
            )}
            <div className="success" role="status" ref={successRef} style={sentCount > 0 ? { display: "block" } : undefined}>
              Thank you! We&apos;ve received your request and will contact you shortly using your preferred method.
            </div>
          </form>

          <aside className="side">
            <div className="side-card dark">
              <h4>Your Privacy</h4>
              <p>
                Your details will only be used to respond to your enquiry and arrange your requested service. Please see our{" "}
                <Link href="/privacy">Privacy Policy</Link> for more information.
              </p>
            </div>
            <div className="side-card">
              <h4>Why request a quote?</h4>
              <ul>
                <li>Free &amp; no obligation</li>
                <li>Competitive and transparent rates</li>
                <li>Fully insured service</li>
                <li>Available 24/7</li>
              </ul>
            </div>
            <div className="side-card">
              <h4>Prefer to talk?</h4>
              <p>Call us any time, day or night:</p>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--navy)", marginTop: 6 }}>
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
