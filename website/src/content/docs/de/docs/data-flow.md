---
title: Was Ihren Computer verlässt
---

Kitewell läuft auf Ihrem Computer. Ihre Workflows, Ihr Ausführungsverlauf, Logs,
Secrets und Anmeldungen bleiben in einem Ordner darauf. Nichts geht irgendwohin,
außer ein Schritt, eine Synchronisierung oder eine Anmeldung, die Sie
eingerichtet haben, sendet es.

Diese Seite zeigt, wohin Daten gehen können und wie Sie jeden dieser Wege
stoppen.

## Wohin Daten gehen können

<div class="kw-flow not-content">
<div class="kw-flow-env"><p class="kw-flow-env-label">Ihr Computer</p>
<div class="kw-flow-app"><p class="kw-flow-app-name">Kitewell (Engine: Dagu)</p>
<ul><li>Workflows und ihr Änderungsverlauf</li><li>Ausführungsverlauf, Logs, Ausgabedateien, Bildschirmfotos</li><li>Secrets, verschlüsselt</li><li>Anmeldungen für Postfächer und Websites</li><li>Gespräche mit dem Assistenten</li></ul></div></div>
<ol class="kw-flow-out">
<li><p class="kw-flow-dest">Das KI-Modell Ihrer Wahl</p><dl><dt>Sendet</dt><dd>Prompts, den Text von Seiten, die ein Website-Schritt liest, Bildschirmfotos, die ein Desktop-Schritt aufnimmt, und Ihre Gespräche mit dem Assistenten.</dd><dt>Wann</dt><dd>Ein Schritt nutzt KI, oder Sie nutzen den Assistenten.</dd><dt>So stoppen Sie es</dt><dd>Wählen Sie für jede KI-Funktion ein Modell auf einem eigenen Server; dann bleibt dies in Ihrem Netzwerk.</dd></dl></li>
<li><p class="kw-flow-dest">Ihre eigenen Systeme und Websites</p><dl><dt>Sendet</dt><dd>Was die Schritte eingeben, hochladen und senden.</dd><dt>Wann</dt><dd>Ein Workflow läuft, genau so, wie Sie ihn gebaut haben.</dd><dt>So stoppen Sie es</dt><dd>Entfernen Sie den Schritt.</dd></dl></li>
<li><p class="kw-flow-dest">Ihr Mailserver und Ihre Benachrichtigungskanäle</p><dl><dt>Sendet</dt><dd>Die E-Mail, die ein Schritt sendet. Bei einer Benachrichtigung: was passiert ist, den Workflow und einen Link zurück – nie die Ausgabe einer Ausführung.</dd><dt>Wann</dt><dd>Sie verbinden ein Postfach oder fügen einen Benachrichtigungskanal hinzu.</dd><dt>So stoppen Sie es</dt><dd>Trennen Sie das Postfach oder entfernen Sie den Kanal.</dd></dl></li>
<li><p class="kw-flow-dest">Dagu Cloud, betrieben von Descarty</p><dl><dt>Sendet</dt><dd>Ihren Tarif, die Kitewell-Version sowie Namen und ID dieses Computers. Für ein synchronisiertes Projekt: seine Workflows und die Namen seiner Secrets, nie deren Werte, sowie den Status jeder Ausführung mit den Namen ihrer fehlgeschlagenen Schritte. Für das enthaltene Modell von Kitewell: jede Anfrage, die Dagu Cloud an OpenRouter weitergibt. Für die Websuche des Assistenten: die Wörter jeder Suche, die Dagu Cloud an Serper weitergibt und nicht speichert.</dd><dt>Wann</dt><dd>Sie melden sich an, synchronisieren ein Projekt, nutzen das enthaltene Modell, oder der Assistent sucht im Web. Vor der Anmeldung wird nichts gesendet.</dd><dt>So stoppen Sie es</dt><dd>Melden Sie sich ab oder beenden Sie die Synchronisierung des Projekts. Der Inhaber des Arbeitsbereichs kann den Ausführungsstatus in Dagu Cloud ausschalten.</dd></dl></li>
<li><p class="kw-flow-dest">ChatGPT oder Claude, über das Relay von Kitewell</p><dl><dt>Sendet</dt><dd>Was die App bei Kitewell anfragt: Workflows, Ausführungen und ihre Logs, Tabellen, Wissen. Das Relay leitet es weiter und speichert nichts davon.</dd><dt>Wann</dt><dd>Sie verbinden eine App.</dd><dt>So stoppen Sie es</dt><dd>Schalten Sie den Fernzugriff aus oder widerrufen Sie die App.</dd></dl></li>
</ol>
</div>

Kitewell sendet sonst nichts. Es gibt kein Nutzungs-Tracking, keine
Absturzberichte und keine Analysen. Descarty erhält die Daten, mit denen Ihre
Ausführungen arbeiten, nur in den Anfragen, die Sie über das enthaltene Modell
von Kitewell oder die Websuche des Assistenten senden. Die einzige weitere
Anfrage ist eine Versionsprüfung, die nichts über Sie enthält.

## Was nie hinausgeht

- **Werte von Secrets.** Auf diesem Computer verschlüsselt, in Logs maskiert und
  nie exportiert, gesichert oder synchronisiert. Ein synchronisiertes Projekt
  trägt den Namen eines Secrets; jeder Computer hat seinen eigenen Wert.
- **Anmeldungen.** Postfachverbindungen, gespeicherte Website-Anmeldungen und
  SSH-Schlüssel werden verschlüsselt oder in einer Datei aufbewahrt, die nur
  Ihr Benutzer lesen kann, und fehlen in Backups. Ihre Schlüssel sind mit einem
  Geräteschlüssel versiegelt, den das Betriebssystem verwahrt.
- **Logs und Ausgaben von Ausführungen.** Standardmäßig 30 Tage im Datenordner
  aufbewahrt. Ein synchronisiertes Projekt meldet den Status und die Namen der
  fehlgeschlagenen Schritte jeder Ausführung, nie ihre Parameter, Logs,
  Ausgaben oder Tabellenwerte.
- **Excel-Dateien.** Direkt dort gelesen und geschrieben, wo sie liegen. Zellen
  gehen nur hinaus, wenn Sie ein Modell oder eine verbundene App bitten, sie zu
  lesen.

## Wählen, wo KI läuft

Jede KI-Funktion verwendet ein Modell, das Sie unter **Agenten und Modelle**
hinzugefügt haben, oder das enthaltene Modell von Kitewell. Auf einem bei Dagu
Cloud angemeldeten Computer braucht das enthaltene Modell keinen Schlüssel:
Seine Anfragen gehen über Dagu Cloud an OpenRouter. Ein Server, den Sie selbst
betreiben, etwa Ollama, hält Prompts, Seitentext und Bildschirmfotos in Ihrem
Netzwerk.

Ein Passwort, das ein Website- oder Desktop-Schritt eingibt, wird als `%name%`
geschrieben, sodass nur der Name das Modell erreicht.

## Vier Dinge, die Sie wissen sollten

- Workflows laufen mit Ihren Rechten. Ein Befehlsschritt kann alles lesen, was
  Sie lesen können; führen Sie also nur Definitionen und Befehle aus, denen Sie
  vertrauen.
- Das Bildschirmfoto eines Desktop-Schritts zeigt den ganzen Bildschirm, andere
  Fenster eingeschlossen. Schließen Sie, was nicht zu sehen sein soll.
- E-Mails und Webhook-Anfragen sind nicht vertrauenswürdige Eingaben: Text
  daraus kann einen Befehl oder einen Agenten steuern. **Prüfen und ausführen**
  warnt Sie, wenn ein Workflow das tut.
- Backups und Exporte sind nicht verschlüsselt. Sie lassen Secrets und
  Anmeldungen weg, enthalten aber alles andere so, wie es geschrieben wurde.

## Für eine Sicherheitsprüfung

Die [Sicherheitsseite](https://descarty.com/en/security/) von Descarty fasst
dies für IT- und Sicherheitsprüfungen zusammen, und ihre
[Sicherheitsübersicht](https://descarty.com/en/resources/) beantwortet die
Fragen, die Sicherheitsfragebögen üblicherweise stellen.

Die [Referenz zum Datenfluss](/de/docs/reference/data-flow/) führt jedes Ziel
auf, mit Adressen, Größen, Aufbewahrungsdauer und der Art der Verschlüsselung.
