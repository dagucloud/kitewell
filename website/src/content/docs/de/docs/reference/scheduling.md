---
title: Referenz zu Planungen
---

Alles zu Planungen, was [Planungen und Hintergrundbetrieb](/de/docs/scheduling/) auslässt.

## Was die Einschätzung bedeutet

Jeder geplante Workflow trägt eine von fünf Einschätzungen: in der Liste **Workflows** unter seinem nächsten Start und im Planungseditor unter der Vorschau.

- **Wird laufen**, oder **Wird laufen, angemeldet oder nicht**, sobald der Windows-Dienst eingeschaltet ist: Nichts steht im Weg. Ein Hinweis dahinter, etwa dass das Gerät im Akkubetrieb ist, sagt, was Sie wissen sollten.
- **Läuft nur, während Sie angemeldet sind**: Die Ausführung findet statt, aber nur, wenn jemand angemeldet ist und Kitewell geöffnet hat. Unter Windows ist das so, solange der Dienst aus ist, und bei einem Workflow mit Desktop-Schritt oder sichtbarem Browserfenster auch, wenn er an ist.
- **Wird nicht laufen**: Etwas blockiert sie. Der Grund und seine Behebung folgen.
- **Pausiert **: Die Planung des Workflows ist pausiert. - **Nur manuelle Ausführungen**: Der Workflow hat keine Planung.

Die Gründe, die eine Einschätzung nennen kann, der schwerste zuerst:

- Der Anmeldedienst kann die Engine nicht starten: ein abgelehntes oder fehlendes Passwort, ein gesperrtes, deaktiviertes oder abgelaufenes Konto oder das verweigerte Recht, sich als Batchauftrag anzumelden;
- das Projekt ist pausiert, oder seine Engine oder sein Scheduler läuft nicht;
- der Workflow wird zurückgehalten, oder seine Planung lässt sich nicht lesen;
- ein Passwort läuft bald ab;
- der Energiesparplan lässt keine Reaktivierungszeitgeber zu;
- das Gerät ist im Akkubetrieb;
- eine Anmeldung im Browser braucht Ihr Passwort;
- die Zeitzone der Planung weicht von der des Geräts ab.

Jeder Grund hat eine Behebung, angeboten als Schaltfläche dort, wo der Grund angezeigt wird: den Dienst einschalten, das Passwort aktualisieren oder hinzufügen, den Text für die IT kopieren, das Projekt fortsetzen, die Engine starten oder neu starten, den Workflow oder seine Planung bearbeiten oder die Geräteeinstellungen öffnen.

Die Einschätzungen werden innerhalb einer Minute nach jeder Änderung neu ermittelt, und sofort, nachdem ein Workflow gespeichert wurde oder eine Engine startet oder stoppt.

## Die erste Planung

Wenn ein Workflow auf einem Gerät zum ersten Mal eine aktive Planung bekommt, sagt das eine Karte über der Liste **Workflows ** einmal an, mit der Einschätzung und **Zeitplan jetzt testen**. **Verstanden** blendet sie aus.

## Zeitplan jetzt testen

Führt den Workflow einmal über dieselbe Warteschlange und nach denselben Regeln aus, die eine geplante Ausführung nutzen würde, und öffnet die Ausführung. Sie erscheint als **Zeitplantest**. Sie ersetzt nie einen verpassten geplanten Zeitpunkt.

## Der Windows-Anmeldedienst

Ist **Ausführen, wenn niemand angemeldet ist** eingeschaltet, startet ein Windows-Dienst namens Kitewell sign-in die Engine beim Start des PCs, unter dem Ausführungskonto, und hält sie am Laufen. Dafür brauchen Sie Kitewell Team oder die Testphase; mit Kitewell Personal laufen Planungen nur, solange Sie angemeldet sind.

Das Ausführungskonto sind Sie, ohne Passwort angemeldet, so wie die Windows- Aufgabenplanung eine Aufgabe ausführt, für die kein Passwort gespeichert ist; auf Windows Server ein lokales Konto, das Kitewell anlegt, `Kitewell Runner`; oder ein anderes Konto, das Sie mit seinem Passwort angeben.

Was Sie davon haben:

- Planungen laufen nach einem Neustart, bevor sich jemand anmeldet.
- Der PC wird von fünf Minuten vor einer geplanten Ausführung bis zwei Minuten danach wach gehalten, und eine Minute vor der nächsten Ausführung wird ein Reaktivierungszeitgeber gesetzt, sofern der Energiesparplan das zulässt.
- Wenn Sie sich anmelden, wechselt die Engine in Ihre Sitzung, sodass Desktop-Schritte Ihren Bildschirm erreichen; wenn Sie sich abmelden, wechselt sie zurück.

Was er nicht tut:

- Einem Desktop-Schritt oder einem sichtbaren Browserfenster einen Bildschirm geben, solange niemand angemeldet ist. Diese Workflows zeigen **Läuft nur, während Sie angemeldet sind**.
- Netzwerkfreigaben oder Anmeldungen erreichen, die Windows mit Ihrem Passwort schützt, bevor Sie das Passwort mit **Mein Passwort verwenden…** hinzufügen. Die Einschätzung nennt die Workflows, die es brauchen.
- Ändern, wohin Ihre Dateien gehen: Ausführungen laufen weiterhin als Sie, mit Ihren Ordnern und Einstellungen.

Setup.exe installiert Kitewell für Ihr Konto ohne Administratorabfrage und richtet den Dienst daher nicht ein. Schalten Sie ihn nach dem Öffnen der App unter **Geräteeinstellungen → Ausführen, wenn niemand angemeldet ist** ein. Eine abgelehnte Abfrage oder eine abgebrochene Einrichtung wird festgehalten; die Gerätekarte sagt das und bietet die Funktion erneut an.

Nach einem Update bringt ein signiertes Kitewell die Programmkopie des Dienstes von selbst auf die neue Version, ohne Abfrage.

Die Programme des Dienstes liegen in `C:\Program Files\Kitewell` und seine Daten in `C:\ProgramData\Kitewell`, einmalig dorthin aus Ihrem eigenen Datenordner verschoben. Schalten Sie die Funktion aus, wird der Dienst entfernt und die Daten bleiben, wo sie sind.

Jeder Start, jeder Stopp, jede abgelehnte Anmeldung und jede Einrichtung steht in der Ereignisanzeige unter der Quelle **Kitewell sign-in**. Ein Passwort, das Sie hinzufügen, verwahrt Windows im selben geschützten Speicher, in dem es Dienstpasswörter verwahrt, nie in einer Datei von Kitewell.

## Verpasste Ausführungen

Ein geplanter Zeitpunkt, der ohne Ausführung verstrichen ist, wird mit einem von vier Gründen festgehalten:

| Angezeigter Grund | Was passiert ist |
| --- | --- |
| das Gerät war im Ruhezustand | Der Computer hat den Zeitpunkt verschlafen |
| Kitewell lief nicht | Kitewell, unter Windows der Dienst, lief nicht |
| die Engine des Projekts lief nicht | Das Projekt war pausiert oder seine Engine aus |
| kein Lauf wurde gestartet | Alles lief, und die Engine hat ihn nicht gestartet |

Die ersten drei liegen am Gerät, der letzte am Workflow. Unter **Ausführungen & Logs** steht eine Zeile **Verpasst ** zum geplanten Zeitpunkt zwischen den Ausführungen, mit dem Grund, und der Reiter **Verpasst** listet nur diese.

Die Zeile sagt **Das Nachholen ist an; die Engine führt ihn aus, sobald sie kann.**, **Das Nachholen ist aus, daher läuft er später nicht.** oder **Nachgeholt durch einen Lauf um** eine Uhrzeit, die diese Ausführung öffnet. Verpasste Zeilen lassen sich nicht wiederholen oder löschen; sie veralten mit dem Ausführungsverlauf.

Unter Windows zählt die Zeile, die nach einer Nacht Abwesenheit bei der Anmeldung erscheint, sie mit: „12 Ausführungen, 1 fehlgeschlagen; 2 geplante Ausführungen wurden nicht gestartet“.

## Nachholen

Das Nachholen führt verpasste Starts aus, sobald der Computer wieder da ist. Für einen einzelnen Workflow ändern Sie es unter **Planung → Versäumte Planungen**:

- **Versäumte Planungen nachholen**: **Projektstandard folgen**, **Aus  ** oder  **Eigener Rückblick **. - **Rückblickzeitraum**: wie weit zurückgeschaut wird, bis zu 30 Tage. Standard sind 24 Stunden.
- **Regel für versäumte Planungen**: **Jeden versäumten Termin ausführen  **, **Nur den neuesten versäumten Termin ausführen  ** oder  **Überspringen, während eine Ausführung aktiv ist**.

**Projekteinstellungen → Workflow-Standardwerte ** legt dasselbe für ein Projekt fest, und **Geräteeinstellungen → Workflow-Standardwerte** die Startwerte nur für neue Projekte. Pro Workflow werden höchstens 1.000 verpasste Starts aufbewahrt.

Mit Kitewell Personal oder Team sagt eine [Benachrichtigung über verpasste Planungen](/de/docs/alerts/), wie viele geplante Ausführungen nicht gestartet wurden und warum.

## Weitere Planungen, Pausen und Webhooks

Ein Workflow kann mehr als eine Planung haben und zu einem Zeitpunkt angehalten oder neu gestartet werden: **Weitere Planungen** enthält diese. **Planung pausieren** in der Liste **Workflows** nimmt einen Workflow aus dem Turnus; ein aus einem Workspace heruntergeladenes Projekt kommt mit pausierten Workflows an.

Ein Workflow kann auch starten, wenn ein anderer Dienst ihm eine Anfrage schickt. Schalten Sie seinen **Webhook** in der Ansicht **Planung** ein. [Einen Workflow per Webhook starten](/de/docs/webhooks/) sagt, was eine Anfrage mitbringt.

Eine Webhook-Adresse sieht aus wie `https://hooks.kitewell.app/…`; eine Anfrage muss ein POST sein, und die Antwort ist `202`. Ein Schritt liest den Body aus `$WEBHOOK_PAYLOAD` und die Header aus `$WEBHOOK_HEADERS`.

Ein Webhook nimmt etwa 60 Anfragen pro Minute an, einen Body bis 512 KiB und Header bis 16 KiB; die letzten 20 Anfragen werden unter **Letzte Anfragen** aufbewahrt. Unter Windows startet ein Body über rund 32.000 Zeichen eine Ausführung möglicherweise nicht, weil die Länge einer Befehlszeile begrenzt ist.

## Warteschlangen

Warteschlangen verhindern, dass alles auf einmal startet. Jedes Projekt hat eine Warteschlange **default **, die 5 gleichzeitig ausführt; ändern Sie sie oder fügen Sie eigene hinzu unter **Mehr → Warteschlangen** mit **Gleichzeitige Ausführungen **. Ein Workflow wählt seine Warteschlange in seinen **Einstellungen**.

Eine Warteschlange taktet manuelle Starts, Nachholläufe, Wiederholungen, Webhook-Ausführungen, Zeitplantests und [Batch](/de/docs/batches/)-Zeilen; eine Ausführung, die ihre Planung pünktlich startet, wird nicht zurückgehalten. Eine Warteschlange, die ein Projekt nicht definiert, lässt eine Ausführung nach der anderen zu.

## Bevor Sie es allein laufen lassen

- Ein Befehl läuft mit den Rechten des Ausführungskontos.
- Ein Docker-Schritt braucht ein laufendes Docker.
- Ein KI-Schritt braucht sein Modell oder seinen Agenten, auf diesem Gerät eingerichtet.
- Ein Schritt auf einem anderen Rechner braucht diesen Rechner erreichbar und seinen Host-Schlüssel akzeptiert.
- Ein [Website-Schritt](/de/docs/browser/) braucht Chrome und ein erfolgreiches **Browser prüfen**.
- Eine Ausführung, die ein Secret ohne Wert auf diesem Gerät braucht, schlägt beim Start fehl.

## Menüeinträge

Die Einträge in der Menüleiste und im Infobereich stehen in der Sprache, in der Sie Kitewell lesen: **Kitewell öffnen**, **Kitewell beenden**, **Wach bleiben, solange Workflows laufen** und **Bei der Anmeldung öffnen ** auf einem Mac oder **Bei der Anmeldung starten** unter Windows. Ein Mac hat außerdem **In der Menüleiste weiterlaufen lassen **, und Windows mit eingeschaltetem Dienst ergänzt **Hintergrunddienst aktualisieren …**.

Beide Menüs listen die Projekte auf, sodass Sie jedes einzeln starten und stoppen können. Auf einem Mac stoppt **Kitewell beenden** alles und warnt vorher, wenn Ausführungen laufen. Unter Windows mit eingeschaltetem Dienst schließt es das Fenster und überlässt die Engine und ihre Ausführungen dem Dienst.

## Details

- Der Ausführungsverlauf wird anfangs 30 Tage aufbewahrt, einstellbar unter **Geräteeinstellungen → Aufbewahrung des Ausführungsverlaufs**. Siehe [Ausführungen und Logs](/de/docs/runs/).
- Der Ruhezustandsschutz auf einem Mac, **Geräteeinstellungen → Ruhezustandsschutz**, hält den Computer wach, solange Arbeit läuft. Er ist anfangs aus und weckt den Computer nicht für eine Planung, die noch nicht gestartet ist.
- Der Windows-Dienst ist `kitewell-signin.exe`, registriert als `KitewellSignin`; `sc query KitewellSignin` zeigt seinen Zustand. Sein Einrichtungslog ist `%LOCALAPPDATA%\Kitewell\logs\signin-setup.log`.
