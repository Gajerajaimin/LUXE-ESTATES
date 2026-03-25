import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Property } from "@/data/properties";

export interface CompareContextValue {
  compareList: Property[];
  addToCompare: (property: Property) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [compareList, setCompareList] = useState<Property[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("compareList");
    if (stored) {
      try {
        setCompareList(JSON.parse(stored) as Property[]);
      } catch {
        setCompareList([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = useCallback((property: Property) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === property.id)) {
        return prev;
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, property];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const isInCompare = useCallback((id: string) => compareList.some((item) => item.id === id), [compareList]);

  const value = useMemo(
    () => ({ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }),
    [compareList, addToCompare, removeFromCompare, clearCompare, isInCompare],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};