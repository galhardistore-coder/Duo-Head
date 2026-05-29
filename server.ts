import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// SYSTEM INSTRUCTION FOR DUOHEAD CHATBOT
const SYSTEM_INSTRUCTION = `Você é o DuoAssist, o assistente virtual oficial e especialista em inteligência artificial do DUO Head (www.duohead.com.br).
Seu objetivo é sanar dúvidas de potenciais compradores e convencê-los sobre os benefícios magníficos do DUO Head.

Informações Cruciais sobre o DUO Head:
1. O que é: O DUO Head é um suporte duplo inovador desenvolvido em impressão 3D para quem busca praticidade na hora de raspar e barbear a cabeça. Ele permite acoplar duas lâminas simultaneamente, cobrindo uma área de corte muito maior por passada e reduzindo pela metade o tempo de barbear.
2. Benefícios principais:
   - Autonomia total: Permite raspar todas as áreas com precisão, especialmente a nuca e a parte de trás, sem depender da ajuda de outras pessoas.
   - Rapidez incrível: Cobrir uma área de corte maior significa menos passadas e metade do tempo gasto.
   - Economia real: Reduz as visitas ao barbeiro ou salão, se pagando logo no primeiro mês de uso.
   - Tecnologia 3D: Desenvolvido com impressão 3D premium industrial em plástico termoplástico de alta durabilidade, totalmente resistente a água, sabão ou espuma de barbear.
   - Encaixe Perfeito: Design anatômico inteligente e estável.
3. Compatibilidade e Modelos:
   - Existem duas versões distintas e específicas de encaixe:
     - Versão para lâminas Gillette Mach3.
     - Versão para lâminas Gillette Fusion 5.
   - ATENÇÃO: As versões NÃO são intercambiáveis (o suporte do Mach3 serve apenas em cargas Mach3, e o suporte do Fusion 5 serve apenas em cargas Fusion 5).
4. Variações, Preços e Kits (Oficiais):
   - Kit DUO Head + Lâmina Fusion 5: R$ 80,43 (Acompanha o suporte duplo impresso em 3D + o refil/carga de lâminas compatível com Fusion 5).
   - Suporte DUO Head Fusion 5 (Sem lâmina): R$ 45,43 (Apenas o suporte impresso em 3D, ideal para quem já tem as lâminas).
   - Kit DUO Head + Lâmina Mach3: R$ 69,93 (Acompanha o suporte duplo impresso em 3D + o refil/carga de lâminas compatível com Mach3).
   - Suporte DUO Head Mach3 (Sem lâmina): R$ 45,43 (Apenas o suporte impresso em 3D, ideal para quem já tem as lâminas).
5. O DUO Head acompanha as lâminas?
   - Depende do kit escolhido! Os kits completos ("Kit DUO Head + Lâmina...") já incluem o refil de lâmina inicial. As variações "Sem lâmina" incluem somente o suporte duplo.
6. É barbeador elétrico?
   - NÃO! O DUO Head é um suporte manual mecânico super inovador. Ele não é elétrico, não tem baterias. Use-o debaixo do chuveiro ou sob a torneira normalmente com as suas lâminas manuais favoritas!
7. Produção e Envio:
   - Produção física nacional e própria no Brasil, estoque pronto para envio expresso e seguro a todo o país.

Regras de Tom e Respostas:
- Seja sempre amigável, educado, entusiasmado, prestativo e com foco em vendas em Português do Brasil (PT-BR).
- Responda de forma direta e divida em parágrafos pequenos ou bullet points fáceis de precisar ler no celular.
- Nunca prometa efeitos médicos falsos ou invente informações não listadas. 
- Se o cliente persistir em dúvidas complexas ou quiser fazer uma compra especial, sugira que clique no botão de falar no WhatsApp de atendimento oficial.
- Mantenha um linguajar humano e comercial, evite termos desnecessários de informática de IA.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini on the server side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Mensagem é necessária" });
      }

      const contents: any[] = [];
      
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Erro no chat de IA:", error);
      res.status(500).json({ error: "Ocorreu um erro ao processar sua dúvida. Por favor tente novamente." });
    }
  });

  // Configure Vite or Static Files
  const base = "/Duo-Head/";

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Serve files inside /Duo-Head/ under base path
    app.use(base, express.static(distPath));
    // Keep regular / serving just in case
    app.use(express.static(distPath));
    
    // Serve index.html for SPA routes
    app.get(`${base}*`, (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Erro ao iniciar o servidor express:", error);
});
