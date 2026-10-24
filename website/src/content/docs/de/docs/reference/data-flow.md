---
title: Referenz zum Datenfluss
---

Jedes Ziel, das Kitewell erreichen kann, was es erhält und wie Sie es stoppen: die ausführliche Fassung von [Was Ihren Computer verlässt](/de/docs/data-flow/).

## Wohin Daten gehen

Jeder Eintrag nennt, was gesendet wird, wer es erhält und wie Sie es stoppen.

- **Ein Modellschritt, der Assistent, die Fehlerdiagnose oder eine Tabellenspalte, die ein Modell liest. ** Sendet den Prompt und was er liest – Ausgaben von Ausführungen, Logs, Seitentext, Screenshots, Tabellenzeilen, Wissen – an den Anbieter des Modells, das Sie unter [Agenten und Modelle](/de/docs/ai/) gewählt haben. Stoppen: Wählen Sie ein Modell auf einem Server, den Sie selbst betreiben. - **Die enthaltene KI von Kitewell. ** Sendet dasselbe Material. An Dagu Cloud, die es an OpenRouter weitergibt und keinen Prompt-Text speichert, nur Workspace, Gerät, Modell und verbrauchte Credits. Nur auf einem Computer, der bei Dagu Cloud angemeldet ist. Stoppen: Wählen Sie ein eigenes Modell. - **Eine Tabellenspalte, die mit Ja/Nein, per Auswahl oder auf einer Skala urteilt. ** Sendet dasselbe Material, dazu die Frage jeder Spalte und die Bedeutung jeder Option. An den Anbieter des Entscheidungsmodells: OpenRouter, TypeSafe oder eine Adresse, die Sie festlegen. Stoppen: Wählen Sie stattdessen eine Spalte, die einen veröffentlichten Wert übernimmt; sie braucht kein Modell. - **Eine Aufgabe „Einen KI-Agenten beauftragen“. ** Sendet den Prompt und alles, was der Agent in seinem Arbeitsordner liest, zu den Bedingungen dieses Tools. An den Dienst, bei dem sich dieses Kommandozeilen-Tool anmeldet. Stoppen: Verwenden Sie eine andere Aufgabe. - **[Eine API über ihre Adresse importieren](/de/docs/apis/) oder den Assistenten eine Webseite prüfen lassen. ** Sendet eine einfache Anfrage nach dem Dokument oder der Seite, ohne Zugangsdaten. An die Adresse, die Sie angegeben haben. Stoppen: Laden Sie stattdessen die OpenAPI-Datei hoch. - **Ein Website-, Befehls-, Datei-, API-, Docker- oder Remote-Schritt. ** Sendet, was der Schritt sendet. An die Websites, Server, APIs, Image-Registries und Computer, die Ihre Schritte nennen. Stoppen: Entfernen Sie den Schritt. - **Ein E-Mail-Schritt.** Sendet die Nachricht und die Suche, die Sie angefordert haben. An den Mailserver Ihres Postfachs oder bei einem Google-Postfach an die Gmail-API; die Anmeldung läuft über Google oder Microsoft. Stoppen: Trennen Sie das Postfach unter **E-Mail-Konten **. - **[Benachrichtigungen](/de/docs/alerts/). ** Senden, was passiert ist, wie dringend es ist, das Projekt, den Workflow und einen Link zurück. An Ihren Mailserver, eine Slack- oder Teams-Adresse, PagerDuty oder einen eigenen Webhook. Stoppen: Entfernen Sie den Kanal. - **Die Anmeldung bei Dagu Cloud.** Sendet den Tarif des Workspace, die Kitewell-Version sowie ID und Namen dieses Computers, alle sechs Stunden. An Dagu Cloud, betrieben von Descarty. Stoppen: **Abmelden** in den **Geräteeinstellungen **. - **Die Websuche des Assistenten.** Sendet die Wörter jeder Suche und die Sprache, in der Kitewell angezeigt wird. An Dagu Cloud, die sie an Serper weitergibt und keinen Suchtext speichert, nur Workspace, Gerät und verbrauchte Credits. Stoppen: **Abmelden** in den **Geräteeinstellungen **; der Assistent fragt dann nach Adressen. - **[Ein Projekt synchronisieren](/de/docs/cloud-sync/).** Sendet die Workflows dieses Projekts, seine Modelle, Server, API-Verbindungen, Queues und Registries, die Namen und Beschreibungen seiner Secrets, Tabellen, Wissensseiten und Releases sowie – bei einem Workflow, der ein Postfach bearbeitet – auf wessen angemeldetem Gerät er läuft. An Dagu Cloud. Stoppen: **Synchronisierung beenden ** bei diesem Projekt. - **[Die Ausführungen eines synchronisierten Projekts](/de/docs/cloud-sync/#follow-runs-in-dagu-cloud).** Sendet für jede Ausführung Workflow, Status, Auslöser, Zeiten und die Namen fehlgeschlagener Schritte, dazu Kitewell-Version und System dieses Computers, alle zwei Minuten. An Dagu Cloud; nie Parameter, Logs, Ausgaben oder Tabellenwerte. Stoppen: **Synchronisierung beenden **; schalten Sie den Ausführungsstatus in Dagu Cloud aus, geht nur noch mit, dass der Computer Workflows ausführt. - **[ChatGPT oder Claude, mit Kitewell verbunden](/de/docs/mcp/).** Sendet, was die App anfragt: Workflows, Ausführungen und Logs, Artefakte, Tabellen, Wissen und – mit Bearbeitungsrecht – Zeilen einer Excel-Datei auf diesem Computer. An die App, über das Relay von Kitewell unter `mcp.kitewell.app`. Stoppen: **Fernzugriff** ausschalten oder bei der App **Widerrufen ** wählen. - **Ein Ereignis, das eine App oder ein API-Schlüssel abonniert hat.** Sendet jedes Ereignis: Projekt, Workflow, Ausführung, wie sie endete, die Zeiten, Namen fehlgeschlagener Schritte, die Frage eines wartenden Schritts, die Zahlen eines Tabellenstarts oder warum eine Planung verpasst wurde. An die Adresse, die der Abonnent angegeben hat. Stoppen: **Entfernen ** beim Abonnement. - **Der Webhook eines Workflows.** Es geht nichts hinaus. Anfragen kommen herein und warten beim Relay von Kitewell unter `hooks.kitewell.app` mit ihren Headern und ihrem Body höchstens 7 Tage, bis dieser Computer sie abholt. Stoppen: **Ausschalten ** bei diesem Webhook. - **Update-Prüfungen.** Senden eine Anfrage, die nichts über Sie oder Ihre Arbeit verrät. An GitHub für die Workflow-Engine und an kitewell.app für die Kitewell-App. Die Prüfung der Engine stoppen Sie, indem Sie **Automatische Engine-Updates ** ausschalten; die App wird nur geprüft, wenn Sie es verlangen. - **WebView2 unter Windows installieren.** Sendet eine Download-Anfrage an Microsoft. Das Installationsprogramm bringt die Laufzeit normalerweise mit, daher kommt das nur vor, wenn sie fehlt.

Kitewell sendet sonst nichts. Die App hat kein Nutzungs-Tracking, keine Absturzberichte und keine Analytics. Descarty erhält die Daten, mit denen Ihre Ausführungen arbeiten, nur in den Anfragen, die Sie über die enthaltene KI von Kitewell oder die Websuche des Assistenten senden.

## Was Ihren Computer nie verlässt

| Was | Wo es liegt |
| --- | --- |
| Werte von Secrets | Verschlüsselt in der Engine jedes Projekts, in Logs maskiert, nie zurückgelesen, exportiert, gesichert oder synchronisiert. Ein synchronisiertes Projekt trägt Namen und Beschreibung eines Secrets; jeder Computer hat seinen eigenen Wert. Siehe [Secrets](/de/docs/secrets/) |
| Anmeldungen | Postfachverbindungen, gespeicherte Website-Anmeldungen, SSH-Schlüssel und vertrauenswürdige Hosts sowie Passwörter für Image-Registries. Alles verschlüsselt oder in einer Datei, die nur Ihr Benutzer lesen kann, und alles aus Backups ausgenommen. Die Schlüssel, die sie versiegeln, sind selbst mit einem Geräteschlüssel versiegelt, den das Betriebssystem verwahrt |
| Logs und Artefakte der Ausführungen | Der Datenordner, standardmäßig 30 Tage lang, pro Projekt. Siehe [Ausführungen und Logs](/de/docs/runs/). Ein synchronisiertes Projekt meldet den Status jeder Ausführung und die Namen fehlgeschlagener Schritte, nie ihre Parameter, Logs, Artefakte oder Tabellenwerte |
| Die Unterhaltung mit dem Assistenten und die Fehlerdiagnosen | Der Datenordner: eine Unterhaltung für diesen Computer, aus Backups ausgenommen, und Diagnosen pro Projekt |
| Excel-Arbeitsmappen | Direkt auf dem Computer gelesen und geschrieben, auf dem die Datei liegt. Eine damit verknüpfte Tabelle trägt den Dateinamen und welcher Computer sie hat, nie eine Zelle. Ihr Pfad, in welche Zeile jedes Ergebnis zurückgeht, und die für „Rückgängig“ aufbewahrten Kopien bleiben auf diesem Computer. Siehe [Excel automatisieren](/de/docs/spreadsheets/) |
| Workflow-Definitionen und Wissen | Der Datenordner, bis Sie sie exportieren, teilen oder synchronisieren |

Dazu zwei Hinweise. Ein Snapshot, den Sie [herunterladen](/de/docs/backups/), enthält die Ausgaben der Ausführungen und die für „Rückgängig“ aufbewahrten Excel-Kopien. Behandeln Sie einen heruntergeladenen Snapshot daher als die sensible Datei, die er ist.

Die Zellen einer Arbeitsmappe verlassen den Computer sehr wohl, wenn Sie ein Modell oder eine verbundene App bitten, sie zu lesen; [Die Grenzen kennen](#know-the-boundaries) sagt, wann.

## Wählen, wo die KI läuft

Jede KI-Funktion nennt ein Modell, das Sie unter [Agenten und Modelle](/de/docs/ai/) hinzugefügt haben, oder die enthaltene KI von Kitewell.

- Die Anbieter sind Anthropic, OpenAI, Google Gemini, OpenRouter, Z.ai, OpenCode Zen oder jeder OpenAI-kompatible Server, den Sie betreiben, etwa Ollama oder vLLM. Ein Entscheidungsmodell nutzt OpenRouter oder TypeSafe.
- Ein eigener Server hält Prompts, Seitentext und Screenshots in Ihrem Netzwerk. Kleine lokale Modelle können meist keinen Browser und keinen Desktop steuern; wählen Sie daher pro Aufgabe.
- Über OpenRouter bitten die Lesevorgänge, die Kitewell selbst ausführt – der Assistent, die Fehlerdiagnose und die Ergebnisspalten einer Tabelle – OpenRouter, nur an Anbieter weiterzuleiten, die das Empfangene weder speichern noch damit trainieren. Ein Modellschritt in einem Workflow wird von der Engine gesendet und bittet nicht darum.
- [Die enthaltene KI von Kitewell](/de/docs/ai/#use-kitewells-included-model) braucht auf einem bei Dagu Cloud angemeldeten Computer keinen Schlüssel und wird aus den Credits des Workspace bezahlt. Dagu Cloud bittet OpenRouter, jede weitergegebene Anfrage nur an Anbieter zu leiten, die sie weder speichern noch damit trainieren. Ein Desktop-Schritt kann sie nur mit Kitewell Personal und Team nutzen.

Ein Wert, den ein Website- oder Desktop-Schritt eintippt, etwa ein Passwort, wird als `%name%` geschrieben. Nur der Name erreicht das Modell.

<a id="know-the-boundaries"></a>

## Die Grenzen kennen

- Workflows laufen mit den Rechten der Person, die Kitewell ausführt. Ein Befehlsschritt kann alles lesen, was Sie lesen können, auch den Datenordner. Führen Sie nur Definitionen und Befehle aus, denen Sie vertrauen.
- Der Screenshot eines Desktop-Schritts enthält jedes Fenster auf dem Bildschirm. Schließen Sie, was nicht zu sehen sein soll, oder nutzen Sie einen Computer, an dem sonst niemand arbeitet.
- E-Mails sind nicht vertrauenswürdige Eingaben. Text aus einer E-Mail, der einen Befehl oder einen Agenten erreicht, der Befehle ausführt, kann ihn lenken. **Prüfen und ausführen** warnt Sie, wenn ein Workflow das tut.
- Auch eine Webhook-Anfrage ist eine nicht vertrauenswürdige Eingabe. Prüft der Webhook nicht die Signatur des Absenders, kann jeder mit der URL diesen Workflow starten. Siehe [Einen Workflow per Webhook starten](/de/docs/webhooks/#check-who-sent-the-request).
- Bitten Sie den Assistenten oder eine verbundene App, eine Excel-Datei zu lesen, gehen ihre Zellen mit: eine Spaltenliste und zehn Beispielzeilen, wenn Sie eine Tabelle aus einer Datei erstellen, und die Zeilen selbst, wenn Sie sie ausdrücklich anfordern.
- Backups und Projektexporte sind nicht verschlüsselt. Sie lassen Werte von Secrets und Anmeldungen aus, enthalten aber Definitionen, Tabellen, Wissen, Ausgaben von Ausführungen und Einstellungen so, wie sie geschrieben wurden. Verschlüsseln Sie sie selbst, bevor Sie sie auf gemeinsamen Speicher verschieben.
- Zugangsdaten für Benachrichtigungskanäle, etwa eine Slack-Adresse, liegen in der Zugangsdatendatei des Geräts, versiegelt mit dem Geräteschlüssel, nicht im Schlüsselbund des Systems.
- Fernzugriff über MCP oder REST erreicht Kitewell nur über die lokale Adresse dieses Computers. Ausnahmen sind ChatGPT und Claude über das Relay von Kitewell sowie ein Client, vor den Sie Ihr eigenes HTTPS setzen. Siehe [MCP und API-Zugriff](/de/docs/mcp/).

## Wo der Datenordner liegt

- macOS: `~/Library/Application Support/Kitewell/`
- Windows: `%LOCALAPPDATA%\Kitewell\`

[Backups und Wiederherstellung](/de/docs/backups/) erklärt, was jeder Teil enthält, und [Kitewell deinstallieren](/de/docs/uninstall/), wie Sie alles entfernen.

## Details

### Modellanbieter

Ein Modellschritt erreicht `api.anthropic.com`, `api.openai.com`, `generativelanguage.googleapis.com`, `openrouter.ai`, `api.z.ai`, `opencode.ai` oder die Basisadresse, die Sie festlegen. Entscheidungsmodelle erreichen `openrouter.ai/api/alpha` oder `api.typesafe.ai/v1`, nur über HTTPS. Wenn Sie im Modellformular einen Anbieter wählen, wird außerdem dessen öffentliche Modellliste von OpenRouter oder OpenCode Zen abgerufen; die Anfrage trägt keinen Schlüssel und nichts über Sie.

Das Lesen einer Tabelle sendet höchstens 48 KiB pro Zeile: Bezeichnung und Eingaben der Zeile, das Ergebnis jedes Schritts, die Ausgaben, die die Ausführung veröffentlicht hat, bis zu fünf Textdateien, die sie erzeugt hat, und das Ende der Logs des letzten und der fehlgeschlagenen Schritte.

### Dagu Cloud

Anfragen gehen über HTTPS an `console.dagu.sh`, mit `User-Agent: Kitewell/<version>`. Ein synchronisiertes Dokument über 256 KiB wird über eine signierte Adresse, die Dagu Cloud zurückgibt, in deren Speicher hochgeladen. Die Cloud-Zugangsdaten dieses Computers sind eine Datei auf oberster Ebene des Datenordners, neben seinen Einstellungen, und nie in einem Backup.

Eine Websuche geht an `console.dagu.sh`, das sie an Serper unter `google.serper.dev` weiterleitet und Titel, Adressen und Ausschnitte zurückgibt.

Eine Anfrage an die enthaltene KI von Kitewell geht an `console.dagu.sh`, mit einem Ausführungstoken, das eine Woche gilt und täglich erneuert wird, nie mit den eigenen Zugangsdaten des Computers, und Dagu Cloud leitet sie an `openrouter.ai` weiter.

Der Ausführungsstatus eines synchronisierten Projekts geht alle zwei Minuten an `console.dagu.sh`, oder früher, wenn sich die laufenden Ausführungen ändern. Ein Bericht, der nicht ankommt, wird erneut gesendet. [Dagu Console](/de/docs/console/#what-dagu-console-keeps) bewahrt jede Ausführung 14 Tage auf, Tagessummen 13 Monate und Benachrichtigungen 90 Tage nach ihrer Auflösung.

### Das Relay

Das Relay ist ein Cloudflare Worker mit einem Objekt pro Gerät. Der Computer baut die Verbindung dorthin selbst über einen WebSocket auf, daher wartet in Ihrem Netzwerk nichts auf eingehende Verbindungen.

Es speichert den Namen dieses Computers, die Kitewell-Version, wann er sich zuletzt gemeldet hat, und die letzten Antworten auf die Aufrufe, die Tools auflisten, und löscht all das 30 Tage nach der letzten Meldung des Geräts. MCP-Anfragen und -Antworten laufen ungespeichert hindurch.

Bodys und Header von Webhooks sind die Ausnahme. Sie werden gespeichert, bis das Gerät sie abholt: höchstens 7 Tage, höchstens 1.000 wartende, 512 KiB pro Body, 16 KiB Header und 60 Anfragen pro Minute an eine URL.

Webhook-Tokens werden nur als Hashes gespeichert. Das Relay schreibt keine eigenen Logs. Webhooks gehören zu Kitewell Personal und Team.

Ereigniszustellungen laufen nicht über das Relay. Sie gehen direkt von diesem Computer an die Adresse des Abonnenten: nur HTTPS, nur an öffentliche Adressen, ohne Proxy, ohne Weiterleitungen, höchstens 256 KiB, im Format Standard Webhooks signiert und bis zu 24 Stunden lang erneut versucht.

### Updates

Die Prüfung der Engine liest das neueste Release von `dagucloud/dagu` bei `api.github.com`, und der Download kommt aus den Release-Dateien dieses Repositorys auf GitHub.

Die Kitewell-App liest ein signiertes Manifest von der HTTPS-Adresse, die dem Build mitgegeben wurde, und prüft die SHA-256 des Installationsprogramms, bevor sie es ausführt. Unter Windows lädt **WebView2 installieren** den Bootstrapper von Microsoft selbst von `go.microsoft.com` und prüft Microsofts Signatur, bevor er ausgeführt wird.

### Verschlüsselung im Ruhezustand

Secrets nutzen die AES-256-GCM-Registry der Engine. Postfachpasswörter und Refresh-Tokens werden mit AES-256-GCM unter einem E-Mail-Schlüssel pro Gerät versiegelt.

Der Schlüssel der Engine, der E-Mail-Schlüssel und die Zugangsdatendatei werden jeweils mit einem Geräteschlüssel versiegelt: unter Windows ein DPAPI-Blob im Maschinenbereich, den nur dieser PC öffnet; auf einem Mac eine Datei, die nur Ihr Benutzer lesen kann. Siehe [Secrets](/de/docs/secrets/).

Nichts davon ist in einem Backup, und ein auf einen anderen Rechner kopierter Datenordner öffnet nichts davon. Daten- und Backup-Ordner kann nur Ihr Benutzerkonto lesen.
