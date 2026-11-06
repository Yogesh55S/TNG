"use client";

import { useEffect, useState } from "react";

// Pages are statically built, so read the year in the browser to keep it current.
export default function CurrentYear() {
  const [year, setYear] = useState(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span>{year}</span>;
}
