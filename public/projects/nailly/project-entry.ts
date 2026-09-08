// Item para a lista `Projetos` (mesma estrutura de portifolio-references/projects.ts).
// Copiar/colar dentro do array `Projetos`. Ajustar `index` conforme a posição real.

import type { Project } from "../projects";

export const nailly: Project = {
  index: 13,
  slug: "nailly",
  title: { en: "Nailly", pt: "Nailly" },
  description: {
    en: "Scheduling and finance PWA for a self-employed manicurist. A continuous time-band agenda, database-enforced no-overlap booking, batch payments allocated across appointments, recurring clients, a public request form with an approval queue, and Web Push — Next.js 16 on Supabase, with RLS as the security boundary.",
    pt: "PWA de agenda e financeiro para uma manicure autônoma. Agenda como faixa contínua de tempo, agendamento sem sobreposição garantido por constraint no banco, pagamento em lote alocado entre atendimentos, clientes recorrentes, formulário público com fila de aprovação e Web Push — Next.js 16 sobre Supabase, com RLS como fronteira de segurança.",
  },
  shortDescription: {
    en: "Scheduling + finance PWA for a self-employed manicurist",
    pt: "PWA de agenda e financeiro para uma manicure autônoma",
  },
  createdAt: "Set/2026",
  tecnologias: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Supabase",
    "PostgreSQL",
    "Row-Level Security",
    "Edge Functions",
    "PWA",
    "Web Push",
    "Vercel",
    "date-fns",
    "react-hook-form",
    "Zod",
  ],
  tags: ["Web", "Software"],
  empresa: "",
  type: "web",
  // App real fica atrás de login; o link aponta para o formulário público de
  // reserva de uma instância de demonstração (dados fictícios).
  link: "https://nailly-ten.vercel.app/agendar/atelie-aline-demo",
  repo: null,
  color: "#394B35",
  featured: true,
  imageCaption: {
    en: "* Demo instance with fictional data — structure identical to production. Public booking form at /agendar/atelie-aline-demo.",
    pt: "* Instância de demonstração com dados fictícios — estrutura idêntica à de produção. Formulário público de reserva em /agendar/atelie-aline-demo.",
  },
};
