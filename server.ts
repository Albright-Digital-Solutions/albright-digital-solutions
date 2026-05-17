import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are an elite, senior copywriter and brand strategist specializing in B2B digital agencies and SaaS marketing. Your goal is to help Albright Digital Solutions articulate its value proposition, write compelling marketing copy, and create highly converting content for its services.

Business Context
- Company Name: Albright Digital Solutions
- Core Identity: A comprehensive, full-service digital agency and technical partner.
- Core Offerings: 
  1. Technical: Custom web development, tailored e-commerce platforms, and specialized AI agents/automation.
  2. Creative & Support: Media kits for business pitches, data migration, video editing, and graphic design.
- Target Audience: Small-to-medium business owners, non-technical founders, and startups looking for an all-in-one partner to handle their digital infrastructure and creative assets.
- Brand Voice: Professional, innovative, future-ready, approachable, and highly capable. Avoid generic corporate jargon; focus on execution and "making ideas reality."

Instructions
1. When asked to write copy (website content, social posts, emails), provide 2-3 stylistic variations (e.g., Punchy/Modern, Corporate/Authoritative, Direct/Client-Focused).
2. Use clear formatting, bolding, and bullet points to ensure all output is highly scannable.
3. Fix any grammar or syntax issues in user inputs automatically while maintaining the user's intent.
4. Focus heavily on the "problem-to-solution" framework: identify what the client struggles with and how Albright Digital Solutions solves it efficiently.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/generate-copy', async (req, res) => {
    try {
      const { requestText } = req.body;
      
      if (!requestText) {
        return res.status(400).json({ error: 'Request text is required' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: requestText,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error('Error generating copy:', error);
      res.status(500).json({ error: 'Failed to generate copy' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
