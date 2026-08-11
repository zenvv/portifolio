export type Locale = "en" | "pt";

export const locales: Locale[] = ["en", "pt"];

export const translations = {
  en: {
    nav: {
      languageSelection: "Language selection",
    },
    easterEgg: "🎉 me at my birthday :)",
    hero: {
      greeting: "Hi, I'm Will :^)",
      label: "software developer · ui/ux designer",
      aboutTitle: "about me",
      aboutMe1:
        "Brazillian Full-Stack Developer with experience in **corporate systems integration**, **process automation**,**Microsoft Power Platform**, **SharePoint/Graph API**, and **ReactJS**.",
      aboutMe2:
        "I combine software development, process modeling, and graphic/interface design, with a track record of leading end-to-end projects in industrial environments.",
    },
    projects: {
      devProjectsHeader: "Featured Developer Projects",
      designProjectsHeader: "Featured Design Projects",
      readMore: "Read more",
      open: "Open",
      goToProject: "Open Project",
    },
    contact: {
      heading: "Contact",
    },
  },
  pt: {
    nav: {
      languageSelection: "Seleção de idioma",
    },
    easterEgg: "🎉 eu no meu aniversário :)",
    hero: {
      greeting: "Oi, eu sou o Will :^)",
      label: "desenvolvedor de software · ui/ux designer",
      aboutTitle: "sobre mim",
      aboutMe1:
        "Desenvolvedor Full-Stack, com atuação em **integração de sistemas corporativos**: **automação de processos**, **Microsoft Power Platform**, **SharePoint/Graph API** e **ReactJS**.",
      aboutMe2:
        "Combino desenvolvimento, modelagem de processos e design gráfico/interface, com histórico de conduzir projetos de ponta a ponta em ambientes industriais.",
    },
    projects: {
      devProjectsHeader: "Projetos de Desenvolvimento em Destaque",
      designProjectsHeader: "Projetos de Design em Destaque",
      readMore: "Ler mais",
      open: "Abrir",
      goToProject: "Abrir Projeto",
    },
    contact: {
      heading: "Contato",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type Translations = (typeof translations)[Locale];
