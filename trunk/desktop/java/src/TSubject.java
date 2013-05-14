
import java.awt.Graphics;
import java.awt.image.BufferedImage;

public class TSubject 
{

	static	int toleft = 0;
	static	int up = 1;
	static	int toright = 2;
	static	int down = 3;

	boolean CanShow = false;
	int x, y, ox, oy;
	Graphics OwnerCanvas;
	BufferedImage bmp;

	public void Move( int n, int w, int V )
	{
	  Go(OwnerCanvas, x, y, n, w, V );
	}
	
	
	public void Show( Graphics Where, int x, int y )
	{
	  /*if ( CanShow )
	  {
	  /*  MyRect.Left = x;
	    MyRect.Top = y;
	    MyRect.Right = x + bmp.Width;
	    MyRect.Bottom = y + bmp.Height;
	   //where.Graphics.BrushCopy(MyRect, Bmp, Rect, clWhite);
	    if (( oldbmp != NULL ) && ( ( ox != x ) || ( oy != y ) ) )
	      Where.Draw( ox, oy, oldbmp );
	    if ( !( oldbmp != NULL ) )
	      oldbmp = TBitmap.Create;
	    oldbmp.Width = bmp.Width;
	    oldbmp.Height = bmp.Height;
	    if ( ( ox != x ) || ( oy != y ) )
	    {
	      oldbmp.Graphics.CopyRect( Rect, Where, MyRect );
	      ox = x;
	      oy = y;
	    }*/
	
	    //where.Graphics.BrushCopy(MyRect, Bmp, Rect, clWhite);
	    //Where.Draw( x, y, bmp );
	    Where.drawImage(bmp,x,y,null);
	  //}
	}
	
	
	public TSubject( int AX, int AY, Graphics Where )
	 {
	  // TSubject( );
	  Init( AX, AY, Where );
	}
	
	
	public void Draw( )
	{
	  Show( OwnerCanvas, x, y );
	}
	
	
	public void Go( Graphics Where, int x, int y, int n, int w, int V )
	{
	  int x0 = 0, y0 = 0;
	  CanShow = false;
	 //Where.RePaint;
	  CanShow = true;
	  x0 = x;
	  y0 = y;
	  switch ( V )
	  {
	    case 0:
	      for ( int i = 0; i >= - n; i--)
	      {
	        x = x0 + i;
	        Show( Where, x, y );
	        //sleep( w );
	      }
	    break;
	    case 1:
	      for ( int stop = - n, i = 0; i >= stop; i--)
	      {
	        y = y0 + i;
	        Show( Where, x, y );
	        //sleep( w );
	      }
	    break;
	    case 2:
	      for ( int stop = n, i = 0; i <= stop; i++)
	      {
	        x = x0 + i;
	        Show( Where, x, y );
	        //sleep( w );
	      }
	    break;
	  default:
	    for ( int stop = n, i = 0; i <= stop; i++)
	    {
	      y = y0 + i;
	      Show( Where, x, y );
	      //sleep( w );
	    }
	  }
	}
	
	
	public void GoSimple( int n, int V )
	{
	  int x0 = 0, y0 = 0;
	  x0 = x;
	  y0 = y;
	  switch ( V )
	  {
	    case 0:
	      x = x0 - n;
	    break;
	    case 1:
	      y = y0 - n;
	    break;
	    case 2:
	      x = x0 + n;
	    break;
	  default:
	    y = y0 + n;
	  }
	}
	
	
	public void InitXY( int AX, int AY)
	{
	  x = AX;
	  y = AY;
	}

	public void Init( int AX, int AY, Graphics Where )
	{
	  x = AX;
	  y = AY;
	  OwnerCanvas = Where;
	}

}
