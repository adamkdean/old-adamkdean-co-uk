---
title: Node.js IsDirectory 
slug: node-js-is-directory
date: 2015-08-12 13:12
tags:
 - node.js
 - snippet
---

Here's a useful snippet for checking if a path is a directory in Node.js, this obviously requires('fs').

    fs.lstatSync(path_string).isDirectory()
    
Also available to you:

    fs.lstatSync(path_string).isFile()
    fs.lstatSync(path_string).isDirectory()
    fs.lstatSync(path_string).isBlockDevice()
    fs.lstatSync(path_string).isCharacterDevice()
    fs.lstatSync(path_string).isSymbolicLink() (only valid with fs.lstat())
    fs.lstatSync(path_string).isFIFO()
    fs.lstatSync(path_string).isSocket()
