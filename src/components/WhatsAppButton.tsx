import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "917940005000";
  const message = encodeURIComponent("Hello, I'm interested in your luxury properties in Ahmedabad.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppButton;
