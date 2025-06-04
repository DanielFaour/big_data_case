# case - stort datasett

## Bygging av applikasjon
1. Last ned ZIP-filen
2. Pakk ut ZIP-filen hvor du ønsker applikasjonen skal være
3. Åpne /case_et mappen i terminal og naviger til root-mappen til applikasjonen:
    cd case
4. Installer nødvendige pakker
    npm install
5. Bygg applikasjonen:
    ng build

## Kjøring av applikasjon
1. I root-mappen, /case_et , kjør applikasjon:
    ng serve
2. Åpne addressen som vises i terminalen i nettleser

## Testing
1. I root-mappen, /case_et , kjør test (husk at chrome må være installert):
    ng test

## TODO

### Noen mulige forbedringer
* Bedre søkefunksjonalitet - mulighet til å søke på flere streng-attributter som blant annet byer, stater, addresser, osv.

* Bedre kontroll på tabell - kunne selv endre antall entries per side med en dropdown meny

* Filtrering - mulighet til å filtrere etter spesifikke byer, stater, osv. Kunne velge spesifikke sekvenser (seq) å se gjennom.

* Modulært - mulighet for å legge til, endre størrelse, flytte på eller fjerne moduler/componenter.

* Tilgjengelighet - bedre støtte for brukere med nedsatt syn for eksempel -> mulighet for å endre farger og kontraster, natt/dag modus.

* Bedre interaktivitet i modulene - for eksempel kunne trykke på en entry i tabellen for å markere posisjon på kartet.

* Bedre analyse - gjennomsnittsalder, hvilken byer, stater eller etternavn med flest entries.

### Fremgangsmåte

Uten særlig tidligere erfaring med Angular og TypeScript startet jeg med å lære det grunnleggende gjennom dokumentasjon og YouTube-videoer. Jeg brukte også ChatGPT for å komme raskere i gang med prosjektet steg for steg.

Deretter satte jeg meg inn i oppgaveteksten og forsøkte å forstå hva caset faktisk dreide seg om. Jeg antok at hensikten var å lage et verktøy som gir en intuitiv og meningsfull visualisering av dataene i CSV-filen, tilpasset nettopp dette datasettet. For å få et visuelt overblikk over løsningen før jeg begynte selve utviklingen av applikasjonen, lagde jeg en enkel wireframe i Figma.

Siden datasettet er relativt stort og kommer i CSV-format, trengte jeg et verktøy for parsing. Jeg valgte PapaParse, som viste seg å være en effektiv og enkel løsning for å lese og behandle CSV-data. Med denne pakken lagde jeg en service api som kan lese CSV-filer og parse dem uten problem.

Da jeg fikk ut dataen, startet jeg med å bygge en tabell som viste datasettene, og implementerte deretter grunnleggende funksjonalitet som søkefelt, sortering ved klikk på kolonneoverskrifter, og paginering.

Etter at tabellen var på plass, gikk jeg videre til de analytiske komponentene. Jeg vurderte ulike pakker og landet på ng2-charts, ettersom det både er visuelt tiltalende og enkelt å bruke uten mye vedlikehold. Første analysekomponent ble en visning av aldersfordeling, med støtte for ulike diagramtyper som pie, doughnut og polar chart.

Neste steg var en visualisering av antall personer per stat, implementert med et radialt diagram.

Til slutt implementerte jeg et interaktivt kart ved hjelp av Leaflet, som er gratis og passer godt til mindre prosjekter. Kartet gir en mer geografisk oversikt over dataen og støtter hover-effekter for å vise antall entries per stat på en enkel og oversiktlig måte.

For at alle komponentene skulle oppdatere seg basert på brukerens interaksjon med tabellen, lagde jeg en service som injecter seg i komponentene. Denne sørger for at endringer som søk reflekteres i hele applikasjonen, noe som gjør grensesnittet mer dynamisk og relevant i en analysekontekst.

Gjennom utviklingen passet jeg også på at applikasjonen tilpasser seg til vindustørrelse. Så denne applikasjonen kan forsåvidt også brukes på mobil og halv skjerm.

### Antagelser
* Antok at tabellen skulle være hovedelementet i applikasjonen, og valgte derfor å rette interaksjonen rundt den og oppdateringer av andre moduler basert på dens interaksjon.

* Siden jeg antok at tabellen var hovedelementet i applikasjonen, satt jeg derfor størst prioritet på den og dens funksjoner, brukervennlighet og design i starten.

* Jeg antok at de viktigste feltene å visualisere var alder, stat, antall entries og navn, basert på innholdet i CSV-filen. Siden datasettet var tilfeldig generert, antok jeg også at det var akseptabelt å bruke eksterne biblioteker for visualisering og databehandling for å effektivisere utviklingsprosessen.

* Siden datasettet var på engelsk antok jeg at grensesnittet også skulle være på samme språk.

* Jeg antok at brukerne av applikasjonen ikke bryr seg stort om hvor pent og spennende grensesnittet ser ut, så jeg holdt meg til et minimalistisk design. Noe som også er best i kontekst av analyse. Over-design kan påvirke brukeropplevelser negativt i helhet.

* Jeg antok at verktøyet ville bli brukt i ulike skjermstørrelser og brukskontekster, og prioriterte derfor å gjøre grensesnittet responsivt for å sikre en god brukeropplevelse på tvers av enheter.

### Beskrivelse av applikasjon
Applikasjonen fungerer som et brukergrensesnitt for å lese og presentere data fra en CSV-fil på en oversiktlig og interaktiv måte. Visualiseringen er bygget semi-modulært, der ulike komponenter håndterer spesifikke deler av visningen.

Hoveddelen består av en tabell som viser alle radene fra datasettet, med støtte for søk, sortering (via kolonneoverskrifter), og paginering gjennom navigasjonsknapper. Under tabellen finner man flere analysekomponenter som fremhever ulike innsikter fra dataen.

Blant analysene finnes en aldersfordeling og en oversikt over antall personer per stat. I tillegg inkluderer applikasjonen et kart som gir et visuelt sammendrag av fordelingen mellom delstatene. Ved å hovre over en stat får brukeren enkelt innsyn i hvor mange oppføringer som tilhører den.

