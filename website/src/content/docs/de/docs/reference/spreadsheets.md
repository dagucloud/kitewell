---
title: Referenz zu Excel
---

Alles zu Arbeitsmappen, was [Excel automatisieren](/de/docs/spreadsheets/) auslässt. Tabellenschritte gibt es in jedem Tarif.

## Zwei Arten, eine Arbeitsmappe zu nutzen

Als Zeilen einer Tabelle: Verknüpfen Sie die Arbeitsmappe mit einer Tabelle, und jede Zeile wird zu einer Ausführung, deren Ergebnis in diese Zeile zurückgeht. Nutzen Sie das, wenn die Arbeitsmappe die Aufgabe *ist*, eine Liste abzuarbeitender Vorgänge.

Als Schritte in einem Workflow: Fügen Sie eine Aufgabe aus der Gruppe **Tabellen** der Aufgabenauswahl hinzu und geben Sie ihr den Pfad der Datei; sie liest oder schreibt dann an dieser Stelle der Ausführung.

Nutzen Sie das, wenn eine Arbeitsmappe nur ein Teil einer größeren Aufgabe ist – eine Datei, die per E-Mail ankommt, eine monatliche Rechnung, die aus einer Vorlage befüllt wird.

## Was Kitewell liest

Es liest die Arbeitsmappen, die Ihr Büro schon hat. Eine Titelzeile über der Tabelle, eine über zwei Zeilen verbundene Kopfzeile, Zwischensummen mittendrin, Notizen darunter, Ziffern in voller Breite, japanische Ära-Datumsangaben, Postleitzahlen mit führenden Nullen: Kitewell findet heraus, wo die Tabelle ist und was jede Spalte enthält.

In dieser Version gibt eine verknüpfte Tabelle Ziffern in voller Breite und als Text geschriebene Ära-Datumsangaben als Text an den Workflow weiter. Tabellenschritte lesen sie als Zahlen und Datumsangaben.

Wenn Sie eine Arbeitsmappe verknüpfen, bietet jede Zeile der Vorschau **Zeile 3 als Spaltennamen verwenden** an, und **Keine Spaltennamen** gibt es für eine schlichte Liste. Zeilen über den Namen, leere Zeilen und Summenzeilen werden ausgelassen und jeweils gezählt.

Ein Kontrollkästchen bietet an, die Summenzeilen doch einzubeziehen, ein anderes, Zeilen auszulassen, die in Excel ausgeblendet sind.

Nur eine Spalte, deren Werte sich nie wiederholen und nie leer sind, kann unter **Zeilen werden wiedergefunden über** gewählt werden; die übrigen erscheinen ausgegraut mit „Werte wiederholen sich oder fehlen“. **Zeilenposition** ist die Ausweichlösung; dann dürfen Sie keine Zeilen sortieren oder einfügen, solange Ergebnisse ausstehen.

## Was in Ihre Datei zurückgeht

Eine Spalte der Tabelle mit dem Namen, der zurückgeschrieben wird, wird verwendet; ein neuer Name fügt rechts eine Spalte hinzu. Es werden keine Ausführungs-ID, keine interne Schlüsselspalte und keine Zellkommentare hinzugefügt. Die Spalte „Run at“ wird als `2026-10-01 09:30` geschrieben.

Die Wörter folgen der Sprache der eigenen Kopfzeilen der Arbeitsmappe: Eine Tabelle mit japanischen Kopfzeilen erhält 状態, エラー, 実行日時 und 済 / 一部失敗 / 失敗 / 中止 / 却下, und chinesische und koreanische Kopfzeilen erhalten dieselben Wörter auf Chinesisch und Koreanisch. Kopfzeilen nur aus Kanji gelten nur dann als Chinesisch, wenn Sie Kitewell auf Chinesisch lesen. Alle anderen Kopfzeilen, auch deutsche, erhalten die englischen Wörter.

Hat Excel sich ohne Speichern geschlossen und seine Sperrdatei zurückgelassen, entfernt **Sie ist nicht geöffnet** sie. Eine Kopie wird ebenso in der Sprache des Dateinamens benannt: `(結果)`, `(结果)` oder `(결과)` statt `(results)`.

**Rückgängig** verweigert sich, wenn Sie die Arbeitsmappe seit dem Schreiben bearbeitet haben, statt Ihre Änderungen zu verwerfen, und legt die aktuelle Datei daneben als `supplier-invoices (before undo).xlsx` ab. In dieser Version schreibt der nächste Schreibvorgang die rückgängig gemachten Ergebnisse wieder hinein.

**Arbeitsmappe erneut lesen** meldet, was es gefunden hat – „1 neu · 1 aktualisiert · 1 nicht mehr in der Tabelle“. Hat die Kopfzeile die Schlüsselspalte oder eine Spalte verloren, die eine Eingabe nutzt, bricht das Lesen ab und nennt, was fehlt; verknüpfen Sie die Arbeitsmappe neu, um die Spalten erneut zu wählen.

**Verknüpfung lösen** beendet die Verbindung: Die Zeilen bleiben in der Tabelle, und Ergebnisse gehen nicht mehr zurück.

## Tabellenschritte

In einem Workflow bietet die Gruppe **Tabellen** der Aufgabenauswahl zehn Aufgaben:

| Aufgabe | Tut |
| --- | --- |
| Tabelle lesen | Zeilen aus einem Blatt, nur die gewünschten, jede Spalte als Text, Zahl oder Datum gelesen |
| Tabelle prüfen | Anhalten, bevor etwas anderes geschieht, wenn Zellen falsch sind |
| Ergebnisse zurückschreiben | Status und Werte in die Zeilen, aus denen sie kamen |
| Tabelle schreiben | Eine neue Arbeitsmappe oder ein neues Blatt, ersetzt oder angehängt |
| Zeilen an eine Tabelle anhängen | Zeilen unter der letzten Zeile, passend zur Kopfzeile |
| Vorlage ausfüllen | Zellen oder benannte Zellen einer Vorlage, als Kopie gespeichert |
| Tabelle umwandeln | Ein Blatt in CSV (UTF-8 oder Shift_JIS), JSON oder JSON Lines |
| Blatt hinzufügen, kopieren, umbenennen oder löschen | Einen Monat aus einem Vorlagenblatt beginnen, sicher erneut ausführbar |
| Arbeitsmappe beschreiben | Blätter, Kopfzeilen und Typen für spätere Schritte |
| Formular lesen | Felder aus einem Angebot oder einer Bestellung, die als Formular gestaltet ist, gleich welchen Layouts |

Wählen Sie in einem Schritt die **Arbeitsmappe**, zeigt er ihre Blätter als Reiter und die ersten 20 Zeilen so umgewandelt, wie der Schritt sie lesen wird, mit der erkannten Tabelle und Kopfzeile benannt.

**Prüfen** fragt die Engine, ob der Schritt auf diesem Computer fehlschlagen würde – eine fehlende Arbeitsmappe, ein fehlendes Blatt oder eine fehlende Spalte –, bevor Sie etwas ausführen. Jede Zelladresse in der Antwort ist eine Schaltfläche, die Ihnen diese Zelle zeigt.

**Testen** zeigt die Zeilen als Tabelle. Ein Schritt, der schreibt, meldet bei einem Test nur, was er ändern würde, es sei denn, Sie aktivieren **Datei während Tests speichern**. „Tabelle umwandeln“ ist die Ausnahme: Ein Test davon schreibt seine Ausgabedatei wirklich.

Eine Spalte, auf die sich ein späterer Schritt bezieht, braucht einen kurzen Namen in einfachen Buchstaben, etwa `invoice` für „Invoice No“. **Name für spätere Schritte** neben jeder Spalte in **Tabelle lesen** nimmt ihn auf, und der Editor schlägt einen vor.

Jeder Schritt, der schreibt, hat drei Einstellungen: **Probelauf** meldet die Änderungen, ohne zu speichern; eine Wartezeit von bis zu einigen Minuten, in der eine in Excel geöffnete Arbeitsmappe erneut versucht wird, bevor der Schritt fehlschlägt; und, standardmäßig an, das Speichern über eine temporäre Datei, sodass nie eine halb geschriebene Arbeitsmappe zurückbleibt.

## Dieselbe Aufgabe als Schritte

Ist die Arbeitsmappe nur ein Teil eines größeren Workflows, bauen Sie die Rechnungsaufgabe als Schritte statt als verknüpfte Tabelle:

1. **Tabelle lesen** liest das Blatt Invoices. Wählen Sie unter **Nur Zeilen, bei denen…** die Spalte Status und lassen Sie den Wert leer, sodass nur die noch nicht erledigten Rechnungen gelesen werden.
2. **Für jedes Element** geht diese Zeilen nacheinander durch.
3. In der Schleife der Schritt, der die Rechnung im Portal erfasst: ein [Website-Schritt](/de/docs/browser/), ein [Desktop-Schritt](/de/docs/desktop/) oder ein Befehl. Er liefert die Belegnummer.
4. **Ergebnisse zurückschreiben**, noch in der Schleife, schreibt `Done` in Status und die Belegnummer in Receipt No, in die Zeile, aus der die Rechnung kam.

Weil das Zurückschreiben in der Schleife steht, behält eine fehlgeschlagene Zeile ihren leeren Status, und die nächste Ausführung greift sie wieder auf. Die Tabellenschritte bleiben vom Bildschirm unabhängig, gleich was zwischen ihnen steht.

## Formulare statt Tabellen

Ein Angebot oder eine Bestellung, als Formular gestaltet – Beschriftungen und Werte über das Blatt verteilt statt Zeilen unter einer Kopfzeile –, liest **Formular lesen**.

Sagen Sie unter **Was dieses Formular ist und was zu finden ist**, was das Formular ist. Nennen Sie unter **Zu findende Felder** jedes Feld, seinen Typ und wie seine Beschriftung auf dem Blatt aussieht, in der Sprache des Blatts.

Ein Modell antwortet mit der Zelle, in der jedes Feld steht, und die Engine liest die Werte dann selbst aus diesen Zellen, sodass kein Wert erfunden wird.

Schalten Sie **Die Werte der Zellen an das Modell senden** aus, sieht das Modell nur, welche Art von Inhalt in jeder Zelle steht; Beträge und Datumsangaben bleiben so auf diesem Computer.

**Dieses Layout merken, damit dasselbe Formular ohne das Modell gelesen wird** ist standardmäßig an, sodass dieselbe Vorlage keine weiteren Modellaufrufe kostet. **Gemerkte Zellen vergessen** lässt die nächste Ausführung erneut fragen – nutzen Sie es, wenn sich das Layout eines Formulars geändert hat oder ein Feld aus der falschen Zelle gelesen wurde.

## Datenschutz

- Die Arbeitsmappe wird auf diesem Computer gelesen, von Kitewell. Die Datei wird nie hochgeladen, und ihr Pfad verlässt das Gerät nie.
- **Aus dieser Datei einrichten** bittet den Assistenten, den Workflow aus der geöffneten Arbeitsmappe zu erstellen. Es sendet die Spaltennamen, den jeweils erkannten Typ und die ersten 10 Zeilen, jede Zelle auf eine Zeile gekürzt. **Nur Spaltennamen senden** sendet nur die Namen.
- Eine Arbeitsmappe mit Passwort wird nur auf diesem Computer geöffnet. Das Passwort wird als Verweis auf ein [Secret](/de/docs/secrets/) unter **Passwort, als Verweis auf ein Geheimnis** aufbewahrt, nie in den Workflow geschrieben und nie protokolliert. Eine geschützte Arbeitsmappe kann nicht in der Vorschau gezeigt und gar nicht importiert werden, bis das Passwort in Excel entfernt ist.
- Die Verknüpfung, die [mit Dagu Cloud synchronisiert](/de/docs/cloud-sync/) wird, trägt den Dateinamen, das Blatt, welches Gerät sie hat, und die Spaltenzuordnung – nie den Pfad. Die Zeilen der Tabelle reisen mit, und sie enthalten die aus der Arbeitsmappe gelesenen Zellwerte.
- Der Pfad der Datei, aus welcher Excel-Zeile jede Tabellenzeile kam, die aus Ausführungen gelesenen Ergebnisse und die für „Rückgängig“ aufbewahrten Kopien bleiben auf dem Gerät, das die Tabelle ausgeführt hat. Ein [Workspace-Backup](/de/docs/backups/) enthält diese Kopien allerdings.

Das Gesamtbild zeigt [Was Ihren Computer verlässt](/de/docs/data-flow/).

## Grenzen

- `.xlsx` und `.xlsm`. Eine `.xls`- oder `.ods`-Datei muss zuerst in Excel als `.xlsx` gespeichert werden.
- Ein Lesevorgang fasst 5.000 Zeilen und etwa 900 KB. Wird eines davon überschritten, sagt der Schritt, was er behalten hat, und bittet um einen engeren Bereich, weniger Spalten oder einen Zeilenfilter.
- Eine Tabelle fasst 5.000 Zeilen und 30 Ergebnisspalten, und eine Schleife durchläuft 1.000 Elemente. Eine importierte Datei hat höchstens 16 MiB.
- Die ausgeblendeten Zeilen einer verknüpften Arbeitsmappe werden mit dem Rest gelesen. Nur eine importierte Datei bietet an, sie auszulassen.
- Diagramme, Pivot-Tabellen, bedingte Formatierungen und Gültigkeitsregeln, die schon in einer Datei sind, bleiben erhalten, aber keine wird neu angelegt, und eine Pivot-Tabelle wird nicht aktualisiert. Unter Windows kann ein Makro-Schritt sie aktualisieren.
- Google Tabellen werden noch nicht unterstützt.

Ein Schritt, der eine Website oder eine Desktop-App steuert, braucht diese Anwendung weiterhin; nur die Tabellenschritte sind vom Bildschirm unabhängig.
