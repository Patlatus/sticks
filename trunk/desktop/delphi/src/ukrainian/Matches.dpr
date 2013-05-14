program Matches;

{$R *.dres}

uses
  Forms,
  MatchesMain in 'MatchesMain.pas' {Form1},
  ASubject in 'ASubject.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.Title := 'ТКарткова гра';
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.
