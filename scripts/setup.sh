#!/bin/bash
# swarms/setup.sh
# Usage: ./scripts/setup.sh <swarm_name> <template_path> <agent_count>

set -e

SWARM_NAME=$1
TEMPLATE_PATH=$2
COUNT=${3:-6} # Default to 6

if [ -z "$SWARM_NAME" ] || [ -z "$TEMPLATE_PATH" ]; then
    echo "Usage: ./scripts/setup.sh <swarm_name> <template_path> [agent_count]"
    echo "Example: ./scripts/setup.sh portfolio-concept-v3 assets/templates/starter-kit 6"
    exit 1
fi

ROOT_DIR=$(pwd)

if [ ! -d "swarms" ]; then
    echo "❌ Error: Please run from the project root (swarms/ directory must exist)."
    exit 1
fi

SWARM_DIR="$ROOT_DIR/swarms/$SWARM_NAME"
STARTER_DIR="$SWARM_DIR/starter"

echo "🔧 Setting up Swarm: $SWARM_NAME"
echo "📂 Template: $TEMPLATE_PATH"
echo "🤖 Agents: $COUNT"

# Create Swarm Directory
mkdir -p "$SWARM_DIR"

# Copy Template to Starter (excluding node_modules)
echo "📦 Creating starter..."
if [ -d "$STARTER_DIR" ]; then
    echo "   ⚠️  Starter already exists. Overwriting..."
    rm -rf "$STARTER_DIR"
fi

# Use rsync for cleaner exclusion
# Ensure source ends with / to copy contents
rsync -avq --exclude 'node_modules' --exclude '.git' "$TEMPLATE_PATH/" "$STARTER_DIR/"

# Scaffold Agents
echo "🏗️  Scaffolding $COUNT agents..."
for i in $(seq 1 $COUNT); do
    NUM=$(printf "%02d" $i)
    AGENT_DIR="$SWARM_DIR/agent-$NUM"
    
    if [ -d "$AGENT_DIR" ]; then
        echo "   ⚠️  agent-$NUM already exists. Skipping."
        continue
    fi
    
    # echo "   clone -> agent-$NUM"
    cp -r "$STARTER_DIR" "$AGENT_DIR"
done

echo "✅ Setup complete for $SWARM_NAME."
echo "👉 Next: ./scripts/install.sh $SWARM_NAME"
