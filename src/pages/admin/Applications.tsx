import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ApplicationLead, deleteApplicationLead, getApplicationLeads } from "@/lib/supabaseData";
import { Copy, Download, Search, Trash2 } from "lucide-react";

function toCsv(rows: ApplicationLead[]) {
  const header = ["createdAt", "name", "email", "phone", "program", "goals", "sourcePath"];

  const escape = (v: unknown) => {
    const s = String(v ?? "");
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [r.createdAt, r.name, r.email, r.phone ?? "", r.program, r.goals, r.sourcePath ?? ""].map(escape).join(",")
    ),
  ];

  return lines.join("\n");
}

const AdminApplications = () => {
  const [leads, setLeads] = useState<ApplicationLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchLeads = async () => {
    setIsLoading(true);
    const data = await getApplicationLeads();
    setLeads(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) => {
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone ?? "").toLowerCase().includes(q) ||
        l.program.toLowerCase().includes(q) ||
        l.goals.toLowerCase().includes(q)
      );
    });
  }, [leads, search]);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: "Copied", description: label });
    } catch {
      toast({ title: "Copy failed", description: "Browser blocked clipboard access.", variant: "destructive" });
    }
  };

  const handleExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this submission? This cannot be undone.")) return;
    const ok = await deleteApplicationLead(id);
    if (!ok) {
      toast({ title: "Delete failed", description: "Try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Submission removed." });
    fetchLeads();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground mt-1">All apply-form submissions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchLeads} disabled={isLoading}>
            Refresh
          </Button>
          <Button onClick={handleExport} disabled={filtered.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Submissions</span>
            <Badge variant="secondary">{filtered.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, program, goals…"
              className="pl-10"
            />
          </div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground text-center py-10">Loading submissions…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No submissions yet.</p>
          ) : (
            <div className="grid gap-3">
              {filtered.map((lead) => (
                <Card key={lead.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold truncate">{lead.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleString()}
                        </span>
                        <Badge variant="outline">{lead.program}</Badge>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground break-words">
                        <button
                          className="hover:underline"
                          onClick={() => handleCopy(lead.email, "Email copied")}
                          type="button"
                        >
                          {lead.email}
                        </button>
                        {lead.phone ? (
                          <>
                            {" · "}
                            <button
                              className="hover:underline"
                              onClick={() => handleCopy(lead.phone!, "Phone copied")}
                              type="button"
                            >
                              {lead.phone}
                            </button>
                          </>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm whitespace-pre-wrap">{lead.goals}</p>
                      {lead.sourcePath ? (
                        <p className="mt-3 text-xs text-muted-foreground">Source: {lead.sourcePath}</p>
                      ) : null}
                    </div>

                    <div className="flex gap-2 md:flex-col md:items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(lead.email, "Email copied")}
                        type="button"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(lead.id)}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApplications;

