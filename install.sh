sync_copy() {
  local src="$1" dst="$2"
  mkdir -p "$dst"
  rsync -a --delete "$src"/ "$dst"/
}

# Update .gitignore with deployed paths
GITIGNORE="${SHOP_ROOT}/.gitignore"
echo ""
echo "Updating .gitignore to exclude deployed files..."

for pair in "${MAP[@]}"; do
  IFS='|' read -r target source <<<"$pair"
  add_to_gitignore "$target" "$GITIGNORE"
done

for pair in "${FILES[@]}"; do
  IFS='|' read -r target source <<<"$pair"
  add_to_gitignore "$target" "$GITIGNORE"
done

add_to_gitignore() {
  local path="$1"
  local gitignore="$2"

  # Create .gitignore if it doesn't exist
  if [ ! -f "$gitignore" ]; then
    echo "Creating .gitignore at $gitignore"
    touch "$gitignore"
  fi

  # Check if path already exists in .gitignore
  if ! grep -qxF "$path" "$gitignore" && ! grep -qxF "/$path" "$gitignore"; then
    echo "Adding '$path' to .gitignore"
    echo "$path" >> "$gitignore"
  fi
}
