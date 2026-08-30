import type { Locale } from "@/lib/i18n/translations";

export type Education = {
  index: number;
  icon?: string;
  institution: string;
  degree: Record<Locale, string>;
  start: Record<Locale, string>;
  end: Record<Locale, string>;
  activities?: Record<Locale, string[]>;
};

export const EducationList: Education[] = [
  {
    index: 0,
    icon: "/clients/ifrs.jpg",
    institution: "Instituto Federal do Rio Grande do Sul — Câmpus Farroupilha",
    degree: {
      en: "Associate Degree in Systems Analysis and Development",
      pt: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    },
    start: { en: "May 2022", pt: "Mai 2022" },
    end: { en: "Ongoing", pt: "Em andamento" },
  },
  {
    index: 1,
    institution: "Colégio Estadual São Tiago",
    degree: {
      en: "High School Diploma",
      pt: "Ensino Médio",
    },
    start: { en: "2019", pt: "2019" },
    end: { en: "2021", pt: "2021" },
  },
];
