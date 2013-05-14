object Form1: TForm1
  Left = 12
  Top = 160
  BorderIcons = [biSystemMenu, biMinimize]
  BorderStyle = bsSingle
  Caption = #1057#1110#1088#1085#1080#1095#1082#1080
  ClientHeight = 342
  ClientWidth = 564
  Color = clBtnFace
  DockSite = True
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnCreate = FormCreate
  OnPaint = FormPaint
  PixelsPerInch = 96
  TextHeight = 13
  object Label2: TLabel
    Left = 8
    Top = 8
    Width = 74
    Height = 13
    Caption = #1057#1110#1088#1085#1080#1082#1080' '#1082#1086#1084#1087#1072
  end
  object Label3: TLabel
    Left = 8
    Top = 317
    Width = 63
    Height = 13
    Caption = #1058#1074#1086#1111' '#1089#1110#1088#1085#1080#1082#1080
  end
  object Label4: TLabel
    Left = 8
    Top = 120
    Width = 37
    Height = 13
    Caption = #1050#1086#1083#1086#1076#1072
  end
  object Label1: TLabel
    Left = 173
    Top = 102
    Width = 135
    Height = 13
    Caption = #1042#1080#1073#1077#1088#1110#1090#1100' '#1082#1110#1083#1100#1082#1110#1089#1090#1100' '#1089#1110#1088#1085#1080#1082#1110#1074
  end
  object Label5: TLabel
    Left = 172
    Top = 8
    Width = 158
    Height = 13
    Caption = #1042#1080#1073#1077#1088#1110#1090#1100' '#1089#1090#1088#1072#1090#1077#1075#1110#1102' '#1082#1086#1084#1087#39#1102#1090#1077#1088#1072
  end
  object Label6: TLabel
    Left = 172
    Top = 56
    Width = 141
    Height = 13
    Caption = #1042#1080#1073#1077#1088#1110#1090#1100' '#1093#1090#1086' '#1087#1077#1088#1096#1080#1081' '#1093#1086#1076#1080#1090#1100
  end
  object Button1: TButton
    Left = 178
    Top = 146
    Width = 113
    Height = 25
    Caption = #1042#1087#1077#1088#1077#1076
    Default = True
    Enabled = False
    TabOrder = 0
    OnClick = Button1Click
  end
  object ComboBox1: TComboBox
    Left = 174
    Top = 121
    Width = 145
    Height = 21
    Style = csDropDownList
    TabOrder = 1
    OnChange = ComboBox1Change
    Items.Strings = (
      '1'
      '2'
      '3')
  end
  object ComboBox2: TComboBox
    Left = 173
    Top = 27
    Width = 380
    Height = 21
    Style = csDropDownList
    Enabled = False
    ItemIndex = 0
    TabOrder = 2
    Text = 'TRandomMatchesPlayer ('#1087#1088#1080#1084#1110#1090#1080#1074#1085#1072' '#1089#1090#1088#1072#1090#1077#1075#1110#1103', '#1082#1086#1084#1087' '#1075#1088#1072#1108' '#1074#1080#1087#1072#1076#1082#1086#1074#1086')'
    OnChange = ComboBox1Change
    Items.Strings = (
      'TRandomMatchesPlayer ('#1087#1088#1080#1084#1110#1090#1080#1074#1085#1072' '#1089#1090#1088#1072#1090#1077#1075#1110#1103', '#1082#1086#1084#1087' '#1075#1088#1072#1108' '#1074#1080#1087#1072#1076#1082#1086#1074#1086')'
      'TWiseMatchesPlayer ('#1088#1086#1079#1091#1084#1085#1072' '#1089#1090#1088#1072#1090#1077#1075#1110#1103')')
  end
  object ComboBox3: TComboBox
    Left = 173
    Top = 75
    Width = 380
    Height = 21
    Style = csDropDownList
    Enabled = False
    ItemIndex = 0
    TabOrder = 3
    Text = #1042#1080' ('#1102#1079#1077#1088')'
    OnChange = ComboBox1Change
    Items.Strings = (
      #1042#1080' ('#1102#1079#1077#1088')'
      #1050#1086#1084#1087#39#1102#1090#1077#1088)
  end
  object Button2: TButton
    Left = 362
    Top = 146
    Width = 113
    Height = 25
    Caption = #1053#1086#1074#1072' '#1075#1088#1072
    Default = True
    Enabled = False
    TabOrder = 4
    OnClick = Button2Click
  end
  object GroupBox1: TGroupBox
    Left = 172
    Top = 177
    Width = 384
    Height = 157
    Caption = #1055#1088#1072#1074#1080#1083#1072' '#1075#1088#1080
    TabOrder = 5
    object Memo1: TMemo
      Left = 6
      Top = 16
      Width = 375
      Height = 138
      Color = clBtnFace
      Enabled = False
      Lines.Strings = (
        #1052#1086#1078#1085#1072' '#1090#1103#1075#1085#1091#1090#1080' '#1087#1086' '#1086#1076#1085#1086#1084#1091', '#1087#1086' '#1076#1074#1072' '#1072#1073#1086' '#1087#1086' '#1090#1088#1080' '#1089#1110#1088#1085#1080#1095#1082#1080'.'
        #1061#1090#1086' '#1074#1110#1079#1100#1084#1077' '#1086#1089#1090#1072#1085#1085#1110#1081' '#1089#1110#1088#1085#1080#1082', '#1090#1086#1081' '#1087#1088#1086#1075#1088#1072#1108'.')
      TabOrder = 0
    end
  end
end
