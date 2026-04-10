export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave de API não configurada.' });
  }

  const {
    nome, segmento, cidade,
    site, instagram, gmaps, whatsapp, outros,
    jornada, metricas, contexto,
    diagnostico, posicionamento
  } = req.body;

  if (!nome || !segmento) {
    return res.status(400).json({ error: 'Nome e segmento são obrigatórios.' });
  }

  const canais = [
    site ? 'Site: ' + site : '',
    instagram ? 'Instagram: ' + instagram : '',
    gmaps ? 'Google/Maps: ' + gmaps : '',
    whatsapp ? 'WhatsApp: ' + whatsapp : '',
    outros ? 'Outros: ' + outros : ''
  ].filter(Boolean).join(' | ') || 'não informados';

  const extras = [
    diagnostico ? 'DIAGNÓSTICO (Agente 1):\n' + diagnostico : '',
    posicionamento ? 'POSICIONAMENTO (Agente 2):\n' + posicionamento : ''
  ].filter(Boolean).join('\n\n');

  const prompt = `Você é o Agente de Análise do MCC (Meio do Caminho Confuso) da Lógica do Design® — método estratégico da agência Miligrama MG.

O MCC é o espaço entre o momento em que o cliente potencial descobre a marca e o momento em que ele toma uma decisão. É nesse espaço que a maioria das marcas perde clientes sem perceber.

Sua missão é identificar onde, como e por que esta marca está perdendo clientes no MCC — analisando três momentos críticos:
1. ATRAÇÃO: o cliente chega até a marca? (encontrabilidade, primeira impressão, clareza)
2. CONVERSÃO: o cliente que chega toma uma ação? (CTA, fricção, confiança, urgência)
3. RETENÇÃO: o cliente que converteu volta e indica? (experiência, relacionamento, pós-venda)

Use web search para buscar informações públicas sobre esta marca antes de gerar a análise.

DADOS DA MARCA:
Nome: ${nome}
Segmento: ${segmento}
Cidade: ${cidade || 'não informada'}
Canais: ${canais}
Jornada do cliente descrita: ${jornada || 'não informada'}
Métricas disponíveis: ${metricas || 'não fornecidas'}
Contexto adicional: ${contexto || 'não fornecido'}
${extras}

Retorne APENAS um JSON válido, sem texto antes ou depois, sem markdown:

{
  "marca": "${nome}",
  "resumo_mcc": "2-3 frases descrevendo onde está o maior vazamento de clientes desta marca",
  "score_geral": "crítico|moderado|controlado",
  "momentos": [
    {
      "nome": "Atração",
      "score": "crítico|moderado|controlado",
      "descricao": "o que está funcionando e o que está falhando na atração de clientes em 3-4 frases",
      "pontos_de_perda": [
        {
          "canal": "nome do canal",
          "problema": "descrição do problema específico",
          "severidade": "alta|média|baixa",
          "evidencia": "dado ou observação que comprova o problema"
        }
      ],
      "acoes": [
        {
          "acao": "descrição da ação corretiva",
          "prazo": "imediato|30 dias|90 dias",
          "impacto": "alto|médio|baixo"
        }
      ]
    },
    {
      "nome": "Conversão",
      "score": "crítico|moderado|controlado",
      "descricao": "análise da conversão em 3-4 frases",
      "pontos_de_perda": [
        {
          "canal": "nome do canal",
          "problema": "descrição do problema",
          "severidade": "alta|média|baixa",
          "evidencia": "dado ou observação"
        }
      ],
      "acoes": [
        {
          "acao": "descrição da ação corretiva",
          "prazo": "imediato|30 dias|90 dias",
          "impacto": "alto|médio|baixo"
        }
      ]
    },
    {
      "nome": "Retenção",
      "score": "crítico|moderado|controlado",
      "descricao": "análise da retenção em 3-4 frases",
      "pontos_de_perda": [
        {
          "canal": "nome do canal",
          "problema": "descrição do problema",
          "severidade": "alta|média|baixa",
          "evidencia": "dado ou observação"
        }
      ],
      "acoes": [
        {
          "acao": "descrição da ação corretiva",
          "prazo": "imediato|30 dias|90 dias",
          "impacto": "alto|médio|baixo"
        }
      ]
    }
  ],
  "plano_90_dias": [
    { "semana": "Semana 1-2", "foco": "o que fazer primeiro e por quê", "acoes": ["ação 1", "ação 2"] },
    { "semana": "Semana 3-4", "foco": "segundo bloco de ações", "acoes": ["ação 1", "ação 2"] },
    { "semana": "Mês 2", "foco": "terceiro bloco", "acoes": ["ação 1", "ação 2"] },
    { "semana": "Mês 3", "foco": "consolidação", "acoes": ["ação 1", "ação 2"] }
  ],
  "quick_win": "a única ação que esta marca pode tomar esta semana com maior impacto no MCC, em 1-2 frases diretas"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Erro na API' });
    }

    let jsonText = '';
    for (const block of data.content || []) {
      if (block.type === 'text') jsonText += block.text;
    }

    const start = jsonText.indexOf('{');
    const end = jsonText.lastIndexOf('}');
    if (start === -1 || end === -1) {
      return res.status(500).json({ error: 'Resposta inválida da API' });
    }

    const result = JSON.parse(jsonText.substring(start, end + 1));
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Erro interno' });
  }
}
