import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface Property {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  priceValue: number;
  type: "Penthouse" | "Villa" | "Apartment" | "Bungalow";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  images: string[];
  featured: boolean;
  amenities: string[];
  description: string;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "The Skyline Penthouse",
    location: "Satellite, Ahmedabad",
    area: "Satellite",
    price: "₹8.5 Cr",
    priceValue: 85000000,
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 5200,
    image: property1,
    images: [property1, property4, property5],
    featured: true,
    amenities: ["Private Pool", "Home Theatre", "Smart Home", "Concierge", "Gym", "Spa"],
    description: "A masterpiece of modern architecture perched atop the city's most prestigious address. Floor-to-ceiling windows frame panoramic views of the Ahmedabad skyline, while Italian marble floors and bespoke interiors create an atmosphere of unparalleled luxury.",
  },
  {
    id: "2",
    title: "The White Estate",
    location: "Ambli, Ahmedabad",
    area: "Ambli",
    price: "₹12 Cr",
    priceValue: 120000000,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8500,
    image: property2,
    images: [property2, property5, property4],
    featured: true,
    amenities: ["Swimming Pool", "Garden", "Home Office", "Wine Cellar", "Staff Quarters", "Tennis Court"],
    description: "Set within manicured gardens, this contemporary villa redefines luxury living. The architecture seamlessly blends indoor and outdoor spaces, creating a private sanctuary that offers both grandeur and intimacy.",
  },
  {
    id: "3",
    title: "The Horizon Suite",
    location: "SG Highway, Ahmedabad",
    area: "SG Highway",
    price: "₹5.2 Cr",
    priceValue: 52000000,
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3800,
    image: property3,
    images: [property3, property1, property5],
    featured: true,
    amenities: ["Terrace", "Infinity Pool", "Clubhouse", "24/7 Security", "Valet Parking", "Rooftop Lounge"],
    description: "Experience sunset from your private terrace in this meticulously designed apartment. Every detail has been curated to create a living experience that transcends the ordinary.",
  },
  {
    id: "4",
    title: "The Grand Residency",
    location: "Bodakdev, Ahmedabad",
    area: "Bodakdev",
    price: "₹6.8 Cr",
    priceValue: 68000000,
    type: "Apartment",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4200,
    image: property4,
    images: [property4, property1, property3],
    featured: false,
    amenities: ["Concierge", "Swimming Pool", "Gym", "Spa", "Business Center", "Children's Area"],
    description: "Where sophistication meets comfort. This expansive apartment features premium finishes throughout, with a master suite that rivals the finest hotel experiences.",
  },
  {
    id: "5",
    title: "The Ivory Bungalow",
    location: "Science City, Ahmedabad",
    area: "Science City",
    price: "₹9.5 Cr",
    priceValue: 95000000,
    type: "Bungalow",
    bedrooms: 5,
    bathrooms: 5,
    sqft: 7200,
    image: property5,
    images: [property5, property2, property4],
    featured: false,
    amenities: ["Private Garden", "Swimming Pool", "Servant Quarters", "Parking", "Home Theatre", "Library"],
    description: "A bungalow that embodies timeless elegance. With generous proportions and exquisite craftsmanship, this property offers a rare opportunity to own a piece of architectural distinction.",
  },
  {
    id: "6",
    title: "The Azure Tower",
    location: "Vastrapur, Ahmedabad",
    area: "Vastrapur",
    price: "₹4.5 Cr",
    priceValue: 45000000,
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    image: property6,
    images: [property6, property3, property1],
    featured: false,
    amenities: ["Sky Lounge", "Gym", "Swimming Pool", "Jogging Track", "Club House", "24/7 Security"],
    description: "Rising elegantly above the cityscape, The Azure Tower offers a lifestyle defined by views, space, and contemporary design. Premium amenities complement the sophisticated residences within.",
  },
];

export const testimonials = [
  {
    name: "Rajesh Mehta",
    role: "Business Owner",
    text: "The team understood exactly what we were looking for. They found us our dream penthouse in Satellite within weeks. The entire experience was seamless and professional.",
  },
  {
    name: "Priya Sharma",
    role: "Interior Designer",
    text: "As someone with an eye for design, I was impressed by the quality of properties curated. Every listing matched the premium standard promised. Truly a luxury experience.",
  },
  {
    name: "Amit Patel",
    role: "NRI Investor",
    text: "Investing in Ahmedabad real estate from abroad was made effortless. Their attention to detail and market knowledge is unmatched. Highly recommended for discerning buyers.",
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "The Rise of Luxury Living in Ahmedabad",
    excerpt: "Discover how Ahmedabad is becoming Gujarat's premier destination for ultra-luxury residential properties.",
    date: "March 15, 2026",
    image: property6,
  },
  {
    id: "2",
    title: "Architecture Trends Shaping Modern Homes",
    excerpt: "From sustainable design to smart home integration, explore the trends defining contemporary luxury.",
    date: "March 8, 2026",
    image: property2,
  },
  {
    id: "3",
    title: "Investment Guide: Premium Real Estate",
    excerpt: "A comprehensive guide to investing in high-value properties in Gujarat's fastest-growing markets.",
    date: "February 28, 2026",
    image: property3,
  },
];
