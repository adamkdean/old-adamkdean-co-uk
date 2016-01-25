---
title: Clutter free Unity/VSCode
slug: clutter-free-unity-vscode
date: 2016-01-24 14:33
tags: 
 - unity
 - vscode
 - ocd
---

So, it's 2016. It's been over two months since my last post. I've just been so busy recently, with work being emotionally tiring and with a baby on the way, I've just been busy with real life and not really had much chance to do much else. I've decided that I need to enjoy programming. I need to use my ability for good. So I'm going to make games.

I've dabbled in game development before but it's always been unchannelled, uncontrolled, and that isn't a good thing. The first step to being able to enjoy something is to enjoy your environment, and for us devs, that means our development environment. I'm using OS X, so things are sometimes different to 90% of the internet. Unity ships with MonoDevelop, which fair enough, does it's job, but it's pretty shit. Luckily, VSCode works on OS X and though I'm now a convert, I have always like Visual Studio ever since I started using it 16 years ago with VB6.

A chap named [@reapazor](http://twitter.com/reapazor) wrote a [VSCode integration script for Unity](https://github.com/dotBunny/VSCode) which works really well, but my OCD goes wild at all the miscellaneous files which show up in the treeview. It just doesn't look good. Note: I had to install VSCode from the asset store for it to work properly.

![Cluttered treeview](https://i.imgur.com/SCn3crd.png)

This can be fixed by exlcuding a few files/directories in your user `settings.json` file (which you can access with `cmd` + `,`). If you ever need to access these files, just remove them from the exclusion list.

**Update** I've realised just now (25/01/16 14:39) that the VSCode plugin actually has an option to do this for you, in the preferences, "Write Workspace Settings". I guess it didn't jump out at me at the time but this also works. All you need to do is append two lines to the `.vscode/settings.json` file to clear up a few other files you may not want to see:

    "**/*.csproj":true,
    "**/*.sln":true

The full list is at the end of this post. It will result in lower blood pressure:

![Lower blood pressure with Unity + VSCode](https://i.imgur.com/0Dtf4ep.png)

Well, hopefully I'll be posting some interesting posts this year. I'll be using C# for game dev, ES6 at work, and with a baby on the way, there will be lots of non-computer related discoveries too I'm sure.

Here is to a great 2016, and here is your complete `settings.json` file:

    {
        "files.exclude":
        {
            "**/.DS_Store":true,
            "**/.git":true,
            "**/.gitignore":true,
            "**/.gitmodules":true,
            "**/*.booproj":true,
            "**/*.pidb":true,
            "**/*.suo":true,
            "**/*.user":true,
            "**/*.userprefs":true,
            "**/*.unityproj":true,
            "**/*.dll":true,
            "**/*.exe":true,
            "**/*.pdf":true,
            "**/*.mid":true,
            "**/*.midi":true,
            "**/*.wav":true,
            "**/*.gif":true,
            "**/*.ico":true,
            "**/*.jpg":true,
            "**/*.jpeg":true,
            "**/*.png":true,
            "**/*.psd":true,
            "**/*.tga":true,
            "**/*.tif":true,
            "**/*.tiff":true,
            "**/*.3ds":true,
            "**/*.3DS":true,
            "**/*.fbx":true,
            "**/*.FBX":true,
            "**/*.lxo":true,
            "**/*.LXO":true,
            "**/*.ma":true,
            "**/*.MA":true,
            "**/*.obj":true,
            "**/*.OBJ":true,
            "**/*.asset":true,
            "**/*.cubemap":true,
            "**/*.flare":true,
            "**/*.mat":true,
            "**/*.meta":true,
            "**/*.prefab":true,
            "**/*.unity":true,
            "build/":true,
            "Build/":true,
            "Library/":true,
            "library/":true,
            "obj/":true,
            "Obj/":true,
            "ProjectSettings/":true,
            "temp/":true,
            "Temp/":true,
            "**/*.csproj":true,
            "**/*.sln":true
        }
    }
