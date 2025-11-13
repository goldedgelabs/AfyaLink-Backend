#!/usr/bin/env bash
set -euo pipefail
echo "Install backend deps..."
cd backend || exit 1
npm ci --silent || true
npx prisma generate --schema=shared/prisma/schema.prisma || true
