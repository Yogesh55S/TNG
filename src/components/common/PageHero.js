import Link from "next/link";

export default function PageHero({ crumb, title, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="crumbs">
          <Link href="/">Home</Link> / {crumb}
        </div>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
