#!/bin/sh

# Script to re-release a tagged release in subversion
# Deletes the specified tagged release and recreates
# it from trunk

if [ $# -ne 1 ]
then
  echo "Usage: $0 <version>"
  exit 1
fi

svn delete https://echopoint.dev.java.net/svn/echopoint/tags/$1 \
  -m "Deleting release: $1 of library for rerelease"

svn copy https://echopoint.dev.java.net/svn/echopoint/trunk \
  https://echopoint.dev.java.net/svn/echopoint/tags/$1 \
  -m "Created re-release: $1 of library"
