#!/bin/bash

# 1. Initialize Git (if not already done)
if [ ! -d ".git" ]; then
    git init
    echo "Initialized empty Git repository."
fi

# 2. Add all files
git add .
echo "Added all files to staging."

# 3. Commit
git commit -m "Initial portfolio commit"
echo "Committed files."

# 4. Instructions for the user
echo ""
echo "--------------------------------------------------------"
echo "GREAT! Your local code is ready."
echo "--------------------------------------------------------"
echo "NOW, GO TO GITHUB.COM AND:"
echo "1. Create a new repository named 'harshitha-portfolio'"
echo "2. Don't add README/gitignore (keep it empty)"
echo "3. Copy the 3 lines under '…or push an existing repository from the command line'"
echo ""
echo "They will look like this (PASTE THESE IN TERMINAL):"
echo "git remote add origin https://github.com/YOUR_USERNAME/harshitha-portfolio.git"
echo "git branch -M main"
echo "git push -u origin main"
echo "--------------------------------------------------------"
