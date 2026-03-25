import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCompare } from "@/context/CompareContext";

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-8px_30px_-10px_hsl(var(--foreground)/0.1)]"
      >
        <div className="container px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {compareList.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 pl-1 pr-2 py-1 bg-surface border border-border flex-shrink-0"
              >
                <img src={p.image} alt={p.title} className="w-10 h-10 object-cover" />
                <span className="text-sm text-foreground whitespace-nowrap max-w-[120px] truncate">
                  {p.title}
                </span>
                <button
                  onClick={() => removeFromCompare(p.id)}
                  className="p-0.5 hover:bg-muted transition-colors"
                  aria-label={`Remove ${p.title}`}
                >
                  <X size={14} className="text-muted-foreground" />
                </button>
              </div>
            ))}
            {compareList.length < 2 && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Select {2 - compareList.length} more to compare
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={clearCompare} className="label-caps text-xs text-muted-foreground hover:text-foreground transition-colors">
              Clear
            </button>
            {compareList.length >= 2 && (
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground label-caps text-xs transition-all hover:bg-accent/90"
              >
                Compare <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
