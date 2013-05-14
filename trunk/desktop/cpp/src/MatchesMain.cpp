
#include <vcl.h>
#pragma hdrstop

#include "MatchesMain.h"


#pragma resource "*.dfm"


#include <System.hpp>


typedef unsigned char unsignedchar;




TForm1* Form1 = NULL;
TMatches* matches = NULL;




__fastcall TMatches::TMatches()
 : k('\0')
{
}
__fastcall TAbstractMatchesPlayer::TAbstractMatchesPlayer()
{
}
__fastcall TRandomMatchesPlayer::TRandomMatchesPlayer()
{
}
__fastcall TWiseMatchesPlayer::TWiseMatchesPlayer()
{
}



void __fastcall TForm1::Button1Click( TObject* Sender )
{
  if ( ComboBox1.ItemIndex < 0 )
  {
    Button1.Enabled = false;
  }
  matches->MoveShow( true, ComboBox1.ItemIndex + 1 );
  if ( matches->Count() < 3 )
  {
    switch ( matches->Count() )
    {
      case 2:
        ComboBox1.Items.Text = "1\x0d\x0a" "2";
      break;
      case 1:
        ComboBox1.Items.Text = '1';
      break;
      case 0:
        ComboBox1.Items.Text = "";
      break;
    }
    ComboBox1.ItemIndex = - 1;
    Button1.Enabled = false;
  }
  if ( matches->Count() == 0 )
  {
    ShowMessage( "Ви програли" );
    NewGame();
    return;
  }
  CompPlay();
  if ( matches->Count() == 0 )
  {
    ShowMessage( "Ви виграли" );
    NewGame();
    return;
  }
}


void __fastcall TForm1::Button2Click( TObject* Sender )
{
  Button2.Enabled = false;
  ComboBox2.Enabled = false;
  ComboBox3.Enabled = false;
  ComboBox1.Items.Text = "1\x0d\x0a" "2\x0d\x0a" "3";
  ComboBox1.ItemIndex = - 1;
  Button1.Enabled = false;
  matches->ReInit( Canvas );
  matches->Draw();
  if ( ComboBox3.ItemIndex == 1 )
    CompPlay();
}


void __fastcall TForm1::ComboBox1Change( TObject* Sender )
{
  Button1.Enabled = ComboBox1.ItemIndex >= 0;
}


void __fastcall TForm1::CompPlay( )
{
  unsigned char Result = '\0';
  switch ( ComboBox2.ItemIndex )
  {
    case 0:
      result = TRandomMatchesPlayer::Decide( TRandomMatchesPlayer::__tp.SObjectType(), matches->Count() );
    break;
  default:
    result = TWiseMatchesPlayer::Decide( TWiseMatchesPlayer::__tp.SObjectType(), matches->Count() );
  }
  matches->MoveShow( false, result );
  if ( matches->Count() < 3 )
  {
    switch ( matches->Count() )
    {
      case 2:
        ComboBox1.Items.Text = "1\x0d\x0a" "2";
      break;
      case 1:
        ComboBox1.Items.Text = '1';
      break;
      case 0:
        ComboBox1.Items.Text = "";
      break;
    }
    ComboBox1.ItemIndex = - 1;
    Button1.Enabled = false;
  }
}


void __fastcall TForm1::FormCreate( TObject* Sender )
{
/*  BigBMP := TBitMap.Create;
  BigBMP.Width := ClientWidth;
  BigBMP.Height := ClientHeight;
  BigBMP.Transparent := True;   */
  matches = new TMatches;
  //Matches.Init(BigBMP.Canvas);
  matches->Init( Canvas );
}


void __fastcall TForm1::FormPaint( TObject* Sender )

/*var
  bmp: TBitmap;
  i: byte;*/
{
/*  bmp := TBitmap.Create;
  bmp.LoadFromFile('match.bmp');
  bmp.Transparent := True;  */
  matches->Draw();
  ///Canvas.Draw(0, 0, BigBMP);
 /* for i := 0 to 15 do
    Canvas.Draw(10 + i * 8, 114, bmp); */
//g.StartGame;
}


void __fastcall TForm1::NewGame( )
{
  Button2.Enabled = true;
  ComboBox2.Enabled = true;
  ComboBox3.Enabled = true;
}

/* TMatches */


unsignedchar __fastcall TMatches::Count( )
{
  unsignedchar result = '\0';
  result = k;// return k
  return result;
}


void __fastcall TMatches::Draw( )
{
  unsigned char i = '\0';
  for ( int stop = 15, i = 0; i <= stop; i++)
    m[i]->Draw;
}


void __fastcall TMatches::Init( TCanvas OwnerCanvas )
{
  unsigned char i = '\0';
  CanShow = true;
  k = 16;
  for ( int stop = 15, i = 0; i <= stop; i++)
    //m[i] := TMatch.Create(10 + i * 8, 114, OwnerCanvas);
    m[i] = @TMatch ::( 10 + i * 8, 133, OwnerCanvas );
}


void __fastcall TMatches::MoveShow( bool User, unsignedchar Amount )
{
  unsigned char i = '\0', j = '\0';
  Napr V;
  if ( User )
    V = down;
  else
    V = up;
  for ( int stop = 100, j = 0; j <= stop; j++)
  {
    for ( int stop = k - Amount, i = k - 1; i >= stop; i--)
    {
      m[i]->GoSimple( 1, V );
      m[i]->Draw;
    }

    //Form1.Repaint;
    //Application.ProcessMessages;   }
    sleep( 10 );//50
  }


    /*if User then
      m[i].Move(100, 50, down)
    else
      m[i].Move(100, 50, up)     */
  Take( Amount );
}


void __fastcall TMatches::ReInit( TCanvas OwnerCanvas )
{
  unsigned char i = '\0';
  CanShow = true;
  k = 16;
  for ( int stop = 15, i = 0; i <= stop; i++)
    //m[i].Init(10 + i * 8, 114, OwnerCanvas);
    m[i]->Init( 10 + i * 8, 133, OwnerCanvas );
}


void __fastcall TMatches::Take( unsignedchar Amount )
{
  k -= Amount; // k-=amount; k = k - amount
}

/* TMatch */


__fastcall TMatch::TMatch( )
{
  inherited::New();
  bmp = TBitmap.Create;
  bmp.LoadFromFile( "match.bmp" );
  bmp.Transparent = true;
    //bmp.Handle := LoadBitmap(HInstance, 'VOYAK');
  Rect.Left = 0;
  Rect.Top = 0;
  Rect.Right = bmp.Width;
  Rect.Bottom = bmp.Height;
}

/* TRandomMatchesPlayer */


unsignedchar __fastcall /*static*/ TRandomMatchesPlayer::vs_Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount ) const {
  unsignedchar result = '\0';
  const TRandomMatchesPlayer* pTHIS = (TRandomMatchesPlayer*) xpTHIS;
  if ( CurrentCount < 3 )
    result = Random( CurrentCount ) + 1;
  else
    result = Random( 3 ) + 1;
  return result;
}

/* TWiseMatchesPlayer */


unsignedchar __fastcall /*static*/ TWiseMatchesPlayer::vs_Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount ) const {
  unsignedchar result = '\0';
  const TWiseMatchesPlayer* pTHIS = (TWiseMatchesPlayer*) xpTHIS;
  if ( ( CurrentCount - 1 ) % 4 == 0 )
    if ( CurrentCount < 3 )
      result = Random( CurrentCount ) + 1;
    else
      result = Random( 3 ) + 1;
  else
    result = ( CurrentCount - 1 ) % 4;
  return result;
}
