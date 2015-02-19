---title: Import content using MonoGame & XNAslug: import-content-using-monogame-xnadate: 2014-04-13 12:12tags:  - gamedev - monogame - xna - c - braindump---So I knew this was coming. I knew there would be issues with the content pipeline, long lost roots reaching back down into the abyss of XNA and unmaintained Microsoft projects. Game development is all about challenges. It's the reason I love it. Everything pushes you to the limit; mentally, physically, emotionally.

My first challenge is to get a MonoGame project up and running with the XNA pipeline. Luckily, the folks over at MonoGame have put a lot of effort into this already, and so it's quite straight forward. Then again, everything is once you've figured it out. Working against me is a fragmented web of outdated tutorials and insufficient documentation.

I am using Visual Studio 2012. I have Windows Phone SDK installed, which allowed me to install XNA Game Studio 4.0. I have also installed the Visual Studio 2012 XNA refresh extension, allowing me to do everything in VS2012. Finally, I have MonoGame installed.

I have created a project named Alpha, first of it's kind. In there I have added two new projects: a MonoGame Content Project, and a MonoGame Windows Project. The content project will create two projects. One will be called `%name%` and is an XNA content project, the other will be called `%name%Content` and is a MonoGame content project. I used the name Alpha, which gave me Alpha and AlphaContent. The MonoGame Windows Project will simply create a single project. I called it AlphaGame.

So now I have three projects: Alpha (XNA content), AlphaContent (MonoGame content), and AlphaGame (MonoGame windows).

The reason we need so much is because we rely on XNA to convert our content into XNA/MonoGame ready content. Once you're setup, you won't even need to worry about the particulars though. It's all very, very neat.

I've created two files; blue.png and green.png. I have a separate directory called assets which isn't part of the Visual Studio solution. I'll keep all my content here, and copy it when it's ready to the solution. To import them into the solution, I simply drag them into the Solution Explorer. We want them to belong to the `AlphaContent` project (the MonoGame content one).

Now when the project builds, they will be converted to XNA content. But we want to be able to access them in our AlphaGame.

Open up AlphaGame.csproj in a text editor. I use Sublime. At the bottom, we want to add in an AfterBuild script.

    <Target Name="AfterBuild">
        <ItemGroup>
            <ContentSource Include="..\Alpha\Alpha\bin\PSM\Content\**\*.*" />
        </ItemGroup>
        <Copy SourceFiles="@(ContentSource)" DestinationFolder="$(TargetDir)\Content\%(RecursiveDir)" SkipUnchangedFiles="true" />
    </Target>

You may need to change some paths to suit your project.

When we now rebuild our entire solution, we will get the following:

    1>AfterBuild:
    1>  Copying file from "..\Alpha\Alpha\bin\PSM\Content\Artwork\blue.xnb" to "C:\Users\Adam\Desktop\AlphaGame\src\AlphaGame\bin\Windows\Debug\\Content\Artwork\blue.xnb".
    1>  Copying file from "..\Alpha\Alpha\bin\PSM\Content\Artwork\green.xnb" to "C:\Users\Adam\Desktop\AlphaGame\src\AlphaGame\bin\Windows\Debug\\Content\Artwork\green.xnb".

Now we can easily load the content like so:

    protected override void LoadContent()
    {
        this.Content.Load<Texture2D>("Artwork/blue");
    }

This post may not be as easy to read as some of my others. Most of the time I ponder of what I'm writing, making sure to produce easy to read content. But my head is in game development, so I'm just doing a braindump. I'm going to start tagging these posts as `braindump`s.

P.S, make sure you set the game project to rely on the content project by right clicking the solution and going to build order, and setting the game project to depending on the content project.