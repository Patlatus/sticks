import java.awt.Graphics;
import java.awt.image.BufferedImage;

public class TSubject {
   static   int toleft = 0;
   static   int up = 1;
   static   int toright = 2;
   static   int down = 3;

   boolean CanShow = false;
   int x, y, ox, oy;
   Graphics OwnerCanvas;
   BufferedImage bmp;

   public void Move(int n, int w, int V) {
      Go(OwnerCanvas, x, y, n, w, V );
   }
   
   public void Show(Graphics Where, int x, int y) {
      Where.drawImage(bmp, x, y, null);
   }
   
   public TSubject(int AX, int AY) {
      Init( AX, AY);
   }
   
   public void Draw(Graphics OwnerCanvas) {
      Show( OwnerCanvas, x, y );
   }
   
   public void Go(Graphics Where, int x, int y, int n, int w, int V) {
      CanShow = false;
      CanShow = true;
      ox = x;
      oy = y;
      switch (V) {
      case 0:
         for ( int i = 0; i >= - n; i--) {
            x = ox + i;
            Show(Where, x, y);
         }
         break;
      case 1:
         for ( int stop = - n, i = 0; i >= stop; i--) {
            y = oy + i;
            Show(Where, x, y);
         }
         break;
      case 2:
         for ( int stop = n, i = 0; i <= stop; i++) {
            x = ox + i;
            Show( Where, x, y );
         }
         break;
      default:
         for ( int stop = n, i = 0; i <= stop; i++) {
            y = oy + i;
            Show( Where, x, y );
         }
      }
   }
   
   public void GoSimple(int n, int V) {
      ox = x;
      oy = y;
      switch (V) {
      case 0:
         x = ox - n;
         break;
      case 1:
         y = oy - n;
         break;
      case 2:
         x = ox + n;
         break;
      default:
         y = oy + n;
      }
   }
   
   public void InitXY( int AX, int AY) {
      x = AX;
      y = AY;
   }

   public void Init( int AX, int AY) {
      x = AX;
      y = AY;
   }

}
