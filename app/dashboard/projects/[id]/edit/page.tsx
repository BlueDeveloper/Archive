"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/dashboard/ProjectForm";
import type { Project } from "@/lib/types";

export const runtime = "edge";

export default function EditProjectPage() {
  const params = useParams();
  const id = Number(params.id);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("인증 필요");
        return res.json();
      })
      .then((list: unknown) => {
        const projects = list as Project[];
        const found = projects.find((p) => p.id === id);
        if (!found) throw new Error("프로젝트를 찾을 수 없습니다.");
        setProject(found);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--dim)" }}>
        불러오는 중...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--red)" }}>
        {error || "프로젝트를 찾을 수 없습니다."}
      </div>
    );
  }

  return <ProjectForm project={project} />;
}
