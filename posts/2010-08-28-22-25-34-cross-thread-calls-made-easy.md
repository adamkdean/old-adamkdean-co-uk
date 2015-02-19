---title: Cross thread calls made easyslug: cross-thread-calls-made-easydate: 2010-08-28 22:25tags:  - c - winforms - multithreading - threading - delegates - thread-safety---**Update (27/06/2013):** New blog post regarding parameterized calls - [Cross thread calls made easier](http://www.adamkdean.co.uk/blog/read/69/cross-thread-calls-made-easier).

We've all had the problem, we're trying to do something and the form locks up, so we decide it's come to that time where we have to use another thread. Great, spaghetti code awaits. We get a coffee and we set to, eventually coming up with an awesome multi-threaded solution which keeps our form redrawing whilst we process what we're processing... except for when we try to update the form and get the **dreaded Cross-thread operation not valid: Control accessed from a thread other than the thread it was created on.**

It may seem the quickest fix, but please don't under any circumstance use this recipe for disaster, ever.

    Form1.CheckForIllegalCrossThreadCalls = false; // this is bad!

The situation isn't as dire as it first seems, read on and you'll see how to quickly fix this. In no time it'll become second nature. The first snippet applies if you have to pass parameters to a control, for example, you want to write text to a textbox:

    using System;
    using System.Windows.Forms;
    using System.Threading;
     
    namespace CrossThreadCalls
    {
        public partial class Form1 : Form
        {
            public Form1()
            {
                InitializeComponent();
            }
     
            private delegate void ObjectDelegate(object obj);        
     
            private void button1_Click(object sender, EventArgs e)
            {
                // first thing we do is create a delegate pointing to update method
                ObjectDelegate del = new ObjectDelegate(UpdateTextBox);
     
                // then simply enough, we invoke it
                del.Invoke("Hello from button1_Click!");
     
                // if we wanted to create a thread to use it, we'd use a
                // params threadstart and pass the delegate as an object
                Thread th = new Thread(new ParameterizedThreadStart(WorkThread));
                th.Start(del);
            }
     
            private void WorkThread(object obj)
            {
                // we would then unbox the obj into the delegate
                ObjectDelegate del = (ObjectDelegate)obj;
     
                // and invoke it like before
                del.Invoke("Hello from WorkThread!");
            }
     
            private void UpdateTextBox(object obj)
            {
                // do we need to switch threads?
                if (InvokeRequired)
                {
                    // we then create the delegate again
                    // if you've made it global then you won't need to do this
                    ObjectDelegate method = new ObjectDelegate(UpdateTextBox);
     
                    // we then simply invoke it and return
                    Invoke(method, obj);
                    return;
                }
     
                // ok so now we're here, this means we're able to update the control
                // so we unbox the object into a string
                string text = (string)obj;
     
                // and update
                textBox1.Text += text + "\r\n";
            }
        }
    }

Now lets say you simply want to run a method which doesn't take any arguments, things get much easier now. As with before we invoke the method, but there is no need for delegates:

    using System;
    using System.Windows.Forms;
    using System.Threading;
     
    namespace TestApp2
    {
        public partial class Form2 : Form
        {
            public Form2()
            {
                InitializeComponent();
            }  
     
            private void button1_Click(object sender, EventArgs e)
            {
                // no delegates are needed here
                UpdateTextBox();
     
                // just to show what it'd be like from another thread
                // we create a standard thread without params
                Thread th = new Thread(new ThreadStart(WorkThread));
                th.Start();
            }
     
            private void WorkThread()
            {
                // we have no params, so just call the method
                UpdateTextBox();
            }
     
            private void UpdateTextBox()
            {
                // do we need to switch threads?
                if (InvokeRequired)
                {
                    // slightly different now, as we dont need params
                    // we can just use MethodInvoker
                    MethodInvoker method = new MethodInvoker(UpdateTextBox);
                    Invoke(method);
                    return;
                }
     
                // as we didn't take a param, we just update
                textBox1.Text += "Hello world!\r\n";
            }
        }
    }

So as you see, it's actually quite easy. If you're a bit confused by some of the things I've used here, post a comment, or read more on [boxing and unboxing](http://www.google.co.uk/#hl=en&q=csharp+boxing+unboxing) and [threading](http://www.google.co.uk/#hl=en&q=csharp+threading).

If you're having difficulties, come and ask us at [Dream.In.Code](http://www.dreamincode.net/forums/forum/84-c%23/).