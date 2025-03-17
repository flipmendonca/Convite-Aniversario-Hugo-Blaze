# Convite de Aniversário do Hugo - 3 Anos

Este é um site de convite para o aniversário de 3 anos do Hugo, desenvolvido com React, Vite e TailwindCSS.

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview
```

## Opções de Deploy

### Vercel (Recomendado)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale a CLI do Vercel:
   ```bash
   npm install -g vercel
   ```
3. Faça login na sua conta:
   ```bash
   vercel login
   ```
4. Deploy:
   ```bash
   npm run deploy:vercel
   # ou simplesmente
   vercel
   ```

### Netlify (Alternativa)

1. Crie uma conta em [netlify.com](https://netlify.com)
2. Instale a CLI do Netlify:
   ```bash
   npm install -g netlify-cli
   ```
3. Faça login na sua conta:
   ```bash
   netlify login
   ```
4. Deploy:
   ```bash
   npm run deploy:netlify
   # ou simplesmente
   netlify deploy --prod
   ```

### GitHub Pages (Alternativa)

1. Faça push do código para um repositório GitHub
2. Ative o GitHub Actions no repositório
3. O workflow `.github/workflows/deploy.yml` fará o deploy automaticamente a cada push para a branch `main`

### Render.com (Alternativa)

1. Crie uma conta em [render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Crie um novo Web Service:
   - Selecione "Static Site"
   - Configure o Build Command: `npm ci && npm run build`
   - Configure o Publish Directory: `dist`
4. Ou use o arquivo `render.yaml` para configuração automática:
   ```bash
   render blueprint apply
   ```

## Configuração do Firebase

Este projeto utiliza o Firebase para armazenar as confirmações de presença e as mensagens do mural. Para configurar o Firebase:

1. Crie uma conta no [Firebase](https://firebase.google.com) se ainda não tiver
2. Crie um novo projeto no Firebase
3. Adicione um aplicativo Web ao seu projeto
4. Copie as credenciais do Firebase
5. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`
6. Preencha as variáveis de ambiente com suas credenciais do Firebase
7. No console do Firebase, ative o Firestore Database e o Storage
8. Configure as regras de segurança do Firestore e do Storage para permitir leitura e escrita
9. Opcionalmente, ative o Firebase Analytics para acompanhar o uso do site

Exemplo de regras para o Firestore:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

Exemplo de regras para o Storage:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

## Firebase Analytics

O projeto está configurado para usar o Firebase Analytics, que permite acompanhar o uso do site. Para ativar o Analytics:

1. No console do Firebase, vá para "Analytics" no menu lateral
2. Siga as instruções para ativar o Analytics
3. As métricas começarão a ser coletadas automaticamente

## Solução de Problemas

Se encontrar problemas com imagens ou recursos não carregando:

1. Verifique se as imagens estão na pasta `public/images/`
2. Certifique-se de que o script de build está copiando as imagens corretamente
3. Para problemas específicos com o Vercel, tente usar o script personalizado `vercel-build.sh`

## Estrutura do Projeto

```
/
├── public/           # Arquivos estáticos (imagens, favicon, etc.)
├── src/              # Código fonte
│   ├── components/   # Componentes React
│   ├── lib/          # Utilitários e configurações
│   ├── app/          # Páginas da aplicação
│   └── main.tsx      # Ponto de entrada
├── scripts/          # Scripts auxiliares
└── vercel.json       # Configuração do Vercel
```

## Características

- Design responsivo para desktop e dispositivos móveis
- Tema personalizado com as cores e elementos do Blaze e as Monster Machines
- Vídeo incorporado do YouTube
- Formulário de confirmação de presença
- Mural de mensagens com upload de fotos
- Mapa de localização integrado
- Analytics para acompanhar o uso do site

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Vite
- Firebase (Firestore, Storage, Analytics)

## Licença

Este projeto é para uso pessoal.