import java.awt.BorderLayout;
import java.awt.Canvas;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Graphics;
//import java.awt.Image;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.*;//JButton;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;

//import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
//import java.net.URL;
//import javax.imageio.ImageIO;

/* TMatch */


final class TMatch extends TSubject 
{
	public TMatch(int AX, int AY, Graphics Where )
	{
		//   Init( AX, AY, Where );
		super(AX, AY, Where);
		bmp=DelphiTools.getImage("C:/Users/bdovhan/workspace/Matches/bin/match.bmp");
		
		/*Rect.Left = 0;
	  	Rect.Top = 0;
	  	Rect.Right = bmp.Width;
	  	Rect.Bottom = bmp.Height;*/
	}
}

/* TMatches */

final class TMatches
{
	
	private	int k=16;
	private	TMatch[] m;
	

	public int Count( )
	{
		return k;
	}


	public void Draw( )
	{
  
		for ( int stop = 15, i = 0; i <= stop; i++)
			m[i].Draw();
	}


	public void Init( Graphics OwnerCanvas )
	{
  
		m = new TMatch[16];
		k = 16;
		for ( int stop = 15, i = 0; i <= stop; i++){
			m[i] = new TMatch( 10 + i * 8, 133, OwnerCanvas );
		}
    
	}


	public void MoveShow( boolean User, int Amount )
	{
		int V;
		if ( User )
			V = TSubject.down;
		else
			V = TSubject.up;
		for ( int j = 0; j <= 100; j++)
		{
			for ( int stop = k - Amount, i = k - 1; i >= stop; i--)
			{
				m[i].GoSimple( 1, V );
				m[i].Draw();
			}
			
		}

		Take( Amount );
	}


	public void ReInit( Graphics OwnerCanvas )
	{
  
		k = 16;
		for ( int stop = 15, i = 0; i <= stop; i++){
			m[i].Init(10 + i * 8, 133, OwnerCanvas );
		}
    
	}

	public void ReInitXY()
	{
  
		k = 16;
		for ( int stop = 15, i = 0; i <= stop; i++){
			m[i].InitXY(10 + i * 8, 133);
		}
    
	}


	public void Take( int Amount )
	{
		k -= Amount; // k-=amount; k = k - amount
	}

}

/* TRandomMatchesPlayer */

final class TRandomMatchesPlayer
{
	static int Decide(int CurrentCount) 
	{
		int result;

		if ( CurrentCount < 3 )
			result = DelphiTools.delphiRandom( CurrentCount ) + 1;
		else
		    result = DelphiTools.delphiRandom( 3 ) + 1;
		return result;
	}
}
	

/* TWiseMatchesPlayer */

final class TWiseMatchesPlayer
{
	static int Decide(int CurrentCount) 
	{
		int result;
		  
		if ( ( CurrentCount - 1 ) % 4 == 0 )
			if ( CurrentCount < 3 )
				result = DelphiTools.delphiRandom( CurrentCount ) + 1;
			else
				result = DelphiTools.delphiRandom( 3 ) + 1;
		else
			result = ( CurrentCount - 1 ) % 4;
		return result;
	}
}


final class Button1Click implements ActionListener{
	
	MatchesMain MainForm;
	
	public Button1Click(MatchesMain Form){
		MainForm = Form;
	}
	
	public void actionPerformed(ActionEvent e){

/*
   0) Event handlers should be "final class" not "public class"
     Only TMatchesMain should be public class.
     
   00) Uncomment commented code
 * I) Add constructor to event handler like above
 *  What does it mean?
 *  1. Add property "MatchesMain MainForm;" before constructor
 *  	MatchesMain MainForm;
 *  2. Add constructor
	
	public *(MatchesMain Form){
		MainForm = Form;
	}
	
	where * - name of class.
	
	For Button1Click you have
	
	public Button1Click(MatchesMain Form){
		MainForm = Form;
	}
	
	For ComboBox1Change you will write
	public ComboBox1Change(MatchesMain Form){
		MainForm = Form;
	}
	
	II)   .Enabled = * => .setEnabled(*)
 *  a .Enabled = true => .setEnabled(true)
 *  b .Enabled = false => .setEnabled(false)
 *  III) matches => MainForm.matches
 *  IV) ShowMessage(ukr) = JOptionPane.showMessageDialog(MainForm, english translation + "\n/n" ukr)\
 *  V) NewGame() => MainForm.NewGame()
 *  VI) CompPlay() => MainForm.CompPlay()
 */
		
// 
	/*if ( MainForm.ComboBox1.getSelectedIndex() < 0 )
	{
		MainForm.Button1.Enabled = false;
	}*/
	MainForm.matches.MoveShow( true, MainForm.ComboBox1.getSelectedIndex() + 1 );
	MainForm.AfterMove();
	/*if ( matches.Count() == 0 )
	{
		JOptionPane.showMessageDialog(MainForm, "You won\n/nВи програли" );
		NewGame();
		return;
	}
		CompPlay();
		if ( matches.Count() == 0 )
	{
	ShowMessage( "Ви виграли" );
	NewGame();
	return;
	}*/
	}
}



/*public class Button2Click implements ActionListener{
	public void actionPerformed(ActionEvent e){
		Button2.Enabled = false;
		MainForm.ComboBox2.Enabled = false;
		MainForm.ComboBox3.Enabled = false;
		MainForm.changeComboBoxItem(MainForm.ComboBox1, MainForm.three);
		MainForm.ComboBox1.setSelectedIndex(-1);
		Button1.Enabled = false;
		matches.ReInitXY();
		matches.Draw();
		if ( MainForm.ComboBox3.getSelectedIndex() == 1 )
			CompPlay();
	}
}

public class MainForm.ComboBox1Change implements ActionListener{
	public void actionPerformed(ActionEvent e){
		MainForm.Button1.Enabled = MainForm.ComboBox1.getSelectedIndex() >= 0;
	}
}*/

public class MatchesMain extends JFrame//JPanel
    {
	TMatches matches;
	String[] zero, one, two, three;
	JComboBox ComboBox1, ComboBox2, ComboBox3;
	JButton Button1, Button2;
	Insets insets;
	Container con;
	int startPos;



    private Object makeObj(final String item)  {
      return new Object() { public String toString() { return item; } };
    }
    
    public void Place(JComponent comp, int left, int top){
    	Dimension size = comp.getPreferredSize();
    	comp.setBounds(left + insets.left, top + insets.top,
                size.width, size.height);
    	con.add(comp);
    }
    
    public void changeComboBoxItem(JComboBox comboBox, final String[] items){
    	comboBox.removeAllItems();
		for ( int i = 0; i < items.length; i++){
			comboBox.addItem(makeObj(items[i]));
		}
    }

	public void AfterMove()
	{
		//TODO: Format this method
		// TODO: Format all! everything
  if ( matches.Count() < 3 )
  {
    switch ( matches.Count() )
    {

      case 2:
          changeComboBoxItem(ComboBox1, two);
      break;
      case 1:
    	  changeComboBoxItem(ComboBox1, one);
      break;
      case 0:
    	  changeComboBoxItem(ComboBox1, zero);
      break;
    }
    ComboBox1.setSelectedIndex(-1);
    Button1.setEnabled(false);
  }
	}


	public void CompPlay()
	{
		//TODO: Format this method
		// TODO: Format all! everything
  int result;
  switch ( ComboBox2.getSelectedIndex() )
  {
    case 0:
      result = TRandomMatchesPlayer.Decide(matches.Count() );
    break;
  default:
    result = TWiseMatchesPlayer.Decide(matches.Count() );
  }
  matches.MoveShow( false, result );
  AfterMove();
  }


/*
 * 
 * 1. Uncomment this method; 
 * 2. make it work ("public void NewGame()")


void __fastcall TForm1::NewGame( )
{
  Button2.Enabled = true;
  ComboBox2.Enabled = true;
  ComboBox3.Enabled = true;
}


*/
	
	 public MatchesMain() //constructor
	  {
		 

			
	    super("Image Demo"); 			
	    
	    //DelphiTools.makeTransparentC-opy("C:/Users/bdovhan/Downloads/extjs-4.1.1-gpl/extjs-4.1.1/examples/desktop/images/m.png","gif","C:/Users/bdovhan/Downloads/extjs-4.1.1-gpl/extjs-4.1.1/examples/desktop/images/m.gif");
	    
	    DelphiTools.makeIco(
	    		"C:/Users/bdovhan/Downloads/extjs-4.1.1-gpl/extjs-4.1.1/examples/desktop/images/m.gif",
	    		"C:/Users/bdovhan/Downloads/extjs-4.1.1-gpl/extjs-4.1.1/examples/desktop/images/m32.bmp",
	    		"C:/Users/bdovhan/Downloads/extjs-4.1.1-gpl/extjs-4.1.1/examples/desktop/images/matches.png",
	    		"C:/Users/bdovhan/Downloads/extjs-4.1.1-gpl/extjs-4.1.1/examples/desktop/images/mfull.ico");
	    
	    
setBounds(0,0,500,500); // set up frame
	    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	    con = this.getContentPane();
		con.setLayout(null);
		insets = con.getInsets();
		// inherit the main frame
	        // add to frame and display
	    String[] items = {};
	    zero = items;
	    String[] items1 = {"1"};
	    one = items1;
	    String[] items2 = {"1", "2"};
	    two = items2;
	    String[] items3 = {"1", "2", "3"};
	    three = items3;
	    String[] strategies = {"TRandomMatchesPlayer", "TWiseMatchesPlayer"};

	    ComboBox1 = new JComboBox(items3);
	    //ComboBox1.addActionListener(new ComboBox1Change());
	    ComboBox2 = new JComboBox(strategies);
	    //ComboBox2.addActionListener(new ComboBox1Change());
	    String[] firstMove = {"User", "Comp"};
	    ComboBox3 = new JComboBox(firstMove);
	    //ComboBox3.addActionListener(new ComboBox1Change());
		JButton Button1 = new JButton("Play");//Вперед
		Button1.addActionListener(new Button1Click(this));
		JButton Button2 = new JButton("New game");
		//Button2.addActionListener(new Button2Click());
		JLabel Label1 = new JLabel("caption");
		/*
		 * TODO: Add 5 more Labels (JLabel)
		 * Write correct english caption for each label!
		 * Call Place(*, LeftPos, TopPos);
		 * 
		 * Place(Label1, startPos, 102);
		 * ...
		 * Place(Label6, startPos, 102);
		 * 
		 * TODO:
		 * textarea => do correct text rules (input here
		 * textarea =< correct caption (title)
		 * 
		 * TODO
		 * 
		 * change the whole title (title of the form)
		 * /
		 */

		startPos = 174;
		Place(ComboBox1, startPos, 121);
		Place(ComboBox2, startPos, 27);
		Place(ComboBox3, startPos, 75);
		Place(Button1, 178, 146);
		Place(Button2, 362, 146);
		Place(Label1, startPos, 102);
		
		
		
		
		
		
	    JPanel p2 = new JPanel(new BorderLayout());

	    p2.setBorder(new TitledBorder(new EtchedBorder(),

	      "asdfadsf"));


	    JTextArea textArea = new JTextArea("rules  aashdkjfahkjdsfh");

	    JScrollPane ps = new JScrollPane(textArea);
	    //list.add

	    p2.add(ps, BorderLayout.CENTER);

	    Place(p2, startPos, 177);
		
		//Button1.setEnabled(false);
		Button2.setEnabled(false);
		textArea.setEnabled(false);
     	ComboBox2.setEnabled(false);
     	ComboBox3.setEnabled(false);
		
		GCanvas canvas = new GCanvas();        // create the drawing canvas
		
    	Dimension size = canvas.getPreferredSize();
    	canvas.setBounds(insets.left, insets.top,
                173, 900);
    	
	    con.add(canvas); 
		 setVisible(true);
	        matches = canvas.matches;		
	  }
	 
	public static void main(String arg[]) {
		//TMatches matches;
		
		new MatchesMain();
		//matches.Init( Canvas );

	}
	
}

class GCanvas extends Canvas
{
	TMatches matches;
	public GCanvas(){
		matches = new TMatches();
	};
	  public void paint(Graphics g)
	  {/*
		Image img = null;
		img=DelphiTools.getImage("C:/Users/FIRST/workspace/matches/Matches/src/match.bmp");
		
				/*try {img=ImageIO.read(new File("C:/Users/FIRST/workspace/matches/Matches/src/match.bmp"));}
	    catch(IOException e){System.out.println("ok");System.exit(0);}*/
	    //g.drawImage(img,0,0,this);
		  matches.Init( g );
		  matches.Draw();
	  }
}

