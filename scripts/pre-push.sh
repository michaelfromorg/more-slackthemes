#!/bin/sh

# Store the current stash state
STASH_OUTPUT=$(git stash create)

# Try to build the project
echo "Running build before push..."
npm run build

# Store the build result
BUILD_RESULT=$?

# If there were stashed changes, apply them back
if [ -n "$STASH_OUTPUT" ]; then
    git stash apply $STASH_OUTPUT >/dev/null 2>&1
fi

# If build failed, prevent the push
if [ $BUILD_RESULT -ne 0 ]; then
    echo "❌ Build failed. Push aborted."
    exit 1
fi

echo "✅ Build successful. Proceeding with push..."
exit 0
