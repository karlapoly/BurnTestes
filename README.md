# 🔥 Burn In - Diagnóstico NR-1

## 📋 Sobre o Projeto

O **Burn In** é uma ferramenta completa de diagnóstico empresarial para identificação de riscos psicossociais e cumprimento da Norma Regulamentadora NR-1. A solução oferece uma análise abrangente do ambiente de trabalho através de questionários estruturados e geração de relatórios automáticos.

## ✨ Funcionalidades Implementadas

### 🏠 Landing Page
- Hero section com texto exato sobre NR-1
- Seção "Por que isso importa?" destacando a obrigação legal
- Design responsivo e moderno
- Meta tags para SEO

### 📋 Formulário Multi-etapas
- **Etapa 1**: Informações básicas opcionais (nome, cargo, setor)
- **Etapa 2**: Questionário completo com 22 perguntas organizadas em 5 categorias
- **Etapa 3**: Resumo e confirmação antes do envio
- Navegação intuitiva com barra de progresso
- Escala Likert de 1 a 5 (Nunca → Sempre)

### 📊 Sistema de Pontuação
- Cálculo automático por categoria e geral
- Classificação de risco com cores:
  - 🟢 **≤ 2,5**: Práticas Saudáveis (Verde)
  - 🟡 **2,6 a 3,5**: Pontos de Atenção (Amarelo)
  - 🔴 **≥ 3,6**: Alto Risco de Burnout (Vermelho)

### 📈 Página de Resultados
- Visualização da pontuação geral
- Análise detalhada por categoria
- Recomendações personalizadas baseadas nas áreas com menor pontuação
- Download do relatório em JSON
- Opção de envio ao RH

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo com animações
- **JavaScript**: Lógica de avaliação e cálculos
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter + Lora

## 🎨 Design System

- Paleta de cores profissional
- Tipografia moderna e legível
- Animações suaves
- Design responsivo mobile-first
- Acessibilidade básica

## 📁 Estrutura do Projeto

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Documentação
└── .gitignore          # Arquivos ignorados pelo Git
```

## 🚀 Deploy no GitHub Pages

### Passos para Deploy

1. **Criar repositório no GitHub:**
   - Vá para github.com
   - Clique em "New repository"
   - Nome: `burnin-nr1` (ou o nome que preferir)

2. **Upload dos arquivos:**
   - Faça upload de todos os arquivos criados
   - Ou use Git para fazer push

3. **Ativar GitHub Pages:**
   - Vá em Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Salve

4. **Acessar o site:**
   - O link será: `https://seu-usuario.github.io/burnin-nr1/`

## 📊 Dados de Demonstração

O sistema inclui:
- 22 perguntas organizadas em 5 categorias
- Sistema de pontuação automático
- Recomendações baseadas nas áreas com menor pontuação
- Relatório completo em JSON

## 🔧 Como Usar

1. **Acesse o site** através do GitHub Pages
2. **Clique em "Iniciar Diagnóstico"**
3. **Preencha as informações básicas** (opcional)
4. **Responda todas as 22 perguntas** usando a escala Likert
5. **Revise o resumo** antes de finalizar
6. **Visualize o relatório** completo com análise e recomendações
7. **Baixe o relatório** para análise posterior

## 📈 Interpretação dos Resultados

- **Média ≤ 2,5**: Práticas saudáveis
- **2,6 a 3,5**: Pontos de atenção (áreas que merecem cuidado)
- **≥ 3,6**: Risco alto de estresse e burnout — requer plano de ação

## 🔐 Privacidade e Conformidade

- **LGPD**: Política de privacidade incluída
- **Anonimato**: Informações pessoais são opcionais
- **Retenção**: Dados mantidos por 12 meses
- **Exclusão**: Possibilidade de exclusão a qualquer momento

## 📞 Suporte

Para dúvidas ou suporte:
- E-mail: contato@burnin.com.br
- Telefone: (11) 99999-9999

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

---

**Desenvolvido com ❤️ para melhorar o ambiente de trabalho das empresas e cumprir a NR-1**

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. **Configure domínio personalizado** (opcional)
2. **Adicione Google Analytics** para monitoramento
3. **Implemente backend** para salvar respostas
4. **Adicione dashboard admin** para gestores
5. **Configure backup** de dados
6. **Implemente testes automatizados**

---

**🎉 Sua aplicação Burn In está pronta para uso!**

Acesse: `https://seu-usuario.github.io/burnin-nr1/`