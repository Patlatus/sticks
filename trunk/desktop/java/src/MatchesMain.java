import java.awt.BorderLayout;
import java.awt.Canvas;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.*;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;


/* TMatch */

final class TMatch extends TSubject {
   public TMatch(int AX, int AY) {
      super(AX, AY);
      bmp = DelphiTools.getImage("match.png");
   }
}

/* TMatches */

final class TMatches {
   private int k=16;
   private TMatch[] m;
   public int ypos = 133;
   GCanvas canvas;

   public TMatches(GCanvas c) {
      super();
      canvas = c;
   }
   
   public int Count() {
      return k;
   }

   public void Draw(Graphics g) {
      for (int stop = 15, i = 0; i <= stop; i++)
         m[i].Draw(g);
   }

    public void Init() {
       m = new TMatch[16];
       k = 16;
       for (int stop = 15, i = 0; i <= stop; i++) {
          m[i] = new TMatch(10 + i * 8, ypos);
       }
    }

    public void MoveShow(boolean User, int Amount) {
       int V = User ? TSubject.down : TSubject.up;
       for (int j = 0; j <= 100; j++) {
          for (int stop = k - Amount, i = k - 1; i >= stop; i--) {
             m[i].GoSimple(1, V);
          }
          canvas.repaint();
       }
       Take( Amount );
    }

    public void ReInit(Graphics OwnerCanvas) {
       k = 16;
       for (int stop = 15, i = 0; i <= stop; i++) {
          m[i].Init(10 + i * 8, ypos);
       }
    }

    public void ReInitXY() {
       k = 16;
       for (int stop = 15, i = 0; i <= stop; i++) {
          m[i].InitXY(10 + i * 8, ypos);
       }
    }

    public void Take(int Amount) {
        k -= Amount;
    }
}

/* TRandomMatchesPlayer */

class TRandomMatchesPlayer {
   static int Decide(int CurrentCount) {
      return DelphiTools.delphiRandom(CurrentCount < 3 ? CurrentCount : 3) + 1;
   }
}
    

/* TWiseMatchesPlayer */

final class TWiseMatchesPlayer {
   static int Decide(int CurrentCount) {
      return (CurrentCount - 1) % 4 == 0 ? TRandomMatchesPlayer.Decide(CurrentCount) : (CurrentCount - 1) % 4;
   }
}


final class Button1Click implements ActionListener {
   MatchesMain MainForm;
    
   public Button1Click(MatchesMain Form){
      MainForm = Form;
   }
    
   public void actionPerformed(ActionEvent e) {        
      if (MainForm.ComboBox1.getSelectedIndex() < 0) {
         MainForm.ButtonGo.setEnabled(false);
      }
      MainForm.matches.MoveShow(true, MainForm.ComboBox1.getSelectedIndex() + 1);
      MainForm.AfterMove();
      if (MainForm.matches.Count() == 0) {
         JOptionPane.showMessageDialog(MainForm, "Sorry, but you lost... :("); /*Ви програли*/
         MainForm.NewGame();
         return;
      }
      MainForm.CompPlay();
      if (MainForm.matches.Count() == 0) {
         JOptionPane.showMessageDialog(MainForm, "Congratulation! \n You won :)" ); /*Ви виграли*/
         MainForm.NewGame();
         return;
      }
   }
}

final class Button2Click implements ActionListener {
   MatchesMain MainForm;
    
   public Button2Click(MatchesMain Form) {
      MainForm = Form;
   }
    
   public void actionPerformed(ActionEvent e) {
      MainForm.ButtonNewGame.setEnabled(false);
      MainForm.ComboBox2.setEnabled(false);
      MainForm.ComboBox3.setEnabled(false);
      MainForm.changeComboBoxItem(MainForm.ComboBox1, MainForm.three);
      MainForm.ComboBox1.setSelectedIndex(-1);
      MainForm.ButtonGo.setEnabled(false);
      MainForm.matches.ReInitXY();
      MainForm.con.repaint();
      if (MainForm.ComboBox3.getSelectedIndex() == 1)
         MainForm.CompPlay();
   }
}

final class ComboBox1Change implements ActionListener {
   MatchesMain MainForm;
    
   public ComboBox1Change(MatchesMain Form) {
      MainForm = Form;
   }
   
   public void actionPerformed(ActionEvent e) {
      MainForm.ButtonGo.setEnabled(MainForm.ComboBox1.getSelectedIndex() >= 0);
   }
} 

public class MatchesMain extends JFrame {
   TMatches matches;
   String[] zero, one, two, three;
   JComboBox ComboBox1, ComboBox2, ComboBox3;
   JButton ButtonGo, ButtonNewGame;
   Insets insets;
   Container con;
   int startPos;
   private int startPos2;

   private Object makeObj(final String item) {
      return new Object() {
    	 public String toString() {
    		return item; 
    	 }
      };
   }
    
   public void Place(JComponent comp, int left, int top) {
      Dimension size = comp.getPreferredSize();
      comp.setBounds(left + insets.left, top + insets.top,
                size.width, size.height);
      con.add(comp);
   }
    
   public void changeComboBoxItem(JComboBox comboBox, final String[] items) {
      comboBox.removeAllItems();
      for ( int i = 0; i < items.length; i++) {
         comboBox.addItem(makeObj(items[i]));
      }
   }

   public void AfterMove() {
      if (matches.Count() < 3) {
         switch (matches.Count()) {
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
         ButtonGo.setEnabled(false);
      }
   }

   public void CompPlay() {
      int result = ((ComboBox2.getSelectedIndex() == 0) ? TRandomMatchesPlayer.Decide(matches.Count()) : TWiseMatchesPlayer.Decide(matches.Count()));
      matches.MoveShow(false, result);
      AfterMove();
   }

   public void NewGame() {
      ButtonNewGame.setEnabled(true);
      ComboBox2.setEnabled(true);
      ComboBox3.setEnabled(true);
   }
    
   public MatchesMain() {
      super("Matches Game");
      setBounds(0,0,578,376);
      setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      con = this.getContentPane();
      con.setLayout(null);
      insets = con.getInsets();
      String[] items = {};
      zero = items;
      String[] items1 = {"                    1                "};
      one = items1;
      String[] items2 = {"                    1                ", "                    2                "};
      two = items2;
      String[] items3 = {"                    1                    ", "                    2                    ", "                    3                    "};
      three = items3;
      String[] strategies = {"TRandomMatchesPlayer                                                                       ", 
                             "TWiseMatchesPlayer                                                                       "};
      ComboBox1 = new JComboBox(items3);
      ComboBox1.setSelectedIndex(-1);
        
      ComboBox1.addActionListener(new ComboBox1Change(this));
      ComboBox2 = new JComboBox(strategies);
      String[] firstMove = {"You (user)                                                                                                  ", 
                            "Computer                                                                                                  "};
      ComboBox3 = new JComboBox(firstMove);
      ButtonGo = new JButton("          Go          ");//Вперед
      ButtonGo.addActionListener(new Button1Click(this));
      ButtonNewGame = new JButton("Start New Game");
      ButtonNewGame.addActionListener(new Button2Click(this));
      JLabel Label1 = new JLabel("Computer's matches");
      JLabel Label2 = new JLabel("Pack of matches");
      JLabel Label3 = new JLabel("Your matches");
      JLabel Label4 = new JLabel("Choose how many matches do you want to take in your turn");
      JLabel Label5 = new JLabel("Choose computer level");
      JLabel Label6 = new JLabel("Choose who makes first move");
      JLabel Label7 = new JLabel("Produced by:");
      JLabel Label8 = new JLabel("Visit our site:                    http://www.julfysoft.orgfree.com/");
      JLabel Label9 = new JLabel("Visit my personal site:   http://www.bdovhan.orgfree.com/");

      startPos = 8;
      startPos2 = 172;
      Place(Label1, startPos, 8);
      Place(Label2, startPos, 118);
      Place(Label3, startPos, 317);
      Place(Label4, startPos2, 8);
      Place(Label5, startPos2, 81);
      Place(Label6, startPos2, 127);
      Place(Label7, 475, 235);
      Place(Label8, startPos2, 290);
      Place(Label9, startPos2, 310);
      
      Place(ComboBox1, startPos2, 27);
      Place(ComboBox2, startPos2, 100);
      Place(ComboBox3, startPos2, 146);
      Place(ButtonGo, 178, 56);
      Place(ButtonNewGame, 362, 56);
        
      JPanel p2 = new JPanel(new BorderLayout());
      p2.setBorder(new TitledBorder(new EtchedBorder(),
         "Rules")); //Правила гри

      JTextArea textArea = new JTextArea("Each time you can take one, two or three matches.                               \n" +
                                                     "Who takes the last one, loses.");
      //Правила гри:  Можна тягнути по одному, по два або по три сірнички.
      //              Хто візьме останній сірник, той програє.
      JScrollPane ps = new JScrollPane(textArea);
      p2.add(ps, BorderLayout.CENTER);
      Place(p2, startPos2, 177);
      
      ButtonGo.setEnabled(false);
      ButtonNewGame.setEnabled(false);
      textArea.setEnabled(false);
      ComboBox2.setEnabled(false);
      ComboBox3.setEnabled(false);
        
      GCanvas canvas = new GCanvas();        // create the drawing canvas
        
      //Dimension size = canvas.getPreferredSize();
      canvas.setBounds(insets.left, insets.top,
                173, 900);
        
      con.add(canvas); 
      setVisible(true);
      matches = canvas.matches;
      matches.ypos = 139;
   }
     
   public static void main(String arg[]) {
      new MatchesMain();
   }
}


class GCanvas extends Canvas {
   TMatches matches;
   public GCanvas() {
      matches = new TMatches(this);
      matches.Init();
   }
      
   public void paint(Graphics g) {  
      matches.Draw(g);
   }
}