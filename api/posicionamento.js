<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Posicionamento SE-ENTÃO-SENÃO — Lógica do Design®</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
<style>
  :root {
    --black: #0e0e0e;
    --white: #f8f6f1;
    --cream: #ede9e0;
    --accent: #c8b89a;
    --muted: #8a8278;
    --border: rgba(14,14,14,0.12);
    --se-color: #1a3a5c;
    --se-bg: #e8f0f8;
    --entao-color: #1a4a2e;
    --entao-bg: #e8f3ec;
    --senao-color: #5c2a1a;
    --senao-bg: #f8ede8;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--black);
    min-height: 100vh;
    font-weight: 300;
  }

  .page { max-width: 720px; margin: 0 auto; padding: 0 24px 80px; }

  header {
    padding: 48px 0 40px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
  }

  .logo-block { display: flex; flex-direction: column; gap: 6px; }
  .logo-tag { font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .logo-name { font-family: 'DM Serif Display', serif; font-size: 26px; line-height: 1; color: var(--black); }
  .logo-name em { font-style: italic; color: var(--accent); }
  .header-desc { font-size: 13px; color: var(--muted); line-height: 1.6; text-align: right; max-width: 220px; }

  .nav-link { font-size: 13px; color: var(--muted); text-decoration: none; border-bottom: 1px solid var(--border); padding-bottom: 2px; transition: color 0.15s; }
  .nav-link:hover { color: var(--black); }

  @media (max-width: 520px) {
    header { flex-direction: column; align-items: flex-start; }
    .header-desc { text-align: left; max-width: 100%; }
  }

  .section-label { font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }

  .card { border: 1px solid var(--border); border-radius: 4px; padding: 28px; margin-bottom: 16px; background: var(--white); }

  .form-group { margin-bottom: 20px; }
  .form-group:last-child { margin-bottom: 0; }

  label { display: block; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }

  input, textarea, select {
    width: 100%; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300;
    color: var(--black); background: var(--cream); border: 1px solid transparent;
    border-radius: 3px; padding: 11px 14px; transition: border-color 0.15s; outline: none;
  }
  input:focus, textarea:focus, select:focus { border-color: var(--accent); background: #fff; }
  textarea { resize: vertical; min-height: 80px; line-height: 1.6; }
  input::placeholder, textarea::placeholder { color: var(--muted); opacity: 0.6; }

  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 500px) { .row { grid-template-columns: 1fr; } }

  .hint { font-size: 12px; color: var(--muted); margin-top: 6px; line-height: 1.5; }

  .diag-toggle { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; cursor: pointer; }
  .diag-toggle input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; accent-color: var(--black); }
  .diag-toggle span { font-size: 13px; color: var(--muted); }

  .run-btn { width: 100%; padding: 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.06em; color: var(--white); background: var(--black); border: none; border-radius: 3px; cursor: pointer; transition: background 0.15s, opacity 0.15s; }
  .run-btn:hover { background: #2a2a2a; }
  .run-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .error-msg { margin-top: 14px; padding: 12px 16px; background: #fceaea; color: #8b2323; border-radius: 3px; font-size: 13px; line-height: 1.6; }

  .loading-wrap { padding: 48px 0; display: flex; flex-direction: column; gap: 14px; }
  .loading-step { display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--muted); transition: color 0.3s; }
  .loading-step.active { color: var(--black); }
  .loading-step.done { color: #1a4a2e; }
  .step-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); flex-shrink: 0; transition: background 0.3s; }
  .loading-step.active .step-dot { background: var(--black); }
  .loading-step.done .step-dot { background: #1a4a2e; }

  .result-header { margin-bottom: 40px; }
  .result-tag { font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; display: block; }
  .result-title { font-family: 'DM Serif Display', serif; font-size: 32px; line-height: 1.15; margin-bottom: 14px; }
  .result-posicionamento { font-family: 'DM Serif Display', serif; font-size: 20px; font-style: italic; color: var(--accent); margin-bottom: 16px; line-height: 1.4; }
  .result-logica { font-size: 15px; line-height: 1.75; color: #444; }

  .variacao-block { border: 1px solid var(--border); border-radius: 4px; margin-bottom: 16px; overflow: hidden; }

  .variacao-header { padding: 18px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--border); }
  .variacao-num { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: var(--muted); }
  .variacao-tipo { font-family: 'DM Serif Display', serif; font-size: 18px; flex: 1; }
  .variacao-foco { font-size: 12px; color: var(--muted); font-style: italic; }

  .circuito { padding: 24px; display: flex; flex-direction: column; gap: 12px; }

  .circuito-item { border-radius: 3px; padding: 16px 18px; }
  .circuito-item.se { background: var(--se-bg); }
  .circuito-item.entao { background: var(--entao-bg); }
  .circuito-item.senao { background: var(--senao-bg); }

  .circuito-tag { font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 6px; }
  .circuito-item.se .circuito-tag { color: var(--se-color); }
  .circuito-item.entao .circuito-tag { color: var(--entao-color); }
  .circuito-item.senao .circuito-tag { color: var(--senao-color); }

  .circuito-text { font-size: 15px; line-height: 1.65; }
  .circuito-item.se .circuito-text { color: var(--se-color); }
  .circuito-item.entao .circuito-text { color: var(--entao-color); font-weight: 400; }
  .circuito-item.senao .circuito-text { color: var(--senao-color); }

  .aplicacao-bar { padding: 14px 24px; background: var(--cream); border-top: 1px solid var(--border); font-size: 12px; color: var(--muted); line-height: 1.6; }
  .aplicacao-label { font-weight: 500; margin-right: 6px; text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px; }

  .proximos-block { border: 1px solid var(--border); border-radius: 4px; padding: 28px; margin-top: 8px; }
  .prox-item { display: flex; gap: 12px; margin-bottom: 10px; font-size: 14px; line-height: 1.7; color: #333; }
  .prox-item:last-child { margin-bottom: 0; }
  .prox-num { font-family: 'DM Serif Display', serif; font-size: 18px; color: var(--accent); flex-shrink: 0; line-height: 1.4; }

  .action-bar { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
  .action-btn { padding: 12px 20px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 3px; transition: background 0.15s; }
  .btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--black); }
  .btn-secondary:hover { background: var(--cream); }

  footer { margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--border); font-size: 12px; color: var(--muted); display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
</style>
</head>
<body>
<div class="page">

  <header>
    <div class="logo-block">
      <span class="logo-tag">Miligrama MG</span>
      <div class="logo-name">Lógica do <em>Design</em>®</div>
    </div>
    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
      <p class="header-desc">Agente de posicionamento SE-ENTÃO-SENÃO</p>
      <a href="/" class="nav-link">← Diagnóstico</a>
      <a href="/mcc.html" class="nav-link">Agente do MCC →</a>
    </div>
  </header>

  <div id="form-view">
    <div class="card">
      <div class="section-label">Dados da marca</div>
      <div class="form-group">
        <label>Nome da marca</label>
        <input type="text" id="nome" placeholder="Ex: Occulare Oftalmologia" />
      </div>
      <div class="row">
        <div class="form-group">
          <label>Segmento</label>
          <input type="text" id="segmento" placeholder="Ex: saúde, moda..." />
        </div>
        <div class="form-group">
          <label>Cidade / região</label>
          <input type="text" id="cidade" placeholder="Ex: Pouso Alegre, MG" />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="section-label">Público e problema</div>
      <div class="form-group">
        <label>Público-alvo</label>
        <input type="text" id="publico" placeholder="Ex: adultos acima de 40 anos com problemas de visão" />
      </div>
      <div class="form-group">
        <label>Problema que a marca resolve</label>
        <textarea id="problema" placeholder="Ex: pessoas que precisam de cuidado ocular especializado mas têm dificuldade de acessar atendimento de qualidade na região..."></textarea>
      </div>
      <div class="form-group">
        <label>Solução oferecida</label>
        <textarea id="solucao" placeholder="Ex: clínica oftalmológica completa com consultas, exames e cirurgias em Pouso Alegre..."></textarea>
      </div>
    </div>

    <div class="card">
      <div class="section-label">Diferencial e mercado</div>
      <div class="form-group">
        <label>Diferencial da marca</label>
        <textarea id="diferencial" placeholder="Ex: atendimento humanizado, equipe especializada, única clínica com determinado equipamento na região..."></textarea>
      </div>
      <div class="form-group">
        <label>Principais concorrentes</label>
        <input type="text" id="concorrentes" placeholder="Ex: P.A. Olhos, Clínica Namur, Medical Center..." />
      </div>
      <div class="form-group">
        <label>Contexto adicional</label>
        <textarea id="contexto" placeholder="Tempo de mercado, posicionamento atual, tom de voz, campanhas anteriores..."></textarea>
      </div>
    </div>

    <div class="card">
      <div class="section-label">Diagnóstico de contexto (opcional)</div>
      <label class="diag-toggle">
        <input type="checkbox" id="usarDiag" onchange="toggleDiag()" />
        <span>Incluir dados do Agente de Diagnóstico (Agente 1)</span>
      </label>
      <div id="diagArea" style="display:none;">
        <div class="form-group">
          <label>Cole aqui o diagnóstico gerado pelo Agente 1</label>
          <textarea id="diagnostico" style="min-height:120px;" placeholder="Cole o resumo executivo e os dados dos 4 eixos..."></textarea>
          <p class="hint">Quanto mais contexto, mais preciso o posicionamento gerado.</p>
        </div>
      </div>
    </div>

    <button class="run-btn" id="runBtn" onclick="rodar()">Gerar posicionamento →</button>
    <div id="err"></div>
  </div>

  <div id="loading-view" style="display:none;">
    <div class="loading-wrap">
      <div class="loading-step" id="ls1"><div class="step-dot"></div>Analisando marca e mercado...</div>
      <div class="loading-step" id="ls2"><div class="step-dot"></div>Construindo o circuito SE-ENTÃO-SENÃO</div>
      <div class="loading-step" id="ls3"><div class="step-dot"></div>Gerando 3 variações de posicionamento</div>
      <div class="loading-step" id="ls4"><div class="step-dot"></div>Finalizando recomendações</div>
    </div>
  </div>

  <div id="result-view" style="display:none;"></div>

  <footer>
    <span>Lógica do Design® — Miligrama MG</span>
    <span>Posicionamento gerado por IA</span>
  </footer>

</div>

<script>
  function toggleDiag() {
    const cb = document.getElementById('usarDiag');
    document.getElementById('diagArea').style.display = cb.checked ? 'block' : 'none';
  }

  let stepTimer;

  function setStep(n) {
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById('ls' + i);
      if (!el) continue;
      el.className = 'loading-step' + (i < n ? ' done' : i === n ? ' active' : '');
    }
  }

  function startSteps() {
    setStep(1);
    let s = 1;
    stepTimer = setInterval(() => { s = Math.min(s + 1, 4); setStep(s); }, 2500);
  }

  async function rodar() {
    const nome = document.getElementById('nome').value.trim();
    const segmento = document.getElementById('segmento').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const publico = document.getElementById('publico').value.trim();
    const problema = document.getElementById('problema').value.trim();
    const solucao = document.getElementById('solucao').value.trim();
    const diferencial = document.getElementById('diferencial').value.trim();
    const concorrentes = document.getElementById('concorrentes').value.trim();
    const contexto = document.getElementById('contexto').value.trim();
    const usarDiag = document.getElementById('usarDiag').checked;
    const diagnostico = usarDiag ? document.getElementById('diagnostico').value.trim() : '';

    const errEl = document.getElementById('err');
    errEl.innerHTML = '';

    if (!nome || !segmento) {
      errEl.innerHTML = '<div class="error-msg">Preencha ao menos o nome da marca e o segmento.</div>';
      return;
    }

    document.getElementById('runBtn').disabled = true;
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('loading-view').style.display = 'block';
    startSteps();

    try {
      const res = await fetch('/api/posicionamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, segmento, cidade, publico, problema, solucao, diferencial, concorrentes, contexto, diagnostico })
      });

      const data = await res.json();
      clearInterval(stepTimer);

      if (!res.ok || data.error) throw new Error(data.error || 'Erro ao gerar posicionamento');

      document.getElementById('loading-view').style.display = 'none';
      renderResult(data);

    } catch (err) {
      clearInterval(stepTimer);
      document.getElementById('loading-view').style.display = 'none';
      document.getElementById('form-view').style.display = 'block';
      document.getElementById('runBtn').disabled = false;
      document.getElementById('err').innerHTML = '<div class="error-msg">Erro: ' + (err.message || 'Tente novamente') + '</div>';
    }
  }

  function renderResult(r) {
    const variacoesHtml = (r.variacoes || []).map((v, i) => `
      <div class="variacao-block">
        <div class="variacao-header">
          <span class="variacao-num">0${i+1}</span>
          <span class="variacao-tipo">${v.tipo}</span>
          <span class="variacao-foco">${v.foco}</span>
        </div>
        <div class="circuito">
          <div class="circuito-item se">
            <div class="circuito-tag">SE</div>
            <div class="circuito-text">${v.se}</div>
          </div>
          <div class="circuito-item entao">
            <div class="circuito-tag">ENTÃO</div>
            <div class="circuito-text">${v.entao}</div>
          </div>
          <div class="circuito-item senao">
            <div class="circuito-tag">SENÃO</div>
            <div class="circuito-text">${v.senao}</div>
          </div>
        </div>
        <div class="aplicacao-bar">
          <span class="aplicacao-label">Onde usar</span>${v.aplicacao}
        </div>
      </div>
    `).join('');

    const proximosHtml = (r.proximos_passos || []).map((p, i) => `
      <div class="prox-item">
        <span class="prox-num">${i+1}</span>
        <span>${p}</span>
      </div>
    `).join('');

    document.getElementById('result-view').innerHTML = `
      <div class="result-header">
        <span class="result-tag">Posicionamento gerado</span>
        <h1 class="result-title">${r.marca || ''}</h1>
        <p class="result-posicionamento">"${r.posicionamento_central || ''}"</p>
        <p class="result-logica">${r.logica_estrategica || ''}</p>
      </div>

      <div class="section-label" style="margin-bottom:20px;">Circuito SE-ENTÃO-SENÃO — 3 variações</div>
      ${variacoesHtml}

      ${proximosHtml ? `
      <div class="proximos-block" style="margin-top:8px;">
        <div class="section-label" style="margin-bottom:20px;">Próximos passos</div>
        ${proximosHtml}
      </div>` : ''}

      <div class="action-bar">
        <button class="action-btn btn-secondary" onclick="voltar()">← Novo posicionamento</button>
        <button class="action-btn btn-secondary" onclick="window.print()">Imprimir / salvar PDF</button>
      </div>
    `;

    document.getElementById('result-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function voltar() {
    document.getElementById('result-view').style.display = 'none';
    document.getElementById('result-view').innerHTML = '';
    document.getElementById('form-view').style.display = 'block';
    document.getElementById('runBtn').disabled = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>
</body>
</html>
