import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-property.jpg";
import { properties, testimonials, blogPosts } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

const ease = [0.23, 1, 0.32, 1] as const;

const Index = () => {
  const featured = properties.filter((p) => p.featured);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaY = useTransform(ctaProgress, [0, 1], ["40px", "-40px"]);

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Luxury penthouse with city views at dusk"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          style={{ y: heroY, scale: heroScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <motion.div className="relative container pb-20 md:pb-28 z-10" style={{ opacity: heroOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="label-caps text-primary-foreground/70 mb-4"
          >
            Ahmedabad's Premier Luxury Real Estate
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground max-w-4xl leading-[1.05] text-balance"
          >
            Find Your Dream Home
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/properties"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground label-caps transition-all duration-300 hover:bg-accent/90"
            >
              Explore Properties <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-primary-foreground/40 text-primary-foreground label-caps transition-all duration-300 hover:bg-primary-foreground/10"
            >
              Request Private Viewing
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-surface">
        <div className="container section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "200+", label: "Properties Sold" },
              { value: "₹500 Cr+", label: "Portfolio Value" },
              { value: "15+", label: "Years Experience" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <p className="font-display text-4xl md:text-5xl font-medium text-foreground">{stat.value}</p>
                <p className="label-caps text-text-secondary mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container section-padding">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="label-caps text-text-secondary mb-3">The Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground text-balance">
              Featured Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="hidden md:inline-flex items-center gap-2 label-caps text-foreground hover:opacity-60 transition-opacity"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
        <Link
          to="/properties"
          className="md:hidden inline-flex items-center gap-2 label-caps text-foreground mt-10 hover:opacity-60 transition-opacity"
        >
          View All Properties <ArrowRight size={14} />
        </Link>
      </section>

      {/* Testimonials */}
      <section className="bg-primary text-primary-foreground">
        <div className="container section-padding">
          <p className="label-caps text-primary-foreground/40 mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-16 text-balance">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease }}
              >
                <Quote size={32} className="text-accent mb-6" />
                <p className="text-lg leading-relaxed text-primary-foreground/80 mb-8">{t.text}</p>
                <div>
                  <p className="font-display text-xl font-medium">{t.name}</p>
                  <p className="text-sm text-primary-foreground/50">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="container section-padding">
        <p className="label-caps text-text-secondary mb-3">Insights</p>
        <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-16 text-balance">
          Latest from the Journal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="label-caps text-text-secondary mb-2">{post.date}</p>
              <h3 className="font-display text-2xl font-medium text-foreground mb-2">{post.title}</h3>
              <p className="text-text-secondary leading-relaxed">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface">
        <div className="container section-padding text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            style={{ y: ctaY }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground mb-6 text-balance">
              Your Next Address Awaits
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-10 text-lg">
              Whether you seek a penthouse with skyline views or a villa with private gardens, we curate properties that match your vision of the exceptional.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background label-caps transition-all duration-300 hover:opacity-80"
            >
              Schedule a Consultation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
