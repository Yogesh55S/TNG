import house from "@/assets/images/house.jpg";
import flat from "@/assets/images/flat.jpg";
import office from "@/assets/images/office.jpg";
import courier from "@/assets/images/courier.jpg";

export const services = [
  {
    id: "house",
    title: "House Removals",
    image: house,
    alt: "Removal team carrying a wrapped sofa into a van",
    quoteHref: "/quote?service=House+removal",
    short: "Full or partial house moves, handled with care from door to door.",
    body: "Moving a few belongings or a whole property? Our team loads everything carefully and transports it safely to your new home.",
    points: [
      "Full or partial house moves",
      "Careful furniture handling",
      "Loading and unloading help",
      "Clear, competitive rates",
      "Fully insured",
      "Available 24/7",
    ],
  },
  {
    id: "flat",
    title: "Flat & Apartment Removals",
    image: flat,
    alt: "Flat and apartment removal",
    quoteHref: "/quote?service=Flat+/+apartment+removal",
    short: "Stairs, lifts and restricted access are all part of the job.",
    body: "Flats can mean stairs, narrow entrances and limited parking. We plan around them so your move runs smoothly.",
    points: [
      "Flats of all sizes",
      "Help with stairs and lifts",
      "Careful handling in narrow spaces",
      "Single-room or full-flat moves",
      "Flexible collection times",
      "Available 24/7, fully insured",
    ],
  },
  {
    id: "office",
    title: "Office & Business Removals",
    image: office,
    alt: "Office and business removal",
    quoteHref: "/quote?service=Office+removal",
    short: "Relocate your business with minimal disruption.",
    body: "We move office furniture, equipment and boxes at a time that suits your business, including evenings and weekends.",
    points: [
      "Small and large offices",
      "Desks, chairs and furniture",
      "Boxed equipment and belongings",
      "Evening and weekend moves",
      "Organised loading and unloading",
      "Available 24/7, fully insured",
    ],
  },
  {
    id: "courier",
    title: "Courier & Delivery Services",
    image: courier,
    alt: "Courier and delivery service",
    quoteHref: "/quote?service=Courier+/+delivery+service",
    short: "Fast delivery for parcels, furniture and business goods.",
    body: "Need something collected and delivered quickly? We offer flexible collection and delivery around the clock, for individuals and businesses.",
    points: [
      "Same-day and scheduled delivery",
      "Parcels and documents",
      "Furniture and bulky items",
      "Business deliveries",
      "Prompt collection",
      "Available 24/7",
    ],
  },
];
