import express from 'express'; // Importa o framework Express para criar o servidor web
import { fileURLToPath } from 'url'; // Importa a função fileUrlToPath para converter URLs de arquivos em caminhos de sistema de arquivos
import { dirname } from 'path'; // Importa a função dirname para obter o diretório de um caminho de arquivo
import path from 'path'; // Importa o módulo path para manipular caminhos de arquivos
import { connectDatabase } from './config/database.js';
import { config } from "dotenv"
config();
import productRouter from './router/ProductRouter.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url); // Converte a URL do módulo atual para um caminho de arquivo
const __dirname = dirname(__filename); // Obtém o diretório do arquivo atual

const app = express(); // Cria uma instância do aplicativo Express
const port = process.env.PORT || 8000; // Define a porta em que o servidor irá escutar

app.use(cors()) // Habilita o CORS para permitir requisições de diferentes origens
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'
app.use(express.json()) // Middleware para parsear o corpo das requisições como JSON

app.use("/products", productRouter)

app.listen(port, () => { // Inicia o servidor e escuta na porta definida
    console.log(`Servidor rodando na porta ${port}`); // Imprime uma mensagem no console indicando que o servidor está rodando
});

connectDatabase();