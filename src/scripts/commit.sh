#!/bin/bash

echo "Making a commit!"

npm run prettier

git add .

read -p "Message: " msg

git commit -m "$msg"

git push origin main