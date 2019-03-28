#!/bin/bash

# Manage git easily

set -e

sd=$(dirname $(readlink -f "$0"))

getArgument(){
    if [ "${1}" == "" ] || [ "${1}" == "help" ] || [ "${1}" == "-h" ]; then
        echo "Usage: bash $0 COMMAND"
        echo "e.g. bash $0 prune ==> Prune any branches from your local that have been merged or deleted in remote"
        echo "e.g. bash $0 create DEVOPS-1 ==> Create a new git branch, checks it out, and publishes the branch"
        exit 1
    elif [ "${1}" == "prune" ]; then
        prune "$2"
    elif [ "${1}" == "create" ]; then
        changeOwn && create "$2"
    else
        echo "Invalid argument: ${1}"
    fi
}

changeOwn(){
    sudo chown -R "${USER}":"${USER}" "${sd}"/*
}

create(){
    git checkout develop
    git pull
    git checkout -b "$1"
    git push origin "$1"
}

prune(){
    git branch --merged | grep -v "*" | grep -v "develop" | xargs git branch -d
}

getArgument "$1" "$2"
