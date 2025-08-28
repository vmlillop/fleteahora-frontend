#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.."; pwd)"
mkdir -p "$ROOT/.next/standalone/.next"
mkdir -p "$ROOT/.next/standalone/public"
rsync -a "$ROOT/.next/static" "$ROOT/.next/standalone/.next/" 2>/dev/null || true
rsync -a "$ROOT/public/" "$ROOT/.next/standalone/public/" 2>/dev/null || true
echo "[postbuild] static y public sincronizados a .next/standalone"
