---
title: Dagu Console
---

Dagu Console zeigt unter [console.dagu.sh](https://console.dagu.sh), wie die
Ausführungen Ihrer synchronisierten Projekte verlaufen, in jedem Browser, auch
auf Ihrem Smartphone. Die Arbeit erledigen weiterhin Ihre Computer. Die Konsole
erhält den Status jeder Ausführung, nie ihre Logs, Ausgaben oder die Werte von
Secrets.

## Was Sie brauchen

- Ein Dagu-Cloud-Konto und ein [synchronisiertes Projekt](/de/docs/cloud-sync/).
  Jeder Tarif funktioniert, auch der kostenlose. Ein nicht synchronisiertes
  Projekt wird nie gemeldet.
- Um mehr als einen Computer zu verfolgen: Kitewell Team. Ein kostenloses Konto
  und Kitewell Personal umfassen jeweils einen Computer.

Melden Sie sich bei Dagu Console mit dem Konto an, das Ihre Computer verwenden.
Der Inhaber des Arbeitsbereichs sieht jedes synchronisierte Projekt und jeden
Computer. Alle anderen im Arbeitsbereich sehen die Ausführungen der Projekte,
für die sie eine Rolle haben, ihre eigenen Computer und die Computer, die diese
Projekte ausgeführt haben.

## Ausführungen verfolgen

Die Seiten unter **Monitoring** umfassen Kitewell-Computer und Dagu-Server
gleichermaßen:

- **Overview**: wie viele Computer sich melden, die Fehlschläge von heute,
  offene Benachrichtigungen und die Computer, die Aufmerksamkeit brauchen.
- **Computers**: jeder Computer mit seinem **Status** (**Reporting** oder
  **Not reporting**), seinem Benutzer, seiner Kitewell-Version, seinem
  Betriebssystem, seiner letzten Meldung sowie seinen laufenden und heute
  fehlgeschlagenen Ausführungen. Wählen Sie einen Computer, um seine
  Ausführungen der letzten 14 Tage zu sehen.
- **Runs**: jede Ausführung, nach Projekt, Workflow, Status und Zeit.
- **Insights**: Ausführungen, Fehlschläge, Erfolgsquote und Dauer für jeden
  Workflow, über 7, 30 oder 90 Tage.

![Die Seite Computers in Dagu Console mit zwei Kitewell-Computern, die sich melden, ihren Benutzern, Kitewell-Versionen, Betriebssystemen und letzten Meldungen](../../../../assets/docs/de/console-computers.png)

Ein Computer meldet sich alle zwei Minuten, oder früher, wenn sich seine
laufenden Ausführungen ändern. Eine Seite zeigt, was beim Öffnen angekommen
war; wählen Sie **Refresh** für den neuesten Stand.

<a id="alerts-from-dagu-console"></a>

## Benachrichtigungen von Dagu Console

Dagu Console öffnet in jedem Tarif zwei Arten von Benachrichtigungen:

- Ein Workflow ist fehlgeschlagen. Ein Workflow hat eine einzige
  Benachrichtigung, egal wie viele Computer ihn ausführen. Ein späterer
  Fehlschlag auf einem beliebigen Computer kommt hinzu, und mit dem nächsten
  Erfolg auf einem beliebigen Computer gilt sie als behoben. Abgebrochene und
  abgelehnte Ausführungen werden gezählt, lösen aber keine Benachrichtigung aus.
- Ein Computer meldet sich nicht mehr. Nach 10 Minuten ohne Meldung öffnet sich
  die Benachrichtigung, und sie gilt als behoben, sobald sich der Computer
  wieder meldet. Sie ist standardmäßig aus, weil sich ein Computer jedes Mal
  nicht mehr meldet, wenn er in den Ruhezustand geht.

Um einen Computer zu überwachen, der eingeschaltet bleiben soll, öffnet der
Inhaber des Arbeitsbereichs ihn unter **Computers**, setzt das Häkchen bei
**Alert when this computer stops reporting** und wählt **Save changes**.

![Die Seite eines Computers in Dagu Console mit seinen Details, seinen letzten Ausführungen und der Option Alert when this computer stops reporting](../../../../assets/docs/de/console-computer.png)

E-Mails werden verschickt, wenn sich eine Benachrichtigung öffnet und wenn sie
behoben ist:

- Dass sich ein Computer nicht mehr meldet, erfährt der Inhaber des
  Arbeitsbereichs per E-Mail.
- Ein fehlgeschlagener Workflow wird per E-Mail gemeldet, sobald der Inhaber das
  einschaltet: Setzen Sie in **Settings** unter **Alert emails** in der Zeile
  **Owners and admins** das Häkchen bei **Kitewell** und wählen Sie
  **Save changes**. Die E-Mail geht an den Inhaber und an die Admins des
  Projekts.
- **Add a recipient** fügt ein Mitglied (**Member**) oder eine externe Adresse
  (**Outside address**) hinzu, jeweils mit Häkchen bei **Kitewell**. Beide
  erfahren von Computern, die sich nicht mehr melden, und von fehlgeschlagenen
  Workflows: ein Mitglied für die Projekte, die es öffnen kann, und die
  Computer, die es sehen kann, eine externe Adresse für jedes Projekt, sobald
  sie bestätigt ist.

### Benachrichtigungen von Kitewell und von Dagu Console

[Die eigenen Benachrichtigungen von Kitewell](/de/docs/alerts/) kommen vom
Computer. Beide arbeiten nebeneinander:

| | Benachrichtigungen von Kitewell | Benachrichtigungen von Dagu Console |
| --- | --- | --- |
| Absender | Der Computer | Dagu Cloud |
| Tarif | Personal und Team | Jeder Tarif |
| Ereignisse | Schlägt fehl, wird wiederhergestellt, benötigt Eingabe, verpasst einen Zeitplan, läuft zu lange, wird abgebrochen, ist erfolgreich, beendet einen Stapel | Ein Workflow ist fehlgeschlagen; ein Computer meldet sich nicht mehr |
| Kanäle | Dieses Gerät, E-Mail, Slack, Microsoft Teams, PagerDuty, Webhook | E-Mail |
| Während der Computer schläft | Nichts wird gesendet; verpasste Planungen werden beim Aufwachen gemeldet | Die Benachrichtigung über fehlende Meldungen öffnet sich |

<a id="what-dagu-console-keeps"></a>

## Was Dagu Console aufbewahrt

- Workflow, Status, Auslöser, Zeiten und Namen der fehlgeschlagenen Schritte
  jeder Ausführung, 14 Tage lang. Ein Arbeitsbereich bewahrt bis zu 500
  abgeschlossene Ausführungen pro Tag (UTC) auf; darüber hinaus zeigen die
  **Geräteeinstellungen**, wann sein Ausführungsverlauf weitergeht.
- Die Tagessummen jedes Workflows, für die Insights, 13 Monate lang.
- Benachrichtigungen, 90 Tage nachdem sie behoben sind.
- Ein Computer, der sich 30 Tage lang nicht gemeldet hat, wird entfernt, mit
  allem, was er gemeldet hat.

Um keinen Ausführungsstatus mehr zu senden, schaltet der Inhaber des
Arbeitsbereichs ihn aus, wie unter
[Ausführungen in Dagu Cloud verfolgen](/de/docs/cloud-sync/#follow-runs-in-dagu-cloud)
beschrieben. Die Computer melden dann nur noch, dass sie laufen.
