
#include <vcl.h>
#pragma hdrstop

#include "ASubject.h"



/*Constructor Tman.New;
begin
 bmp:=tBitmap.Create;
 bmp.Handle:=LoadBitmap(HInstance, 'VOYAK');
 Rect.Left:=0;
 Rect.Top:=0;
 Rect.Right:=bmp.Width;
 Rect.Bottom:=bmp.Height;
end;

Constructor TLion.New;
begin
 bmp:=tBitmap.Create;
 bmp.Handle:=LoadBitmap(HInstance, 'LION');
 Rect.Left:=0;
 Rect.Top:=0;
 Rect.Right:=90;
 Rect.Bottom:=175;
end;  */


#include <System.hpp>


bool CanShow = false;



void __fastcall TSubject::Move( int n, int w, Napr V )
{
  Go( OwnerCanvas, x, y, n, w, V );
}


void __fastcall TSubject::Show( TCanvas Where, int x, int y )
{
  if ( CanShow )
  {
    MyRect.Left = x;
    MyRect.Top = y;
    MyRect.Right = x + bmp.Width;
    MyRect.Bottom = y + bmp.Height;
   //where.Canvas.BrushCopy(MyRect, Bmp, Rect, clWhite);
    if (( oldbmp != NULL ) && ( ( ox != x ) || ( oy != y ) ) )
      Where.Draw( ox, oy, oldbmp );
    if ( !( oldbmp != NULL ) )
      oldbmp = TBitmap.Create;
    oldbmp.Width = bmp.Width;
    oldbmp.Height = bmp.Height;
    if ( ( ox != x ) || ( oy != y ) )
    {
      oldbmp.Canvas.CopyRect( Rect, Where, MyRect );
      ox = x;
      oy = y;
    }

   //where.Canvas.BrushCopy(MyRect, Bmp, Rect, clWhite);
    Where.Draw( x, y, bmp );
  }
}


__fastcall TSubject::TSubject( int AX, int AY, TCanvas Where )
 : x(0),
   y(0),
   ox(0),
   oy(0)
{
  // TSubject( );
  Init( AX, AY, Where );
}


void __fastcall TSubject::Draw( )
{
  Show( OwnerCanvas, x, y );
}


void __fastcall TSubject::Go( TCanvas Where, int& x, int& y, int n, int w, Napr V )
{
  int x0 = 0, y0 = 0, i = 0;
  CanShow = false;
 //Where.RePaint;
  CanShow = true;
  x0 = x;
  y0 = y;
  switch ( V )
  {
    case 0:
      for ( int stop = - n, i = 0; i >= stop; i--)
      {
        x = x0 + i;
        Show( Where, x, y );
        sleep( w );
      }
    break;
    case 1:
      for ( int stop = - n, i = 0; i >= stop; i--)
      {
        y = y0 + i;
        Show( Where, x, y );
        sleep( w );
      }
    break;
    case 2:
      for ( int stop = n, i = 0; i <= stop; i++)
      {
        x = x0 + i;
        Show( Where, x, y );
        sleep( w );
      }
    break;
  default:
    for ( int stop = n, i = 0; i <= stop; i++)
    {
      y = y0 + i;
      Show( Where, x, y );
      sleep( w );
    }
  }
}


void __fastcall TSubject::GoSimple( int n, Napr V )
{
  int x0 = 0, y0 = 0, i = 0;
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


void __fastcall TSubject::Init( int AX, int AY, TCanvas Where )
{
  x = AX;
  y = AY;
  OwnerCanvas = Where;
}
