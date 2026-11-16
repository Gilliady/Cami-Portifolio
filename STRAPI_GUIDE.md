# 🚀 Guia de Integração Astro + Strapi CMS

Este documento explica como o portfólio da **Camila Ferreira** está preparado para gerenciar **textos**, **imagens** e **vídeos** através do **Strapi Headless CMS**.

---

## 🏛️ Como a Integração Funciona

1. **Camada de Cliente e Resiliência (`src/lib/strapi.ts`)**:
   - O Astro tenta buscar o conteúdo do Strapi em build time ou SSR via REST API (`/api/projects` e `/api/general-info`).
   - Se o Strapi estiver rodando, o site consome os dados atualizados em tempo real.
   - Se o Strapi estiver desligado, o site utiliza automaticamente o fallback estático de alta fidelidade em `src/data/translations.ts`. **O site nunca fica fora do ar**.

2. **Resolução de Mídia (Imagens e Vídeos)**:
   - A função `getStrapiMediaUrl()` normaliza URLs relativas enviadas pelo Strapi (`/uploads/...`) ou URLs de CDNs externas (Vimeo, YouTube, Cloudflare Stream, AWS S3).
   - O modal interativo do portfólio suporta tanto **vídeos hospedados diretamente no Strapi (MP4/WebM)** quanto **links de streaming externos**.

---

## 📋 Estrutura dos Tipos de Conteúdo no Strapi

Os esquemas prontos estão disponíveis na pasta `strapi-schemas/`:

### 1. `Project` (Coleção de Projetos)
- **Título** (`title`): Nome da obra.
- **Categoria** (`category`): ex: *Animação 2D*, *Vídeo Institucional*, *Stop Motion*.
- **Descrição** (`description`): Sinopse / ficha técnica exibida no modal.
- **Imagem de Capa** (`image`): Upload de imagem PNG/JPG/WebP.
- **Arquivo de Vídeo** (`videoFile`): Upload direto de MP4/WebM reproduzido no modal.
- **URL de Vídeo Externo** (`videoUrl`): Link Vimeo / YouTube opcional.
- **Play Button** (`hasPlay`): Se exibe o botão de reprodução sobreposto.
- **Laurels de Festivais** (`hasAwards`): Se exibe louros de premiação internacional.
- **Ordem** (`order`): Número para ordenar os cards na grade.
- **Internacionalização (i18n)**: Ativada para alternar entre `PT` e `EN`.

### 2. `General Info` (Informações Globais do Site)
- **Hero Tagline** (`heroTagline`): "A INTERSECÇÃO ENTRE DESIGN, ARTE E TECNOLOGIA."
- **Hero Nome** (`heroName`): "CAMILA FERREIRA"
- **Hero Título** (`heroTitle`): "PRODUTORA AUDIOVISUAL"
- **Hero Descrição** (`heroDescription`): Subtítulo do banner principal.
- **Bio Sobre** (`aboutBio`): Parágrafos biográficos da seção Sobre.
- **Métricas** (`stats`): Lista repetível com `number` (ex: `+10`) e `label` (ex: `anos de experiência`).
- **Redes Sociais**: `linkedinUrl`, `whatsappUrl`, `contactEmail`.
- **Internacionalização (i18n)**: Ativada para tradução simultânea.

---

## ⚙️ Configuração das Variáveis de Ambiente

No arquivo `.env` do projeto Astro:

```env
# URL base do Strapi
STRAPI_URL=http://localhost:1337

# Token de Leitura gerado no painel do Strapi (Settings -> API Tokens)
STRAPI_API_TOKEN=seu_token_aqui
```

---

## 🎬 Como Inicializar o Strapi Localmente (Opcional)

Se desejar criar um servidor Strapi local do zero:

```bash
# Criar projeto Strapi com versão estável (em pasta separada, ex: cms)
npx create-strapi-app@latest cms --quickstart --no-run

# Entrar na pasta e auditar pacotes
cd cms
npm audit

# Iniciar o painel do Strapi
npm run develop
```

Depois de criar o usuário administrador no Strapi:
1. Vá em **Settings > Users & Permissions plugin > Roles > Public**.
2. Habilite as permissões `find` e `findOne` para `Project` e `General-info`.
3. Pronto! O Astro consumirá automaticamente todos os textos, fotos e vídeos cadastrados.
