export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { nome, segmento, cidade, canais, metricas, contexto } = req.body;

  if (!nome || !segmento) {
    return res.status(400).json({ error: 'Nome e segmento são obrigatórios' });
  }

  const prompt = `Você é o Agente de Diagnóstico da Lógica do Design® — método de posicionamento estratégico da agência Miligrama MG.

Analise a presença digital da marca abaixo em 4 eixos: Encontrabilidade, Acessibilidade, Completude e Performance.
Use web search para buscar informações públicas sobre esta marca antes de gerar o diagnóstico.

MARCA: ${nome}
SEGMENTO: ${segmento}
CIDADE: ${cidade || 'não informada'}
CANAIS: ${canais || 'não informados'}
MÉTRICAS: ${metricas || 'não fornecidas'}
CONTEXTO: ${contexto || 'não fornecido'}

Retorne APENAS um JSON válido, sem texto antes ou depois, sem markdown, sem blocos de código:

{
  "marca": "${nome}",
  "resumo_executivo": "2-3 frases sobre a situação geral da marca no ambiente digital",
  "eixos": [
    {
      "nome": "Encontrabilidade",
      "score": "bom|médio|crítico",
      "analise": "análise em 4-5 frases com dados reais encontrados",
      "recomendacoes": ["recomendação 1", "recomendação 2", "recomendação 3"]
    },
    {
      "nome": "Acessibilidade",
      "score": "bom|médio|crítico",
      "analise": "análise em 4-5 frases",
      "recomendacoes": ["recomendação 1", "recomendação 2"]
    },
    {
      "nome": "Completude",
      "score": "bom|médio|crítico",
      "analise": "análise em 4-5 frases",
      "recomendacoes": ["recomendação 1", "recomendação 2"]
    },
    {
      "nome": "Performance",
      "score": "bom|médio|crítico",
      "analise": "análise em 4-5 frases",
      "recomendacoes": ["recomendação 1", "recomendação 2"]
    }
  ],
  "proximo_passo": "a ação mais importante que esta marca deveria tomar agora, em 1-2 frases diretas"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
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

    const clean = jsonText.substring(start, end + 1);
    const result = JSON.parse(clean);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Erro interno' });
  }
}
