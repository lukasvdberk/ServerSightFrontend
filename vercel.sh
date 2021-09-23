#!/bin/bash
echo "export const BASE_MEDIA_URL = 'https://serversight.lukas.sh/assets/'" >> src/config.ts
echo "export const BASE_API_URL = 'https://serversight.lukas.sh/api/'" >> src/config.ts
sapper export
