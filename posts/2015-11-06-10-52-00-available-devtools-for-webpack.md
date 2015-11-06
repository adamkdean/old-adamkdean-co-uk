---
title: Available devtools for webpack
slug: available-devtools-for-webpack
date: 2015-11-06 10:52
tags: 
 - node.js
 - webpack
---

In case the webpack docs ever lose this, here is a list of available devtools. Choose a developer tool to enhance debugging.

`eval` - Each module is executed with `eval` and `//@ sourceURL`.  
`source-map` - A SourceMap is emitted. See also `output.sourceMapFilename`.  
`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle.  
`inline-source-map` - A SourceMap is added as DataUrl to the JavaScript file.  
`eval-source-map` - Each module is executed with `eval` and a SourceMap is added as DataUrl to the `eval`.  
`cheap-source-map` - A SourceMap without column-mappings. SourceMaps from loaders are not used.  
`cheap-module-source-map` - A SourceMap without column-mappings. SourceMaps from loaders are simplified to a single mapping per line.  

Prefixing `@`, `#` or `#@` will enforce a pragma style. (Defaults to `#`, recommended)  

Combinations are possible. `hidden`, `inline`, `eval` and pragma style are exclusive.  
i. e. `cheap-module-inline-source-map`, `cheap-eval-source-map`, `#@source-map`
