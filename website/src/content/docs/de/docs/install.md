---
title: Kitewell installieren
---

Kitewell ist eine einzige App, die Sie auf Ihrem eigenen Mac oder Windows-PC
installieren. Die Installation dauert wenige Minuten. Danach haben Sie ein
leeres Projekt, bereit für Ihren ersten Workflow.

## Was Sie brauchen

- Einen Mac mit macOS 13 oder neuer oder einen PC mit Windows 10 ab Version
  1809 oder Windows 11, jeweils 64 Bit.
- Ein Installationsprogramm für Ihr System. Die [Download-Seite](/de/download/)
  zeigt, was verfügbar ist. Fehlt Ihr System dort, wird das Paket dafür noch
  vorbereitet.

Sie brauchen kein Konto und weder Python noch Docker noch ein KI-Werkzeug.
Installieren Sie diese später, und nur dann, wenn einer Ihrer Workflows sie
nutzt.

## Auf einem Mac installieren

1. Öffnen Sie die [Download-Seite](/de/download/) und wählen Sie den Download
   für Ihren Mac. Unter **Apple-Menü → Über diesen Mac** sehen Sie, ob er einen
   Apple-Chip oder einen Intel-Prozessor hat.
2. Öffnen Sie die heruntergeladene `.pkg`-Datei und folgen Sie dem
   Installationsprogramm. Es legt Kitewell im Ordner „Programme“ ab und fragt
   nach einem Administratorpasswort.
3. Öffnen Sie **Kitewell** aus dem Ordner „Programme“.
4. Wählen Sie **Anmelden und die KI von Kitewell nutzen**. Ihr Browser öffnet
   Dagu Cloud mit einem Code, den Sie abgleichen. Sobald Sie ihn bestätigen,
   legt Kitewell Ihr erstes Projekt an und öffnet es mit einsatzbereiter KI:
   ohne API-Schlüssel und mit den 100 Credits der 14-tägigen Testphase zum
   Start. Um Ihren
   eigenen KI-Schlüssel oder gar keine KI zu verwenden, wählen Sie stattdessen
   **Auf diesem Gerät starten**.

Kitewell schaltet beim ersten Start **Bei der Anmeldung öffnen** ein, damit Ihre
Planungen nach einem Neustart des Mac weiterlaufen. Sie können das jederzeit im
Menü in der Menüleiste ausschalten.

Danach [erstellen Sie Ihren ersten Workflow](/de/docs/getting-started/).

## Unter Windows installieren

1. Öffnen Sie die [Download-Seite](/de/download/) und laden Sie
   `Kitewell-<version>-win-x64-Setup.exe` herunter.
2. Öffnen Sie die heruntergeladene Datei. Windows zeigt möglicherweise einen
   SmartScreen-Hinweis, weil Kitewell ein neuer Herausgeber ist. Prüfen Sie, ob
   der SHA256-Wert der Datei mit dem Wert neben dem Download übereinstimmt, und
   wählen Sie dann **Weitere Informationen** und **Trotzdem ausführen**.
3. Kitewell installiert sich für Ihr Benutzerkonto, ohne Rückfragen und ohne
   Administratorpasswort, und öffnet sich, wenn es fertig ist.
4. Wählen Sie **Anmelden und die KI von Kitewell nutzen**. Ihr Browser öffnet
   Dagu Cloud mit einem Code, den Sie abgleichen. Sobald Sie ihn bestätigen,
   legt Kitewell Ihr erstes Projekt an und öffnet es mit einsatzbereiter KI:
   ohne API-Schlüssel und mit den 100 Credits der 14-tägigen Testphase zum
   Start. Um Ihren
   eigenen KI-Schlüssel oder gar keine KI zu verwenden, wählen Sie stattdessen
   **Auf diesem Gerät starten**.

Kitewell schaltet beim ersten Start **Bei der Anmeldung starten** ein, damit Ihre
Planungen nach einem Neustart des PCs weiterlaufen. Sie können das jederzeit
im Menü im Infobereich ausschalten. Damit Planungen schon laufen, bevor sich
jemand anmeldet, öffnen Sie die **Geräteeinstellungen** und schalten
**Ausführen, wenn niemand angemeldet ist** ein. Windows fragt dann einmal nach
einer Administratorfreigabe, ohne Passwort, um den kleinen Anmeldedienst von
Kitewell einzurichten.

Wenn Sie das Fenster schließen, läuft Kitewell weiter, und zwar im
Infobereich, der kleinen Gruppe von Symbolen neben der Uhr. Klicken Sie dort
mit der linken Maustaste auf das Kitewell-Symbol, um das Fenster wieder zu
öffnen.

Danach [erstellen Sie Ihren ersten Workflow](/de/docs/getting-started/).

## Wenn etwas nicht klappt

- Windows meldet, das Installationsprogramm stamme von einem unbekannten
  Herausgeber. Vergleichen Sie den SHA256-Wert der Datei mit dem auf der
  [Download-Seite](/de/download/) und wählen Sie dann **Weitere Informationen**
  und **Trotzdem ausführen**. Meldet Windows, die Signatur sei *ungültig*,
  brechen Sie ab und [melden Sie das](/de/support/), statt die Datei
  auszuführen.
- Kitewell ist installiert, öffnet sich aber nicht. Die intelligente
  App-Steuerung von Windows lädt keine unsignierten Builds von Kitewell. Ein
  Build, den Sie von der Release-Seite herunterladen, ist signiert. Siehe
  [Fehlerbehebung](/de/docs/troubleshooting/#kitewell-was-installed-but-did-not-start).
- Das Fenster bleibt leer, oder Kitewell möchte WebView2 installieren. Wählen
  Sie **WebView2 installieren**. Das dauert etwa eine Minute. Siehe
  [Fehlerbehebung](/de/docs/troubleshooting/#kitewell-asks-to-install-webview2).
- macOS meldet, das Installationsprogramm könne nicht überprüft werden.
  Brechen Sie ab und [melden Sie die genaue Meldung](/de/support/) zusammen mit
  der Download-URL und der Version.

## Eine neuere Version über eine alte installieren

Speichern Sie vorher Ihre Änderungen und lassen Sie laufende Workflows zu Ende
laufen. Ihre Projekte, Ausführungen und die Einstellung zum Start bei der
Anmeldung bleiben erhalten, und bereits laufende Ausführungen laufen weiter.

- Auf dem Mac führen Sie die neue `.pkg` aus. Sie schließt die laufende App,
  ersetzt sie und startet den Hintergrunddienst neu. Nicht gespeicherte
  Entwürfe im Editor gehen verloren. Lässt sich die App nicht schließen, wählen
  Sie in der Menüleiste **Kitewell beenden** und starten das Installationsprogramm
  erneut.
- Unter Windows führen Sie die neue Setup.exe aus. Sie schließt das laufende
  Kitewell, ersetzt es und öffnet die neue Version. Nicht gespeicherte Entwürfe
  im Editor gehen verloren, speichern Sie also vorher. Ist der Anmeldedienst
  eingeschaltet, bringt Kitewell ihn beim nächsten Öffnen selbst auf die neue
  Version.

Kitewell kann die neue Version auch selbst herunterladen. Siehe
[Updates](/de/docs/updates/).

## Details

- Windows installiert die App pro Benutzer unter `%LOCALAPPDATA%\Kitewell.App`,
  ohne Administratorabfrage. Ihre Daten liegen getrennt davon unter
  `%LOCALAPPDATA%\Kitewell`. Nur der Anmeldedienst braucht die Abfrage: Er
  kopiert die Programme nach `C:\Program Files\Kitewell` und verschiebt die
  Daten einmalig nach `C:\ProgramData\Kitewell`. Siehe
  [Planungen](/de/docs/scheduling/#run-with-nobody-signed-in-windows).
- Eine stille Installation (`Setup.exe --silent`) zeigt nichts an und fragt nie
  nach Administratorrechten. Der Anmeldedienst wird nur über die
  Geräteeinstellungen eingerichtet.
- Das Fenster von Kitewell baut auf der Microsoft Edge WebView2 Runtime auf.
  Fehlt sie, bietet Kitewell beim Öffnen an, sie zu installieren.
- **Bei der Anmeldung starten** wird bei einer Neuinstallation eingeschaltet und bleibt
  bei Updates so, wie Sie es zuletzt im Infobereich eingestellt haben.
- Auf dem Mac braucht die `.pkg` ein Administratorpasswort, weil sie in den
  Ordner „Programme“ installiert. Wenn Sie `Kitewell.app` stattdessen in Ihren
  eigenen Ordner `~/Applications` kopieren, geht es ohne.
- Kitewell gibt es für Macs mit Apple-Chip und für Macs mit Intel-Prozessor
  sowie für 64-Bit-Windows-PCs mit Intel- oder AMD-Prozessor.
