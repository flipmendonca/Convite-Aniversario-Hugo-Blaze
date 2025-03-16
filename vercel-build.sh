#!/bin/bash

# Executar o build padrão
npm run build

# Garantir que a pasta de imagens seja copiada corretamente
if [ -d "public/images" ]; then
  mkdir -p dist/images
  cp -r public/images/* dist/images/
  echo "Imagens copiadas com sucesso!"
else
  echo "Pasta de imagens não encontrada!"
fi

# Verificar se o build foi concluído com sucesso
if [ -d "dist" ]; then
  echo "Build concluído com sucesso!"
else
  echo "Erro no build!"
  exit 1
fi 