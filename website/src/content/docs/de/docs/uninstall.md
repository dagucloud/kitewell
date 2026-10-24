---
title: Kitewell deinstallieren
---

Die Kitewell-App zu entfernen und Ihre Arbeit zu löschen sind zwei verschiedene
Dinge. Wenn Sie dieser Seite folgen, wird die App entfernt, und Ihre Projekte,
Ausführungen und Backups bleiben, wo sie sind, sodass eine spätere
Neuinstallation sie wieder übernimmt. Der letzte Abschnitt entfernt auch die
Daten, wenn Sie das möchten.

## Bevor Sie beginnen

Speichern Sie Ihre Arbeit und lassen Sie laufende Workflows zu Ende laufen. Die
Deinstallation wartet nicht auf sie. Um sie sofort zu beenden, wählen Sie
**Kitewell beenden** in der Menüleiste auf dem Mac oder im Menü des
Infobereichs unter Windows. Damit stoppt auch jede Projekt-Engine.

## Auf einem Mac

1. Schalten Sie im Menü in der Menüleiste **Bei der Anmeldung öffnen** aus,
   damit bei der nächsten Anmeldung nichts versucht, Kitewell zu öffnen. Ist
   Kitewell schon entfernt, löschen Sie den Eintrag stattdessen unter
   **Systemeinstellungen → Allgemein → Anmeldeobjekte**. Die Bezeichnung dort
   hängt von der macOS-Version ab.
2. Wählen Sie **Kitewell beenden** in der Menüleiste oder im Kitewell-Menü oben
   am Bildschirm. ⌘Q ist **In der Menüleiste weiterlaufen lassen** und blendet
   nur das Fenster aus.
3. Ziehen Sie **Kitewell.app** aus „Programme“ in den Papierkorb.

### Wenn eine Hintergrundregistrierung zurückbleibt

Kitewell führt seinen Hintergrunddienst über einen macOS-Launch-Agent aus und
entlädt ihn beim Beenden. Eine geladen gebliebene Kopie oder eine, die eine
ältere Version in `~/Library/LaunchAgents` hinterlassen hat, entfernen Sie,
indem Sie diese Zeilen im Terminal ausführen, und zwar als derselbe
macOS-Benutzer, der Kitewell verwendet hat:

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

Sie entfernen die Registrierung und das Token, mit dem die App ihren eigenen
Dienst erreichte. Ihre Workflows und Backups bleiben unberührt.

## Unter Windows

1. Öffnen Sie **Einstellungen → Apps → Installierte Apps**, suchen Sie
   **Kitewell** und wählen Sie **Deinstallieren**.
2. Das Deinstallationsprogramm beendet das laufende Kitewell und seinen
   Hintergrunddienst und entfernt die App aus Ihrem Benutzerkonto. Ist
   **Ausführen, wenn niemand angemeldet ist** eingeschaltet, entfernt es nach
   einer einzigen Administratorabfrage auch den Anmeldedienst Kitewell sign-in
   und seine Programme unter `C:\Program Files\Kitewell`. Ihre Daten bleiben.
3. Erscheint Kitewell danach noch unter **Einstellungen → Apps → Autostart**,
   schalten Sie es dort aus.

## Ihre Daten

Was zurückbleibt, liegt in einem Ordner:

- Auf einem Mac: `~/Library/Application Support/Kitewell`
- Unter Windows: `%LOCALAPPDATA%\Kitewell`, oder `C:\ProgramData\Kitewell`,
  sobald **Ausführen, wenn niemand angemeldet ist** einmal eingeschaltet wurde,
  denn das verschiebt die Daten dorthin.

Er enthält Ihre Projekte, deren Ausführungsverlauf, deren Secrets, Ihre Backups
und die Logs. Behalten Sie ihn, falls Sie Kitewell vielleicht neu installieren.

Um ihn endgültig zu entfernen, kopieren Sie zuerst alle Backups und Dateien
heraus, die Sie noch brauchen, und löschen Sie dann diesen Ordner im Finder
oder im Datei-Explorer. Das lässt sich nicht rückgängig machen.

Hat dieses Gerät Projekte mit [Dagu Cloud](/de/docs/cloud-sync/)
synchronisiert, bleiben die Projekte dort. Das Gerät zählt weiter zu den
Computern, die der Tarif des Arbeitsbereichs umfasst, bis Sie einen anderen
Computer verbinden, der es ersetzt. Trennen Sie es auf der Seite **Kitewell** in
Dagu Cloud, um den Platz freizugeben.
