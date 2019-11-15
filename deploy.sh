#!/usr/bin/env sh

yarn docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:phiny1/v-currency-field.git master:gh-pages

cd ..
cd ..
cd ..