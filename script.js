// Dados das perguntas organizadas por categoria
const questions = [
    {
        category: "Organização e Carga de Trabalho",
        questions: [
            "Consigo realizar todas as minhas tarefas dentro do horário de trabalho.",
            "O volume de trabalho permite que eu mantenha meu descanso e minha vida pessoal equilibrados.",
            "As metas da empresa são realistas e possíveis de atingir.",
            "Recebo apoio quando enfrento dificuldades nas tarefas.",
            "Meu horário de trabalho é respeitado, sem necessidade de horas extras frequentes.",
            "O ambiente físico favorece minha concentração e conforto."
        ]
    },
    {
        category: "Comunicação e Clima Organizacional",
        questions: [
            "Recebo informações claras sobre o que é esperado do meu trabalho.",
            "Tenho liberdade para expressar dúvidas ou opiniões.",
            "Sinto que posso contar com meu gestor quando tenho dificuldades.",
            "Há um canal seguro para dar sugestões ou relatar problemas.",
            "Mudanças e decisões são comunicadas com antecedência."
        ]
    },
    {
        category: "Reconhecimento e Valorização",
        questions: [
            "Meu esforço é reconhecido pela liderança.",
            "Minhas ideias e contribuições são valorizadas.",
            "O feedback que recebo é construtivo e respeitoso.",
            "Os critérios para reconhecimento ou promoção são justos e claros."
        ]
    },
    {
        category: "Autonomia e Participação",
        questions: [
            "Tenho liberdade para propor melhorias no meu trabalho.",
            "Posso ajustar minha forma de trabalhar (horários ou métodos) quando necessário.",
            "Sou envolvido(a) em decisões que afetam diretamente minha rotina."
        ]
    },
    {
        category: "Saúde Mental e Suporte",
        questions: [
            "Sinto prazer e motivação ao realizar minhas atividades.",
            "Tenho energia e bem-estar emocional para lidar com as demandas do trabalho.",
            "A empresa promove ações de cuidado e bem-estar (pausas, integração, apoio).",
            "Consigo equilibrar bem o trabalho e a vida pessoal."
        ]
    }
];

// Opções da escala Likert
const likertOptions = [
    { value: 1, label: "Nunca", emoji: "1️⃣" },
    { value: 2, label: "Raramente", emoji: "2️⃣" },
    { value: 3, label: "Às vezes", emoji: "3️⃣" },
    { value: 4, label: "Frequentemente", emoji: "4️⃣" },
    { value: 5, label: "Sempre", emoji: "5️⃣" }
];

// Variáveis globais
let currentStep = 0;
let currentQuestionIndex = 0;
let answers = {};
let totalQuestions = 0;
let currentSection = 'home';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Calcular total de perguntas
    totalQuestions = questions.reduce((total, category) => total + category.questions.length, 0);
    
    // Inicializar respostas
    for (let i = 0; i < totalQuestions; i++) {
        answers[i] = null;
    }
    
    // Configurar navegação
    setupNavigation();
});

// Configurar navegação entre seções
function setupNavigation() {
    // Navegação do menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showSection(target);
        });
    });
    
    // Botões CTA
    document.querySelectorAll('a[href="#diagnostico"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('diagnostico');
        });
    });
}

// Mostrar seção específica
function showSection(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar seção atual
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Se for a seção de diagnóstico, iniciar o processo
        if (sectionId === 'diagnostico') {
            startEvaluation();
        }
    }
}

// Função para iniciar a avaliação
function startEvaluation() {
    // Mostrar apenas o formulário dentro da seção de diagnóstico
    const diagnosticoSection = document.getElementById('diagnostico-section');
    
    if (!diagnosticoSection) {
        alert('Erro: Seção de diagnóstico não encontrada!');
        return;
    }
    
    diagnosticoSection.innerHTML = `
        <div class="form-container">
            <div class="form-header">
                <h2>🧭 Questionário de Bem-Estar no Trabalho</h2>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <p class="progress-text" id="progress-text">Etapa 1 de 3</p>
            </div>

            <!-- Informações Básicas -->
            <div id="basic-info-step" class="form-step">
                <h3>Informações Básicas</h3>
                <p class="step-description">Selecione o tipo de empresa (obrigatório) e outras informações opcionais</p>
                
                <div class="form-group">
                    <label for="empresa">Tipo de Empresa *</label>
                    <select id="empresa" name="empresa" required onchange="updateNavigationButtons()">
                        <option value="">Selecione o tipo de empresa</option>
                        <option value="cartorio">Cartório</option>
                        <option value="credito-consignado">Crédito Consignado</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="nome">Nome (opcional)</label>
                    <input type="text" id="nome" name="nome" placeholder="Seu nome completo">
                </div>
                
                <div class="form-group">
                    <label for="cargo">Cargo (opcional)</label>
                    <input type="text" id="cargo" name="cargo" placeholder="Seu cargo na empresa">
                </div>
                
                <div class="form-group">
                    <label for="setor">Setor (opcional)</label>
                    <select id="setor" name="setor">
                        <option value="">Selecione o setor</option>
                        <option value="administrativo">Administrativo</option>
                        <option value="comercial">Comercial</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="marketing">Marketing</option>
                        <option value="operacional">Operacional</option>
                        <option value="recursos-humanos">Recursos Humanos</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="vendas">Vendas</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                
                <div class="privacy-notice">
                    <p><strong>Importante:</strong> A seleção do tipo de empresa é obrigatória para organizar os resultados. As demais informações são opcionais e você pode responder o questionário de forma anônima se preferir.</p>
                </div>
            </div>

            <!-- Questionário -->
            <div id="questionnaire-step" class="form-step" style="display: none;">
                <div id="question-container">
                    <!-- Perguntas serão inseridas dinamicamente aqui -->
                </div>
            </div>

            <!-- Resumo -->
            <div id="summary-step" class="form-step" style="display: none;">
                <h3>Resumo do Diagnóstico</h3>
                <p>Revise as informações antes de finalizar</p>
                
                <div id="summary-content">
                    <!-- Resumo será inserido dinamicamente aqui -->
                </div>
                
                <div class="consent-section">
                    <h4>Consentimento para Processamento de Dados</h4>
                    <p>Ao finalizar este diagnóstico, você concorda que os dados fornecidos sejam processados para gerar o relatório de avaliação conforme nossa Política de Privacidade. Os dados são mantidos por 12 meses e podem ser excluídos a qualquer momento.</p>
                </div>
            </div>

            <div class="form-navigation">
                <button type="button" class="btn btn-secondary" id="prev-btn" onclick="previousStep()" style="display: none;">
                    <i class="fas fa-arrow-left"></i>
                    Anterior
                </button>
                <button type="button" class="btn btn-primary" id="next-btn" onclick="nextStep()">
                    Próxima
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button type="button" class="btn btn-success" id="submit-btn" onclick="submitForm()" style="display: none;">
                    <i class="fas fa-check"></i>
                    Finalizar Diagnóstico
                </button>
            </div>
        </div>
    `;
    
    showStep(0);
}

// Função para mostrar uma etapa específica
function showStep(step) {
    currentStep = step;
    
    // Esconder todas as etapas
    document.getElementById('basic-info-step').style.display = 'none';
    document.getElementById('questionnaire-step').style.display = 'none';
    document.getElementById('summary-step').style.display = 'none';
    
    // Mostrar etapa atual
    if (step === 0) {
        document.getElementById('basic-info-step').style.display = 'block';
    } else if (step === 1) {
        document.getElementById('questionnaire-step').style.display = 'block';
        showQuestion(0);
    } else if (step === 2) {
        document.getElementById('summary-step').style.display = 'block';
        showSummary();
    }
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para mostrar uma pergunta específica
function showQuestion(index) {
    const container = document.getElementById('question-container');
    const questionData = getQuestionData(index);
    
    if (!questionData) return;
    
    // Verificar se mudou de categoria
    const previousQuestionData = getQuestionData(index - 1);
    if (previousQuestionData && previousQuestionData.category !== questionData.category) {
        showCategoryTransition(questionData.category);
        return;
    }
    
    container.innerHTML = `
        <div class="question">
            <h3>${questionData.question}</h3>
            <div class="options">
                ${likertOptions.map(option => `
                    <div class="option" onclick="selectAnswer(${index}, ${option.value})">
                        <input type="radio" name="question_${index}" value="${option.value}" 
                               ${answers[index] === option.value ? 'checked' : ''}>
                        <label>
                            <span class="emoji">${option.emoji}</span>
                            <span class="text">${option.label}</span>
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para mostrar transição entre categorias
function showCategoryTransition(categoryName) {
    const container = document.getElementById('question-container');
    const description = getCategoryDescription(categoryName);
    
    container.innerHTML = `
        <div class="category-transition">
            <div class="transition-circle">
                <div class="circle-content">
                    <div class="circle-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="circle-text">
                        <h3>Próxima Categoria</h3>
                        <h2>${categoryName}</h2>
                    </div>
                </div>
            </div>
            <div class="transition-description">
                <p>${description}</p>
            </div>
            <div class="transition-actions">
                <button class="btn btn-primary btn-large" onclick="continueToQuestions()">
                    <i class="fas fa-play"></i>
                    Continuar
                </button>
            </div>
        </div>
    `;
    
    // Esconder botões de navegação padrão durante a transição
    hideNavigationButtons();
}

// Função para continuar para as perguntas após a transição
function continueToQuestions() {
    // Mostrar botões de navegação novamente
    showNavigationButtons();
    // Mostrar a pergunta atual (sem verificar transição novamente)
    const container = document.getElementById('question-container');
    const questionData = getQuestionData(currentQuestionIndex);
    
    if (!questionData) return;
    
    container.innerHTML = `
        <div class="question">
            <h3>${questionData.question}</h3>
            <div class="options">
                ${likertOptions.map(option => `
                    <div class="option" onclick="selectAnswer(${currentQuestionIndex}, ${option.value})">
                        <input type="radio" name="question_${currentQuestionIndex}" value="${option.value}" 
                               ${answers[currentQuestionIndex] === option.value ? 'checked' : ''}>
                        <label>
                            <span class="emoji">${option.emoji}</span>
                            <span class="text">${option.label}</span>
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para esconder botões de navegação
function hideNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';
}

// Função para mostrar botões de navegação
function showNavigationButtons() {
    updateNavigationButtons();
}

// Função para obter descrição da categoria
function getCategoryDescription(categoryName) {
    const descriptions = {
        "Organização e Carga de Trabalho": "Avalie como está a distribuição de tarefas, metas e ambiente físico de trabalho.",
        "Comunicação e Clima Organizacional": "Analise a qualidade da comunicação e o clima geral da organização.",
        "Reconhecimento e Valorização": "Reflita sobre como suas contribuições são reconhecidas e valorizadas.",
        "Autonomia e Participação": "Considere seu nível de autonomia e participação nas decisões.",
        "Saúde Mental e Suporte": "Avalie seu bem-estar emocional e o suporte oferecido pela empresa."
    };
    
    return descriptions[categoryName] || "Responda às perguntas desta categoria.";
}

// Função para obter dados da pergunta pelo índice
function getQuestionData(index) {
    let currentIndex = 0;
    
    for (let categoryIndex = 0; categoryIndex < questions.length; categoryIndex++) {
        const category = questions[categoryIndex];
        
        for (let questionIndex = 0; questionIndex < category.questions.length; questionIndex++) {
            if (currentIndex === index) {
                return {
                    category: category.category,
                    question: category.questions[questionIndex],
                    categoryIndex: categoryIndex,
                    questionIndex: questionIndex
                };
            }
            currentIndex++;
        }
    }
    
    return null;
}

// Função para selecionar uma opção
function selectAnswer(questionIndex, value) {
    answers[questionIndex] = value;
    
    // Atualizar visual da seleção
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
        const input = option.querySelector('input');
        if (input && input.value == value) {
            option.classList.add('selected');
        }
    });
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para atualizar barra de progresso
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (!progressFill || !progressText) return;
    
    let percentage = 0;
    let text = '';
    
    if (currentStep === 0) {
        percentage = 33;
        text = 'Etapa 1 de 3';
    } else if (currentStep === 1) {
        // Calcular progresso baseado nas perguntas respondidas
        const answeredQuestions = Object.values(answers).filter(answer => answer !== null).length;
        percentage = 33 + (answeredQuestions / totalQuestions) * 33;
        text = `Pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`;
    } else if (currentStep === 2) {
        percentage = 100;
        text = 'Etapa 3 de 3';
    }
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = text;
}

// Função para atualizar botões de navegação
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!prevBtn || !nextBtn || !submitBtn) return;
    
    // Botão anterior
    if (currentStep === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }
    
    // Botão próxima/submit
    if (currentStep === 2) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
    
    // Verificar se pode avançar
    const canProceed = canProceedToNext();
    nextBtn.disabled = !canProceed;
    submitBtn.disabled = !canProceed;
}

// Função para verificar se pode avançar
function canProceedToNext() {
    if (currentStep === 0) {
        const empresaElement = document.getElementById('empresa');
        const empresa = empresaElement ? empresaElement.value : '';
        return empresa !== ''; // Tipo de empresa é obrigatório
    } else if (currentStep === 1) {
        return answers[currentQuestionIndex] !== null;
    } else if (currentStep === 2) {
        return true; // Resumo sempre pode ser finalizado
    }
    return true;
}

// Função para próxima etapa
function nextStep() {
    if (currentStep < 2) {
        if (currentStep === 1) {
            // Se estamos no questionário, avançar para próxima pergunta
            if (currentQuestionIndex < totalQuestions - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
                updateProgress();
            } else {
                // Se terminamos todas as perguntas, ir para resumo
                showStep(2);
            }
        } else {
            showStep(currentStep + 1);
        }
    }
}

// Função para etapa anterior
function previousStep() {
    if (currentStep > 0) {
        if (currentStep === 1) {
            // Se estamos no questionário, voltar para pergunta anterior
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(currentQuestionIndex);
                updateProgress();
            } else {
                // Se estamos na primeira pergunta, voltar para informações básicas
                showStep(0);
            }
        } else {
            showStep(currentStep - 1);
        }
    }
}

// Função para mostrar resumo
function showSummary() {
    const summaryContent = document.getElementById('summary-content');
    
    // Coletar informações básicas
    const empresa = document.getElementById('empresa').value;
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const setor = document.getElementById('setor').value;
    
    let summaryHTML = '';
    
    // Informações básicas
    summaryHTML += `
        <div class="summary-section">
            <h4>Informações da Empresa</h4>
            <p><strong>Tipo de Empresa:</strong> ${empresa === 'credito-consignado' ? 'Crédito Consignado' : empresa === 'cartorio' ? 'Cartório' : 'Não selecionado'}</p>
            <p><strong>Nome:</strong> ${nome || 'Não informado'}</p>
            <p><strong>Cargo:</strong> ${cargo || 'Não informado'}</p>
            <p><strong>Setor:</strong> ${setor || 'Não informado'}</p>
        </div>
    `;
    
    // Resumo das respostas
    const answeredQuestions = Object.values(answers).filter(answer => answer !== null).length;
    summaryHTML += `
        <div class="summary-section">
            <h4>Questionário</h4>
            <p><strong>${answeredQuestions}</strong> de <strong>${totalQuestions}</strong> perguntas respondidas</p>
        </div>
    `;
    
    summaryContent.innerHTML = summaryHTML;
}

// Função para submeter o formulário
async function submitForm() {
    // Verificar se todas as perguntas foram respondidas
    const unansweredQuestions = Object.values(answers).filter(answer => answer === null);
    
    if (unansweredQuestions.length > 0) {
        alert('Por favor, responda todas as perguntas antes de finalizar o diagnóstico.');
        return;
    }
    
    // Verificar se empresa foi preenchida
    const empresa = document.getElementById('empresa').value.trim();
    if (!empresa) {
        alert('Por favor, informe o tipo de empresa.');
        return;
    }
    
    // Enviar dados para Google Sheets
    const success = await sendToGoogleSheets();
    
    if (!success) {
        // Se o envio falhou, perguntar se deseja continuar mesmo assim
        const continueAnyway = confirm('Não foi possível enviar os dados para a planilha. Deseja continuar mesmo assim?');
        if (!continueAnyway) {
            return;
        }
    }
    
    // Calcular resultados
    const results = calculateResults();
    
    // Salvar dados no GitHub
    saveDiagnosticData(results);
    
    // Mostrar resultados
    showResults(results);
}

// Função para enviar dados para Google Sheets
async function sendToGoogleSheets() {
    try {
        // Preparar dados para envio
        const formData = {
            // Informações básicas
            empresa: document.getElementById('empresa').value,
            nome: document.getElementById('nome').value || '',
            cargo: document.getElementById('cargo').value || '',
            setor: document.getElementById('setor').value || '',
            // Respostas Q1 até Q22
            Q1: answers[0] || '',
            Q2: answers[1] || '',
            Q3: answers[2] || '',
            Q4: answers[3] || '',
            Q5: answers[4] || '',
            Q6: answers[5] || '',
            Q7: answers[6] || '',
            Q8: answers[7] || '',
            Q9: answers[8] || '',
            Q10: answers[9] || '',
            Q11: answers[10] || '',
            Q12: answers[11] || '',
            Q13: answers[12] || '',
            Q14: answers[13] || '',
            Q15: answers[14] || '',
            Q16: answers[15] || '',
            Q17: answers[16] || '',
            Q18: answers[17] || '',
            Q19: answers[18] || '',
            Q20: answers[19] || '',
            Q21: answers[20] || '',
            Q22: answers[21] || '',
            // Timestamp
            timestamp: new Date().toISOString()
        };
        
        // URL do Google Apps Script Web App
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbzLClFbFWOGGl1GWDokGRhdvyajvMT-0L2yKIduuR5rxvu3MPaZHB1UQcSXCbJcbFlo/exec';
        
        // Converter dados para FormData (formato mais compatível com Google Apps Script)
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        
        // Enviar dados via fetch
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requer no-cors para web apps
            body: formDataToSend
        });
        
        // Com no-cors, não podemos verificar o status da resposta
        // Mas podemos assumir sucesso se não houver erro
        console.log('Dados enviados para Google Sheets:', formData);
        
        // Exibir mensagem de sucesso
        alert('✅ Respostas enviadas com sucesso para a planilha!');
        
        // Limpar campos básicos após envio bem-sucedido
        clearBasicFields();
        
        return true;
        
    } catch (error) {
        console.error('Erro ao enviar dados para Google Sheets:', error);
        alert('Erro ao enviar dados. Verifique sua conexão e tente novamente.');
        return false;
    }
}

// Função para limpar campos básicos após envio
function clearBasicFields() {
    // Limpar apenas os campos básicos (mantendo as respostas para mostrar resultados)
    const empresaField = document.getElementById('empresa');
    const nomeField = document.getElementById('nome');
    const cargoField = document.getElementById('cargo');
    const setorField = document.getElementById('setor');
    
    if (empresaField) empresaField.value = '';
    if (nomeField) nomeField.value = '';
    if (cargoField) cargoField.value = '';
    if (setorField) setorField.value = '';
}

// Função para limpar/resetar o formulário completamente
function resetForm() {
    // Limpar respostas
    answers = {};
    for (let i = 0; i < totalQuestions; i++) {
        answers[i] = null;
    }
    
    // Resetar índices
    currentStep = 0;
    currentQuestionIndex = 0;
    
    // Limpar campos do formulário
    clearBasicFields();
    
    // Limpar campos de rádio (caso o formulário ainda esteja visível)
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

// Função para salvar dados do diagnóstico localmente
function saveDiagnosticData(results) {
    try {
        // Criar novo diagnóstico
        const newDiagnostic = {
            id: Date.now(), // ID único baseado em timestamp
            data: new Date().toLocaleDateString('pt-BR'),
            hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            timestamp: new Date().toISOString(),
            empresa: document.getElementById('empresa').value,
            tipoEmpresa: document.getElementById('empresa').value === 'credito-consignado' ? 'Crédito Consignado' : document.getElementById('empresa').value === 'cartorio' ? 'Cartório' : 'Não selecionado',
            pontuacaoGeral: results.overallScore,
            nivelRisco: results.riskLevel,
            nivelRiscoLabel: results.riskLabel,
            porcentagemRisco: results.riskPercentage,
            pontuacoesPorCategoria: results.categoryAverages,
            recomendacoes: results.recommendations,
            respostasDetalhadas: answers,
            informacoes: {
                nome: document.getElementById('nome').value || '',
                cargo: document.getElementById('cargo').value || '',
                setor: document.getElementById('setor').value || ''
            }
        };
        
        // Salvar no localStorage
        const existingData = JSON.parse(localStorage.getItem('diagnosticos') || '[]');
        existingData.push(newDiagnostic);
        localStorage.setItem('diagnosticos', JSON.stringify(existingData));
        
        console.log('Diagnóstico salvo localmente com sucesso!');
        
    } catch (error) {
        console.error('Erro ao salvar diagnóstico:', error);
        alert('Erro ao salvar dados. Tente novamente.');
    }
}


// Função para calcular resultados
function calculateResults() {
    const results = {
        overallScore: 0,
        categoryScores: {},
        categoryAverages: {},
        riskLevel: '',
        recommendations: []
    };
    
    let totalScore = 0;
    let questionCount = 0;
    
    // Calcular pontuação por categoria
    let currentIndex = 0;
    
    questions.forEach((category, categoryIndex) => {
        let categoryScore = 0;
        let categoryQuestionCount = 0;
        
        category.questions.forEach((question, questionIndex) => {
            const answer = answers[currentIndex];
            categoryScore += answer;
            totalScore += answer;
            questionCount++;
            categoryQuestionCount++;
            currentIndex++;
        });
        
        results.categoryScores[category.category] = categoryScore;
        results.categoryAverages[category.category] = categoryScore / categoryQuestionCount;
    });
    
    // Calcular média geral
    results.overallScore = totalScore / questionCount;
    
    // Determinar nível de risco conforme nova escala
    if (results.overallScore >= 4.0) {
        results.riskLevel = 'low';
        results.riskLabel = 'Clima saudável e equilibrado';
        results.riskPercentage = Math.round((results.overallScore / 5) * 100);
    } else if (results.overallScore >= 3.0) {
        results.riskLevel = 'medium';
        results.riskLabel = 'Pontos de atenção — fatores de estresse presentes';
        results.riskPercentage = Math.round((results.overallScore / 5) * 100);
    } else {
        results.riskLevel = 'high';
        results.riskLabel = 'Risco alto de estresse e burnout — requer plano de ação';
        results.riskPercentage = Math.round((results.overallScore / 5) * 100);
    }
    
    // Gerar recomendações baseadas nas categorias com menor pontuação
    results.recommendations = generateRecommendations(results.categoryAverages);
    
    return results;
}

// Função para gerar recomendações
function generateRecommendations(categoryAverages) {
    const recommendations = [];
    
    // Ordenar categorias por pontuação (menor primeiro)
    const sortedCategories = Object.entries(categoryAverages)
        .sort(([,a], [,b]) => a - b);
    
    // Gerar recomendações para as 3 categorias com menor pontuação
    sortedCategories.slice(0, 3).forEach(([category, average]) => {
        if (average < 3.0) {
            recommendations.push(getRecommendationForCategory(category, average));
        }
    });
    
    return recommendations;
}

// Função para obter recomendação específica por categoria
function getRecommendationForCategory(category, average) {
    const recommendations = {
        "Organização e Carga de Trabalho": "Revisar a distribuição de tarefas, estabelecer metas realistas, respeitar horários de trabalho e criar ambiente físico adequado para concentração e conforto.",
        "Comunicação e Clima Organizacional": "Estabelecer canais claros de comunicação, promover transparência nas decisões, criar ambiente seguro para expressão de opiniões e comunicar mudanças com antecedência.",
        "Reconhecimento e Valorização": "Implementar sistema de reconhecimento regular, valorizar ideias e contribuições, fornecer feedback construtivo e estabelecer critérios claros para promoções.",
        "Autonomia e Participação": "Delegar mais responsabilidades, permitir flexibilidade nos métodos de trabalho, envolver colaboradores em decisões que afetam sua rotina e promover inovação.",
        "Saúde Mental e Suporte": "Implementar programas de bem-estar corporativo, oferecer suporte psicológico, promover ações de cuidado e integração, e facilitar o equilíbrio entre trabalho e vida pessoal."
    };
    
    return recommendations[category] || "Focar em melhorias específicas nesta área para aumentar a satisfação e bem-estar dos colaboradores.";
}

// Função para mostrar resultados
function showResults(results) {
    const diagnosticoSection = document.getElementById('diagnostico-section');
    diagnosticoSection.innerHTML = `
        <div class="results-container">
            <div class="results-header">
                <h2>Resultado do Diagnóstico</h2>
                <p>Análise completa da saúde mental corporativa</p>
            </div>

            <div class="score-display">
                <div class="diagnosis-image">
                    <img src="Imagens/${getDiagnosisImage(results.riskLevel)}" alt="${results.riskLabel}" class="diagnosis-img">
                </div>
                <div class="score-info">
                    <h3 id="risk-level">${results.riskLabel}</h3>
                    <p id="risk-description">${getRiskDescription(results.riskLevel, results.overallScore)}</p>
                </div>
            </div>

            <div class="result-summary" id="result-summary">
                <h3>Diagnóstico Geral</h3>
                <p><strong>Pontuação Média:</strong> ${results.overallScore.toFixed(2)}/5.0</p>
                <p><strong>Nível de Risco:</strong> ${results.riskLabel}</p>
                
                <h4 style="margin-top: 20px;">Análise por Categoria:</h4>
                <div style="margin-top: 15px;">
                    ${Object.entries(results.categoryAverages).map(([category, average]) => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding: 8px; background: white; border-radius: 8px;">
                            <span><strong>${category}:</strong></span>
                            <span>${average.toFixed(2)}/5.0</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recommendations" id="recommendations">
                <h3>Recomendações Prioritárias</h3>
                ${results.recommendations.map(rec => `
                    <div class="recommendation-item">
                        <i class="fas fa-lightbulb"></i>
                        <div>
                            <strong>${rec}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" onclick="downloadReport()">
                    <i class="fas fa-download"></i>
                    Baixar Relatório
                </button>
                <button class="btn btn-secondary" onclick="viewCompanySummaries()">
                    <i class="fas fa-building"></i>
                    Ver Resumos por Empresa
                </button>
                <button class="btn btn-outline" onclick="clearLocalData()">
                    <i class="fas fa-trash"></i>
                    Limpar Dados Locais
                </button>
                <button class="btn btn-outline" onclick="restartEvaluation()">
                    <i class="fas fa-redo"></i>
                    Nova Avaliação
                </button>
            </div>
        </div>
    `;
}

// Função para obter imagem correspondente ao nível de diagnóstico
function getDiagnosisImage(riskLevel) {
    const imageMap = {
        'low': 'saudavel.jpg',      // Empresa saudável
        'medium': 'atencao.jpg',    // Estado de alerta
        'high': 'ajuda.jpg'          // Risco alto - precisa de ajuda
    };
    
    return imageMap[riskLevel] || 'saudavel.jpg';
}

// Função para obter descrição do risco
function getRiskDescription(riskLevel, score) {
    if (riskLevel === 'low') {
        return "Parabéns! Sua empresa demonstra um clima saudável e equilibrado. Continue mantendo essas práticas positivas e monitore regularmente para garantir a sustentabilidade do ambiente de trabalho.";
    } else if (riskLevel === 'medium') {
        return "Sua empresa apresenta pontos de atenção com fatores de estresse presentes. É importante implementar melhorias nas áreas identificadas para prevenir problemas futuros e aumentar a satisfação dos colaboradores.";
    } else {
        return "⚠️ ATENÇÃO: Sua empresa apresenta risco alto de estresse e burnout. É fundamental implementar um plano de ação imediato para melhorar o ambiente de trabalho e prevenir problemas de saúde mental dos colaboradores.";
    }
}

// Função para baixar relatório
function downloadReport() {
    const results = calculateResults();
    const reportData = generateReportData(results);
    
    // Criar e baixar arquivo JSON
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `relatorio-catalise-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert('Relatório baixado com sucesso!');
}

// Função para gerar dados do relatório
function generateReportData(results) {
    const empresa = document.getElementById('empresa').value;
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const setor = document.getElementById('setor').value;
    
    return {
        tipoEmpresa: empresa === 'credito-consignado' ? 'Crédito Consignado' : empresa === 'cartorio' ? 'Cartório' : 'Não selecionado',
        data: new Date().toLocaleDateString('pt-BR'),
        timestamp: new Date().toISOString(),
        informacoes: {
            nome: nome || 'Anônimo',
            cargo: cargo || 'Não informado',
            setor: setor || 'Não informado'
        },
        pontuacaoGeral: results.overallScore,
        nivelRisco: results.riskLabel,
        porcentagemRisco: results.riskPercentage,
        pontuacoesPorCategoria: results.categoryAverages,
        recomendacoes: results.recommendations,
        respostasDetalhadas: answers,
        interpretacao: {
            "≥ 4,0": "Clima saudável e equilibrado",
            "3,0 a 3,9": "Pontos de atenção — fatores de estresse presentes",
            "< 3,0": "Risco alto de estresse e burnout — requer plano de ação"
        }
    };
}

// Função para buscar dados do Google Sheets
async function fetchDataFromGoogleSheets() {
    try {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbzLClFbFWOGGl1GWDokGRhdvyajvMT-0L2yKIduuR5rxvu3MPaZHB1UQcSXCbJcbFlo/exec';
        
        const response = await fetch(scriptUrl, {
            method: 'GET',
            mode: 'no-cors' // Google Apps Script pode precisar de no-cors
        });
        
        // Com no-cors, não podemos ler a resposta diretamente
        // Mas podemos tentar com um proxy ou usar uma abordagem diferente
        // Tentando primeiro com cors, se falhar, tentaremos outra abordagem
        
        // Tentar fazer fetch normal primeiro
        try {
            const corsResponse = await fetch(scriptUrl + '?callback=?', {
                method: 'GET'
            });
            
            if (corsResponse.ok) {
                const result = await corsResponse.json();
                if (result.success && result.data) {
                    return result.data;
                }
            }
        } catch (corsError) {
            console.log('Tentando método alternativo...', corsError);
        }
        
        // Método alternativo usando JSONP ou retornando erro
        throw new Error('Não foi possível conectar ao Google Sheets. Verifique se o script está configurado corretamente.');
        
    } catch (error) {
        console.error('Erro ao buscar dados do Google Sheets:', error);
        throw error;
    }
}

// Função para calcular médias por categoria a partir das respostas
function calculateCategoryAveragesFromAnswers(answers) {
    // Organização das perguntas por categoria (mesma ordem do array questions)
    const categoryRanges = [
        { start: 0, end: 5, name: 'Organização e Carga de Trabalho' },      // Q1-Q6 (índices 0-5)
        { start: 6, end: 10, name: 'Comunicação e Clima Organizacional' },  // Q7-Q11 (índices 6-10)
        { start: 11, end: 14, name: 'Reconhecimento e Valorização' },       // Q12-Q15 (índices 11-14)
        { start: 15, end: 17, name: 'Autonomia e Participação' },           // Q16-Q18 (índices 15-17)
        { start: 18, end: 21, name: 'Saúde Mental e Suporte' }               // Q19-Q22 (índices 18-21)
    ];
    
    const categoryAverages = {};
    
    categoryRanges.forEach(range => {
        const categoryAnswers = answers.slice(range.start, range.end + 1);
        const validAnswers = categoryAnswers.filter(a => a !== null && a !== '' && !isNaN(a));
        const sum = validAnswers.reduce((acc, val) => acc + parseInt(val), 0);
        const average = validAnswers.length > 0 ? sum / validAnswers.length : 0;
        categoryAverages[range.name] = average;
    });
    
    return categoryAverages;
}

// Função para converter dados da planilha para formato de diagnóstico
function convertSheetDataToDiagnostics(sheetData) {
    return sheetData.map(row => {
        // Calcular pontuações a partir das respostas Q1-Q22
        const answers = [];
        for (let i = 1; i <= 22; i++) {
            const qValue = row[`Q${i}`] || row[`q${i}`] || '';
            answers.push(qValue && !isNaN(qValue) ? parseInt(qValue) : null);
        }
        
        // Calcular pontuação geral
        const validAnswers = answers.filter(a => a !== null && a !== '' && !isNaN(a));
        const totalScore = validAnswers.reduce((sum, val) => sum + parseInt(val), 0);
        const overallScore = validAnswers.length > 0 ? totalScore / validAnswers.length : 0;
        
        // Determinar nível de risco
        let riskLevel, riskLabel;
        if (overallScore >= 4.0) {
            riskLevel = 'low';
            riskLabel = 'Clima saudável e equilibrado';
        } else if (overallScore >= 3.0) {
            riskLevel = 'medium';
            riskLabel = 'Pontos de atenção — fatores de estresse presentes';
        } else {
            riskLevel = 'high';
            riskLabel = 'Risco alto de estresse e burnout — requer plano de ação';
        }
        
        // Calcular pontuações por categoria
        const categoryAverages = calculateCategoryAveragesFromAnswers(answers);
        
        return {
            id: row.Timestamp ? Date.parse(row.Timestamp) : Date.now(),
            data: row.Timestamp ? new Date(row.Timestamp).toLocaleDateString('pt-BR') : '',
            hora: row.Timestamp ? new Date(row.Timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '',
            timestamp: row.Timestamp || '',
            empresa: row.Empresa || row.empresa || '',
            tipoEmpresa: (row.Empresa || row.empresa) === 'credito-consignado' ? 'Crédito Consignado' : 
                        (row.Empresa || row.empresa) === 'cartorio' ? 'Cartório' : 'Não selecionado',
            pontuacaoGeral: overallScore,
            nivelRisco: riskLevel,
            nivelRiscoLabel: riskLabel,
            porcentagemRisco: Math.round((overallScore / 5) * 100),
            pontuacoesPorCategoria: categoryAverages,
            informacoes: {
                nome: row.Nome || row.nome || '',
                cargo: row.Cargo || row.cargo || '',
                setor: row.Setor || row.setor || ''
            },
            respostasDetalhadas: answers.reduce((acc, val, idx) => {
                acc[idx] = val;
                return acc;
            }, {})
        };
    });
}

// Função para visualizar resumos por empresa (BUSCANDO DO GOOGLE SHEETS)
async function viewCompanySummaries() {
    // Solicitar senha para acessar dados das empresas
    const password = prompt('Digite a senha para acessar os resumos por empresa:');
    
    // Senha simples (em produção, usar autenticação mais robusta)
    if (password !== 'admin2024') {
        alert('Senha incorreta. Acesso negado.');
        return;
    }
    
    try {
        // Mostrar loading
        const diagnosticoSection = document.getElementById('diagnostico-section');
        diagnosticoSection.innerHTML = `
            <div class="results-container">
                <div class="results-header">
                    <h2>📊 Carregando dados...</h2>
                    <p>Aguarde enquanto buscamos os dados da planilha.</p>
                </div>
            </div>
        `;
        
        // Buscar dados do Google Sheets
        const sheetData = await fetchDataFromGoogleSheets();
        
        if (!sheetData || sheetData.length === 0) {
            alert('Nenhum diagnóstico encontrado na planilha.');
            return;
        }
        
        // Converter dados da planilha para formato de diagnóstico
        const allData = convertSheetDataToDiagnostics(sheetData);
        
        // Organizar dados por empresa
        const companyData = organizeDataByCompany(allData);
        
        // Mostrar visualização com dados reais
        showCompanyDataVisualization(companyData);
        
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar dados da planilha. Verifique sua conexão e tente novamente.');
        
        // Tentar usar dados locais como fallback
        try {
            const localData = JSON.parse(localStorage.getItem('diagnosticos') || '[]');
            if (localData.length > 0) {
                const useLocal = confirm('Não foi possível conectar à planilha. Deseja usar dados locais?');
                if (useLocal) {
                    const companyData = organizeDataByCompany(localData);
                    showCompanyDataVisualization(companyData);
                }
            }
        } catch (localError) {
            console.error('Erro ao usar dados locais:', localError);
        }
    }
}

// Função para organizar dados por empresa
function organizeDataByCompany(diagnosticData) {
    const organizedData = {
        'cartorio': [],
        'credito-consignado': []
    };
    
    diagnosticData.forEach(diagnostic => {
        if (diagnostic.empresa === 'cartorio' || diagnostic.empresa === 'credito-consignado') {
            organizedData[diagnostic.empresa].push(diagnostic);
        }
    });
    
    return organizedData;
}


// Função para mostrar visualização dos dados das empresas
function showCompanyDataVisualization(companyData) {
    const diagnosticoSection = document.getElementById('diagnostico-section');
    
    // Calcular estatísticas
    const stats = calculateCompanyStats(companyData);
    
    diagnosticoSection.innerHTML = `
        <div class="results-container">
            <div class="results-header">
                <h2>📊 Análise Completa por Empresa</h2>
                <p>Visualização detalhada dos diagnósticos organizados</p>
            </div>
            
            <div class="company-stats-grid">
                ${Object.entries(stats).map(([company, stat]) => `
                    <div class="company-stat-card">
                        <h3>${company === 'cartorio' ? 'Cartório' : 'Crédito Consignado'}</h3>
                        <div class="stat-numbers">
                            <div class="stat-item">
                                <span class="stat-value">${stat.totalDiagnostics}</span>
                                <span class="stat-label">Diagnósticos</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${stat.averageScore.toFixed(2)}</span>
                                <span class="stat-label">Média Geral</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${stat.riskDistribution.low}</span>
                                <span class="stat-label">Adequado</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${stat.riskDistribution.medium}</span>
                                <span class="stat-label">Alerta</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${stat.riskDistribution.high}</span>
                                <span class="stat-label">Risco Alto</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="charts-container">
                ${Object.entries(stats).map(([company, stat], index) => {
                    const companyName = company === 'cartorio' ? 'Cartório' : 'Crédito Consignado';
                    const chartId = `chart-${company}-${index}`;
                    const categoryChartId = `category-chart-${company}-${index}`;
                    
                    // Calcular médias por categoria para esta empresa
                    const allData = JSON.parse(localStorage.getItem('diagnosticos') || '[]');
                    const companyDiagnostics = allData.filter(d => d.empresa === company);
                    
                    const categoryAverages = calculateCategoryAveragesForCompany(companyDiagnostics);
                    
                    return `
                        <div class="company-charts-section">
                            <h3>Gráficos - ${companyName}</h3>
                            <div class="charts-row">
                                <div class="chart-card">
                                    <h4>Distribuição de Níveis de Risco</h4>
                                    <canvas id="${chartId}"></canvas>
                                </div>
                                <div class="chart-card">
                                    <h4>Média por Categoria</h4>
                                    <canvas id="${categoryChartId}"></canvas>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="downloadAllData()">
                    <i class="fas fa-download"></i>
                    Baixar Excel Completo
                </button>
                <button class="btn btn-secondary" onclick="showSection('home')">
                    <i class="fas fa-home"></i>
                    Voltar ao Início
                </button>
            </div>
        </div>
    `;
    
    // Criar gráficos após inserir o HTML
    setTimeout(() => {
        createChartsForCompanies(stats, companyData);
    }, 100);
}

// Função para calcular médias por categoria para uma empresa
function calculateCategoryAveragesForCompany(diagnostics) {
    const categoryTotals = {};
    const categoryCounts = {};
    
    diagnostics.forEach(diagnostic => {
        if (diagnostic.pontuacoesPorCategoria) {
            Object.entries(diagnostic.pontuacoesPorCategoria).forEach(([category, score]) => {
                if (!categoryTotals[category]) {
                    categoryTotals[category] = 0;
                    categoryCounts[category] = 0;
                }
                categoryTotals[category] += score;
                categoryCounts[category]++;
            });
        }
    });
    
    const averages = {};
    Object.keys(categoryTotals).forEach(category => {
        averages[category] = categoryCounts[category] > 0 
            ? categoryTotals[category] / categoryCounts[category] 
            : 0;
    });
    
    return averages;
}

// Função para criar os gráficos (MODIFICADA PARA USAR DADOS PASSADOS)
function createChartsForCompanies(stats, companyData) {
    // Converter companyData em array plano para usar nas funções
    const allData = [];
    Object.values(companyData).forEach(companyDiagnostics => {
        allData.push(...companyDiagnostics);
    });
    
    Object.entries(stats).forEach(([company, stat], index) => {
        const chartId = `chart-${company}-${index}`;
        const categoryChartId = `category-chart-${company}-${index}`;
        
        // Gráfico de pizza - Distribuição de risco
        const ctx = document.getElementById(chartId);
        if (ctx) {
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Adequado', 'Alerta', 'Risco Alto'],
                    datasets: [{
                        data: [
                            stat.riskDistribution.low,
                            stat.riskDistribution.medium,
                            stat.riskDistribution.high
                        ],
                        backgroundColor: [
                            '#10B981',
                            '#F6C44E',
                            '#E25B5B'
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Gráfico de barras - Médias por categoria
        const categoryCtx = document.getElementById(categoryChartId);
        if (categoryCtx) {
            const companyDiagnostics = allData.filter(d => d.empresa === company);
            const categoryAverages = calculateCategoryAveragesForCompany(companyDiagnostics);
            
            const categories = Object.keys(categoryAverages);
            const averages = Object.values(categoryAverages);
            
            // Abreviar nomes das categorias para melhor visualização
            const shortCategories = categories.map(cat => {
                if (cat.includes('Organização')) return 'Org. e Carga';
                if (cat.includes('Comunicação')) return 'Comunicação';
                if (cat.includes('Reconhecimento')) return 'Reconhecimento';
                if (cat.includes('Autonomia')) return 'Autonomia';
                if (cat.includes('Saúde Mental')) return 'Saúde Mental';
                return cat.substring(0, 15);
            });
            
            new Chart(categoryCtx, {
                type: 'bar',
                data: {
                    labels: shortCategories,
                    datasets: [{
                        label: 'Pontuação Média',
                        data: averages,
                        backgroundColor: averages.map(avg => {
                            if (avg >= 4.0) return '#10B981';
                            if (avg >= 3.0) return '#F6C44E';
                            return '#E25B5B';
                        }),
                        borderColor: averages.map(avg => {
                            if (avg >= 4.0) return '#059669';
                            if (avg >= 3.0) return '#D97706';
                            return '#DC2626';
                        }),
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5,
                            ticks: {
                                stepSize: 0.5
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Média: ${context.parsed.y.toFixed(2)}/5.0`;
                                }
                            }
                        }
                    }
                }
            });
        }
    });
}

// Função para calcular estatísticas das empresas
function calculateCompanyStats(companyData) {
    const stats = {};
    
    Object.entries(companyData).forEach(([company, diagnostics]) => {
        const totalDiagnostics = diagnostics.length;
        const totalScore = diagnostics.reduce((sum, d) => sum + d.pontuacaoGeral, 0);
        const averageScore = totalDiagnostics > 0 ? totalScore / totalDiagnostics : 0;
        
        const riskDistribution = {
            low: diagnostics.filter(d => d.nivelRisco === 'low').length,
            medium: diagnostics.filter(d => d.nivelRisco === 'medium').length,
            high: diagnostics.filter(d => d.nivelRisco === 'high').length
        };
        
        stats[company] = {
            totalDiagnostics,
            averageScore,
            riskDistribution
        };
    });
    
    return stats;
}

// Função para baixar todos os dados em Excel
function downloadAllData() {
    try {
        // Buscar dados do localStorage
        const allData = JSON.parse(localStorage.getItem('diagnosticos') || '[]');
        
        if (allData.length === 0) {
            alert('Nenhum diagnóstico encontrado.');
            return;
        }
        
        // Organizar dados por empresa
        const companyData = organizeDataByCompany(allData);
        
        // Criar dados para Excel
        const excelData = createExcelDataFromRealData(companyData);
        
        // Baixar arquivo Excel
        downloadExcelFile(excelData, 'todos-os-diagnosticos');
        
        alert(`Exportados ${allData.length} diagnósticos com sucesso!`);
        
    } catch (error) {
        console.error('Erro ao exportar dados:', error);
        alert('Erro ao exportar dados. Tente novamente.');
    }
}

// Função para criar dados para Excel a partir de dados reais
function createExcelDataFromRealData(companyData) {
    const excelData = [];
    
    // Cabeçalho
    excelData.push([
        'Empresa', 'Data', 'Hora', 'Nome', 'Cargo', 'Setor', 'Pontuação Geral', 
        'Nível de Risco', 'Porcentagem', 'Org. e Carga', 'Comunicação', 
        'Reconhecimento', 'Autonomia', 'Saúde Mental'
    ]);
    
    // Dados reais
    Object.entries(companyData).forEach(([company, diagnostics]) => {
        const companyName = company === 'cartorio' ? 'Cartório' : 'Crédito Consignado';
        
        diagnostics.forEach(diagnostic => {
            excelData.push([
                companyName,
                diagnostic.data,
                diagnostic.hora,
                diagnostic.informacoes.nome || '',
                diagnostic.informacoes.cargo || '',
                diagnostic.informacoes.setor || '',
                diagnostic.pontuacaoGeral,
                diagnostic.nivelRiscoLabel,
                diagnostic.porcentagemRisco + '%',
                diagnostic.pontuacoesPorCategoria['Organização e Carga de Trabalho'],
                diagnostic.pontuacoesPorCategoria['Comunicação e Clima Organizacional'],
                diagnostic.pontuacoesPorCategoria['Reconhecimento e Valorização'],
                diagnostic.pontuacoesPorCategoria['Autonomia e Participação'],
                diagnostic.pontuacoesPorCategoria['Saúde Mental e Suporte']
            ]);
        });
    });
    
    return excelData;
}

// Função para baixar arquivo Excel
function downloadExcelFile(data, filename) {
    // Criar CSV (formato mais simples que Excel)
    const csvContent = data.map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    alert('Arquivo Excel (CSV) baixado com sucesso!');
}

// Função para limpar dados locais
function clearLocalData() {
    const confirmClear = confirm(
        '🗑️ Limpar Dados Locais\n\n' +
        'Esta ação irá remover todos os diagnósticos salvos localmente.\n' +
        'Esta ação não pode ser desfeita.\n\n' +
        'Deseja continuar?'
    );
    
    if (confirmClear) {
        localStorage.removeItem('diagnosticos');
        alert('✅ Dados locais removidos com sucesso!');
    }
}

// Função para reiniciar avaliação
function restartEvaluation() {
    // Usar a função resetForm() para garantir limpeza completa
    resetForm();
    
    // Voltar para a seção home
    showSection('home');
}