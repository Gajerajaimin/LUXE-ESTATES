import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

const areas = ["All", "Satellite", "Ambli", "SG Highway", "Bodakdev", "Science City", "Vastrapur"];
const types = ["All", "Penthouse", "Villa", "Apartment", "Bungalow"];
const bedroomOptions = ["All", "3", "4", "5"];

const Properties = () => {
  const [area, setArea] = useState("All");
  const [type, setType] = useState("All");
  const [bedrooms, setBedrooms] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000000]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (area !== "All" && p.area !== area) return false;
      if (type !== "All" && p.type !== type) return false;
      if (bedrooms !== "All" && p.bedrooms !== parseInt(bedrooms)) return false;
      if (p.priceValue < priceRange[0] || p.priceValue > priceRange[1]) return false;
      return true;
    });
  }, [area, type, bedrooms, priceRange]);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="container section-padding pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="label-caps text-text-secondary mb-3">The Collection</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-foreground text-balance">
            Our Properties
          </h1>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container px-6 md:px-16 lg:px-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap gap-4"
        >
          <div>
            <label className="label-caps text-text-secondary block mb-2">Location</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="bg-surface border border-border px-4 py-3 text-sm text-foreground min-w-[160px] focus:outline-none focus:ring-1 focus:ring-foreground font-body"
            >
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-caps text-text-secondary block mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-surface border border-border px-4 py-3 text-sm text-foreground min-w-[160px] focus:outline-none focus:ring-1 focus:ring-foreground font-body"
            >
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-caps text-text-secondary block mb-2">Bedrooms</label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="bg-surface border border-border px-4 py-3 text-sm text-foreground min-w-[160px] focus:outline-none focus:ring-1 focus:ring-foreground font-body"
            >
              {bedroomOptions.map((b) => (
                <option key={b} value={b}>{b === "All" ? "All" : `${b}+`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-caps text-text-secondary block mb-2">Max Price</label>
            <select
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="bg-surface border border-border px-4 py-3 text-sm text-foreground min-w-[160px] focus:outline-none focus:ring-1 focus:ring-foreground font-body"
            >
              <option value={200000000}>Any Price</option>
              <option value={50000000}>Up to ₹5 Cr</option>
              <option value={70000000}>Up to ₹7 Cr</option>
              <option value={100000000}>Up to ₹10 Cr</option>
              <option value={200000000}>₹10 Cr+</option>
            </select>
          </div>
        </motion.div>
      </section>

      {/* Results */}
      <section className="container px-6 md:px-16 lg:px-24 pb-24">
        <p className="label-caps text-text-secondary mb-8">{filtered.length} Properties Found</p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-text-secondary">No properties match your criteria</p>
            <button
              onClick={() => {
                setArea("All");
                setType("All");
                setBedrooms("All");
                setPriceRange([0, 200000000]);
              }}
              className="mt-4 label-caps text-foreground underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Properties;
