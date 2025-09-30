"use client";

import { useLabStore } from "@/lib/store/labs";
import { useEffect, useState } from "react";
import { evaluateWithRules, type RuleResult } from "@/lib/rules/engine";
import { fetchRulesClient } from "@/lib/rules/client";
import { ResultCard } from "@/components/ResultCard";

export default function AnalyzePage() {
  const records = useLabStore((state) => state.records);
  const [results, setResults] = useState<RuleResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (records.length === 0) {
      setResults([]);
      setIsLoading(false);
      return () => {
        active = false;
      };
    }
    async function run() {
      setIsLoading(true);
      try {
        const rules = await fetchRulesClient();
        if (!active) return;
        setResults(evaluateWithRules(records, rules));
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }
    void run();
    return () => {
      active = false;
    };
  }, [records]);

  return (
    <div className="space-y-4">
      {results.length === 0 ? (
        <p className="text-sm text-slate-600">
          {records.length === 0
            ? "No results yet. Upload a panel to begin."
            : isLoading
              ? "Preparing analysis…"
              : "No interpretable values were detected."}
        </p>
      ) : (
        results.map((record) => (
          <ResultCard
            key={record.id}
            analyte={record.analyte}
            value={(record.normalizedValue ?? record.value).toString()}
            unit={record.normalizedUnit ?? record.unit}
            status={record.status ?? "normal"}
            reference={record.reference ? `${record.reference.low} – ${record.reference.high} ${record.reference.unit}` : ""}
            message={record.messages.map((msg) => msg.message).join(" ") || "Within monitored range."}
          />
        ))
      )}
    </div>
  );
}
