#!/bin/bash
# swarms/install.sh
# Usage: ./scripts/install.sh <swarm_name>

set -e

SWARM_NAME=$1

if [ -z "$SWARM_NAME" ]; then
    echo "Usage: ./scripts/install.sh <swarm_name>"
    exit 1
fi

if [ ! -d "swarms" ]; then
    echo "❌ Error: Please run from the project root."
    exit 1
fi

SWARM_DIR="swarms/$SWARM_NAME"

if [ ! -d "$SWARM_DIR" ]; then
    echo "❌ Error: Swarm directory '$SWARM_DIR' not found."
    exit 1
fi

echo "📦 Installing dependencies for $SWARM_NAME..."

# Use globbing for safety
# Checks starter and all agent-* directories
for dir in "$SWARM_DIR"/starter "$SWARM_DIR"/agent-*; do
    [ -d "$dir" ] || continue
    
    # Check if package.json exists to avoid errors
    if [ -f "$dir/package.json" ]; then
        echo "   🚀 Installing in $(basename "$dir")..."
        (cd "$dir" && npm install > /dev/null 2>&1) &
    else
        echo "   ⚠️  Skipping $(basename "$dir") (no package.json)"
    fi
done

echo "⏳ Waiting for background tasks..."
wait

echo "✅ All installations complete."
