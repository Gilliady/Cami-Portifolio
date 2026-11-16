# Portfólio Camila Ferreira — Astro + Strapi CMS

Site portfólio bilíngue (**PT / EN**) desenvolvido com **Astro (SSR)** + **Tailwind CSS v4** no frontend e **Strapi v5** como Headless CMS no backend.

---

## 1. Rodando Localmente

### Modo Desenvolvimento (com Hot Reload / sem precisar recompilar)
Ideal para editar código em `src/` e ver as alterações na hora:

```bash
docker compose -f docker-compose.dev.yml up -d
```

- **Frontend (Astro Dev)**: [http://localhost:4321](http://localhost:4321)
- **Backend / Painel Strapi**: [http://localhost:1337/admin](http://localhost:1337/admin)

Para ver logs em tempo real ou parar:
```bash
docker compose -f docker-compose.dev.yml logs -f frontend
docker compose -f docker-compose.dev.yml down
```

### Modo Produção (Build Final)
```bash
docker compose up -d --build
```

---

## 2. Como Mexer no Strapi (Guia Rápido)

Acesse o painel administrativo em `/admin` (localmente: `http://localhost:1337/admin`).

> [!IMPORTANT]
> **Sempre clique em `Publish` (Publicar)!**
> No Strapi, clicar apenas em `Save` salva como rascunho (*Draft*). O site só exibe conteúdos **Publicados**.

### A. Idiomas (Português e Inglês)
- No canto superior direito de qualquer tela de edição (**General Info** ou **Project**), use o seletor de idioma (**English (en)** / **Portuguese (pt)**) para editar os textos de cada versão.

### B. Editar Textos, Estatísticas, Contatos e Fotos (`General Info`)
1. No menu lateral esquerdo, vá em **Content Manager → Single Types → General Info**.
2. **Hero**:
   - `heroName`: nome exibido acima do título (`CAMILA FERREIRA`)
   - `heroTitle`: título principal (2 palavras, ex.: `PRODUTORA AUDIOVISUAL` / `AUDIOVISUAL PRODUCER`)
   - `heroTagline` e `heroDescription`: textos auxiliares
   - `heroPortrait`: foto principal da capa
3. **Sobre (`About`)**:
   - `aboutHeading`: título (`SOBRE` / `ABOUT`)
   - `aboutBio`: texto da biografia (separe parágrafos com uma linha em branco)
   - `aboutPortrait`: foto com os ícones Adobe
   - `stats`: lista com `number` (ex.: `+10`, `+200`, `09`, `+1M`) e `label` (ex.: `anos de experiência`)
4. **Contato (`Contact`)**:
   - `contactPortrait`: foto do xadrez
   - `linkedinUrl`, `whatsappUrl`, `contactEmail`: links dos ícones sociais
5. Clique em **Save** e depois em **Publish**.

### C. Gerenciar Projetos e Bento Box (`Project`)
1. Vá em **Content Manager → Collection Types → Project**.
2. Clique em **Create new entry** (ou edite um existente).
3. Campos principais:
   - `title`: título do projeto
   - `category`: subtítulo exibido no card/modal
   - `description`: descrição detalhada exibida no modal ao clicar no card
   - `order`: número inteiro que define a ordem de exibição (`0, 1, 2, ...`). Os 8 primeiros formam o Bento Box da página 1; projetos extras criam paginação automática (`← 1 2 →`).
   - `image`: imagem de capa do card
   - `hasPlay`: ativa o ícone de play centralizado
   - `hasAwards`: exibe o selo de premiação (`Curta Premiado` / `Award Winner`)
   - `videoFile` ou `videoUrl`: vídeo MP4 enviado ao Strapi ou link externo (YouTube/Vimeo)
4. **Filtros do Bento Box (`inAudiovisual`, `inWebdesign`, `inGraphicDesign`)**:
   - Marque **uma ou mais** dessas opções para definir em quais abas do filtro (`AUDIOVISUAL`, `WEBDESIGN`, `GRAPHIC DESIGN`) o projeto aparecerá.
   - Se nenhuma for marcada, o sistema tenta classificar automaticamente pelo texto de `category`.
5. Clique em **Save** e depois em **Publish** (faça isso para `en` e `pt` se quiser o projeto nos dois idiomas).

### D. Permissões Públicas (se subir um banco zerado)
Se o site não estiver puxando dados do Strapi após uma instalação nova:
1. Vá em **Settings → Users & Permissions Plugin → Roles → Public**.
2. Em **General-info**: marque `find`.
3. Em **Project**: marque `find` e `findOne`.
4. Clique em **Save**.

---

## 3. Hospedagem na Hostinger (VPS com Docker)

Como o projeto usa **Astro SSR** + **Strapi (Node.js)**, a forma recomendada na Hostinger é utilizar uma **VPS** (Ubuntu) com **Docker** e **Docker Compose**.

### Passo 1 — Preparar a VPS
Conecte via SSH na VPS da Hostinger e instale o Docker (caso ainda não tenha o template Docker instalado):
```bash
curl -fsSL https://get.docker.com | sh
```

Envie o projeto para a VPS (via `git clone` ou `scp`/SFTP), por exemplo em `/var/www/cami-portfolio`.

### Passo 2 — Configurar Variáveis de Ambiente de Produção
1. **Backend (`./backend/.env`)**:
   Copie `./backend/.env.example` para `./backend/.env` e gere segredos fortes (ex.: com `openssl rand -base64 32`):
   ```env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS="chave1,chave2,chave3,chave4"
   API_TOKEN_SALT=sua_chave_aleatoria
   ADMIN_JWT_SECRET=sua_chave_aleatoria
   TRANSFER_TOKEN_SALT=sua_chave_aleatoria
   JWT_SECRET=sua_chave_aleatoria
   ENCRYPTION_KEY=sua_chave_aleatoria
   ```

2. **Frontend (`./.env` ou no `docker-compose.yml`)**:
   Defina a URL pública do Strapi para que as imagens enviadas pelo CMS (`/uploads/...`) carreguem no navegador dos visitantes:
   ```env
   STRAPI_URL=http://backend:1337
   PUBLIC_STRAPI_URL=https://cms.seudominio.com
   ```
   *(Substitua `cms.seudominio.com` pelo subdomínio apontado para o Strapi).*

   Em `docker-compose.yml`, garanta que `PUBLIC_STRAPI_URL` também esteja repassada no bloco `environment` do serviço `frontend`:
   ```yaml
   environment:
     STRAPI_URL: http://backend:1337
     PUBLIC_STRAPI_URL: https://cms.seudominio.com
     HOST: 0.0.0.0
     PORT: 4321
   ```

### Passo 3 — Subir os Containers em Produção
```bash
cd /var/www/cami-portfolio
docker compose up -d --build
```
Verifique se ambos estão rodando:
```bash
docker ps
```

### Passo 4 — Domínio, Nginx (Proxy Reverso) e SSL Gratuito
1. No painel da **Hostinger (DNS / Zona DNS)**, aponte dois registros **A** para o IP da sua VPS:
   - `@` (ex.: `seudominio.com`) → IP da VPS
   - `cms` (ex.: `cms.seudominio.com`) → IP da VPS

2. Instale o Nginx e o Certbot na VPS:
   ```bash
   sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
   ```

3. Crie o arquivo `/etc/nginx/sites-available/portfolio`:
   ```nginx
   server {
       server_name seudominio.com www.seudominio.com;

       location / {
           proxy_pass http://127.0.0.1:4321;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }

   server {
       server_name cms.seudominio.com;
       client_max_body_size 100M;

       location / {
           proxy_pass http://127.0.0.1:1337;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
   *(O `client_max_body_size 100M;` permite upload de vídeos e imagens maiores no Strapi.)*

4. Ative o site e gere o certificado HTTPS:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d seudominio.com -d www.seudominio.com -d cms.seudominio.com
   ```

### Passo 5 — Backup dos Dados do Strapi
Os dados do banco SQLite e as imagens/vídeos enviados ficam nos volumes Docker `strapi-data` e `strapi-uploads`. Evite rodar `docker compose down -v` em produção, pois a flag `-v` apaga os volumes.
