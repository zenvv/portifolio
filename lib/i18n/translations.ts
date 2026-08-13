export type Locale = "en" | "pt";

export const locales: Locale[] = ["en", "pt"];

export const translations = {
  en: {
    nav: {
      languageSelection: "Language selection",
      cv: "Download CV",
      menu: "Menu",
      theme: "Theme",
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
      projects: {
        title: "My Projects",
        description:
          "See all the things I've developed or design throught my journey on this Earth",
        button: "View Projects",
      },
      stack: {
        title: "Tech I use",
        types: {
          languages: "Languages",
          frameworks: "Frameworks",
          data: "Data",
          automation: "Automation",
          microsoft: "Microsoft",
          tools: "Tools",
          design: "Design",
          ai: "AI",
          other: "Other",
        },
        levels: {
          learning: "Learning",
          beginner: "Beginner",
          intermediate: "Intermediate",
          advanced: "Advanced",
        },
        showAll: "Show all",
        showLess: "Show less",
      },
      songs: {
        title: "Some songs that I jam to",
      },
    },
    projects: {
      startTitle: "Featured",
      endTitle: "Projects",
      readMore: "Read more",
      open: "Open",
      goToProject: "Open Project",
      backToProjects: "Back to projects",
      backToHome: "Back to homepage",
      notFound: "Project not found",
      notFoundDescription: "We couldn't find a project with this address.",
      empty: {
        dev: {
          title: "No development projects yet",
          description:
            "Nothing published yet in this category — check back later.",
        },
        design: {
          title: "No design projects yet",
          description:
            "Nothing published yet in this category — check back later.",
        },
        automation: {
          title: "Automation projects coming soon",
          description:
            "Nothing published yet in this category — check back later, or take a look at the Development and Design projects instead.",
        },
      },
    },
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist.",
      backHome: "Back to home",
    },
    contact: {
      heading: "Contact",
    },
  },
  pt: {
    nav: {
      languageSelection: "Seleção de idioma",
      cv: "Baixar Currículo",
      menu: "Menu",
      theme: "Tema",
    },
    easterEgg: "🎉 eu no meu aniversário :)",
    hero: {
      greeting: "Eae, eu sou o Will :^)",
      label: "desenvolvedor de software · ui/ux designer",
      aboutTitle: "sobre mim",
      aboutMe1:
        "Desenvolvedor Full-Stack, com atuação em **integração de sistemas corporativos**: **automação de processos**, **Microsoft Power Platform**, **SharePoint/Graph API** e **ReactJS**.",
      aboutMe2:
        "Combino desenvolvimento, modelagem de processos e design gráfico/interface, com histórico de conduzir projetos de ponta a ponta em ambientes industriais.",
      projects: {
        title: "Meus Projetos",
        description:
          "Veja todas as coisas que eu desenvolvi ou projetei durante minha jornada na vida",
        button: "Ver Projetos",
      },
      stack: {
        title: "Tecnologias que eu uso",
        types: {
          languages: "Linguagens",
          frameworks: "Frameworks",
          data: "Dados",
          automation: "Automação",
          microsoft: "Microsoft",
          tools: "Ferramentas",
          design: "Design",
          ai: "IA",
          other: "Outros",
        },
        levels: {
          learning: "Aprendendo",
          beginner: "Iniciante",
          intermediate: "Intermediário",
          advanced: "Avançado",
        },
        showAll: "Ver tudo",
        showLess: "Ver menos",
      },
      songs: {
        title: "Algumas músicas que eu curto",
      },
    },
    projects: {
      startTitle: "Projetos de",
      endTitle: "em Destaque",
      readMore: "Ler mais",
      open: "Abrir",
      goToProject: "Abrir Projeto",
      backToProjects: "Voltar aos projetos",
      backToHome: "Voltar à Página Inicial",
      notFound: "Projeto não encontrado",
      notFoundDescription: "Não encontramos um projeto neste endereço.",
      empty: {
        dev: {
          title: "Ainda não há projetos de desenvolvimento",
          description:
            "Nada publicado nessa categoria ainda — volte mais tarde.",
        },
        design: {
          title: "Ainda não há projetos de design",
          description:
            "Nada publicado nessa categoria ainda — volte mais tarde.",
        },
        automation: {
          title: "Projetos de automação em breve",
          description:
            "Nada publicado nessa categoria ainda — volte mais tarde, ou dê uma olhada nos projetos de Desenvolvimento e Design.",
        },
      },
    },
    notFound: {
      title: "Página não encontrada",
      description: "A página que você está procurando não existe.",
      backHome: "Voltar para o início",
    },
    contact: {
      heading: "Contato",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type Translations = (typeof translations)[Locale];
