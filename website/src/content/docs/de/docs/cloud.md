---
title: Kitewell Cloud
---

Kitewell Cloud ist Kitewell im Browser, ohne Installation. Jedes Projekt, das
Sie dort anlegen, bekommt eine eigene Maschine in der Cloud. Seine Zeitpläne
laufen also auch bei zugeklapptem Computer. Workflows erstellen und korrigieren
Sie im Browser oder auf dem Handy.

## Loslegen

1. Öffnen Sie [app.kitewell.com](https://app.kitewell.com/) und melden Sie
   sich bei Dagu Cloud an, oder legen Sie ein Konto an.
2. Wählen Sie **Projekt erstellen** und geben Sie ihm einen Namen. Kitewell
   richtet die Maschine des Projekts ein. Das dauert etwa 20 Sekunden.
3. Beschreiben Sie dem Assistenten die Aufgabe, wie bei
   [Ihrem ersten Workflow](/de/docs/getting-started/).

Kitewell Cloud braucht weder Testphase noch Plan: Jeder Arbeitsbereich erhält
einmalig 1.000 kostenlose Ausführungsminuten, unten beschrieben. Ohne Karte
hält es ein Projekt; hinterlegen Sie auf der Kontoseite eine Karte für bis
zu 15.

## Cloud-Minuten

Kitewell Cloud wird getrennt von den Plänen nach den Minuten abgerechnet, die
Ausführungen dauern. Jede Ausführung wird auf eine volle Minute aufgerundet.
Das Warten auf eine Freigabe zählt nicht, das Bauen mit dem Assistenten auch
nicht.

- Jeder Arbeitsbereich erhält einmalig 1.000 Freiminuten, in jedem Plan. Ein
  neuer Monat gibt keine zurück.
- Danach kostet eine Minute 0,007 $ (1 ¥ in Japan) zuzüglich Steuern, bis zu
  dem Monatsbudget, das der Inhaber des Arbeitsbereichs auf der Kontoseite
  festlegt, nachdem er eine Karte hinterlegt hat.
- Ohne Karte und Budget startet Kitewell Cloud keine neuen Ausführungen mehr,
  sobald die Freiminuten aufgebraucht sind; die App zeigt das an. Es wird nichts
  berechnet. Mit Budget stoppen Ausführungen, sobald das Budget des Monats
  aufgebraucht ist, bis zum nächsten Monat.
- In der Zwischenzeit können Sie weiterhin Projekte öffnen, vergangene
  Ausführungen ansehen und exportieren.
- Ausführungen auf Ihrem eigenen Computer werden nie nach Verbrauch
  abgerechnet.

## Im Team arbeiten

Mit Kitewell Team, auch in der Testphase, lädt der Inhaber des Arbeitsbereichs
Personen im Browser ein:

1. Wählen Sie das Zahnrad neben Ihrem Namen, um **Konto** zu öffnen. Geben Sie
   unter **Team** die E-Mail-Adresse der Person ein und wählen Sie
   **Einladen**. Kitewell schickt ihr einen Link per E-Mail und zeigt ihn Ihnen
   einmal an, damit Sie ihn auch selbst senden können.
2. Die Person öffnet den Link, meldet sich mit dieser Adresse an oder legt ein
   Konto an und wählt, beizutreten. Kitewell öffnet Ihren Arbeitsbereich für
   sie.
3. Geben Sie ihr unter **Synchronisierte Projekte** für jedes Projekt, an dem
   sie arbeitet, die Rolle **Bearbeiter** oder **Administrator** und wählen
   Sie **Zugriff speichern**. Ein Cloud-Projekt zu öffnen erfordert eine der
   beiden.

Jede Person behält auch ihren eigenen Arbeitsbereich. Sobald sie mehreren
angehört, steht der Name des geöffneten Arbeitsbereichs unter ihrem Namen; ihn
zu wählen wechselt zu einem anderen.

## So läuft es

- Jedes Projekt läuft auf einer eigenen Maschine in Google Cloud, mit derselben
  Kitewell-Engine wie die Desktop-App.
- Website-Schritte laufen in einem echten Chrome auf dieser Maschine. Sie sehen
  ihm auf der Seite zu und wählen **Übernehmen**, um sich selbst bei einer
  Website anzumelden.
- Die Maschine schläft, wenn nichts ansteht, und wacht rechtzeitig zur nächsten
  geplanten Ausführung auf, ohne dass eine Seite offen sein muss.
- Dateien und Anmeldungen des Projekts liegen verschlüsselt in seinem eigenen
  Speicher, in der Google-Cloud-Region Iowa (`us-central1`) in den USA. Was
  wo gespeichert wird, steht in der [Datenschutzerklärung](/privacy/).
- Das enthaltene Modell von Kitewell läuft nur bei Hosts mit Zero Data
  Retention und Hauptsitz in den USA oder der EU. Was Sie senden, wird weder
  gespeichert noch zum Training verwendet
  ([Das enthaltene Modell von Kitewell verwenden](/de/docs/ai/#use-kitewells-included-model)).

## Was in der Cloud läuft und was Ihren Computer braucht

In Kitewell Cloud:

- [Websites](/de/docs/browser/), einschließlich Anmeldungen;
- [E-Mail](/de/docs/email/);
- [Excel-Dateien](/de/docs/spreadsheets/) ohne Makros;
- APIs und Web-Anfragen;
- KI-Modellschritte und der Assistent;
- Freigaben und [Zeitpläne](/de/docs/scheduling/) bei zugeklapptem Computer.

Mit [Kitewell auf Ihrem Computer](/de/docs/install/):

- [Desktop-Apps](/de/docs/desktop/);
- Excel-Makros und das Aktualisieren von Abfragen;
- Drucken;
- Dateien auf Ihrer eigenen Festplatte;
- Websites, die nur aus Ihrem Büronetz erreichbar sind;
- Client-Zertifikate auf Ihrem Computer;
- Coding-Agenten wie Claude Code und Codex, angemeldet mit Ihrem eigenen
  Abonnement.

## Cloud-Projekte und Desktop-Projekte

Ein im Browser angelegtes Projekt öffnet sich nur im Browser, ein Projekt auf
Ihrem Computer nur in der Desktop-App. Jedes läuft dort, wo es angelegt wurde.
