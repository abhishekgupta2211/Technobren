"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  Mail,
  Phone,
  Building,
  Clock,
  RefreshCw,
  Inbox,
  UserCheck,
  Globe,
  Layers,
  Code2,
  Users,
  Briefcase,
  Calendar,
} from "lucide-react";

type Enquiry = {
  id: string;
  timestamp: string;
  enquiry_type?: string;
  name: string;
  contactPerson?: string;
  email: string;
  workEmail?: string;
  mobile: string;
  phone?: string;
  company: string;
  companyName?: string;
  companyWebsite?: string;
  technologies?: string[];
  developerType?: string[];
  numDevelopers?: string;
  experience?: string;
  engagementType?: string[];
  workMode?: string;
  service: string;
  budget: string;
  timeline: string;
  hiringTimeline?: string;
  details: string;
  requirementDetails?: string;
};

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState<"all" | "general" | "developer_hiring">("all");
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch("/api/contact", {
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(Array.isArray(data.submissions) ? data.submissions : []);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filteredSubmissions = submissions.filter((item) => {
    if (filter === "general") return item.enquiry_type !== "developer_hiring";
    if (filter === "developer_hiring") return item.enquiry_type === "developer_hiring";
    return true;
  });

  return (
    <div className="min-h-[80vh] bg-[var(--canvas-subtle)] py-16 sm:py-20">
      <Container size="wide">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-ink-200 pb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
              Project &amp; Developer Hiring Enquiries
            </h1>
            <p className="mt-1 text-sm text-ink-600">
              Real-time website leads ({submissions.length} total)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-xl border border-ink-200 bg-white p-1 shadow-2xs">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-brand-600 text-white"
                    : "text-ink-600 hover:text-ink-950"
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setFilter("general")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === "general"
                    ? "bg-brand-600 text-white"
                    : "text-ink-600 hover:text-ink-950"
                }`}
              >
                General ({submissions.filter((x) => x.enquiry_type !== "developer_hiring").length})
              </button>
              <button
                onClick={() => setFilter("developer_hiring")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === "developer_hiring"
                    ? "bg-brand-600 text-white"
                    : "text-ink-600 hover:text-ink-950"
                }`}
              >
                Developer Hiring ({submissions.filter((x) => x.enquiry_type === "developer_hiring").length})
              </button>
            </div>

            <button
              onClick={fetchEnquiries}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-semibold text-ink-800 shadow-xs transition-all hover:border-brand-300 hover:text-brand-700"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center text-sm text-ink-500">
            Loading enquiries...
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-white p-12 text-center">
            <Inbox className="size-12 text-ink-300" />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
              No enquiries found
            </h3>
            <p className="mt-1 text-xs text-ink-500">
              Submissions matching your filter will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSubmissions.map((item) => {
              const isDevLead = item.enquiry_type === "developer_hiring";

              return (
                <div
                  key={item.id}
                  className={`flex flex-col justify-between rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md ${
                    isDevLead
                      ? "border-brand-300 bg-white ring-1 ring-brand-200/50"
                      : "border-ink-200 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-wider ${
                          isDevLead
                            ? "border border-brand-300 bg-brand-50 text-brand-700"
                            : "border border-ink-200 bg-ink-100 text-ink-700"
                        }`}
                      >
                        {isDevLead ? "🚀 Developer Hiring Lead" : "📩 General Enquiry"}
                      </span>
                      <span className="flex items-center gap-1 text-[0.72rem] text-ink-400">
                        <Clock className="size-3" />
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-ink-950">
                      {isDevLead ? item.companyName || item.company : item.name}
                    </h3>

                    <div className="mt-3 space-y-2 text-xs text-ink-600">
                      {isDevLead && item.contactPerson && (
                        <p className="flex items-center gap-2 font-medium text-ink-900">
                          <UserCheck className="size-3.5 text-brand-600" />
                          Contact: {item.contactPerson}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <Mail className="size-3.5 text-brand-600" />
                        <a
                          href={`mailto:${item.workEmail || item.email}`}
                          className="font-medium text-ink-900 hover:underline"
                        >
                          {item.workEmail || item.email}
                        </a>
                      </p>
                      {(item.phone || item.mobile) && (
                        <p className="flex items-center gap-2">
                          <Phone className="size-3.5 text-brand-600" />
                          <a
                            href={`https://wa.me/${(item.phone || item.mobile).replace(/[^\d]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {item.phone || item.mobile} (WhatsApp)
                          </a>
                        </p>
                      )}
                      {isDevLead && item.companyWebsite && (
                        <p className="flex items-center gap-2">
                          <Globe className="size-3.5 text-ink-400" />
                          <a
                            href={
                              item.companyWebsite.startsWith("http")
                                ? item.companyWebsite
                                : `https://${item.companyWebsite}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand-700 hover:underline"
                          >
                            {item.companyWebsite}
                          </a>
                        </p>
                      )}
                    </div>

                    {isDevLead ? (
                      <div className="mt-4 space-y-2 border-t border-ink-100 pt-3 text-xs text-ink-700">
                        {item.technologies && item.technologies.length > 0 && (
                          <div>
                            <span className="font-semibold text-ink-900 block mb-1">
                              Technologies:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {item.technologies.map((t) => (
                                <span
                                  key={t}
                                  className="rounded bg-brand-50 border border-brand-200 px-2 py-0.5 text-[0.72rem] font-medium text-brand-700"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-2 text-[0.74rem]">
                          <div>
                            <span className="text-ink-400 block">Dev Type:</span>
                            <span className="font-medium text-ink-900">
                              {Array.isArray(item.developerType)
                                ? item.developerType.join(", ")
                                : item.developerType}
                            </span>
                          </div>
                          <div>
                            <span className="text-ink-400 block">Dev Count:</span>
                            <span className="font-medium text-ink-900">{item.numDevelopers}</span>
                          </div>
                          <div>
                            <span className="text-ink-400 block">Experience:</span>
                            <span className="font-medium text-ink-900">{item.experience}</span>
                          </div>
                          <div>
                            <span className="text-ink-400 block">Engagement:</span>
                            <span className="font-medium text-ink-900">
                              {Array.isArray(item.engagementType)
                                ? item.engagementType.join(", ")
                                : item.engagementType}
                            </span>
                          </div>
                          <div>
                            <span className="text-ink-400 block">Work Mode:</span>
                            <span className="font-medium text-ink-900">{item.workMode}</span>
                          </div>
                          <div>
                            <span className="text-ink-400 block">Timeline:</span>
                            <span className="font-medium text-ink-900">{item.hiringTimeline}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
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
                    )}

                    {(item.requirementDetails || item.details) && (
                      <div className="mt-4 rounded-xl bg-ink-50/60 p-3 text-xs text-ink-700 leading-relaxed">
                        <p className="font-semibold text-ink-900 mb-1">Requirement Details:</p>
                        {item.requirementDetails || item.details}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
