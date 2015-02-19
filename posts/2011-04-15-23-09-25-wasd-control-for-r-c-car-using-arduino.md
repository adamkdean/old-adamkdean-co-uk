---title: WASD Control for R/C Car using Arduinoslug: wasd-control-for-r-c-car-using-arduinodate: 2011-04-15 23:09tags:  - arduino - remote-control - c---I will comment this more when I get time, just posting the code for a forum right now!

    /* Author: Adam K Dean (imdsm.blogspot.org) */
    using System;
    using System.Windows.Forms;
    using System.IO.Ports;
    using System.Threading;
     
    namespace SerialRC_Car
    {
        public enum ThrottleState { Forward, Reverse, None };
        public enum TurnState { Left, Right, None };
     
        public partial class frmMain : Form
        {
            private Thread readThread;
            private SerialPort _serialPort;
            private bool _continue;
     
            private ThrottleState throttleState = ThrottleState.None;
            private TurnState turnState = TurnState.None;
     
             
            public frmMain()
            {
                InitializeComponent();
                Toggle(false);
            }
     
            private void frmMain_Load(object sender, EventArgs e)
            {
                comboPort.Items.AddRange(SerialPort.GetPortNames());            
            }
     
            private void btnLoad_Click(object sender, EventArgs e)
            {
                try
                {
                    _serialPort = new SerialPort();
     
                    // Allow the user to set the appropriate properties.
                    _serialPort.PortName = comboPort.SelectedItem.ToString();
                    _serialPort.BaudRate = 9600;
                    _serialPort.Parity = Parity.None;
                    _serialPort.Handshake = Handshake.None;
     
                    // Set the read/write timeouts
                    _serialPort.ReadTimeout = 500;
                    _serialPort.WriteTimeout = 500;
     
                    readThread = new Thread(Read);
                    _serialPort.Open();
                    _continue = true;
                    readThread.Start();
     
                    Toggle(true);
                }
                catch (Exception ex)
                {
                    WriteLogText("Exception: {0}", ex.Message);
                }
            }
     
            private void btnStop_Click(object sender, EventArgs e)
            {
                Toggle(false);
     
                _continue = false;
                readThread.Join();
                _serialPort.Close();
            }
     
            private void frmMain_KeyDown(object sender, KeyEventArgs e)
            {
                if (e.KeyCode == Keys.W) btnW_MouseDown(this, null);
                else if (e.KeyCode == Keys.S) btnS_MouseDown(this, null);
                else if (e.KeyCode == Keys.A) btnA_MouseDown(this, null);
                else if (e.KeyCode == Keys.D) btnD_MouseDown(this, null);            
            }
     
            private void frmMain_KeyUp(object sender, KeyEventArgs e)
            {
                if (e.KeyCode == Keys.W) btnW_MouseUp(this, null);
                else if (e.KeyCode == Keys.S) btnS_MouseUp(this, null);
                else if (e.KeyCode == Keys.A) btnA_MouseUp(this, null);
                else if (e.KeyCode == Keys.D) btnD_MouseUp(this, null);
            }
     
            #region Throttle Control
                #region Forward - W
                private void btnW_MouseDown(object sender, MouseEventArgs e)
                {
                    if (throttleState != ThrottleState.Forward)
                    {
                        if (throttleState == ThrottleState.Reverse) btnS_MouseUp(this, null);
                        throttleState = ThrottleState.Forward;
                        _serialPort.Write("blink;w1;");
                    }
                }
     
                private void btnW_MouseUp(object sender, MouseEventArgs e)
                {
                    throttleState = ThrottleState.None;
                    _serialPort.Write("blink;w0;");
                }
                #endregion
     
                #region Reverse - S
                private void btnS_MouseDown(object sender, MouseEventArgs e)
                {
                    if (throttleState != ThrottleState.Reverse)
                    {
                        if (throttleState == ThrottleState.Forward) btnW_MouseUp(this, null);
                        throttleState = ThrottleState.Reverse;
                        _serialPort.Write("blink;s1;");
                    }
                }
     
                private void btnS_MouseUp(object sender, MouseEventArgs e)
                {
                    throttleState = ThrottleState.None;
                    _serialPort.Write("blink;s0;");
                }
                #endregion
            #endregion
     
            #region Steering Control
                #region Left - A
                private void btnA_MouseDown(object sender, MouseEventArgs e)
                {
                    if (turnState != TurnState.Left)
                    {
                        if (turnState == TurnState.Right) btnD_MouseUp(this, null);
                        turnState = TurnState.Left;
                        _serialPort.Write("blink;a1;");
                    }
                }
     
                private void btnA_MouseUp(object sender, MouseEventArgs e)
                {
                    turnState = TurnState.None;
                    _serialPort.Write("blink;a0;");
                }
                #endregion
     
                #region Right - D
                private void btnD_MouseDown(object sender, MouseEventArgs e)
                {
                    if (turnState != TurnState.Right)
                    {
                        if (turnState == TurnState.Left) btnA_MouseUp(this, null);
                        turnState = TurnState.Right;
                        _serialPort.Write("blink;d1;");
                    }
                }
     
                private void btnD_MouseUp(object sender, MouseEventArgs e)
                {
                    turnState = TurnState.None;
                    _serialPort.Write("blink;d0;");
                }
                #endregion
            #endregion
     
            private void WriteLogText(string format, params object[] args)
            {
                WriteLogText(string.Format(format, args));
            }
            private void WriteLogText(string text)
            {
                if (InvokeRequired)
                {
                    Action<string> del = new Action<string>(WriteLogText);
                    Invoke(del, text);
                    return;
                }
     
                if (txtLog.Text.Length == 0) txtLog.Text = text;
                else txtLog.Text += "\r\n" + text;
                if (txtLog.Text.Length > 5000) 
                    txtLog.Text = txtLog.Text.Substring(txtLog.Text.Length - 5000);
                txtLog.SelectionStart = txtLog.Text.Length;
                txtLog.ScrollToCaret();
            }
     
            public void Read()
            {
                while (_continue)
                {
                    try
                    {
                        string message = _serialPort.ReadLine();
                        WriteLogText("RECV> {0}", message);
                    }
                    catch (TimeoutException) { }
                }
            }
     
            private void Toggle(bool enabled)
            {
                comboPort.Enabled = !enabled;
                btnLoad.Enabled = !enabled;
                btnStop.Enabled = enabled;
                btnW.Enabled = enabled;
                btnA.Enabled = enabled;
                btnS.Enabled = enabled;
                btnD.Enabled = enabled;
            }
        }
    }

Arduino code:

    /* Author: Adam K Dean (imdsm.blogspot.org) */
     
    /* Control for RC Car 
     * Adam K Dean 2011
     * adamkdean.co.uk
     */
      
    int led = 13;
     
    int fwd = 11;
    int rev = 10;
    int left = 9;
    int right = 8;
     
    void setup()
    {
      pinMode(led, OUTPUT);
     
      pinMode(fwd, OUTPUT);
      pinMode(rev, OUTPUT);
      pinMode(left, OUTPUT);
      pinMode(right, OUTPUT);
      
      Serial.begin(9600);
      Serial.println("Started..");
    }
       
    void loop()
    { 
      String line = readLineIfAvailable();
       
      if (line.length() > 0 ) Serial.println(line);
           
      if (line == "blink")
      {
        digitalWrite(led, HIGH);
        delay(10);
        digitalWrite(led, LOW);
      }
       
      // forward - w
      if (line == "w1") 
      {
        digitalWrite(fwd, HIGH);    
      } 
      else if (line == "w0") 
      {
        digitalWrite(fwd, LOW);
      } 
       
      // reverse - s
      if (line == "s1") 
      {
        digitalWrite(rev, HIGH);
      } 
      else if (line == "s0") 
      {
        digitalWrite(rev, LOW);
      }
       
      // left - a
      if (line == "a1") 
      {
        digitalWrite(left, HIGH);
      } 
      else if (line == "a0") 
      {
        digitalWrite(left, LOW);
      }
       
      // right - d
      if (line == "d1") 
      {
        digitalWrite(right, HIGH);
      } 
      else if (line == "d0") 
      {
        digitalWrite(right, LOW);
      }  
       
      delay(10);
    }
     
    String readLineIfAvailable()
    {
      String readstr;
       
      while(Serial.available())
      {
        if (Serial.available() > 0)
        {
          char c = Serial.read();
     
          if (c == ';') return readstr;
          else readstr += c;
        }
      }
    }