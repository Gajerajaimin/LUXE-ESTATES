import { motion } from "framer-motion";
import aboutTeam from "@/assets/about-team.jpg";

const ease = [0.23, 1, 0.32, 1] as const;

const About = () => {
  return (
    <main className="pt-20">
      <section className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="label-caps text-text-secondary mb-3">The Portfolio</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-foreground text-balance mb-8">
            About Luxe Estates
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Founded with a singular vision — to redefine luxury real estate in Ahmedabad — Luxe Estates has become the city's most trusted name in premium property consultancy.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              We believe that a home is more than an address. It is a statement of taste, a reflection of achievement, and a foundation for life's most meaningful moments. Every property in our portfolio is selected with this philosophy in mind.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-10">
              Our team of seasoned professionals brings together decades of experience in real estate, architecture, and luxury hospitality to deliver a client experience that is as exceptional as the properties we represent.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "15+", label: "Years" },
                { value: "200+", label: "Properties" },
                { value: "₹500Cr+", label: "Value" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-medium text-foreground">{s.value}</p>
                  <p className="label-caps text-text-secondary mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <img
              src={aboutTeam}
              alt="Luxe Estates team"
              className="w-full aspect-[16/10] object-cover"
              loading="lazy"
              width={1280}
              height={720}
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-primary text-primary-foreground">
        <div className="container section-padding">
          <p className="label-caps text-primary-foreground/40 mb-3">Our Values</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-16 text-balance">
            What Defines Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Curated Excellence",
                desc: "Every property in our portfolio undergoes rigorous evaluation. We represent only the finest addresses that meet our exacting standards of quality, design, and location.",
              },
              {
                title: "Discreet Service",
                desc: "We understand that luxury is personal. Our consultants provide confidential, bespoke service tailored to each client's unique requirements and aspirations.",
              },
              {
                title: "Market Mastery",
                desc: "With deep roots in Ahmedabad's real estate landscape, we offer unparalleled market intelligence that empowers our clients to make informed decisions.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease }}
              >
                <h3 className="font-display text-2xl font-medium mb-4">{v.title}</h3>
                <p className="text-primary-foreground/60 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
