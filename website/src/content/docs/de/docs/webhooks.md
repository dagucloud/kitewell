---
title: Einen Workflow per Webhook starten
---

Ein Workflow kann starten, wenn ein anderer Dienst ihm eine Anfrage schickt:
GitHub, wenn ein Issue eröffnet wird, Stripe, wenn eine Zahlung erfolgreich
war, ein Formular, wenn jemand es absendet, oder Zapier und Make für die Apps,
die sie verbinden. Ihr Computer hat keine öffentliche Adresse, deshalb geht
die Anfrage an das Relay von Kitewell, das sie an Kitewell auf Ihrem Computer
weitergibt. Sie müssen keinen Port öffnen und keinen Tunnel einrichten.

Webhooks gehören zu jedem Tarif und zur Testphase und setzen voraus, dass
Kitewell bei Dagu Cloud [angemeldet](/de/docs/cloud-sync/#sign-in) ist.

## Einen Webhook einschalten

1. Öffnen Sie einen gespeicherten Workflow und wählen Sie **Planung** oder die
   Karte **Wann dies läuft**.
2. Wählen Sie unter **Webhook** die Option **Einschalten**. Nach einem Moment
   erscheint die URL: `https://hooks.kitewell.app/…`.
3. Wählen Sie **Kopieren** und fügen Sie die URL in den Dienst ein, der die
   Anfragen sendet.
4. Wählen Sie **Testanfrage senden**, um den ganzen Weg auszuprobieren:
   Kitewell sendet eine Anfrage an die eigene URL, und sie kommt wie jede
   andere über das Relay zurück. Sie startet eine Ausführung, wie es eine
   echte Anfrage täte, und öffnet sich unter **Letzte Anfragen**, damit Sie
   sehen, was angekommen ist.

Die Karte **Wann dies läuft** zeigt danach **Webhook an**. Die URL sehen nur
Personen, die den Workflow bearbeiten dürfen. API-Schlüssel und verbundene
Apps können sie nicht lesen.

## Den Assistenten mit der Anfrage arbeiten lassen

Sie müssen nicht wissen, wie eine Anfrage aufgebaut ist, um sie zu nutzen:

1. Lassen Sie den echten Dienst eine Anfrage senden, etwa indem Sie auf GitHub
   ein Test-Issue eröffnen.
2. Wählen Sie unter **Letzte Anfragen** daneben **Details**, um zu sehen, was
   sie enthielt.
3. Wählen Sie **Schritte aus dieser Anfrage erstellen**. Der Assistent öffnet
   sich mit dieser Anfrage. Ergänzen Sie den Satz um das, was Sie brauchen,
   etwa „den Titel des Issues und wer es eröffnet hat, dann beides in Slack
   posten“, und senden Sie ihn ab.

Der Assistent liest die Anfrage selbst, schlägt die Schritte vor und speichert
nichts, bis Sie sie übernehmen.

## Die Anfrage in einem Schritt lesen

Jede Anfrage startet eine Ausführung, und der Ausführungsverlauf zeigt als
Auslöser **Webhook**. Schritte lesen die Anfrage aus zwei Umgebungsvariablen:

- `WEBHOOK_PAYLOAD` enthält den Inhalt der Anfrage so, wie er gesendet wurde.
- `WEBHOOK_HEADERS` enthält die Header als JSON: Namen in Kleinbuchstaben,
  jeweils mit einer Liste von Werten, etwa `{"x-github-event":["issues"]}`.
  `Authorization` und Cookies werden weggelassen.

Sie müssen keine der beiden als Eingabe deklarieren. Um ein einzelnes Feld
aus einem JSON-Inhalt herauszuholen, etwa den Titel des Issues, bitten Sie
den Assistenten über **Schritte aus dieser Anfrage erstellen**: Er fügt einen
Schritt hinzu, der das Feld herausholt, und spätere Schritte lesen es über
seinen Namen, etwa `${steps.issue.outputs.title}`. Ein KI-Schritt kann den
ganzen Inhalt als Text in seinen Prompt aufnehmen.

Der Inhalt ist das, was der Absender geschickt hat; behandeln Sie ihn deshalb
als nicht vertrauenswürdig. Ein Befehl liest ihn aus seiner Umgebung, als
`"$WEBHOOK_PAYLOAD"` in einer macOS-Shell oder als `$env:WEBHOOK_PAYLOAD` in
PowerShell unter Windows. Schreiben Sie `${env.WEBHOOK_PAYLOAD}` oder einen
daraus entnommenen Wert nie in den Befehlstext, denn dort würden seine
Anführungszeichen zu Code. Der [Assistent](/de/docs/ai/#the-assistant) kennt
diese Variablen: Bitten Sie ihn, den Workflow aus der Anfrage zu bauen, die
Sie erwarten.

## Den Absender einrichten

### GitHub

1. Öffnen Sie im Repository oder in der Organisation **Settings → Webhooks**
   und wählen Sie **Add webhook**.
2. Fügen Sie die URL unter **Payload URL** ein.
3. Setzen Sie **Content type** auf `application/json`. Standardmäßig sendet
   GitHub den Inhalt als Formulardaten (`payload=…`), und das ist kein JSON.
4. Wählen Sie unter **Which events would you like to trigger this webhook?**
   die Option **Let me select individual events** und wählen Sie nur die
   Ereignisse, die der Workflow braucht. Jedes Ereignis, das GitHub sendet,
   startet eine Ausführung, sofern
   [Nur diese Ereignisse](#take-only-some-events) es nicht ausschließt.
5. Damit Kitewell die Signatur von GitHub prüft, fügen Sie das Secret, das
   Kitewell erstellt, unter **Secret** ein. Siehe
   [Prüfen, wer die Anfrage gesendet hat](#check-who-sent-the-request).

Der Reiter **Recent Deliveries** in GitHub zeigt jede Anfrage mit der Antwort
von Kitewell: `202`, wenn das Relay sie angenommen hat.

### Andere Dienste

Jeder Dienst, der ein HTTP-`POST` sendet, funktioniert. Fügen Sie in Stripe
ein Ereignisziel mit der URL hinzu und wählen Sie die Ereignisse. Fügen Sie
in einer Slack-App die URL unter Event Subscriptions ein. Fügen Sie in Zapier
oder Make eine Webhook-Aktion hinzu, die an die URL sendet. Ein Formulardienst
hat meist eine Einstellung für Webhooks oder für „eine URL benachrichtigen“.

<a id="check-who-sent-the-request"></a>

## Prüfen, wer die Anfrage gesendet hat

Jeder, der die URL kennt, kann eine Anfrage an sie senden. Damit nur Anfragen,
die der echte Absender signiert hat, Ausführungen starten, wählen Sie diesen
Absender unter **Anfragen annehmen von**: GitHub, Stripe, Slack oder Standard
Webhooks. **Jeder mit der URL** schaltet die Prüfung wieder aus.

- GitHub: Wählen Sie **Secret erstellen**. Kitewell zeigt das Secret einmal
  an; fügen Sie es im Webhook von GitHub unter **Secret** ein. **Neues Secret**
  ersetzt es, und die Anfragen von GitHub werden abgelehnt, bis Sie dort das
  neue einfügen.
- Stripe: Fügen Sie das Signaturgeheimnis des Ereignisziels, das mit `whsec_`
  beginnt, unter **Signaturgeheimnis** ein und wählen Sie **Speichern**.
- Slack: Fügen Sie das Signing Secret aus den Basic Information Ihrer
  Slack-App unter **Signaturgeheimnis** ein und wählen Sie **Speichern**. Das
  Relay von Kitewell beantwortet die URL-Prüfung von Slack auch dann, wenn
  dieser Computer nicht erreichbar ist.
- Standard Webhooks: Fügen Sie das Signaturgeheimnis, das der Absender
  anzeigt und das mit `whsec_` beginnt, unter **Signaturgeheimnis** ein und
  wählen Sie **Speichern**.

Eine Anfrage ohne gültige Signatur startet keine Ausführung und zeigt
**Abgelehnt** mit dem Grund. Eine Signatur von Stripe, Slack oder Standard
Webhooks muss innerhalb von fünf Minuten um den Zeitpunkt entstanden sein, zu
dem das Relay die Anfrage empfangen hat. Eine Anfrage, die am Relay gewartet
hat, besteht die Prüfung also trotzdem. Auch **Testanfrage senden** ist
signiert.

<a id="take-only-some-events"></a>

## Nur bestimmte Ereignisse annehmen

**Nur diese Ereignisse** nennt die Ereignisse, deren Anfragen Ausführungen
starten, durch Kommas getrennt, etwa `issues.opened, invoice.paid`. Ein Name
umfasst auch die Ereignisse darunter: `issues` umfasst `issues.opened` und
jedes andere `issues`-Ereignis. **Zuletzt empfangen:** bietet die Ereignisse
der letzten Anfragen an, jeweils mit einem Klick. Wählen Sie **Speichern**;
bleibt das Feld leer, startet jedes Ereignis eine Ausführung.

Kitewell benennt ein Ereignis so, wie sein Absender es tut: bei GitHub
Ereignis und Aktion, durch einen Punkt verbunden; bei Stripe und Absendern mit
Standard Webhooks das Feld `type` im Inhalt; bei Slack der Typ des Ereignisses,
das sein Callback mitbringt.

Eine Anfrage zu einem anderen Ereignis oder eine, die kein Ereignis nennt,
startet keine Ausführung und zeigt **Übersprungen**. Das gilt auch für den
Ping von GitHub, der nur die URL prüft.

## Wenn Ihr Computer im Ruhezustand oder offline ist

Das Relay antwortet dem Absender sofort, ob Ihr Computer erreichbar ist oder
nicht. Anfragen warten bis zu 7 Tage am Relay und laufen, die älteste zuerst,
sobald Kitewell sich wieder verbindet. Bis zu 1.000 Anfragen können auf einen
Computer warten; danach werden Absender gebeten, es später erneut zu
versuchen.

## Letzte Anfragen

Der Abschnitt Webhook listet die letzten 20 Anfragen: wann jede ankam, worum
es ging, so wie der Absender es benennt (etwa `issues.opened` bei GitHub oder
`payment_intent.succeeded` bei Stripe), ihre Größe und ihr Ergebnis. Die Liste
aktualisiert sich, solange sie geöffnet ist.

**Details** öffnet eine Anfrage: ihren Inhalt, gut lesbar aufbereitet, und
ihre Header, jeweils mit **Kopieren**, dazu
**Schritte aus dieser Anfrage erstellen** und **Ausführung ansehen →**. Bei
einer Anfrage, die keine Ausführung gestartet hat, steht stattdessen der
Grund, denn ihr Inhalt wird nur zusammen mit einer Ausführung aufbewahrt.

| Ergebnis | Bedeutung |
| --- | --- |
| **Lauf gestartet** | Die Anfrage hat eine Ausführung gestartet. Eine Anfrage, die das Relay zweimal gesendet hat, startet nur eine Ausführung. |
| **Fehlgeschlagen** | Die Ausführung konnte nicht in die Warteschlange gestellt werden, etwa weil die Engine des Projekts gestoppt ist. Ist die Engine ausgelastet oder gerade im Wiederanlauf, versucht Kitewell es zunächst 10 Minuten lang erneut. |
| **Ignoriert** | Die Testphase oder der Tarif ist abgelaufen, oder der Workflow ist nicht in Ihrem Tarif enthalten. |
| **Abgelehnt** | Die Anfrage hatte keine gültige Signatur des Absenders, der unter **Anfragen annehmen von** gewählt ist. |
| **Übersprungen** | Die Anfrage betrifft ein Ereignis, das der Webhook nicht annimmt, oder ist der Ping von GitHub. |

## Die URL geheim halten

Sofern der Webhook nicht
[prüft, wer die Anfrage gesendet hat](#check-who-sent-the-request), kann
jeder, der die URL kennt, den Workflow starten. Behandeln Sie sie wie ein
Passwort.

- **Neue URL** ersetzt sie sofort; die alte URL antwortet mit `404`. Fügen Sie
  die neue überall dort ein, wo die alte stand.
- **Ausschalten** stoppt die URL auf dieselbe Weise. Schalten Sie den Webhook
  wieder ein, entsteht eine neue URL.

Eine Webhook-URL gehört zu einem Computer. Schaltet jemand aus Ihrem Team den
Webhook desselben Workflows auf seinem Computer ein, bekommt dieser Computer
eine eigene URL. Ein wiederhergestelltes Backup beginnt mit ausgeschalteten
Webhooks.

## Grenzen

| Grenze | Wert |
| --- | --- |
| Anfrageinhalt | 512 KiB Text |
| Anfragen pro URL | 60 pro Minute |
| Anfragen, die auf einen Computer warten | 1.000, bis zu 7 Tage |

Das Relay antwortet:

| Status | Bedeutung |
| --- | --- |
| `202` | Angenommen. Der Inhalt der Antwort ist `{"id": "…"}`. |
| `404` | Keine Webhook-URL, oder sie wurde ausgeschaltet oder ersetzt. |
| `413` | Der Inhalt ist größer als 512 KiB. |
| `415` | Der Inhalt ist kein UTF-8-Text. |
| `429` | Mehr als 60 Anfragen in dieser Minute; erneut versuchen nach den Sekunden aus `Retry-After`. |
| `503` | Für diesen Computer warten bereits 1.000 Anfragen. |

Unter Windows kann es vorkommen, dass ein Inhalt mit mehr als etwa 30.000
Zeichen keine Ausführung startet; die Anfrage zeigt dann **Fehlgeschlagen**.
Push- und Pull-Request-Ereignisse von GitHub können so groß werden. Eine
Korrektur ist in Arbeit.

Endet die Testphase oder der Tarif oder ist der Workflow nicht mehr in Ihrem
Tarif enthalten, nimmt die URL weiterhin Anfragen an, aber sie starten nichts
und zeigen **Ignoriert**. Schließen Sie den Tarif erneut ab, brauchen Sie
keine neue URL.

## Wohin die Anfrage geht

Die Anfrage läuft über das Relay von Kitewell unter hooks.kitewell.app, das
auf Cloudflare betrieben wird. Das Relay bewahrt sie nur auf, bis Ihr Computer
sie abholt, höchstens 7 Tage, und speichert vom geheimen Teil jeder URL nur
einen Hash. Auf Ihrem Computer wird der Inhalt wie jede Eingabe einer
Ausführung zusammen mit der Ausführung aufbewahrt, so lange, wie Sie es
eingestellt haben. Siehe [Was Ihren Computer verlässt](/de/docs/data-flow/).

## Fehlerbehebung

- **„URL wird vom Relay von Kitewell abgerufen…“ verschwindet nicht.** Prüfen
  Sie, ob Kitewell bei Dagu Cloud angemeldet und der Computer online ist, und
  schalten Sie den Webhook dann aus und wieder ein.
- **Eine neue URL antwortet mit `404`.** Warten Sie ein paar Sekunden, bis
  Kitewell dem Relay die neue URL mitgeteilt hat.
- **Ein Schritt kann den Inhalt von GitHub nicht auswerten.** Setzen Sie im
  Webhook von GitHub **Content type** auf `application/json`.
- **Eine Anfrage zeigt „Fehlgeschlagen“.** Die Zeile nennt den Grund. Ist das
  Projekt gestoppt, starten Sie es über das Menü in der Menüleiste oder im
  Infobereich und senden Sie die Anfrage dann erneut.
