"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Mail, Phone, Building, Calendar, DollarSign, Clock, RefreshCw, Inbox } from "lucide-react";

type Enquiry = {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  mobile: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
};

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div className="min-h-[80vh] bg-[var(--canvas-subtle)] py-16 sm:py-20">
      <Container size="wide">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-ink-200 pb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
              Project Enquiries Dashboard
            </h1>
            <p className="mt-1 text-sm text-ink-600">
              Real-time website form submissions ({submissions.length} total)
            </p>
          </div>

          <button
            onClick={fetchEnquiries}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-semibold text-ink-800 shadow-xs transition-all hover:border-brand-300 hover:text-brand-700"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh List
          </button>
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center text-sm text-ink-500">
            Loading enquiries...
          </div>
        ) : submissions.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-white p-12 text-center">
            <Inbox className="size-12 text-ink-300" />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
              No enquiries received yet
            </h3>
            <p className="mt-1 text-xs text-ink-500">
              New form submissions from the website will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-ink-200 bg-white p-6 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                    <span className="font-mono text-[0.68rem] font-semibold text-brand-700 uppercase tracking-wider">
                      {item.id}
                    </span>
                    <span className="flex items-center gap-1 text-[0.72rem] text-ink-400">
                      <Clock className="size-3" />
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-ink-950">
                    {item.name}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs text-ink-600">
                    <p className="flex items-center gap-2">
                      <Mail className="size-3.5 text-brand-600" />
                      <a href={`mailto:${item.email}`} className="hover:underline font-medium text-ink-900">
                        {item.email}
                      </a>
                    </p>
                    {item.mobile && (
                      <p className="flex items-center gap-2">
                        <Phone className="size-3.5 text-brand-600" />
                        <a href={`https://wa.me/${item.mobile.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="hover:underline">
                          {item.mobile} (WhatsApp)
                        </a>
                      </p>
                    )}
                    {item.company && (
                      <p className="flex items-center gap-2">
                        <Building className="size-3.5 text-ink-400" />
                        {item.company}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ink-100 pt-3 text-[0.72rem]">
                    {item.service && (
                      <span className="rounded-md bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
                        {item.service}
                      </span>
                    )}
                    {item.budget && (
                      <span className="rounded-md bg-ink-100 px-2 py-0.5 font-medium text-ink-700">
                        💰 {item.budget}
                      </span>
                    )}
                    {item.timeline && (
                      <span className="rounded-md bg-ink-100 px-2 py-0.5 font-medium text-ink-700">
                        ⏱️ {item.timeline}
                      </span>
                    )}
                  </div>

                  {item.details && (
                    <div className="mt-4 rounded-xl bg-ink-50/60 p-3 text-xs text-ink-700 leading-relaxed">
                      <p className="font-semibold text-ink-900 mb-1">Project Details:</p>
                      {item.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
