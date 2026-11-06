const items = [
  {
    title: "24/7 Availability",
    text: "Day or night, weekday or weekend, we're ready when you are.",
    icon: (<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>),
  },
  {
    title: "Fully Insured",
    text: "Peace of mind that your belongings are protected throughout.",
    icon: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>),
  },
  {
    title: "Competitive Rates",
    text: "Clear pricing with no hidden surprises.",
    icon: (<><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z" /><circle cx="7" cy="7" r="1.5" /></>),
  },
  {
    title: "Fast & Reliable",
    text: "Prompt collection and dependable, on-time delivery.",
    icon: (<><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>),
  },
  {
    title: "Careful Handling",
    text: "Your belongings handled with care from collection to delivery.",
    icon: (<><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z" /><polyline points="3.3 7 12 12 20.7 7" /><line x1="12" y1="22" x2="12" y2="12" /></>),
  },
  {
    title: "Friendly Professional Service",
    text: "An experienced, courteous team from first enquiry to final item.",
    icon: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>),
  },
];

export default function WhyGrid() {
  return (
    <div className="why-grid">
      {items.map(({ title, text, icon }) => (
        <div className="why-item" key={title}>
          <div className="icon"><svg viewBox="0 0 24 24">{icon}</svg></div>
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
