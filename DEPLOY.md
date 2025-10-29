# 🚀 Guia Completo de Deploy - Catalise NR-1

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Conta no [Vercel](https://vercel.com)
- ✅ Node.js 18+ instalado
- ✅ Git configurado
- ✅ Conta no GitHub (opcional, mas recomendado)

## 🔧 Configuração Local

### 1. Clone o Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/catalise-nr1.git
cd catalise-nr1

# Ou se você criou os arquivos localmente, navegue até a pasta
cd catalise-nr1
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NEXT_PUBLIC_APP_NAME=Catalise
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Opcional: Google Analytics
```

### 4. Teste Localmente

```bash
# Execute o projeto em modo desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 🌐 Deploy no Vercel

### Opção 1: Deploy via CLI (Recomendado)

```bash
# Instale a CLI do Vercel globalmente
npm i -g vercel

# Faça login na sua conta
vercel login

# Deploy para produção
vercel --prod

# Siga as instruções na tela:
# - Link to existing project? N
# - Project name: catalise-nr1
# - Directory: ./
# - Override settings? N
```

### Opção 2: Deploy via GitHub (Automático)

1. **Conecte seu repositório GitHub ao Vercel:**
   - Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
   - Clique em "New Project"
   - Conecte sua conta GitHub
   - Selecione o repositório `catalise-nr1`

2. **Configure o projeto:**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Configure variáveis de ambiente:**
   - Vá em Settings > Environment Variables
   - Adicione as variáveis do `.env.local`

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar

### Opção 3: Deploy via Interface Web

1. **Acesse o Vercel Dashboard**
2. **Clique em "New Project"**
3. **Importe do Git:**
   - Conecte GitHub/GitLab/Bitbucket
   - Selecione o repositório
4. **Configure:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Deploy**

## ⚙️ Configurações Pós-Deploy

### 1. Configurar Domínio Personalizado (Opcional)

```bash
# Via CLI
vercel domains add seu-dominio.com

# Via Dashboard
# Settings > Domains > Add Domain
```

### 2. Configurar Analytics

```bash
# Adicione Google Analytics
# Settings > Environment Variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Configurar Webhooks (Opcional)

```bash
# Para integração com sistemas externos
# Settings > Git > Deploy Hooks
```

## 🔍 Verificação do Deploy

### 1. Teste as Funcionalidades

- ✅ Landing page carrega corretamente
- ✅ Formulário multi-etapas funciona
- ✅ Cálculo de pontuação está correto
- ✅ Página de resultados exibe gráficos
- ✅ Dashboard admin aceita login
- ✅ Geração de PDF funciona
- ✅ Páginas de recursos e privacidade carregam

### 2. Teste de Performance

```bash
# Instale o Lighthouse CLI
npm i -g lighthouse

# Teste de performance
lighthouse https://seu-dominio.vercel.app --output html --output-path ./lighthouse-report.html
```

### 3. Teste de Acessibilidade

```bash
# Teste com axe-core
npm i -g @axe-core/cli

# Execute teste de acessibilidade
axe https://seu-dominio.vercel.app
```

## 🛠️ Comandos Úteis

### Desenvolvimento

```bash
# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção localmente
npm start

# Lint do código
npm run lint

# Lint com correção automática
npm run lint -- --fix
```

### Deploy

```bash
# Deploy para preview
vercel

# Deploy para produção
vercel --prod

# Ver logs de deploy
vercel logs

# Listar projetos
vercel ls

# Remover projeto
vercel rm catalise-nr1
```

## 🔧 Troubleshooting

### Problemas Comuns

**1. Erro de Build**
```bash
# Limpe o cache
rm -rf .next
npm run build
```

**2. Erro de Dependências**
```bash
# Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

**3. Erro de Variáveis de Ambiente**
```bash
# Verifique se as variáveis estão configuradas
vercel env ls
```

**4. Erro de Domínio**
```bash
# Verifique configuração DNS
vercel domains ls
```

### Logs e Debug

```bash
# Ver logs em tempo real
vercel logs --follow

# Ver logs de um deploy específico
vercel logs [deployment-url]
```

## 📊 Monitoramento

### 1. Analytics do Vercel

- Acesse o dashboard do Vercel
- Monitore métricas de performance
- Acompanhe erros e logs

### 2. Google Analytics (Opcional)

```javascript
// Adicione no layout.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaMeasurementId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  )
}
```

## 🔐 Segurança

### 1. Headers de Segurança

O Vercel já inclui headers básicos de segurança. Para customizar:

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

### 2. Rate Limiting

```javascript
// Para APIs futuras
// lib/rate-limit.js
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})
```

## 📈 Otimizações

### 1. Performance

```bash
# Analise de bundle
npm run build
npm run analyze  # Se configurado
```

### 2. SEO

```javascript
// app/layout.tsx
export const metadata = {
  title: 'Catalise - Diagnóstico NR-1',
  description: 'Ferramenta de diagnóstico para saúde mental corporativa',
  openGraph: {
    title: 'Catalise - Diagnóstico NR-1',
    description: 'Diagnóstico ágil para identificar riscos psicossociais',
    url: 'https://seu-dominio.vercel.app',
    siteName: 'Catalise',
    images: [
      {
        url: 'https://seu-dominio.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}
```

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. **Configure monitoramento** (Sentry, LogRocket)
2. **Implemente CI/CD** com GitHub Actions
3. **Configure backup** de dados
4. **Adicione testes automatizados**
5. **Configure CDN** para assets estáticos
6. **Implemente cache** para melhor performance

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs** do Vercel
2. **Consulte a documentação** do Next.js
3. **Acesse o Discord** do Vercel
4. **Abra uma issue** no GitHub

---

**🎉 Parabéns! Sua aplicação Catalise está no ar!**

Acesse: `https://seu-dominio.vercel.app`
