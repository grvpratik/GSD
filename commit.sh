#!/bin/bash

declare -A emoji_map=(
    ["core"]="🔧"
    ["ui"]="🎨"
    ["docs"]="📝"
    ["fix"]="🐛"
    ["test"]="✅"
)

PS3="Select commit type (use arrow keys and press Enter): "

options=("core" "ui" "docs" "fix" "test" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "core")
            type_key="core"
            break
            ;;
        "ui")
            type_key="ui"
            break
            ;;
        "docs")
            type_key="docs"
            break
            ;;
        "fix")
            type_key="fix"
            break
            ;;
        "test")
            type_key="test"
            break
            ;;
        "Quit")
            echo "Commit canceled."
            exit 0
            ;;
        *)
            echo "Invalid option $REPLY"
            ;;
    esac
done

read -p "Enter your commit message: " message
emoji=${emoji_map[$type_key]}

git add .
git commit -m "$type_key $emoji: $message"
git push


echo "Committed with $type_key $emoji: $message"
