---title: Circle primitive class for XNA/MonoGameslug: circle-primitive-class-for-xna-monogamedate: 2013-03-24 22:08tags:  - c - xna - monogame - gamedev---I've just been playing a little with XNA (or MonoGame as it's called these days) and needed to draw circles. If you've used XNA then you'll know that nothing like that is provided for you. Drawing circles isn't too difficult really, they're basically just lots of little lines at different angles.

I've come up with the following class. <del>It has a default number of points harcoded but you can overload that, allowing you to create triangles, rectangles, pentagons, hexagons etc.</del>

**Update:** The number of points now is determined by the radius of the circle. The current calculation of `Radius * Math.PI` seems to work just fine. I don't know if there is any "golden" ratio, but I'm fine with this one.

Note, I've adopted my new style of putting fields at the bottom of the class. I like it, you get to the code much quicker.

    public class Circle
    {        
        public Circle(float x, float y, int radius, 
            GraphicsDeviceManager graphics)
            : this(x, y, radius, Color.White, graphics) { }

        public Circle(float x, float y, int radius, 
            Color color, GraphicsDeviceManager graphics)            
        {
            this.x = x; 
            this.y = y; 
            this.radius = radius; 
            this.color = color;            
            this.graphics = graphics;

            Initialize();
        }

        public void Draw()
        {
            effect.CurrentTechnique.Passes[0].Apply();
            graphics.GraphicsDevice.DrawUserPrimitives
                (PrimitiveType.LineStrip, vertices, 0, vertices.Length - 1);
        }        

        private void Initialize()
        {
            InitializeBasicEffect();
            InitializeVertices();
        }

        private void InitializeBasicEffect()
        {
            effect = new BasicEffect(graphics.GraphicsDevice);
            effect.VertexColorEnabled = true;
            effect.Projection = Matrix.CreateOrthographicOffCenter
                (0, graphics.GraphicsDevice.Viewport.Width,
                 graphics.GraphicsDevice.Viewport.Height, 0,
                 0, 1);
        }

        private void InitializeVertices()
        {
            vertices = new VertexPositionColor[CalculatePointCount()];
            var pointTheta = ((float)Math.PI * 2) / (vertices.Length - 1);
            for (int i = 0; i < vertices.Length; i++)
            {
                var theta = pointTheta * i;
                var x = X + ((float)Math.Sin(theta) * Radius);
                var y = Y + ((float)Math.Cos(theta) * Radius);
                vertices[i].Position = new Vector3(x, y, 0);
                vertices[i].Color = Color;
            }
            vertices[vertices.Length - 1] = vertices[0];
        }

        private int CalculatePointCount()
        {            
            return (int)Math.Ceiling(Radius * Math.PI);
        }

        private GraphicsDeviceManager graphics;
        private VertexPositionColor[] vertices;
        private BasicEffect effect;

        private float x;
        public float X
        {
            get { return x; }
            set { x = value; InitializeVertices(); }            
        }
        private float y;
        public float Y
        {
            get { return y; }
            set { y = value; InitializeVertices(); }
        }
        private float radius;
        public float Radius
        {
            get { return radius; }
            set { radius = (value < 1) ? 1 : value; InitializeVertices(); }
        }
        private Color color;
        public Color Color
        {
            get { return color; }
            set { color = value; InitializeVertices(); }
        }
        public int Points
        {
            get { return CalculatePointCount(); }
        }        
    }

Using it is *really* easy. Create a `Circle`, and call `circleObject.Draw()`. 

    Circle circle;

    protected override void Initialize()
    {
        // X, Y, Radius, Color (optional), GraphicsDeviceManager
        circle = new Circle(100f, 100f, 50f, Color.Violet, graphics);

        base.Initialize();
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.Black);

        circle.Draw();

        base.Draw(gameTime);
    }

You can change the radius and the position of the Circle via the properties. I'll probably add the ability to rotate it.

I might add this and other primitive helper classes to a class library. If so I'll link it here in the future.

Below: four circles of varying size and number of points.

![four circles of varying size and number of points](http://i.imgur.com/XdgKFkN.jpg)

*Updated: 25th March 2013*