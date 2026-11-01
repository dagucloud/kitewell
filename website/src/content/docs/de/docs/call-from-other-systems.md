---
title: Kitewell aus einem anderen System aufrufen
---

Eine Workflow-Plattform wie Camunda, intra-mart oder n8n, ein Job-Scheduler
oder ein EAI-Werkzeug kann Kitewell eine Aufgabe in seinem eigenen Ablauf
übergeben. Es startet einen Kitewell-Workflow, übergibt Werte und erhält das
Ergebnis zurück. Kitewell übernimmt den Teil ohne API, etwa eine Website oder
eine Desktop-App.

Es gibt zwei Wege. Wählen Sie danach, wie das andere System das Ergebnis
zurückbekommen möchte.

| | Webhook | REST-API |
| --- | --- | --- |
| Startet eine Ausführung mit | Einem `POST` an die Webhook-URL des Workflows | `POST /api/jobs/{id}/run` |
| Werte kommen hinein | Im Inhalt der Anfrage | Als `params` im Inhalt der Anfrage |
| Das Ergebnis kommt zurück | Aus dem letzten Schritt des Workflows | Durch Lesen der Ausführung |
| Erreicht Ihren Computer | Über das Relay von Kitewell, ohne Einrichtung | Unter einer Adresse, die Sie einrichten |
| Während der Computer im Ruhezustand ist | Anfragen warten bis zu 7 Tage am Relay | Kein Aufruf erreicht ihn |

## Was Sie brauchen

- Einen gespeicherten Workflow, der die Aufgabe erledigt.
- Kitewell geöffnet auf dem Computer, auf dem er liegt. Ausführungen starten
  nur, solange dieser Computer nicht im Ruhezustand ist.
- Für einen Webhook: Kitewell bei Dagu Cloud
  [angemeldet](/de/docs/cloud-sync/#sign-in).
- Für REST: einen API-Schlüssel mit der Berechtigung **Workflows ausführen**,
  erstellt wie unter
  [Einen Assistenten auf diesem Computer verbinden](/de/docs/mcp/#einen-assistenten-auf-diesem-computer-verbinden).

## Mit einem Webhook starten

Ein Webhook passt zu einem System, das einen HTTP-`POST` sendet und dann
weitermacht. In Ihrem Netzwerk wird kein Port geöffnet.

1. Schalten Sie den Webhook des Workflows ein und kopieren Sie seine URL, wie
   unter [Einen Webhook einschalten](/de/docs/webhooks/#einen-webhook-einschalten)
   beschrieben.
2. Fügen Sie im anderen System einen Schritt hinzu, der an diese URL sendet,
   mit den Werten, die die Aufgabe braucht, im Inhalt, etwa als JSON.
3. Lassen Sie es eine Anfrage senden. Wählen Sie in Kitewell unter
   **Letzte Anfragen** daneben **Details** und dann
   **Schritte aus dieser Anfrage erstellen**. Der Assistent fügt Schritte
   hinzu, die die Werte aus dem Inhalt herausziehen.

Schritte lesen den Inhalt aus `WEBHOOK_PAYLOAD`. Er enthält, was der Absender
geschickt hat; behandeln Sie ihn also als nicht vertrauenswürdig. Siehe
[Die Anfrage in einem Schritt lesen](/de/docs/webhooks/#die-anfrage-in-einem-schritt-lesen).

Das Relay antwortet sofort mit `202` und einem Inhalt wie `{"id": "…"}`. Das
heißt nur, dass die Anfrage angekommen ist, nicht, wie die Ausführung verlief.

Jeder mit der URL kann den Workflow starten, es sei denn, der Webhook
[prüft, wer die Anfrage gesendet hat](/de/docs/webhooks/#check-who-sent-the-request).
Halten Sie die URL also so geheim wie ein Passwort. Eine URL nimmt bis zu 60
Anfragen pro Minute an; siehe [Grenzen](/de/docs/webhooks/#grenzen).

## Mit der REST-API starten

REST passt zu einem System, das eine Ausführung startet und sie bis zum Ende
verfolgt. Jede Anfrage trägt `Authorization: Bearer <Ihr Schlüssel>`.

1. Ermitteln Sie die ID des Workflows mit `GET /api/jobs`.
2. Starten Sie eine Ausführung mit `POST /api/jobs/{id}/run`. Geben Sie die
   Werte unter `params` an, benannt wie die
   [Eingaben](/de/docs/workflow-builder/#was-sich-bei-jeder-ausführung-ändern-kann)
   des Workflows.
3. Erreicht der Schlüssel mehr als ein Projekt, nennen Sie das Projekt mit
   `?projectId=<id>`; siehe [Das Projekt wählen](/de/docs/mcp/#das-projekt-wählen).

```http
POST /api/jobs/{id}/run HTTP/1.1
Host: your-host
Authorization: Bearer <Kitewell API key>
Content-Type: application/json

{"params":{"region":"west"}}
```

Kitewell lauscht auf `127.0.0.1:19742`, nur für diesen Computer. Ein System
auf einem anderen Server braucht eine HTTPS-Adresse, die Sie selbst einrichten
und betreiben, über Ihren eigenen Proxy oder mit einem Zertifikat in Kitewell.
Siehe
[Ein Client auf einem anderen Computer](/de/docs/mcp/#ein-client-auf-einem-anderen-computer).

## Das Ergebnis zurückbekommen

Über REST lesen Sie die Ausführung. `GET /api/runs` listet Ausführungen auf,
`GET /api/runs/{jobId}/{id}` liest eine; lesen Sie sie erneut, bis sie
beendet ist. `GET /api/runs/{jobId}/{id}/logs` liefert, was die Schritte
geschrieben haben. Mit `stepId` und `stream=stdout` lesen Sie nur den
Schritt, der das Ergebnis ausgibt.

Über einen Webhook sendet der Workflow das Ergebnis selbst. Beenden Sie ihn
mit einem Schritt **Einen Webdienst aufrufen** oder einer Aktion einer
[importierten API](/de/docs/apis/), die das andere System aufruft. Lassen Sie
dieses System seine eigene Referenz, etwa seine Prozess-ID, in den Inhalt
setzen, und senden Sie die Referenz mit dem Ergebnis zurück.

## Wenn ein Schritt auf eine Person wartet

Ein Workflow kann für eine Person anhalten: bei einer Genehmigung nach einem
Schritt oder bei einem Schritt **Eine Person fragen** davor. Siehe
[Anhalten und eine Person fragen](/de/docs/workflow-builder/#stop-and-ask-a-person).
Die Ausführung wartet dort, und die Aufgabe des anderen Systems wartet mit.

Beide Seiten können den Schritt erledigen:

- Eine Person, in Kitewell unter **Ausführungen & Logs → Wartet**. Eine
  [Benachrichtigung](/de/docs/alerts/) kann ihr sagen, dass eine Ausführung
  auf eine Eingabe wartet.
- Das andere System, über REST mit **Workflows ausführen**:
  `POST /api/runs/{jobId}/{id}/approvals/{stepId}/approve`, `/reject` oder
  `/push-back` für eine Genehmigung und
  `POST /api/runs/{jobId}/{id}/human-tasks/{stepId}/complete` für die Aufgabe
  einer Person.

Eine Plattform mit eigener Aufgabenliste kann die Genehmigung dort ihren
Nutzern zeigen und deren Antwort an Kitewell weitergeben.
