#!/bin/bash

git subtree push --prefix frontend heroku-frontend main
git subtree push --prefix backend heroku-backend main

echo "Deployment finished!"
