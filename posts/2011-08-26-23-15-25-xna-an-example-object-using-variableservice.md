---

    using System;
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    namespace SpaceRocks
    {
        public class ExampleObject
        {
            #region Variables
            private VariableService vars;

            public Texture2D Texture { get; set; }
            public int Width { get { return Texture.Width; } }
            public int Height { get { return Texture.Height; } }

            public Vector2 Position { get; set; }
            #endregion

            #region Constructor Methods
            public ExampleObject(Game game)
            {
                vars = ServiceExtensionMethods
                    .GetService<variableservice>(game.Services);
            }

            public void Initialize(Texture2D texture, Vector2 position)
            {
                Texture = texture;
                Position = position;
            }
            #endregion

            #region Update Methods
            public void Update(GameTime gameTime)
            {
                //
            }
            #endregion

            #region Draw Methods
            public void Draw(GameTime gameTime)
            {
                //
            }
            #endregion
        }
    }