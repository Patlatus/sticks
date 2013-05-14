unit MatchesMain;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ImgList, Menus, StdCtrls,
  Buttons, ASubject;

type
  TForm1 = class(TForm)
    Button1: TButton;
    Label2: TLabel;
    Label3: TLabel;
    Label4: TLabel;
    ComboBox1: TComboBox;
    Label1: TLabel;
    Label5: TLabel;
    ComboBox2: TComboBox;
    Label6: TLabel;
    ComboBox3: TComboBox;
    Button2: TButton;
    GroupBox1: TGroupBox;
    Memo1: TMemo;
    procedure FormCreate(Sender: TObject);
    procedure FormPaint(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
  private
  public
    procedure CompPlay;
    procedure NewGame;
  end;

  TMatch = class (TSubject)
  public
    Constructor New; Override;
  end;

  TMatches = class
  private
    k: byte;
    m: array[0..15] of TMatch;
  public
    function Count: Byte;
    procedure Draw;
    procedure Init(OwnerCanvas: TCanvas);
    procedure ReInit(OwnerCanvas: TCanvas);
    procedure MoveShow(User: Boolean; Amount: Byte);
    procedure Take(amount: Byte);
  end;

  TAbstractMatchesPlayer = class
    class function Decide(CurrentCount: Byte): Byte; virtual; abstract;
  end;

  TRandomMatchesPlayer = class (TAbstractMatchesPlayer)
    class function Decide(CurrentCount: Byte): Byte; override;
  end;

  TWiseMatchesPlayer = class (TAbstractMatchesPlayer)
    class function Decide(CurrentCount: Byte): Byte; override;
  end;


var
  Form1: TForm1;
  matches: TMatches;
  //BigBMP: TBitmap;

implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
begin
  if ComboBox1.ItemIndex < 0 then
  begin
    Button1.Enabled := False;
  end;

  Matches.MoveShow(True, ComboBox1.ItemIndex + 1);

  if Matches.Count < 3 then begin
    case Matches.Count of
    2: ComboBox1.Items.Text := '1'#13#10'2';
    1: ComboBox1.Items.Text := '1';
    0: ComboBox1.Items.Text := '';

    end;
    ComboBox1.ItemIndex := -1;
    Button1.Enabled := False;
  end;

  if Matches.Count = 0 then begin
    ShowMessage('Ви програли');
    NewGame;
    Exit;
  end;

  CompPlay;
  if Matches.Count = 0 then begin
    ShowMessage('Ви виграли');
    NewGame;
    Exit;
  end;
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
  Button2.Enabled := False;
  ComboBox2.Enabled := False;
  ComboBox3.Enabled := False;

  ComboBox1.Items.Text := '1'#13#10'2'#13#10'3';
  ComboBox1.ItemIndex := -1;
  Button1.Enabled := False;

  Matches.ReInit(Canvas);
  Matches.Draw;

  if ComboBox3.ItemIndex = 1 then
    CompPlay;
  
end;

procedure TForm1.ComboBox1Change(Sender: TObject);
begin
  Button1.Enabled := ComboBox1.ItemIndex >= 0;
  
end;

procedure TForm1.CompPlay;
var
  Result: Byte;
begin
  case Combobox2.ItemIndex of
  0: Result := TRandomMatchesPlayer.Decide(Matches.Count);
  else Result := TWiseMatchesPlayer.Decide(Matches.Count);
  end;
  Matches.MoveShow(False, Result);

  if Matches.Count < 3 then begin
    case Matches.Count of
    2: ComboBox1.Items.Text := '1'#13#10'2';
    1: ComboBox1.Items.Text := '1';
    0: ComboBox1.Items.Text := '';

    end;
    ComboBox1.ItemIndex := -1;
    Button1.Enabled := False;
  end;
end;

procedure TForm1.FormCreate(Sender: TObject);
begin
{  BigBMP := TBitMap.Create;
  BigBMP.Width := ClientWidth;
  BigBMP.Height := ClientHeight;
  BigBMP.Transparent := True;   }
  Matches := TMatches.Create;
  //Matches.Init(BigBMP.Canvas);
  Matches.Init(Canvas);
end;

procedure TForm1.FormPaint(Sender: TObject);

{var
  bmp: TBitmap;
  i: byte;}
begin
{  bmp := TBitmap.Create;
  bmp.LoadFromFile('match.bmp');
  bmp.Transparent := True;  }
  Matches.Draw;
  ///Canvas.Draw(0, 0, BigBMP);
 { for i := 0 to 15 do
    Canvas.Draw(10 + i * 8, 114, bmp); }
//g.StartGame;

end;

procedure TForm1.NewGame;
begin
  Button2.Enabled := True;
  ComboBox2.Enabled := True;
  ComboBox3.Enabled := True;
end;

{ TMatches }

function TMatches.Count: Byte;
begin
  Result := k;
end;

procedure TMatches.Draw;
var
  i: Byte;
begin
  for i := 0 to 15 do
    m[i].Draw;
end;

procedure TMatches.Init;
var
  i: Byte;
begin
  CanShow := True;
  k := 16;
  for i := 0 to 15 do
    //m[i] := TMatch.Create(10 + i * 8, 114, OwnerCanvas);
    m[i] := TMatch.Create(10 + i * 8, 133, OwnerCanvas);
end;

procedure TMatches.MoveShow(User: Boolean; Amount: Byte);
var
  i, j: Byte;
  v: Napr;
begin
  if User then
    v := down
  else
    v := up;


  for j := 0 to 100 do
  begin
    for i:= k - 1 downto k - Amount do
    begin
      m[i].GoSimple(1, v);
      m[i].Draw;

    end;

    //Form1.Repaint;
    //Application.ProcessMessages;   }
    sleep(10);//50
  end;


    {if User then
      m[i].Move(100, 50, down)
    else
      m[i].Move(100, 50, up)     }
  Take(Amount);
end;

procedure TMatches.ReInit;
var
  i: Byte;
begin
  CanShow := True;
  k := 16;
  for i := 0 to 15 do
    //m[i].Init(10 + i * 8, 114, OwnerCanvas);
    m[i].Init(10 + i * 8, 133, OwnerCanvas);

end;

procedure TMatches.Take(amount: Byte);
begin
  Dec(k, amount);
end;

{ TMatch }

constructor TMatch.New;
begin
  inherited;

  bmp := TBitmap.Create;
  //bmp.LoadFromFile('match.bmp');
  bmp.Transparent := True;
  bmp.Handle := LoadBitmap(HInstance, 'Match');
  Rect.Left := 0;
  Rect.Top := 0;
  Rect.Right := bmp.Width;
  Rect.Bottom := bmp.Height;
end;

{ TRandomMatchesPlayer }

class function TRandomMatchesPlayer.Decide(CurrentCount: Byte): Byte;
begin
  if CurrentCount < 3 then
    Result := Random(CurrentCount) + 1
  else
    Result := Random(3) + 1;
end;

{ TWiseMatchesPlayer }

class function TWiseMatchesPlayer.Decide(CurrentCount: Byte): Byte;
begin
  if (CurrentCount - 1) mod 4 = 0 then
    if CurrentCount < 3 then
      Result := Random(CurrentCount) + 1
    else
      Result := Random(3) + 1
  else
    Result := (CurrentCount - 1) mod 4;
end;

end.
