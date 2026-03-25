import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Check, X } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

const ease = [0.23, 1, 0.32, 1] as const;

const Compare = () => {
  const { compareList, removeFromCompare } = useCompare();

  if (compareList.length < 2) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Select Properties to Compare</h1>
          <p className="text-muted-foreground mb-6">Choose at least 2 properties from the listings page.</p>
          <Link to="/properties" className="label-caps text-accent hover:opacity-70 transition-opacity">
            Browse Properties
          </Link>
        </div>
      </main>
    );
  }

  const allAmenities = [...new Set(compareList.flatMap((p) => p.amenities))];

  const rows: { label: string; render: (p: typeof compareList[0]) => React.ReactNode }[] = [
    { label: "Price", render: (p) => <span className="font-display text-2xl font-semibold">{p.price}</span> },
    { label: "Type", render: (p) => p.type },
    { label: "Location", render: (p) => <span className="flex items-center gap-1.5"><MapPin size={14} className="text-muted-foreground" />{p.location}</span> },
    { label: "Bedrooms", render: (p) => <span className="flex items-center gap-1.5"><Bed size={14} className="text-muted-foreground" />{p.bedrooms}</span> },
    { label: "Bathrooms", render: (p) => <span className="flex items-center gap-1.5"><Bath size={14} className="text-muted-foreground" />{p.bathrooms}</span> },
    { label: "Area", render: (p) => <span className="flex items-center gap-1.5"><Maximize size={14} className="text-muted-foreground" />{p.sqft.toLocaleString()} sq.ft</span> },
    { label: "Price/sq.ft", render: (p) => `₹${Math.round(p.priceValue / p.sqft).toLocaleString()}` },
  ];

  return (
    <main className="pt-20">
      <div className="container px-6 md:px-16 lg:px-24 py-6">
        <Link to="/properties" className="inline-flex items-center gap-2 label-caps text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Back to Properties
        </Link>
      </div>

      <section className="container px-6 md:px-16 lg:px-24 pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-12">
            Property Comparison
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[640px]">
            {/* Property images header */}
            <thead>
              <tr>
                <th className="w-[160px] p-4" />
                {compareList.map((p) => (
                  <th key={p.id} className="p-4 text-left align-top">
                    <div className="relative group">
                      <Link to={`/property/${p.id}`}>
                        <img src={p.image} alt={p.title} className="w-full aspect-[4/3] object-cover mb-3" />
                      </Link>
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                        aria-label={`Remove ${p.title}`}
                      >
                        <X size={14} />
                      </button>
                      <Link to={`/property/${p.id}`} className="font-display text-xl font-medium text-foreground hover:opacity-70 transition-opacity">
                        {p.title}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-surface" : ""}>
                  <td className="p-4 label-caps text-muted-foreground text-xs whitespace-nowrap">{row.label}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-sm text-foreground">{row.render(p)}</td>
                  ))}
                </tr>
              ))}

              {/* Amenities section */}
              <tr>
                <td colSpan={compareList.length + 1} className="pt-8 pb-3 px-4">
                  <span className="label-caps text-muted-foreground">Amenities</span>
                </td>
              </tr>
              {allAmenities.map((amenity, i) => (
                <tr key={amenity} className={i % 2 === 0 ? "bg-surface" : ""}>
                  <td className="p-4 text-sm text-foreground">{amenity}</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.amenities.includes(amenity) ? (
                        <Check size={16} className="text-accent" />
                      ) : (
                        <X size={16} className="text-muted-foreground/40" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>
    </main>
  );
};

export default Compare;
