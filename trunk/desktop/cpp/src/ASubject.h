#ifndef ASubjectH
#define ASubjectH


#include <System.hpp>

#include <windows.hpp>
#include <messages.hpp>
#include <sysutils.hpp>
#include <variants.hpp>
#include <classes.hpp>
#include <graphics.hpp>
#include <controls.hpp>
#include <forms.hpp>
#include <dialogs.hpp>

#include <stdexcept>


class TSubject;


const int toleft = 0;
const int up = 1;
const int toright = 2;
const int down = 3;


typedef int/*# range 0..3*/ Napr;

class TSubject: public System::TObject {
  private:
  int x, y, ox, oy;
  TCanvas OwnerCanvas;
  public:
  TBitmap bmp, oldbmp;
  TRect Rect, MyRect;
  __fastcall TSubject( )
  { throw std::runtime_error("abstract function called"); }
  __fastcall TSubject( int AX, int AY, TCanvas Where );
  void __fastcall Draw( );
  void __fastcall Init( int AX, int AY, TCanvas Where );
  void __fastcall Move( int n, int w, Napr V );
  void __fastcall Show( TCanvas Where, int x, int y );
  void __fastcall Go( TCanvas Where, int& x, int& y, int n, int w, Napr V );
  void __fastcall GoSimple( int n, Napr V );
};
/*  TMan=class (TSubject)
   Constructor New;Override;
  end;
  TLion=class (TSubject)
   Constructor New;Override;
  end;   */


extern bool CanShow;
/*  man:Tman;
  lion:TLion;*/

#endif //  ASubjectH