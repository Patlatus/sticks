unit ASubject;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs;

const
  toleft=0;
  up=1;
  toright=2;
  down=3;
type
  Napr=0..3;
  TSubject=class
  private
    x, y, ox, oy: Integer;
    OwnerCanvas: TCanvas;
  public
    bmp, oldbmp: TBitmap;
    Rect,MyRect: TRect;
    Constructor New;virtual;abstract;
    constructor Create(AX, AY: Integer; Where: TCanvas);
    procedure Draw;
    procedure Init(AX, AY: Integer; Where: TCanvas);
    procedure Move(n, w: integer; V: Napr);
    Procedure Show(Where: TCanvas; x, y: integer);
    Procedure Go(Where: TCanvas; var x, y: integer; n, w: integer; V:Napr);
    procedure GoSimple(n: Integer; V: Napr);
  end;
{  TMan=class (TSubject)
   Constructor New;Override;
  end;
  TLion=class (TSubject)
   Constructor New;Override;
  end;   }

var
  CanShow:Boolean;
{  man:Tman;
  lion:TLion;}
implementation

{Constructor Tman.New;
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
end;  }

procedure TSubject.Move(n, w: integer; V: Napr);
begin
  Go(OwnerCanvas, x, y, n, w, v);
end;

Procedure TSubject.Show;
begin
 if canshow then
  begin
   MyRect.Left:=x;
   MyRect.Top:=y;
   MyRect.Right:=x+bmp.Width;
   MyRect.Bottom:=y+bmp.Height;
   //where.Canvas.BrushCopy(MyRect, Bmp, Rect, clWhite);
   if Assigned(oldbmp) and ((ox <> x) or (oy <> y)) then
     where.Draw(ox, oy, oldbmp);
   if not Assigned(oldbmp) then
     oldbmp := TBitmap.Create;
   oldbmp.Width := bmp.Width;
   oldbmp.Height := bmp.Height;
   if (ox <> x) or (oy <> y) then begin
     oldbmp.Canvas.CopyRect(Rect, Where, MyRect);
     ox := x;
     oy := y;
   end;

   //where.Canvas.BrushCopy(MyRect, Bmp, Rect, clWhite);
   where.Draw(x, y, bmp);
  end;
end;

constructor TSubject.Create(AX, AY: Integer; Where: TCanvas);
begin
  New();
  Init(AX, AY, Where);
end;

procedure TSubject.Draw;
begin
  Show(OwnerCanvas, x, y);
end;

Procedure TSubject.Go(Where:TCanvas;var x,y:integer;n,w:integer;V:Napr);
var
 x0,y0,i:INteger;
begin
 CanShow:=false;
 //Where.RePaint;
 CanShow:=true;
 x0:=x;
 y0:=y;
 case v of
  0:
   for i:=0 downto -n do
    begin
     x:=x0+i;
     Show(where,x,y);
     sleep(w);
    end;
  1:
   for i:=0 downto -n do
    begin
     y:=y0+i;
     Show(where,x,y);
     sleep(w);
    end;
  2:
   for i:=0 to n do
    begin
     x:=x0+i;
     Show(where,x,y);
     sleep(w);
    end;
  else
   for i:=0 to n do
    begin
     y:=y0+i;
     Show(where,x,y);
     sleep(w);
    end;
 end;
end;

procedure TSubject.GoSimple(n: Integer; V: Napr);
var
 x0, y0, i: Integer;
begin
  x0 := x;
  y0 := y;
  case v of
  0:
    x:=x0-n;
  1:
    y:=y0-n;
  2:
    x:=x0+n;
  else
    y:=y0+n;
  end;
end;

procedure TSubject.Init(AX, AY: Integer; Where: TCanvas);
begin
  x := AX;
  y := AY;
  OwnerCanvas := Where;
end;

end.
