import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bed, Bath, Maximize, Heart, Share2, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { properties } from "@/data/properties";
import EmiCalculator from "@/components/EmiCalculator";
import InvestmentRoi from "@/components/InvestmentRoi";

const ease = [0.23, 1, 0.32, 1] as const;

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!property) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Property Not Found</h1>
          <Link to="/properties" className="label-caps text-secondary hover:opacity-60">
            Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Back + Actions */}
      <div className="container px-6 md:px-16 lg:px-24 py-6 flex items-center justify-between">
        <Link to="/properties" className="inline-flex items-center gap-2 label-caps text-text-secondary hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Back to Properties
        </Link>
        <div className="flex gap-3">
          <button
            onClick={() => setSaved(!saved)}
            className="p-3 border border-border hover:bg-surface transition-colors"
            aria-label="Save property"
          >
            <Heart size={18} className={saved ? "fill-accent text-accent" : "text-foreground"} />
          </button>
          <button className="p-3 border border-border hover:bg-surface transition-colors" aria-label="Share">
            <Share2 size={18} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Gallery */}
      <section className="container px-6 md:px-16 lg:px-24 mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 md:grid-cols-4 gap-2"
        >
          <div className="md:col-span-3">
            <img
              src={property.images[activeImage]}
              alt={property.title}
              className="w-full aspect-[16/10] object-cover"
              width={1280}
              height={800}
            />
          </div>
          <div className="hidden md:flex flex-col gap-2">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative overflow-hidden flex-1 ${activeImage === i ? "ring-2 ring-accent" : ""}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </motion.div>
        {/* Mobile thumbnails */}
        <div className="flex md:hidden gap-2 mt-2 overflow-x-auto">
          {property.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`flex-shrink-0 w-20 h-16 overflow-hidden ${activeImage === i ? "ring-2 ring-accent" : ""}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="container px-6 md:px-16 lg:px-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="label-caps text-text-secondary mb-2">{property.type}</p>
              <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-text-secondary mb-8">
                <MapPin size={16} />
                <span>{property.location}</span>
              </div>

              <div className="flex gap-8 py-6 border-y border-border mb-8">
                <div className="flex items-center gap-2">
                  <Bed size={20} className="text-text-secondary" />
                  <div>
                    <p className="text-lg font-medium text-foreground">{property.bedrooms}</p>
                    <p className="text-xs text-text-secondary">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath size={20} className="text-text-secondary" />
                  <div>
                    <p className="text-lg font-medium text-foreground">{property.bathrooms}</p>
                    <p className="text-xs text-text-secondary">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize size={20} className="text-text-secondary" />
                  <div>
                    <p className="text-lg font-medium text-foreground">{property.sqft}</p>
                    <p className="text-xs text-text-secondary">Sq. Ft.</p>
                  </div>
                </div>
              </div>

              <h3 className="label-caps text-text-secondary mb-4">About This Property</h3>
              <p className="text-foreground/80 leading-relaxed text-lg mb-12">{property.description}</p>

              <h3 className="label-caps text-text-secondary mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="px-4 py-3 bg-surface text-sm text-foreground">
                    {amenity}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="mt-12"
            >
              <h3 className="label-caps text-text-secondary mb-4">Location</h3>
              <div className="w-full aspect-[2/1] bg-surface border border-border overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}&zoom=14`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Property location"
                />
              </div>
            </motion.div>

            {/* EMI & ROI */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <EmiCalculator propertyPrice={property.priceValue} />
              <InvestmentRoi propertyPrice={property.priceValue} />
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="sticky top-28 border border-border p-8"
            >
              <p className="label-caps text-text-secondary mb-2">Price</p>
              <p className="font-display text-4xl font-semibold text-foreground mb-8">{property.price}</p>

              <a
                href="tel:+917940005000"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-accent text-accent-foreground label-caps transition-all duration-300 hover:bg-accent/90 mb-4"
              >
                <Phone size={16} /> Contact Agent
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 border border-foreground text-foreground label-caps transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                Request Private Viewing
              </Link>

              <a
                href={`https://wa.me/917940005000?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} at ${property.location}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 mt-4 bg-[#25D366] text-primary-foreground label-caps transition-all duration-300 hover:opacity-90"
              >
                WhatsApp Enquiry
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetail;
