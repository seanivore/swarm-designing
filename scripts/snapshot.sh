#!/bin/bash
# swarms/snapshot.sh
# Usage: ./scripts/snapshot.sh <swarm_name> [label]

set -e

SWARM_NAME=$1
LABEL=${2:-$(date +%Y-%m-%d_%H-%M-%S)}

if [ -z "$SWARM_NAME" ]; then
    echo "Usage: ./scripts/snapshot.sh <swarm_name> [label]"
    exit 1
fi

if [ ! -d "swarms" ]; then
    echo "❌ Error: Please run from the project root."
    exit 1
fi

SWARM_DIR="swarms/$SWARM_NAME"
SNAPSHOT_DIR="$SWARM_DIR/snapshots/$LABEL"

if [ ! -d "$SWARM_DIR" ]; then
    echo "❌ Error: Swarm $SWARM_NAME not found."
    exit 1
fi

echo "📸 Snapshotting $SWARM_NAME to snapshots/$LABEL..."
mkdir -p "$SNAPSHOT_DIR"

# Loop through agents
for dir in "$SWARM_DIR"/agent-*; do
    [ -d "$dir" ] || continue
    AGENT_NAME=$(basename "$dir")
    
    echo "   Capturing $AGENT_NAME..."
    mkdir -p "$SNAPSHOT_DIR/$AGENT_NAME"
    
    # Copy all files except node_modules, .git, and tmp
    rsync -avq --exclude 'node_modules' --exclude '.git' --exclude 'tmp' "$dir/" "$SNAPSHOT_DIR/$AGENT_NAME/"
done

echo "✅ Snapshot complete: $SNAPSHOT_DIR"
