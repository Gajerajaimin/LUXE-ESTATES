import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const ease = [0.23, 1, 0.32, 1] as const;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Thank you for your enquiry. Our team will contact you shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="pt-20">
      <section className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="label-caps text-text-secondary mb-3">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-foreground text-balance mb-16">
            Contact Us
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex flex-col gap-6"
          >
            <div>
              <label className="label-caps text-text-secondary block mb-2">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-foreground transition-colors font-body"
                placeholder="Enter your name"
                maxLength={100}
              />
            </div>
            <div>
              <label className="label-caps text-text-secondary block mb-2">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-foreground transition-colors font-body"
                placeholder="your@email.com"
                maxLength={255}
              />
            </div>
            <div>
              <label className="label-caps text-text-secondary block mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-foreground transition-colors font-body"
                placeholder="+91 XXXXX XXXXX"
                maxLength={20}
              />
            </div>
            <div>
              <label className="label-caps text-text-secondary block mb-2">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-foreground transition-colors resize-none font-body"
                placeholder="Tell us about the property you're looking for..."
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-10 py-4 bg-foreground text-background label-caps transition-all duration-300 hover:opacity-80 self-start"
            >
              Send Enquiry
            </button>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <div className="flex flex-col gap-8 mb-12">
              <div className="flex gap-4">
                <MapPin size={20} className="text-text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="label-caps text-text-secondary mb-1">Address</p>
                  <p className="text-foreground">Corporate House, SG Highway<br />Ahmedabad, Gujarat 380015</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={20} className="text-text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="label-caps text-text-secondary mb-1">Phone</p>
                  <a href="tel:+917940005000" className="text-foreground hover:opacity-60 transition-opacity">+91 79 4000 5000</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={20} className="text-text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="label-caps text-text-secondary mb-1">Email</p>
                  <a href="mailto:hello@luxeestates.in" className="text-foreground hover:opacity-60 transition-opacity">hello@luxeestates.in</a>
                </div>
              </div>
            </div>

            <div className="w-full aspect-[4/3] bg-surface border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=SG+Highway,+Ahmedabad,+Gujarat&zoom=14"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Luxe Estates Office Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
