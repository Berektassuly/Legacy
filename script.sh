#!/bin/bash

# Создание корневой папки
mkdir -p legacy-protocol-sbt
cd legacy-protocol-sbt || exit

# Основные файлы
touch .gitignore README.md package.json

# Anchor структура
mkdir -p anchor/programs/sbt-program/src/{instructions,state} \
         anchor/tests \
         anchor/migrations \
         anchor/target/deploy
touch anchor/Anchor.toml \
      anchor/Cargo.toml \
      anchor/.gitignore \
      anchor/programs/sbt-program/Cargo.toml \
      anchor/programs/sbt-program/src/lib.rs \
      anchor/programs/sbt-program/src/instructions/mint_sbt.rs \
      anchor/programs/sbt-program/src/state/sbt_account.rs \
      anchor/tests/sbt-program.ts \
      anchor/migrations/deploy.ts \
      anchor/target/deploy/sbt_program-keypair.json

# Frontend (Next.js)
mkdir -p app/src/{components/ui,pages/profile,utils,styles} app/public app/.next
touch app/package.json \
      app/next.config.js \
      app/tailwind.config.js \
      app/tsconfig.json \
      app/.env.local \
      app/src/components/WalletProvider.tsx \
      app/src/components/SbtCard.tsx \
      app/src/components/MintForm.tsx \
      app/src/components/ui/Button.tsx \
      app/src/components/ui/Input.tsx \
      app/src/pages/_app.tsx \
      app/src/pages/_document.tsx \
      app/src/pages/index.tsx \
      app/src/pages/issuer.tsx \
      app/src/pages/profile/[wallet].tsx \
      app/src/utils/anchor.ts \
      app/src/utils/constants.ts \
      app/src/utils/types.ts \
      app/src/styles/globals.css \
      app/public/favicon.ico \
      app/public/logo.png

# Документация
mkdir -p docs/screenshots
touch docs/DEPLOY.md docs/DEMO.md

echo "✅ Структура проекта legacy-protocol-sbt успешно создана!"
