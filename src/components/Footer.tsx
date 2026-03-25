import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-display text-4xl md:text-5xl font-medium mb-6">LUXE ESTATES</h3>
            <p className="text-primary-foreground/60 max-w-md leading-relaxed">
              Ahmedabad's premier luxury real estate consultancy. We curate extraordinary
              properties for discerning individuals who seek nothing less than perfection.
            </p>
          </div>
          <div>
            <h4 className="label-caps mb-6 text-primary-foreground/40">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Properties", path: "/properties" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="label-caps mb-6 text-primary-foreground/40">Contact</h4>
            <div className="flex flex-col gap-3 text-primary-foreground/60">
              <p>Corporate House, SG Highway</p>
              <p>Ahmedabad, Gujarat 380015</p>
              <p className="mt-2">+91 79 4000 5000</p>
              <p>hello@luxeestates.in</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} Luxe Estates. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="label-caps text-primary-foreground/40 cursor-pointer hover:text-primary-foreground/60 transition-colors">Instagram</span>
            <span className="label-caps text-primary-foreground/40 cursor-pointer hover:text-primary-foreground/60 transition-colors">LinkedIn</span>
            <span className="label-caps text-primary-foreground/40 cursor-pointer hover:text-primary-foreground/60 transition-colors">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
