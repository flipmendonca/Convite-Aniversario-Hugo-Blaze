const fs = require('fs');
const path = require('path');

// Função para criar diretório recursivamente
function mkdirRecursive(dir) {
  if (fs.existsSync(dir)) return;
  
  try {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Diretório criado: ${dir}`);
  } catch (err) {
    console.error(`Erro ao criar diretório ${dir}:`, err);
    throw err;
  }
}

// Função para copiar arquivo
function copyFile(source, target) {
  try {
    fs.copyFileSync(source, target);
    console.log(`Arquivo copiado: ${source} -> ${target}`);
  } catch (err) {
    console.error(`Erro ao copiar arquivo ${source}:`, err);
    throw err;
  }
}

// Função para copiar diretório recursivamente
function copyDir(sourceDir, targetDir) {
  // Criar diretório de destino se não existir
  mkdirRecursive(targetDir);
  
  // Ler conteúdo do diretório
  const items = fs.readdirSync(sourceDir);
  
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Se for diretório, copiar recursivamente
      copyDir(sourcePath, targetPath);
    } else {
      // Se for arquivo, copiar
      copyFile(sourcePath, targetPath);
    }
  }
}

// Diretórios de origem e destino
const sourceDir = path.resolve(__dirname, '../public/images');
const targetDir = path.resolve(__dirname, '../dist/images');

console.log('Iniciando cópia de imagens...');
console.log(`De: ${sourceDir}`);
console.log(`Para: ${targetDir}`);

// Verificar se o diretório de origem existe
if (!fs.existsSync(sourceDir)) {
  console.error(`Diretório de origem não encontrado: ${sourceDir}`);
  process.exit(1);
}

// Copiar diretório
try {
  copyDir(sourceDir, targetDir);
  console.log('Cópia de imagens concluída com sucesso!');
} catch (err) {
  console.error('Erro durante a cópia de imagens:', err);
  process.exit(1);
} 