import { Link } from "react-router-dom";
import { Heart, Bed, Bath, Maximize, GitCompareArrows } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";
import { useCompare } from "@/context/CompareContext";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const [saved, setSaved] = useState(false);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] as const }}
    >
      <Link to={`/property/${property.id}`} className="group block">
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            loading="lazy"
            width={1280}
            height={960}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="property-card-overlay">
            <span className="label-caps text-primary-foreground">View Property</span>
          </div>
          <div className="absolute top-4 right-4 z-10 flex gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                inCompare ? removeFromCompare(property.id) : addToCompare(property);
              }}
              className={`p-2 backdrop-blur-sm transition-colors duration-300 ${inCompare ? "bg-accent text-accent-foreground" : "bg-background/80 hover:bg-background text-foreground"}`}
              aria-label={inCompare ? "Remove from compare" : "Add to compare"}
            >
              <GitCompareArrows size={16} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSaved(!saved);
              }}
              className="p-2 bg-background/80 backdrop-blur-sm transition-colors duration-300 hover:bg-background"
              aria-label="Save property"
            >
              <Heart size={16} className={saved ? "fill-accent text-accent" : "text-foreground"} />
            </button>
          </div>
        </div>
        <div className="pt-5 pb-2">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="label-caps text-text-secondary mb-1">{property.location}</p>
              <h3 className="font-display text-2xl font-medium text-foreground">{property.title}</h3>
            </div>
            <p className="font-display text-xl font-semibold text-foreground whitespace-nowrap">{property.price}</p>
          </div>
          <div className="flex gap-5 mt-3 text-text-secondary">
            <span className="flex items-center gap-1.5 text-sm">
              <Bed size={15} /> {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <Bath size={15} /> {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <Maximize size={15} /> {property.sqft} sq.ft
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
