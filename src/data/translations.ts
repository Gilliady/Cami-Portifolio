export interface StatItem {
  number: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  hasPlay: boolean;
  hasAwards?: boolean;
  filterGroups?: string[];
  cols?: string; // custom desktop grid span
  description?: string;
  videoUrl?: string;
}

export interface ContentData {
  lang: 'pt' | 'en';
  hero: {
    tagline: string;
    name: string;
    title: string;
    description: string;
    portrait?: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    stats: StatItem[];
    portrait?: string;
  };
  projects: {
    heading: string;
    items: ProjectItem[];
  };
  contact: {
    heading: string;
    portrait?: string;
    form: {
      name: string;
      email: string;
      message: string;
      button: string;
      successMessage: string;
    };
    socials: {
      linkedin: string;
      whatsapp: string;
      email: string;
    };
  };
}

export const content: Record<'pt' | 'en', ContentData> = {
  pt: {
    lang: 'pt',
    hero: {
      tagline: 'A INTERSECÇÃO ENTRE DESIGN, ARTE E TECNOLOGIA.',
      name: 'CAMILA FERREIRA',
      title: 'PRODUTORA AUDIOVISUAL',
      description: 'Criando experiências visuais para um mundo digital. Entregando o máximo potencial do seu projeto.',
    },
    about: {
      heading: 'SOBRE',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum purus eu cursus fermentum. Sed lacinia purus eget ullamcorper faucibus. Phasellus pharetra gravida enim at maximus. Cras consectetur luctus egestas. Curabitur interdum nisi eu pharetra bibendum. Nunc fermentum luctus ultricies. Aliquam dui eros, congue id lobortis a, iaculis non neque. Quisque eget placerat mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        'Phasellus a congue lacus, et lobortis ante. Donec consequat, massa in hendrerit vehicula, quam nisi luctus magna, in vestibulum nulla sem sed felis. Phasellus vitae leo ullamcorper lacus blandit vulputate. Praesent volutpat suscipit gravida. Aliquam euismod sodales commodo. In tristique nisi id tempor tempus. Integer at nunc et nulla varius vulputate eu in tortor. Vivamus vel arcu non est tincidunt mollis id sit amet ipsum.',
      ],
      stats: [
        { number: '+10', label: 'anos de experiência' },
        { number: '+200', label: 'entregas de sucesso' },
        { number: '09', label: 'prêmios e nomeações' },
        { number: '+1M', label: 'views totais nas mídias' },
      ],
    },
    projects: {
      heading: 'PROJETOS',
      items: [
        {
          id: 'red-gun',
          title: 'Red Pistol - Curta Metragem de Animação',
          category: 'Animação 2D & Direção de Arte',
          image: '/images/project_red_gun.jpg',
          hasPlay: true,
          cols: 'md:col-span-6 lg:col-span-6',
          description: 'Projeto de direção artística e storyboard para curta animado de ação estilizado.',
        },
        {
          id: 'lumisense',
          title: 'Lumisense - Institucional Industrial',
          category: 'Vídeo Institucional & Produção',
          image: '/images/project_lumisense.jpg',
          hasPlay: true,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'Filmagem e pós-produção audiovisual para plantas de logística e iluminação inteligente.',
        },
        {
          id: 'geometric-art',
          title: 'Motion & Identidade Visual',
          category: 'Motion Graphics',
          image: '/images/project_zigzag.jpg',
          hasPlay: false,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'Exploração de padrões geométricos e identidade visual cinética para marcas contemporâneas.',
        },
        {
          id: 'lightis',
          title: 'LightIS - Manual Técnico Blueprint',
          category: 'Motion Design & 3D Blueprint',
          image: '/images/project_lightis.jpg',
          hasPlay: true,
          cols: 'md:col-span-4 lg:col-span-4',
          description: 'Animação esquemática e modelagem blueprint para apresentação técnica de iluminação LED.',
        },
        {
          id: 'sombras-da-guerra',
          title: 'Sombras da Guerra',
          category: 'Stop Motion / Curta Premiado Internacionalmente',
          image: '/images/project_sombras.jpg',
          hasPlay: true,
          hasAwards: true,
          cols: 'md:col-span-8 lg:col-span-8',
          description: 'Curta metragem multipremiado em festivais internacionais. Direção audiovisual e produção de arte.',
        },
        {
          id: 'spotlight',
          title: 'Estudo de Iluminação & Atmosfera',
          category: 'Direção de Fotografia',
          image: '/images/project_spotlight.jpg',
          hasPlay: false,
          cols: 'md:col-span-6 lg:col-span-6',
          description: 'Composição de luz e sombra minimalista explorando o foco e textura em ambiente escuro.',
        },
        {
          id: 'city-night',
          title: 'Sua ideia, nossa luz - Campanha Noturna',
          category: 'Comercial & Fotografia Noturna',
          image: '/images/project_city_night.jpg',
          hasPlay: true,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'Campanha publicitária urbana capturando luzes arquitetônicas da metrópole.',
        },
        {
          id: 'ribbed-lamp',
          title: 'Design de Produto & Detalhe Arquitetural',
          category: 'Macro Fotografia & 3D',
          image: '/images/project_ribbed_lamp.jpg',
          hasPlay: false,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'Close-up de alta precisão destacando curvas e materiais de luminárias acústicas.',
        },
      ],
    },
    contact: {
      heading: 'CONTATO',
      form: {
        name: 'Nome',
        email: 'E-mail',
        message: 'Mensagem',
        button: 'Contact Us',
        successMessage: 'Obrigado! Sua mensagem foi enviada com sucesso.',
      },
      socials: {
        linkedin: 'https://linkedin.com/in/camila-ferreira',
        whatsapp: 'https://wa.me/5500000000000',
        email: 'mailto:contato@camilaferreira.art',
      },
    },
  },
  en: {
    lang: 'en',
    hero: {
      tagline: 'THE INTERSECTION OF DESIGN, ART, AND TECHNOLOGY.',
      name: 'CAMILA FERREIRA',
      title: 'AUDIOVISUAL PRODUCER',
      description: 'Creating visual experiences for a digital world. Unleashing your project’s full potential.',
    },
    about: {
      heading: 'ABOUT',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum purus eu cursus fermentum. Sed lacinia purus eget ullamcorper faucibus. Phasellus pharetra gravida enim at maximus. Cras consectetur luctus egestas. Curabitur interdum nisi eu pharetra bibendum. Nunc fermentum luctus ultricies. Aliquam dui eros, congue id lobortis a, iaculis non neque. Quisque eget placerat mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        'Phasellus a congue lacus, et lobortis ante. Donec consequat, massa in hendrerit vehicula, quam nisi luctus magna, in vestibulum nulla sem sed felis. Phasellus vitae leo ullamcorper lacus blandit vulputate. Praesent volutpat suscipit gravida. Aliquam euismod sodales commodo. In tristique nisi id tempor tempus. Integer at nunc et nulla varius vulputate eu in tortor. Vivamus vel arcu non est tincidunt mollis id sit amet ipsum.',
      ],
      stats: [
        { number: '+10', label: 'years of experience' },
        { number: '09', label: 'awards and nominations' },
        { number: '+200', label: 'successful deliveries' },
        { number: '+1M', label: 'total views generated' },
      ],
    },
    projects: {
      heading: 'PROJECTS',
      items: [
        {
          id: 'red-gun',
          title: 'Red Pistol - Animated Short',
          category: '2D Animation & Art Direction',
          image: '/images/project_red_gun.jpg',
          hasPlay: true,
          cols: 'md:col-span-6 lg:col-span-6',
          description: 'Artistic direction and storyboard for stylized action animated short.',
        },
        {
          id: 'lumisense',
          title: 'Lumisense - Corporate Production',
          category: 'Corporate Film & Production',
          image: '/images/project_lumisense.jpg',
          hasPlay: true,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'Audiovisual shooting and post-production for industrial logistics and smart lighting.',
        },
        {
          id: 'geometric-art',
          title: 'Motion & Visual Identity',
          category: 'Motion Graphics',
          image: '/images/project_zigzag.jpg',
          hasPlay: false,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'Geometric patterns and kinetic visual identity for contemporary brands.',
        },
        {
          id: 'lightis',
          title: 'LightIS - Blueprint Schematic',
          category: 'Motion Design & 3D Blueprint',
          image: '/images/project_lightis.jpg',
          hasPlay: true,
          cols: 'md:col-span-4 lg:col-span-4',
          description: 'Schematic animation and blueprint modeling for technical LED lighting showcases.',
        },
        {
          id: 'sombras-da-guerra',
          title: 'Sombras da Guerra',
          category: 'Stop Motion / International Award Winner',
          image: '/images/project_sombras.jpg',
          hasPlay: true,
          hasAwards: true,
          cols: 'md:col-span-8 lg:col-span-8',
          description: 'Multi-award winning short film screened at international festivals.',
        },
        {
          id: 'spotlight',
          title: 'Atmosphere & Light Study',
          category: 'Cinematography',
          image: '/images/project_spotlight.jpg',
          hasPlay: false,
          cols: 'md:col-span-6 lg:col-span-6',
          description: 'Minimalist chiaroscuro light and shadow composition exploring depth and focus.',
        },
        {
          id: 'city-night',
          title: 'Your Idea, Our Light - Night Campaign',
          category: 'Commercial & Night Cinematography',
          image: '/images/project_city_night.jpg',
          hasPlay: true,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'Urban advertising campaign capturing nocturnal architectural luminosity.',
        },
        {
          id: 'ribbed-lamp',
          title: 'Product Design & Architectural Detail',
          category: 'Macro Photography & 3D',
          image: '/images/project_ribbed_lamp.jpg',
          hasPlay: false,
          cols: 'md:col-span-3 lg:col-span-3',
          description: 'High-precision macro photography emphasizing textural contours and acoustic fixtures.',
        },
      ],
    },
    contact: {
      heading: 'CONTACT',
      form: {
        name: 'Name',
        email: 'E-mail',
        message: 'Message',
        button: 'Contact Us',
        successMessage: 'Thank you! Your message has been sent successfully.',
      },
      socials: {
        linkedin: 'https://linkedin.com/in/camila-ferreira',
        whatsapp: 'https://wa.me/5500000000000',
        email: 'mailto:contato@camilaferreira.art',
      },
    },
  },
};
