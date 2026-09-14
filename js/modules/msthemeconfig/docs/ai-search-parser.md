# Gecontroleerde bronselectie voor AI-zoeken

De parser bepaalt vooraf welke catalogusgegevens bij een zoekvraag mogen worden gebruikt en hoeveel daarvan worden meegegeven. Eerst maakt een exportscript een lokaal JSON-bestand met toegestane openbare gegevens. Daarna selecteert de parser uit dat bestand een begrensde context voor de vraag.

De selectie werkt zonder AI-model. De opdracht `preview` opent geen databaseverbinding, start PrestaShop niet op en roept geen AI-provider aan. Het uitvoerbestand maakt controleerbaar welke JSON-brongegevens een latere AI-koppeling krijgt. Het veld `ai-search-input` gebruikt nu deze selectie en toont echte product- en categorielinks met Nederlandse tekst. De OpenAI-koppeling is nog niet aangesloten.

## De zoekfunctie in de webshop activeren

Publiceer eerst een actuele bron voor de betreffende winkel:

```sh
php external/modernesmid_webshop/scripts/ai-search-catalog.php publish --shop=1
```

Deze opdracht gebruikt het meegeleverde `module/msthemeconfig/config/ai-search-policy.json` en schrijft naar `var/ai-search/catalog-shop-1-nl.json` onder de PrestaShop-installatie. De map is beschermd tegen directe toegang via Apache. Bij een andere webserver moet de bestaande toegangsblokkade voor `var/` ook van toepassing zijn op deze map.

Schakel in de moduleconfiguratie onder **Algemene Configuratie → AI Frontend** de frontend in. De zoekvraag wordt daarna via de door PrestaShop gemaakte module-URL verwerkt. De zoekselectie leest uitsluitend de opgeslagen bron van de huidige winkel; zij bouwt tijdens een zoekvraag geen export en voert geen cataloguszoekopdracht op de database uit. De gebruikelijke PrestaShop-initialisatie en configuratiecontrole blijven onderdeel van de webaanvraag.

Voer `publish` opnieuw uit na catalogus-, rechten- of beleidswijzigingen. Plan de opdracht bijvoorbeeld dagelijks via de taakplanner of cron; er is geen automatische taak aangemaakt. Een ontbrekende, verouderde of niet-passende snapshot geeft een Nederlandse melding dat zoeken tijdelijk niet beschikbaar is. Er wordt nooit teruggevallen op demonstratieproducten of verzonnen prijzen. De afzonderlijke opdracht `export` hieronder blijft beschikbaar voor inspectie met een eigen uitvoerpad en beleid; alleen `publish` werkt de winkelbron op de vaste locatie bij.

Na wijzigingen aan `ai-assistant.js` moet de JavaScript-bundel van het thema worden herbouwd. Vernieuw daarna de browsercache. Productresultaten bevatten geen snapshotprijzen; de link leidt naar de productpagina met actuele prijzen en uitvoeringen.

## Gegevens en antwoorden zijn Nederlands

De export vereist precies één actieve Nederlandse taal die aan de gekozen winkel is gekoppeld en selecteert die automatisch. Er is geen terugval naar een andere taal. De context legt met `response_language: "nl"` vast dat een toekomstige AI-koppeling in het Nederlands moet antwoorden.

Product- en categorienamen, beschrijvingen, kenmerken en variantnamen komen uit die Nederlandse catalogusgegevens. Bestaande inhoud wordt niet automatisch vertaald. Controleer daarom ook dat de Nederlandse velden daadwerkelijk Nederlands bevatten.

Records zonder bruikbare openbare naam worden overgeslagen. De dekking in `coverage` vermeldt dat er gegevens zijn weggelaten, zodat een onvolledige bron herkenbaar blijft.

## Een momentopname exporteren

Voer de opdrachten uit vanuit de hoofdmap van de PrestaShop-installatie. Vervang de voorbeeldpaden door bestaande mappen en kies het juiste positieve winkel-ID.

```sh
php external/modernesmid_webshop/scripts/ai-search-catalog.php export --shop=1 --output="C:/ai-search/catalogus-winkel-1.json"
```

De export start PrestaShop op en leest de catalogus met vastgelegde selectiecriteria. Alleen de export heeft daarvoor databasetoegang nodig. `--shop` is verplicht: er wordt geen winkel afgeleid uit een toevallige beheerderssessie.

Met een eigen beleidsbestand en een expliciete installatiemap:

```sh
php external/modernesmid_webshop/scripts/ai-search-catalog.php export --shop=1 --output="C:/ai-search/catalogus-winkel-1.json" --config="C:/ai-search/beleid.json" --shop-root="C:/wampserver/www/modernesmid-webshop"
```

De bron is bestemd voor een niet-ingelogde bezoeker. Winkeltoewijzing, actieve categorieën en producten, taal en openbare toegang begrenzen de export. Offerteproducten en gegevens die uitsluitend voor een klant of afgeschermde groep beschikbaar zijn, horen niet in deze bron. Een relatie naar een uitgesloten product of een uitgesloten categorie mag die gegevens niet alsnog binnenbrengen.

Bewaar de momentopname en beleidsbestanden bij voorkeur buiten de publiek bereikbare webmap. Een AI-koppeling heeft alleen de geselecteerde context nodig.

## De exacte broncontext bekijken

```sh
php external/modernesmid_webshop/scripts/ai-search-catalog.php preview --snapshot="C:/ai-search/catalogus-winkel-1.json" --query="rvs bout"
```

De JSON-uitvoer verschijnt op standaarduitvoer. Met `--output` schrijf je de selectie naar een bestand:

```sh
php external/modernesmid_webshop/scripts/ai-search-catalog.php preview --snapshot="C:/ai-search/catalogus-winkel-1.json" --query="rvs bout" --config="C:/ai-search/beleid.json" --output="C:/ai-search/context-rvs-bout.json"
```

De parser zoekt deterministisch binnen de momentopname: dezelfde bron, vraag en beleidsinstellingen leveren dezelfde inhoudelijke selectie op. Zoekwoorden en eventuele beheerde aliassen bepalen de eerste matches. Bestaande verbindingen kunnen daarna binnen het ingestelde maximum aanvullende context opleveren. De parser verzint geen nieuwe producten, categorieën of verbindingen.

Controleer de uitvoer op relevante resultaten, geselecteerde velden, Nederlandse inhoud, bestaande links en aangegeven beperkingen. Een gedeeltelijke selectie beschrijft niet automatisch het volledige assortiment of alle beschikbare maten.

## Instellen welke gegevens worden toegelaten

Het meegeleverde beleidsbestand staat in [`../config/ai-search-policy.json`](../config/ai-search-policy.json). Gebruik `--config` om een eigen JSON-beleid toe te passen. Je mag alleen de gewenste wijzigingen invullen; ontbrekende instellingen krijgen hun standaardwaarde. Onbekende instellingen en ongeldige waarden worden geweigerd.

| Instelling | Betekenis |
|---|---|
| `category_ids` | Beperk de bron tot gekozen categorieën en hun onderliggende categorieën. Een lege selectie legt geen aanvullende categoriebeperking op. |
| `excluded_category_ids` | Sluit gekozen categorieën en hun volledige onderliggende takken uit. |
| `product_fields` | Kies toegestane aanvullende productvelden: `reference`, `description`, `features` en `combinations`. Identiteit en bronlinks blijven nodig om resultaten te herkennen. |
| `aliases` | Beheer zelf welke extra zoektermen bij een term horen. Standaard leeg; er worden geen AI-synoniemen gegenereerd. |

De momentopname bewaart een vingerafdruk van het exportbeleid. De preview vereist een overeenkomende vingerafdruk voor `category_ids`, `excluded_category_ids`, `product_fields`, `max_categories`, `max_products`, `max_description_chars`, `max_features`, `max_combinations`, `max_relation_note_chars` en `max_snapshot_bytes`. Verander je één van die instellingen, ook naar een strengere grens, voer dan eerst opnieuw export uit. Volgorde en dubbele waarden in de categorie- en veldlijsten worden genormaliseerd.

De contextlimieten, `max_relation_hops`, `max_query_chars`, `max_snapshot_age_hours` en `aliases` mag je aanpassen zonder een nieuwe export. Zo kun je de bronselectie per vraag bijstellen met dezelfde toegestane catalogusgegevens.

Een veld dat niet wordt geëxporteerd, kan later niet uit die momentopname worden teruggehaald. Bouw de export opnieuw als je de bron wilt uitbreiden. Beperk uitbreidingen tot relevante openbare catalogusfeiten; klantgegevens, interne notities en API-sleutels zijn geen productvelden voor deze bron.

## Standaardlimieten

| Instelling | Standaard | Begrenzing |
|---|---:|---|
| `max_categories` | 2000 | Categorieën in de momentopname |
| `max_products` | 20000 | Producten in de momentopname |
| `max_description_chars` | 600 | Tekens per productbeschrijving |
| `max_features` | 20 | Kenmerken per product |
| `max_combinations` | 12 | Bestaande varianten per product |
| `max_relation_note_chars` | 300 | Tekens per toelichting bij een categorieverband |
| `max_snapshot_bytes` | 50000000 | Grootte van het JSON-bronbestand in bytes |
| `max_context_bytes` | 16000 | Grootte van de geselecteerde JSON-context in bytes |
| `max_context_products` | 8 | Producten in één broncontext |
| `max_context_categories` | 6 | Categorieën in één broncontext |
| `max_relation_hops` | 1 | Aantal opeenvolgende verbindingen dat de selectie mag volgen |
| `max_query_chars` | 500 | Tekens in een zoekvraag |
| `max_snapshot_age_hours` | 48 | Toegestane ouderdom van de momentopname |

Bytes en tekens zijn geen API-tokens. Deze limieten maken de hoeveelheid broninformatie voorspelbaar; het daadwerkelijke tokenverbruik van een toekomstige API-aanroep moet apart worden gemeten.

Overschrijdt de categorieselectie `max_categories`, de productselectie `max_products` of de uitvoer `max_snapshot_bytes`, dan stopt de export met een fout. Er wordt geen willekeurig afgebroken catalogus gepubliceerd. Verklein de toegestane categorieën of verhoog bewust de betreffende limiet. Een mislukte export vervangt een bestaand bronbestand niet. De grenzen voor beschrijvingen, kenmerken en varianten beperken wel hoeveel informatie per product wordt opgenomen.

Bij beschrijvingen wordt vóór het verwijderen van HTML maximaal 12000 tekens ruwe brontekst gelezen. Daarna wordt de leesbare tekst begrensd door `max_description_chars`. Zo blijven ook uitzonderlijk grote beschrijvingsvelden begrensd tijdens de export. Inkorting wordt in `coverage` vermeld; informatie verderop in een lange beschrijving kan daardoor ontbreken.

## Betekenis van de verbindingen

Categorieën behouden hun hiërarchie en producten hun bestaande categorie-indeling. De indeling kan helpen om producten in dezelfde categorie te vinden; dat bewijst niet dat die producten dezelfde technische eigenschappen hebben.

Aanvullende categorieën komen uit de handmatig beheerde verbindingen, met hun volgorde en eventuele toelichting. Een verbinding van categorie A naar B geeft geen automatische verbinding van B naar A en wordt niet automatisch doorgegeven aan bovenliggende of onderliggende categorieën. Zie [Aanvullende categorieën](category-relations.md).

Productaccessoires zijn de bestaande gerichte productverbindingen. Varianten zijn concrete combinaties van het betreffende product, met de bijbehorende kenmerken en bestaande variantlink. De parser mag hiervan geen niet-bestaande maten of uitvoeringen maken.

Een verbinding betekent inhoudelijke relevantie. Ook met gekoppelde accessoires mag een toekomstige AI geen technische compatibiliteit, passende boutmaat of draagvermogen aannemen. Prijzen en actuele voorraad worden niet als gegarandeerde feiten uit deze momentopname afgeleid.

## Vernieuwen en controleren

Bouw de momentopname opnieuw na wijzigingen aan producten, categorieën, verbindingen, zichtbaarheid, groepsrechten of het exportbeleid. Een gewijzigd toegangsrecht wordt pas in het bestaande bestand verwerkt door een nieuwe export. De preview weigert een bron die ouder is dan `max_snapshot_age_hours`.

Controleer na iedere beleidswijziging enkele representatieve vragen, bijvoorbeeld een productnaam, een maat, een categorie en een vraag waarvoor geen geschikte broninformatie bestaat. Kijk vooral of een aanvullende verbinding relevant blijft en of afgeschermde of uitgesloten producten buiten de selectie blijven.

## API-sleutels instellen

Open in de backoffice **Modules → Modulebeheer → msthemeconfig → Configureren → Algemene Configuratie → AI Frontend**. Selecteer bovenaan één winkel. Hier staan vier aparte wachtwoordvelden voor zoeken, snijden, zagen en plasmasnijden. Vul de gewenste sleutels in en klik op **Opslaan**.

Een leeg veld behoudt de bestaande sleutel. Na opslaan staat er alleen of een sleutel aanwezig is; de opgeslagen waarde wordt niet naar de instellingenpagina of frontend teruggestuurd. Met **Opgeslagen sleutel verwijderen** wis je de sleutel van die tool voor de gekozen winkel. De instellingen gelden per winkel voor alle talen en staan los van de sleutel voor AI-productbeschrijvingen. Een medewerker moet ingelogd zijn en configuratierechten voor de module en winkel hebben.

Het opslaan van sleutels activeert nog geen AI-aanroepen: zoeken gebruikt momenteel alleen de gecontroleerde catalogusselectie.

## Vervolg: AI-koppeling en gebruik per bezoeker

De volgende stap kan de gecontroleerde context vanuit de server naar de OpenAI API sturen. De AI krijgt dan de geselecteerde JSON en de opdracht om Nederlands te antwoorden. Databasezoekopdrachten en vrije toegang tot de volledige catalogus maken geen deel uit van dat ontwerp. Die koppeling is nog niet aangesloten.

Voor de vier voorziene hulpmiddelen is het voorstel om te beginnen met één OpenAI-project en vier afzonderlijke serversleutels:

| Lokaal hulpmiddel-ID | Toepassing |
|---|---|
| `search` | AI-zoeken vanuit de bestaande zoekbalk |
| `cutting` | Hulp bij snijden |
| `sawing` | Hulp bij zagen |
| `plasma` | Hulp bij plasmasnijden |

Een afzonderlijke sleutel per hulpmiddel maakt verbruik per sleutel te onderscheiden. Aparte projecten zijn een vervolgstap wanneer ieder hulpmiddel eigen projectlimieten of budgetbewaking nodig heeft. Zie de officiële [Usage API](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/usage) en [richtlijnen voor productiegebruik](https://developers.openai.com/api/docs/guides/production-best-practices). De parser maakt geen projecten of sleutels aan.

Voor die vervolgstap is lokale gebruiksregistratie per ingelogde klant of anonieme sessie voorzien. Leg per aanroep vast welk hulpmiddel-ID is gebruikt, welke klant- of sessiekoppeling lokaal geldt, welke modelkeuze is gebruikt, of de aanroep slaagde en welk tokenverbruik de API teruggeeft. Gebruik dat gemeten verbruik voor tellingen en eventuele limieten per klant of sessie. De verdeling over klanten en sessies wordt lokaal bijgehouden; een API-sleutel per hulpmiddel geeft die verdeling niet vanzelf. Een sessie staat niet automatisch gelijk aan één persoon.

API-inloggegevens blijven op de server. De frontend krijgt geen API-sleutel. De parser en preview maken nu geen API-aanroepen en registreren daarom geen werkelijk model- of tokenverbruik.

Elk hulpmiddel krijgt bij die koppeling eigen bronregels, instructies en gebruikslimieten. Alle vier antwoorden in het Nederlands. Een aparte sleutel bepaalt niet automatisch welke catalogusgegevens een hulpmiddel mag lezen; dat blijft de taak van de parser en het ingestelde beleid.

## Regressiecontroles

Deze controles gebruiken tijdelijke bestanden en een SQLite-testcatalogus. Ze wijzigen de webshopdatabase niet en maken geen API-aanroepen.

```sh
php external/modernesmid_webshop/module/msthemeconfig/tests/ai-search-policy-test.php
php external/modernesmid_webshop/module/msthemeconfig/tests/ai-search-export-test.php
php external/modernesmid_webshop/module/msthemeconfig/tests/ai-search-context-test.php
php external/modernesmid_webshop/module/msthemeconfig/tests/ai-search-cli-test.php
php external/modernesmid_webshop/module/msthemeconfig/tests/ai-search-storefront-test.php
php external/modernesmid_webshop/module/msthemeconfig/tests/ai-tool-key-settings-test.php
php external/modernesmid_webshop/module/msthemeconfig/tests/ai-tool-key-single-shop-test.php
```
