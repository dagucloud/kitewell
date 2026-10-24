---
title: Updates
---

Kitewell hält sich selbst aktuell. Es lädt eine neue Version im Hintergrund
herunter, prüft, ob Kitewell sie signiert hat, und installiert sie zu einem
Zeitpunkt, an dem Sie es nicht benutzen. Laufende Workflows laufen über den
Neustart hinweg weiter. Die darunterliegende Workflow-Engine Dagu ist in jedem
Kitewell-Release enthalten und ändert sich nur, wenn sich Kitewell ändert.

## Wie ein Update ankommt

**Kitewell automatisch aktualisieren** ist von Anfang an eingeschaltet, unter
**Dieses Gerät → Geräteeinstellungen → Updates**. Solange es eingeschaltet
ist, geht Kitewell so vor:

1. Es sucht eine Minute nach dem Öffnen nach einer neuen Version und danach
   alle sechs Stunden.
2. Es lädt sie im Hintergrund herunter und prüft ihre Signatur. Dabei wird
   nichts angezeigt.
3. Es installiert sie zum nächsten sicheren Zeitpunkt: wenn Sie Kitewell das
   nächste Mal beenden, sich anmelden oder den Computer neu starten, oder in
   einem ruhigen Moment, in dem kein Kitewell-Fenster geöffnet ist oder Sie
   eine halbe Stunde nicht damit gearbeitet haben. Das Symbol in der Menüleiste
   oder im Infobereich verschwindet für einige Sekunden und kommt zurück, und
   ein zuvor geöffnetes Fenster öffnet sich wieder auf derselben Seite.

Danach meldet eine einzige Mitteilung **Kitewell wurde auf x.y.z aktualisiert**;
ein Klick darauf öffnet die Neuerungen in den Versionshinweisen auf
kitewell.app.

Eine neue Version erreicht die Geräte über zwei Tage verteilt, daher sieht sie
nicht jeder Computer am selben Tag. **Nach Updates suchen…** im Kitewell-Menü –
auf dem Mac im Menü in der Menüleiste, unter Windows im Menü des Symbols im
Infobereich – sucht sofort und holt das Release gleich; andernfalls meldet es
**Kitewell ist auf dem neuesten Stand**.

## Worauf ein Update wartet

Ein Update unterbricht nie die Arbeit. Es wartet, solange:

- der Assistent nachdenkt;
- ein laufender Workflow noch einen Desktop-Schritt vor sich hat;
- ein MCP-Client Kitewell in den letzten zwei Minuten verwendet hat;
- ein Kitewell-Fenster ungespeicherte Änderungen enthält.

Workflows halten ein Update nie auf. Sie laufen auf der Engine weiter, mit der
sie gestartet sind, und das neu gestartete Kitewell findet sie wieder.

Während ein Update wartet, zeigt das Kitewell-Menü
**Neu starten und auf Kitewell x.y.z aktualisieren**, das es sofort
installiert. Es fragt
nach ungespeicherten Änderungen und nennt alles, was der Neustart unterbrechen
würde, mit **Jetzt neu starten** und **Im Leerlauf**. Hat ein Update sieben Tage
gewartet, meldet eine einzige Mitteilung
**Starten Sie Kitewell neu, um das Update abzuschließen**;
haben allein ungespeicherte Änderungen es einen Tag lang aufgehalten, bittet
eine einzige Mitteilung Sie, sie zu speichern oder zu verwerfen. Für ein Update
werden Änderungen nie verworfen.

## Wenn automatische Updates aus sind

Kitewell prüft trotzdem. Ist eine neue Version erschienen, erhalten Sie eine
einzige Mitteilung, und das Menü zeigt **Auf Kitewell x.y.z aktualisieren…**. Wählen Sie
es, um die Version herunterzuladen; der Fortschritt erscheint im Menü. Danach
bietet Kitewell **Neu starten und aktualisieren** oder **Später** an. Nichts wird
installiert, bevor Sie es wählen.

## Wenn Dagu Cloud ein neueres Kitewell braucht

Dagu Cloud kann eine Version, die es nicht mehr unterstützt, nicht mehr
bedienen. Workflows, Planungen und der lokale MCP-Server laufen weiter;
Synchronisierung, Remote-MCP, Webhooks und Ausführungsstatus stoppen, bis dieser
Computer aktualisiert ist. Ein Banner im Fenster weist darauf hin und bietet
**Jetzt aktualisieren** an. Das holt das Release sofort, unabhängig von den
Einstellungen, und installiert es zum nächsten sicheren Zeitpunkt oder bittet
Sie nach einer Stunde um einen Neustart.

## Auf einem Mac, der ein Passwort verlangt

Kitewell ersetzt sich nur dann ohne Passwort, wenn Ihr macOS-Benutzer die App
besitzt und in „Programme“ schreiben darf. Bei einem Standardkonto (ohne
Administratorrechte) oder wenn Kitewell von einem anderen Benutzer oder über
eine Geräteverwaltung installiert wurde, wird nichts im Hintergrund
heruntergeladen. Das Menü zeigt **Auf Kitewell x.y.z aktualisieren…**, und es kommt
eine einzige Mitteilung; wenn Sie den Eintrag wählen, wird das Update
heruntergeladen und die Administratorabfrage von macOS angezeigt. Kitewell
zeigt diese Abfrage nie ungefragt.

## Wenn etwas nicht klappt

- Ein Download oder seine Prüfung schlägt fehl. Kitewell versucht es bei der
  nächsten Prüfung still erneut. Das Menü nennt den Grund, wenn Sie es öffnen.
- Eine Installation schlägt fehl. Die installierte Version bleibt bestehen, und
  Kitewell startet sie erneut; beim nächsten sicheren Zeitpunkt folgt ein neuer
  Versuch. Nach drei fehlgeschlagenen Installationen einer Version versucht
  Kitewell es mit dieser Version nicht mehr und zeigt
  **Kitewell konnte nicht aktualisiert werden** mit der Aufforderung, das
  Installationsprogramm herunterzuladen, und einem Link zur
  [Download-Seite](/de/download/).
- Die Prüfung schlägt fehl. Prüfen Sie Ihr Netzwerk und den
  [Release-Status](/de/releases/). Bis zum ersten öffentlichen Release für Ihr
  System gibt es keinen Update-Feed, und eine Prüfung, die keinen erreicht,
  sagt das, statt zu behaupten, Sie seien auf dem neuesten Stand.
- Sie müssen zu einer früheren Version zurück. Ältere Installationsprogramme
  bleiben auf der
  [GitHub-Releases-Seite](https://github.com/dagucloud/kitewell/releases).
  Eine ältere App zu installieren bringt keine älteren Daten zurück; dafür
  stellen Sie ein [Backup](/de/docs/backups/) wieder her.

Wenn Sie ein Problem melden, geben Sie die Kitewell-Version, die Engine-Version
und die Version Ihres Betriebssystems an. Die Seitenleiste zeigt die
Kitewell-Version unten links. Die Anzeige in der oberen Leiste zeigt Kitewell-
und Engine-Version zusammen. Auf dem Mac zeigt **Über Kitewell** im
Programmmenü die Kitewell-Version; unter Windows stehen ganz oben im Menü des
Infobereichs die Versionen von App und Dienst.

## Details

- Öffentliche Builds lesen ihren Update-Feed auf dem Mac von
  `https://kitewell.app/updates/macos/latest.json` und unter Windows von
  `https://kitewell.app/updates/windows/latest.json`.
- Prüfen und Herunterladen lassen Workflows weiterlaufen. Nur das Installieren
  startet etwas neu.
- Ein Download wartet auf 2 GB freien Speicherplatz und auf eine Verbindung,
  die nicht getaktet ist. Ein heruntergeladenes, noch nicht installiertes
  Update wird verworfen, wenn das Release pausiert oder ersetzt wird.
- Die Mitteilung nach einem Update kommt einmal pro Version und nur dort, wo
  Mitteilungen von Kitewell erlaubt sind.
- Unter Windows stoppt das Update den Hintergrunddienst für die wenigen
  Sekunden des Austauschs, nicht aber die Ausführungen darunter: Jede
  Ausführung hat eine eigene Prozessgruppe. Nur **Kitewell beenden** bricht
  Ausführungen ab.
- Die Engine, die Kitewell ausführt, ist das Dagu-Release, das in diese
  Kitewell-Version eingebaut ist; es ist in den Versionshinweisen und auf der
  [Seite mit den Drittanbieterlizenzen](/third-party/) genannt.
