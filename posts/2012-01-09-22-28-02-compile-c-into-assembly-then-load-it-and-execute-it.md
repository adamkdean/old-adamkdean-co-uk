---title: Compile C# into assembly, then load it and execute itslug: compile-c-into-assembly-then-load-it-and-execute-itdate: 2012-01-09 22:28tags:  - c - codedom - reflection---This is one way I have found that I can compile code at runtime into a DLL file, then load it and call it. 

The code I will be compiling is this:

    class FruitVendor
    {
        private string fruits = "";
     
        public FruitVendor()
        {
            fruits = "apples & bananas";
        }
     
        public string GetFruit()
        {
            return fruits;
        }
    }

I have two texts boxes, one for input and one for output. And in order to compile & run it, I do this:

    using System;
    using System.Drawing;
    using System.Windows.Forms;
    using System.Reflection;
    using System.CodeDom.Compiler;
     
    namespace ProjectName
    {
        public partial class frmMain : Form
        {
            public frmMain()
            {
                InitializeComponent();
            }
     
            private void button1_Click(object sender, EventArgs e)
            {
                CodeDomProvider codeProvider = CodeDomProvider.CreateProvider("CSharp");
                string outputFilename = "fruits.dll";
                Button ButtonObject = (Button)sender;
                 
                System.CodeDom.Compiler.CompilerParameters parameters = new CompilerParameters();            
                parameters.GenerateExecutable = false;
                parameters.OutputAssembly = outputFilename;
                CompilerResults results = codeProvider.CompileAssemblyFromSource(parameters, textBox1.Text);
     
                if (results.Errors.Count > 0)
                {
                    textBox2.Text = "";
                    textBox2.ForeColor = Color.Red;                
                    foreach (CompilerError CompErr in results.Errors)
                    {
                        textBox2.Text = textBox2.Text +
                            "Line number " + CompErr.Line +
                            ", Error Number: " + CompErr.ErrorNumber +
                            ", '" + CompErr.ErrorText + ";" +
                            Environment.NewLine + Environment.NewLine;
                    }
                }
                else
                {
                    textBox2.ForeColor = Color.Black;
     
                    string path = System.Environment.CurrentDirectory + "\\" + outputFilename;
                    Assembly assembly = Assembly.LoadFrom(path);
                    Type type = assembly.GetType("FruitVendor");
                    MethodInfo mi = type.GetMethod("GetFruit");
                    object result = mi.Invoke(Activator.CreateInstance(type), null);                
     
                    textBox2.Text = (string)result; ;
                }
            }
     
        }
    }

It works a treat and is pretty quick too. Thanks to everyone over at [StackOverflow](http://www.stackoverflow.com/), this [thread helped a lot](http://stackoverflow.com/questions/8788338/is-there-a-way-i-can-parse-run-c-sharp-within-an-application-almost-like-a-scri)!