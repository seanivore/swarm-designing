#!/bin/bash
# swarms/dev.sh
# Usage: ./scripts/dev.sh <swarm_name> <agent_name> [port]

set -e

SWARM_NAME=$1
AGENT_NAME=$2
PORT=${3:-3000}

if [ -z "$SWARM_NAME" ] || [ -z "$AGENT_NAME" ]; then
    echo "Usage: ./scripts/dev.sh <swarm_name> <agent_name> [port]"
    echo "Example: ./scripts/dev.sh portfolio-concept-v2 agent-01 3001"
    exit 1
fi

AGENT_DIR="swarms/$SWARM_NAME/$AGENT_NAME"

if [ ! -d "$AGENT_DIR" ]; then
    echo "❌ Error: Agent directory '$AGENT_DIR' not found."
    exit 1
fi

if [ ! -f "$AGENT_DIR/package.json" ]; then
     echo "❌ Error: No package.json found in '$AGENT_DIR'. Is this a code swarm?"
     exit 1
fi

echo "🚀 Starting $AGENT_NAME on port $PORT..."
echo "📂 Directory: $AGENT_DIR"


cd "$AGENT_DIR"

if [ ! -d "node_modules" ]; then
    echo "⚠️  'node_modules' missing. First run? Installing dependencies..."
    npm install
fi

npm run dev -- --port $PORT
