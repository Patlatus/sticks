#ifndef MatchesMainH
#define MatchesMainH


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
#include <imglist.hpp>
#include <menus.hpp>
#include <stdctrls.hpp>
#include <buttons.hpp>
#include "ASubject.h"

#include <stdexcept>


class TAbstractMatchesPlayer;
class TForm1;
class TMatch;
class TMatches;
class TRandomMatchesPlayer;
class TWiseMatchesPlayer;
typedef unsigned char unsignedchar;




class TForm1: public TForm {
  typedef TForm inherited;
  friend class TAbstractMatchesPlayer;
  friend class TMatch;
  friend class TMatches;
  friend class TRandomMatchesPlayer;
  friend class TWiseMatchesPlayer;
  public:
  TButton Button1;
  TLabel Label2;
  TLabel Label3;
  TLabel Label4;
  TComboBox ComboBox1;
  TLabel Label1;
  TLabel Label5;
  TComboBox ComboBox2;
  TLabel Label6;
  TComboBox ComboBox3;
  TButton Button2;
  TGroupBox GroupBox1;
  TMemo Memo1;
  void __fastcall FormCreate( TObject* Sender );
  void __fastcall FormPaint( TObject* Sender );
  void __fastcall ComboBox1Change( TObject* Sender );
  void __fastcall Button1Click( TObject* Sender );
  void __fastcall Button2Click( TObject* Sender );
  private:
  public:
  void __fastcall CompPlay( );
  void __fastcall NewGame( );
};


class TMatch: public TSubject {
  typedef TSubject inherited;
  friend class TAbstractMatchesPlayer;
  friend class TForm1;
  friend class TMatches;
  friend class TRandomMatchesPlayer;
  friend class TWiseMatchesPlayer;
  public:
  __fastcall TMatch( );
};


class TMatches: public System::TObject {
  friend class TAbstractMatchesPlayer;
  friend class TForm1;
  friend class TMatch;
  friend class TRandomMatchesPlayer;
  friend class TWiseMatchesPlayer;
  private:
  unsigned char k;
  TMatch* m [ 16/*# range 0..15*/ ];
  public:
  unsignedchar __fastcall Count( );
  void __fastcall Draw( );
  void __fastcall Init( TCanvas OwnerCanvas );
  void __fastcall ReInit( TCanvas OwnerCanvas );
  void __fastcall MoveShow( bool User, unsignedchar Amount );
  void __fastcall Take( unsignedchar Amount );
  public:
  __fastcall TMatches();
};


class TAbstractMatchesPlayer: public System::TObject {
  friend class TForm1;
  friend class TMatch;
  friend class TMatches;
  friend class TRandomMatchesPlayer;
  friend class TWiseMatchesPlayer;
  public:
  static unsignedchar __fastcall Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount )
  { return xpTHIS->vs_Decide(xpTHIS, CurrentCount); }
  virtual unsignedchar __fastcall vs_Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount ) const
  { throw std::runtime_error("abstract function called"); }
  public:
  __fastcall TAbstractMatchesPlayer();
};


class TRandomMatchesPlayer: public TAbstractMatchesPlayer {
  typedef TAbstractMatchesPlayer inherited;
  friend class TAbstractMatchesPlayer;
  friend class TForm1;
  friend class TMatch;
  friend class TMatches;
  friend class TWiseMatchesPlayer;
  public:
  static unsignedchar __fastcall Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount )
  { return xpTHIS->vs_Decide(xpTHIS, CurrentCount); }
  virtual unsignedchar __fastcall vs_Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount ) const;
  public:
  __fastcall TRandomMatchesPlayer();
};


class TWiseMatchesPlayer: public TAbstractMatchesPlayer {
  typedef TAbstractMatchesPlayer inherited;
  friend class TAbstractMatchesPlayer;
  friend class TForm1;
  friend class TMatch;
  friend class TMatches;
  friend class TRandomMatchesPlayer;
  public:
  static unsignedchar __fastcall Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount )
  { return xpTHIS->vs_Decide(xpTHIS, CurrentCount); }
  virtual unsignedchar __fastcall vs_Decide( const TAbstractMatchesPlayer* xpTHIS, unsignedchar CurrentCount ) const;
  public:
  __fastcall TWiseMatchesPlayer();
};


extern TForm1* Form1;
extern TMatches* matches;
  //BigBMP: TBitmap;

#endif //  MatchesMainH