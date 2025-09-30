"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  const [locale, setLocale] = useState("en");
  const [units, setUnits] = useState("si");
  const [cloudOCR, setCloudOCR] = useState(false);
  const [cloudLLM, setCloudLLM] = useState(false);
  const [telemetry, setTelemetry] = useState(false);

  useEffect(() => {
    const storedUnits = window.localStorage.getItem("lablens-units");
    if (storedUnits) setUnits(storedUnits);
    const storedCloudOCR = window.localStorage.getItem("lablens-cloud-ocr");
    if (storedCloudOCR) setCloudOCR(storedCloudOCR === "true");
    const storedCloudLLM = window.localStorage.getItem("lablens-cloud-llm");
    if (storedCloudLLM) setCloudLLM(storedCloudLLM === "true");
    const storedTelemetry = window.localStorage.getItem("lablens-telemetry");
    if (storedTelemetry) setTelemetry(storedTelemetry === "true");
    const cookieLocale = document.cookie
      .split(";")
      .map((part) => part.trim().split("="))
      .find(([key]) => key === "NEXT_LOCALE")?.[1];
    if (cookieLocale) setLocale(cookieLocale);
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-xl font-semibold">Preferences</h1>
        <div className="mt-4 space-y-3 text-sm">
          <label className="flex items-center justify-between">
            <span>Language</span>
            <select
              className="rounded-lg border border-slate-300 px-3 py-1"
              value={locale}
              onChange={(event) => {
                const value = event.target.value;
                setLocale(value);
                document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000`;
                window.location.reload();
              }}
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="lt">Lietuvių</option>
            </select>
          </label>
          <label className="flex items-center justify-between">
            <span>Units</span>
            <select
              className="rounded-lg border border-slate-300 px-3 py-1"
              value={units}
              onChange={(event) => {
                const value = event.target.value;
                setUnits(value);
                window.localStorage.setItem("lablens-units", value);
              }}
              aria-label="Select units"
            >
              <option value="si">SI</option>
              <option value="us">US Conventional</option>
            </select>
          </label>
          <label className="flex items-center justify-between">
            <span>Use cloud OCR</span>
            <input
              type="checkbox"
              checked={cloudOCR}
              onChange={(event) => {
                setCloudOCR(event.target.checked);
                window.localStorage.setItem("lablens-cloud-ocr", String(event.target.checked));
              }}
              aria-describedby="cloud-ocr-consent"
            />
          </label>
          <p id="cloud-ocr-consent" className="text-xs text-slate-500">
            Requires explicit consent. Files leave your device temporarily for processing.
          </p>
          <label className="flex items-center justify-between">
            <span>Use LLM normalization</span>
            <input
              type="checkbox"
              checked={cloudLLM}
              onChange={(event) => {
                setCloudLLM(event.target.checked);
                window.localStorage.setItem("lablens-cloud-llm", String(event.target.checked));
              }}
            />
          </label>
          <p className="text-xs text-slate-500">
            Experimental feature. Data is summarised and shared only after explicit consent.
          </p>
          <label className="flex items-center justify-between">
            <span>Anonymous telemetry</span>
            <input
              type="checkbox"
              checked={telemetry}
              onChange={(event) => {
                setTelemetry(event.target.checked);
                window.localStorage.setItem("lablens-telemetry", String(event.target.checked));
              }}
            />
          </label>
          <p className="text-xs text-slate-500">
            Off by default. When enabled, only aggregated performance metrics are sent.
          </p>
        </div>
      </Card>
    </div>
  );
}
