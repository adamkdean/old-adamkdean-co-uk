---title: Alternative to Game Screen Management - An Exampleslug: alternative-to-game-screen-management-an-exampledate: 2011-08-26 23:15tags: - gamedev - xna - csharp---So just to give you an example of how clean you can make your code, let us look at a very simple menu screen, which simply asks for any key to be pressed. As you can see, it's -very- clean.

I also love #region's as well, best thing since line numbers.

For more information on my game Space Rocks - visit my newly designed (I'm working on it okay!) website at www.adamkdean.co.uk

(Update: game is no longer there, this post is here for history.)

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Audio;
    using Microsoft.Xna.Framework.Content;
    using Microsoft.Xna.Framework.GamerServices;
    using Microsoft.Xna.Framework.Graphics;
    using Microsoft.Xna.Framework.Input;
    using Microsoft.Xna.Framework.Media;

    namespace SpaceRocks
    {
        class MenuScreen : IScreen
        {
            #region Variables
            private VariableService vars;

            private SpriteFont font;
            private Texture2D mainBackground;
            #endregion

            #region Constructor Methods
            public MenuScreen(Game game)
            {
                vars = ServiceExtensionMethods
                    .GetService<variableservice>(game.Services);

                LoadContent();
            }

            private void LoadContent()
            {
                mainBackground = vars.Content.Load<texture2d>("Images/background");
                font = vars.Content.Load<spritefont>("Fonts/Menu");
            }
            #endregion

            #region Update Methods
            public void Update(GameTime gameTime)
            {
                UpdateInput();
            }

            private void UpdateInput()
            {
                if (Keyboard.GetState().GetPressedKeys().Length > 0)
                    vars.CurrentScreen = new GameScreen(vars.Game);
            }
            #endregion

            #region Draw Methods
            public void Draw(GameTime gameTime)
            {
                vars.GraphicsDevice.Clear(Color.Black);

                vars.SpriteBatch.Begin();

                DrawBackground();
                DrawText();

                vars.SpriteBatch.End();
            }

            private void DrawBackground()
            {
                vars.SpriteBatch.Draw(mainBackground, Vector2.Zero, Color.White);
            }

            private void DrawText()
            {
                string text = "Press any key to begin..";
                Vector2 textSize = font.MeasureString(text);

                int x = vars.GraphicsDevice.Viewport.Width / 2 - (int)textSize.X / 2;
                int y = vars.GraphicsDevice.Viewport.Height / 2 - (int)textSize.Y / 2;

                vars.SpriteBatch.DrawString(font, text,
                    new Vector2(x, y), Color.White);
            }
            #endregion
        }
    }

For anyone wondering why there are some tags at the end of certain code posts, it's because the awesome script I use cannot handle generics :(
