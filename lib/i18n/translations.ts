export type Locale = "en" | "pt";

export const locales: Locale[] = ["en", "pt"];

export const translations = {
  en: {
    nav: {
      languageSelection: "Language selection",
      cv: "Download CV",
      menu: "Menu",
      theme: "Theme",
      home: "Home",
      projects: "Projects",
    },
    easterEgg: "🎉 me at my birthday :)",
    hero: {
      greeting: "Hi, I'm Will :^)",
      label: "software developer · ui/ux designer",
      aboutTitle: "About me",
      tagline:
        "I automate processes and integrate corporate systems with Power Platform, Power BI, React and TypeScript.",
      cta: {
        viewProjects: "View projects",
        aboutMe: "About me",
      },
      projects: {
        title: "Featured Projects",
      },
      stack: {
        title: "Tech stack",
        learningBadge: "learning",
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
        showAll: "Show all",
        showLess: "Show less",
      },
      songs: {
        title: "Some songs that I jam to",
      },
    },
    capabilities: {
      title: "What I do",
      items: {
        development: {
          title: "Software development",
          description:
            "Web applications and internal systems, like Bello Aramados' ERP and Nailly's scheduling PWA.",
        },
        automation: {
          title: "Automation & Power Platform",
          description:
            "Process automation with Power Apps, Power Automate and Power Fx, like Bello Aramados' Power Apps ecosystem.",
        },
        data: {
          title: "Data & integrations",
          description:
            "Microsoft Graph API and SharePoint integrations, Power BI dashboards, and Python automations pulling ERP data.",
        },
        design: {
          title: "UI/UX & design",
          description:
            "Interfaces and visual identity, from the Bello Aramados institutional website redesign to logomarks in Figma.",
        },
      },
    },
    cta: {
      viewAllProjects: "View all projects",
    },
    projects: {
      title: "Projects",
      readMore: "Read more",
      open: "Open",
      goToProject: "Open Project",
      backToProjects: "Back to projects",
      tableOfContents: "Contents",
      imageIndex: "Images",
      backToHome: "Back to homepage",
      backToTop: "Back to top",
      filterByType: "Filter by type",
      previousProject: "Previous project",
      nextProject: "Next project",
      notFound: "Project not found",
      notFoundDescription: "We couldn't find a project with this address.",
      clientTitle: "Built for",
      personalProject: "Personal project",
      problem: "Problem",
      solution: "Solution",
      problemSolutionTitle: "From problem to solution",
      types: {
        all: "All",
        web: "Web",
        powerapps: "Power Apps",
        automation: "Automation",
        bi: "BI",
        design: "Design",
      },
      groups: {
        personal: "Personal Projects",
      },
      empty: {
        title: "No projects match this filter",
        description: "Try adjusting or clearing the filters above.",
      },
    },
    about: {
      intro:
        "Brazilian **Full-Stack Developer** with hands-on experience across **corporate systems integration**, **process automation**, the **Microsoft Power Platform**, **SharePoint/Graph API**, and **ReactJS**. I combine software development, process modeling, and graphic/interface design, with a track record of leading end-to-end projects in industrial environments, from mapping a broken workflow to shipping the tool that fixes it.",
      companiesWebsite: "View Company Website",
      companiesTitle: "Experience",
      showActivities: "Show activities",
      hideActivities: "Hide activities",
      educationTitle: "Education",
      personalEyebrow: "Off the clock",
      personalTeaser:
        "A lover of music, doodles, visual interfaces, and cats. I have a mild coffee addiction and I'm constantly coming up with new ideas.",
    },
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist.",
      backHome: "Back to home",
    },
    contact: {
      heading: "Contact",
      subheading: "Pick whichever's easiest for you: I check all of these! :)",
      captions: {
        github: "See my repositories",
        linkedin: "Connect with me",
        whatsapp: "Send a message",
      },
    },
    impact: {
      heading: "My track record",
      processes: "automated processes",
      apps: "apps built in Power Platform",
      flows: "automation flows",
      reductionLabel: "Process time cut",
      reduction1: "invoices & transport declarations",
      reduction2: "risk analyses",
    },
  },
  pt: {
    nav: {
      languageSelection: "Seleção de idioma",
      cv: "Baixar Currículo",
      menu: "Menu",
      theme: "Tema",
      home: "Início",
      projects: "Projetos",
    },
    easterEgg: "🎉 eu no meu aniversário :)",
    hero: {
      greeting: "Eae, eu sou o Will :^)",
      label: "desenvolvedor de software · ui/ux designer",
      aboutTitle: "Sobre mim",
      tagline:
        "Automatizo processos e integro sistemas corporativos com Power Platform, Power BI, React e TypeScript",
      cta: {
        viewProjects: "Ver projetos",
        aboutMe: "Sobre mim",
      },
      projects: {
        title: "Projetos em Destaque",
      },
      stack: {
        title: "Stack de tecnologias",
        learningBadge: "estudando",
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
        showAll: "Mostrar todos",
        showLess: "Mostrar menos",
      },
      songs: {
        title: "Algumas músicas que eu curto",
      },
    },
    capabilities: {
      title: "O que eu faço",
      items: {
        development: {
          title: "Desenvolvimento de software",
          description:
            "Aplicações web e sistemas internos, como o ERP da Bello Aramados e o PWA de agenda da Nailly.",
        },
        automation: {
          title: "Automação & Power Platform",
          description:
            "Automação de processos com Power Apps, Power Automate e Power Fx, como o ecossistema de Power Apps da Bello Aramados.",
        },
        data: {
          title: "Dados & integrações",
          description:
            "Integrações via Microsoft Graph API e SharePoint, dashboards em Power BI e automações em Python extraindo dados de ERP.",
        },
        design: {
          title: "UI/UX & design",
          description:
            "Interfaces e identidade visual, do redesign do site institucional da Bello Aramados a logomarcas em Figma.",
        },
      },
    },
    cta: {
      viewAllProjects: "Ver todos os projetos",
    },
    projects: {
      title: "Projetos",
      readMore: "Ler mais",
      open: "Abrir",
      goToProject: "Abrir Projeto",
      backToProjects: "Voltar aos projetos",
      tableOfContents: "Sumário",
      imageIndex: "Imagens",
      backToHome: "Voltar à Página Inicial",
      backToTop: "Voltar ao topo",
      filterByType: "Filtrar por tipo",
      previousProject: "Projeto anterior",
      nextProject: "Próximo projeto",
      notFound: "Projeto não encontrado",
      notFoundDescription: "Não encontramos um projeto neste endereço.",
      clientTitle: "Construído para",
      personalProject: "Projeto pessoal",
      problem: "Problema",
      solution: "Solução",
      problemSolutionTitle: "Do problema à solução",
      types: {
        all: "Tudo",
        web: "Web",
        powerapps: "Power Apps",
        automation: "Automação",
        bi: "BI",
        design: "Design",
      },
      groups: {
        personal: "Projetos Pessoais",
      },
      empty: {
        title: "Nenhum projeto encontrado com esse filtro",
        description: "Tente ajustar ou limpar os filtros acima.",
      },
    },
    about: {
      intro:
        "Desenvolvedor Full-Stack, com atuação prática em **integração de sistemas corporativos**, **automação de processos**, **Microsoft Power Platform**, **SharePoint/Graph API** e **ReactJS**. Combino desenvolvimento de software, modelagem de processos e design gráfico/interface, com histórico de conduzir projetos de ponta a ponta em ambientes industriais, do mapeamento de um fluxo quebrado até a entrega da ferramenta que resolve.",
      companiesTitle: "Experiência",
      companiesWebsite: "Ver website da empresa",
      showActivities: "Mostrar atividades desenvolvidas",
      hideActivities: "Ocultar atividades",
      educationTitle: "Educação",
      personalEyebrow: "Fora do expediente",
      personalTeaser:
        "Amante de música, rabiscos, interfaces visuais e gatos. Tenho um leve vício em café e estou toda hora pensando em ideias novas.",
    },
    notFound: {
      title: "Página não encontrada",
      description: "A página que você está procurando não existe.",
      backHome: "Voltar para o início",
    },
    contact: {
      heading: "Contato",
      subheading:
        "Escolhe o que for mais fácil pra ti: eu confiro todos esses canais! :)",
      captions: {
        github: "Ver meus repositórios",
        linkedin: "Conectar comigo",
        whatsapp: "Enviar mensagem",
      },
    },
    impact: {
      heading: "Meu desempenho",
      processes: "processos automatizados",
      apps: "apps em Power Platform",
      flows: "fluxos de automação",
      reductionLabel: "Redução de tempo de processo",
      reduction1: "notas fiscais e declarações",
      reduction2: "análises de risco",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type Translations = (typeof translations)[Locale];
