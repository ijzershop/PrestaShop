# Aanvullende categorieën

Vanaf moduleversie 1.0.17 kun je per categorie aanvullende categorieën selecteren voor de AI-categorieteksten.

## Gebruik

1. Selecteer één winkel in de backoffice en open de betreffende categorie.
2. Voeg onder **Aanvullende categorieën** de gewenste categorieën toe. De uitgebreidere tweede naam helpt om gelijknamige categorieën te onderscheiden.
3. Geef eventueel een korte toelichting, bijvoorbeeld waarom RVS bouten interessant zijn bij een project met RVS liggers. De toelichting is broninformatie voor de tekstschrijver, geen opdracht aan de AI.
4. Stel de volgorde in en sla de categorie op. Je kunt maximaal twintig verbindingen per categorie bewaren.
5. Open de AI-categoriegenerator, laad de actuele categoriecontext en genereer een nieuw concept. Controleer het concept en sla het op.

De generator kan één tot drie relevante verbindingen opnemen onder **Wat heb je verder nodig?**. De bestaande productlinks en **Veelgestelde vragen** blijven onderdeel van de tekst.

Verbindingen zijn optioneel. Zonder gekoppelde categorieën vervalt de hele sectie **Wat heb je verder nodig?**. Producten hoeven ook geen combinaties te hebben: de generator gebruikt dan hun eigen gegevens en productlink. Zijn er geen productlinks beschikbaar, dan vervalt **Kijk ook eens**.

Er is geen minimumaantal productlinks. Een beschrijving met minder dan drie productlinks, of zonder productlinks, wordt daarom niet afgekeurd of opnieuw gegenereerd. De controle op niet-aangeleverde links en onveilige HTML blijft gelden.

Voor categorieën, producten en gekoppelde categorieën gebruikt de generator de ingevulde tweede naam, met de normale naam als terugval. Ook een tweede naam die alleen witruimte of lege HTML bevat, geldt als leeg.

Een verbinding geldt alleen vanuit de bewerkte categorie naar de geselecteerde categorie. Voor de omgekeerde richting voeg je zelf een tweede verbinding toe. Verbindingen worden niet automatisch doorgegeven aan bovenliggende of onderliggende categorieën.

Alleen actieve, beschikbare categorieën in dezelfde winkel en de geselecteerde taal worden aan de generator meegegeven. De webshop bepaalt hun actuele URL. Inactieve verbindingen kunnen in de editor worden onderhouden, maar worden niet gebruikt bij nieuwe tekstgeneratie. De producten uit aanvullende categorieën worden niet toegevoegd aan de assortimentgegevens van de huidige categorie.

Een verbinding legt inhoudelijke relevantie vast. De AI mag daaruit geen technische compatibiliteit, geschikte boutmaat of belastbaarheid afleiden.

## Bestaande teksten

De gegenereerde HTML wordt opgeslagen in `top_description`. Veranderingen aan verbindingen, toelichtingen, categorienamen of URL's veranderen reeds opgeslagen teksten niet. Genereer en bewaar de tekst opnieuw om die veranderingen over te nemen.

De categorie-editor accepteert ook langere bovenbeschrijvingen. De opslaglimiet blijft 16.777.215 UTF-8-bytes inclusief HTML, gelijk aan de capaciteit van het MEDIUMTEXT-veld; de eerdere editorlimiet van 2.500 tekens geldt niet meer.

## Installatie

Een nieuwe module-installatie maakt de tabel `PREFIX_msthemeconfig_category_relation` aan. Voor bestaande installaties doet `upgrade/upgrade-1.0.17.php` dit en registreert deze upgrade de benodigde categorieformulierhooks. De upgrade voegt geen categorieverbindingen toe en verandert geen bestaande categorieteksten.

De tabel bewaart categorie-ID's, winkel-ID, volgorde en een optionele toelichting van maximaal 500 tekens. Namen en links worden bij iedere generatie opnieuw uit de catalogus opgehaald. Beheer vanuit een context met meerdere winkels tegelijk is uitgeschakeld om onbedoelde wijzigingen in andere winkels te voorkomen.
