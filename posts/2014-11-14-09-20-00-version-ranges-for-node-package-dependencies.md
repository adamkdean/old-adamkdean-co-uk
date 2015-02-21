---
title: Version ranges for node package dependencies
slug: version-ranges-for-node-package-dependencies
date: 2014-11-14 9:20
tags:
 - node.js
 - npm
---
I've lifted this from npmjs.org, but here at least I'll find it again.

`version` Must match `version` exactly  
`>version` Must be greater than `version`  
`>=version` etc  
`<version`  
`<=version`  
`~version` "Approximately equivalent to version"  
`^version` "Compatible with version"  
`1.2.x` `1.2.0`, `1.2.1`, etc., but not `1.3.0`  
`http://...` See 'URLs as Dependencies' below  
`*` Matches any version  
`""` (just an empty string) Same as *  
`version1 - version2` Same as `>=version1 <=version2`.  
`range1 || range2` Passes if either `range1` or `range2` are satisfied.  
`git...` See 'Git URLs as Dependencies' below  
`user/repo` See 'GitHub URLs' below  
`tag` A specific version tagged and published as tag `path/path/path` See Local Paths below  

For example, these are all valid:

    { "dependencies" :
        { "foo" : "1.0.0 - 2.9999.9999"
        , "bar" : ">=1.0.2 <2.1.2"
        , "baz" : ">1.0.2 <=2.3.4"
        , "boo" : "2.0.1"
        , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
        , "asd" : "http://asdf.com/asdf.tar.gz"
        , "til" : "~1.2"
        , "elf" : "~1.2.3"
        , "two" : "2.x"
        , "thr" : "3.3.x"
        , "lat" : "latest"
        , "dyl" : "file:../dyl"
        }
    }

Git urls can be of the form:

    git://github.com/user/project.git#commit-ish
    git+ssh://user@hostname:project.git#commit-ish
    git+ssh://user@hostname/project.git#commit-ish
    git+http://user@hostname/project/blah.git#commit-ish
    git+https://user@hostname/project/blah.git#commit-ish

Read more: https://www.npmjs.org/doc/files/package.json.html
