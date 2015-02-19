---title: XNA style Game class with Python/Pygame slug: xna-style-game-class-with-python-pygamedate: 2013-03-26 16:21tags:  - python - pygames - gamedev---XNA/MonoGame are great. You have such a wealth of classes at your disposable. There have been some great games made with it; [Terraria](http://www.terraria.org/) and [Magicka](http://en.wikipedia.org/wiki/Magicka) among them. But when you just want to visualise something that you're coding, well, it just seems *too much effort*.

Take for example my [Circle primitive class for XNA/MonoGame](http://www.adamkdean.co.uk/blog/read/54/circle-primitive-class-for-xna-monogame). It takes that entire class just to render a circle. You'd think XNA would come with it, but no, not circles. OK, let's just make lines, it comes with easy lines doesn't it. *Not really*. It seems like they didn't really want to offer you a simple solution, instead leaving that stuff up to you. Which is fine if you're making a big application/game, but when you just want to get something onto the screen, there has to be an easier way.

And there is: [Pygames for Python](http://www.pygame.org/). I know, it's just icky high-level pseudo language right. *They don't even use braces!* But it's actually pretty good. It's easy, it's quick, and it's simple.

One thing I do like about XNA is the way the Game class is laid out. I find it really intuitive and nice. So I went ahead and attempted to implement this in Python using Pygames.

Bear in mind this is my first ever real Python script, so it might have a few no-no's in there. Also, you may need [this font](http://www.dafont.com/visitor.font) if you want to run this. Either that or change `"../fonts/visitor1.ttf"` to `None`.

    import sys
    import pygame
    from pygame.locals import * #@UnusedWildImport
    
    class Game:
        def __init__(self, width, height, caption="Game"):
            self.width = width
            self.height = height
            self.caption = caption
            self.framerate = 30        
            self.foreground_color = (255, 255, 255)
            self.background_color = (100, 149, 237)
            self.initialize()
            self.loop()
            
        def initialize(self):
            pygame.init()
            pygame.display.set_caption(self.caption)
            self.screen = pygame.display.set_mode((self.width, self.height))        
            self.font = pygame.font.Font("../fonts/visitor1.ttf", 20)
        
        def loop(self):
            self.clock = pygame.time.Clock()
            while 1:
                gametime = self.clock.get_time()
                self.update(gametime)
                self.render(gametime)
                self.clock.tick(self.framerate)
        
        def update(self, gametime):        
            self.text = self.font.render("FPS: %d" % self.clock.get_fps(), 
                                         1, self.foreground_color)
            self.handle_input(pygame.event.get())
            
        def render(self, gametime):
            surface = pygame.Surface(self.screen.get_size())
            surface.convert()
            surface.fill(self.background_color)
            surface.blit(self.text, (8, 6))        
            self.screen.blit(surface, (0, 0))
            pygame.display.flip()
            
        def handle_input(self, events):
            for event in events:
                if event.type == pygame.QUIT: 
                    sys.exit()
                if event.type == pygame.KEYUP:
                    if event.key == pygame.K_ESCAPE:
                        sys.exit()
                                        
    if __name__ == "__main__":
        game = Game(800, 600, "A test game")

Looks legit to me!

![Looks legit, right?](http://i.imgur.com/Bx27iKL.png)