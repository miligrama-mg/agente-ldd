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
    publico, problema, solucao,
    diferencial, concorrentes, contexto,
    diagnostico
  } = req.body;

  if (!nome || !segmento) {
    return res.status(400).json({ error: 'Nome e segmento são obrigatórios.' });
  }

  const diagPart = diagnostico
    ? `\n\nDIAGNÓSTICO DE CONTEXTO (Agente 1):\n${diagnostico}`
    : '';

  const prompt = `Você é o Agente de Posicionamento da Lógica do Design® — método estratégico da agência Miligrama MG.

Seu papel é construir o circuito SE-ENTÃO-SENÃO de posicionamento da marca, baseado na lógica:
- SE: a condição de entrada — o momento em que o cliente potencial reconhece que tem um problema ou desejo
- ENTÃO: a resposta da marca — o que ela entrega de forma única quando o cliente a encontra
- SENÃO: o que acontece se o cliente não escolher esta marca — a consequência ou alternativa inferior

DADOS DA MARCA:
Nome: ${nome}
Segmento: ${segmento}
Cidade: ${cidade || 'não informada'}
Público-alvo: ${publico || 'não informado'}
Problema que resolve: ${problema || 'não informado'}
Solução oferecida: ${solucao || 'não informada'}
Diferencial: ${diferencial || 'não informado'}
Concorrentes: ${concorrentes || 'não informados'}
Contexto adicional: ${contexto || 'não fornecido'}${diagPart}

Gere 3 variações do circuito SE-ENTÃO-SENÃO, cada uma com uma abordagem diferente:
- Variação 1: foco racional (resultado, eficiência, entrega)
- Variação 2: foco emocional (transformação, sentimento, identidade)
- Variação 3: foco de contraste (o que o cliente perde ao não escolher esta marca)

Retorne APENAS um JSON válido, sem texto antes ou depois, sem markdown:

{
  "marca": "${nome}",
  "posicionamento_central": "síntese do posicionamento em 1 frase direta e memorável",
  "logica_estrategica": "explicação em 3-4 frases de por que este posicionamento faz sentido para este mercado e público",
  "variacoes": [
    {
      "tipo": "Racional",
      "foco": "resultado e eficiência",
      "se": "frase do SE — a condição de entrada do cliente",
      "entao": "frase do ENTÃO — o que a marca entrega",
      "senao": "frase do SENÃO — a consequência de não escolher",
      "aplicacao": "onde e como usar esta variação (ex: Google Ads, bio do Instagram, pitch de vendas)"
    },
    {
      "tipo": "Emocional",
      "foco": "transformação e identidade",
      "se": "frase do SE",
      "entao": "frase do ENTÃO",
      "senao": "frase do SENÃO",
      "aplicacao": "onde e como usar esta variação"
    },
    {
      "tipo": "Contraste",
      "foco": "diferenciação competitiva",
      "se": "frase do SE",
      "entao": "frase do ENTÃO",
      "senao": "frase do SENÃO",
      "aplicacao": "onde e como usar esta variação"
    }
  ],
  "proximos_passos": ["ação 1 para ativar este posicionamento", "ação 2", "ação 3"]
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
        max_tokens: 2000,
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
