# <span style="color:#FF5733">Web-ohjelmoinnin sovellusprojekti TVT22SPO</span>

## <span style="color:#FF5733">Ryhmä 2: Aatu Mettovaara, Isak Mäkimartti, Miro Hannikainen, Noel Vähäjylkkä</span>

# <span style="color:#FF5733">IET – Internet Elokuva Tietokanta</span>


## <span style="color:#FF5733">Esittely</span>

IET eli Internet Elokuva Tietokanta on OAMKin web-ohjelmoinnin sovellusprojektin kurssilla tehty elokuvaharrastajille tarkoitettu verkkosivusto, jossa voi kirjoittaa arvosteluja elokuville, laatia elokuviin liittyviä postauksia ja etsiä uutta katsottavaa. Sivustolla on myös mahdollista luoda ryhmiä, joiden sisällä jäsenet voivat jakaa ryhmän sisäisiä postauksia. 

## <span style="color:#FF5733">Käyttötarkoitus</span>

IET on suunnattu elokuvaharrastajille, jotka haluavat jakaa ja lukea arvosteluja ja postauksia elokuvista. Arvostelut näkyvät etusivulla, elokuvasivulla ja profiilisivulla, kun taas postaukset ovat nähtävissä profiili- ja ryhmäsivuilla. Ryhmäsivu on näkyvissä ainoastaan kyseiseen ryhmään kuuluville henkilöille. 

## <span style="color:#FF5733">Toiminta</span>

IET-verkkosivustolle voi rekisteröityä kuka tahansa. Kun käyttäjä on kirjautunut sisään, hän saa käyttöönsä kaikki ominaisuudet. Mikäli käyttäjä ei ole kirjautunut sisään, hän voi selailla elokuvia, arvosteluja ja postauksia, mutta ei voi kirjoittaa niitä. Käyttäjä voi tarkastella omia arvostelujaan, postauksiaan ja suosikkejaan omalla profiilisivullaan. 

## <span style="color:#FF5733">Roolit projektissa</span>

Jaoimme projektin alussa tehtävät karkeasti neljään osaan, jotta jokaisella olisi selkeästi omat komponentit joita tehdä. Projektin alussa tehdyt suunnitelmat, tietokanta ja React-runko tehtiin porukalla. Etusivun, selainominaisuuden ja kirjautumis-, sekä rekisteröintisivujen tekemisestä vastasi Miro, profiilisivun tekemisestä Isak, arvostelu- ja elokuvasivun tekemisestä Aatu, ja ryhmävalikon sekä ryhmäsivun tekemisestä Noel.  

## <span style="color:#FF5733">Käyttöönotto</span>

Sovelluksen käyttöönotto on hyvin yksinkertaista. Dokumentissa esitetty sovellus vaatii vain Renderin (kuva 1) tai samankaltaisen pilvipalvelun tarjoamia palveluja. Render tarjoaa asiakkailleen tietokantojen, verkkosivujen ja niiden backendien hostausta. Koska projektin stack on hyvin pieni, ovat myös vaatimukset hostausta varten hyvin vaatimattomat. Vaatimukset pilvipalvelun yhteensopivuuksiin ja prosessointivoimaan ovat hyvin pienet, joten asiakkaan on mahdollista valita monista verkosta löytyvistä hostaajista, mutta Renderin tarjoama palvelu on todetusti tarpeeksi sovelluksen käyttöä varten.

![](/ReadMeResources/Picture1.png)

*KUVA 1. Kuvassa esitetään pilvipalvelutarjoaja Renderin hinnastoa.*

Jos asiakas päättää valita toisen palvelun, täytyy tämän mahdollistaa tietyt asiat. Ensimmäisenä vaatimuksena olisi verkkosivun hostaus, jotta asiakkaat voivat käyttää palvelua verkossa. Hostauksen täytyy mahdollistaa myös verkkosivun backend-toiminnallisuuden pyörittämisen. Toisena vaatimuksena olisi tietokantojen hostaus, joka vaaditaan sivun toiminnallisuutta varten. Nämä vaatimukset voidaan täyttää halutusti.

## <span style="color:#FF5733">Projektissa käytetyt teknologiat </span>

Edeltä mainittu projektin stack sisältää Javascript-kirjasto Reactin, Postgre-tietokannan ja Javascript-kirjasto Node.js:n. React-kirjasto mahdollistaa moniosaisen ja dynaamisen verkkosivun käyttöliittymän rakentamisen resursseja säästäen. React mahdollistaa yhden sivun sovelluksen käyttämisen, joka vähentää kuormaa tietokannan ja verkkosivun välillä vähentämällä käyttäjän sivujen latauskertoja. 

Postgre-tietokanta oli ennestään tuttu tietokantateknologia, joka valittiin projektiin, koska se tarjoaa laajaa toiminnallisuutta tietokantoja varten. Postgre-tietokanta mahdollistaa lisätyn yhteensopivuuden ja toiminnallisuuden verkkosivun ylläpitämiseen ja rakentamiseen. Postgre-tietokanta sovelluksessa mahdollistaa helpon skaalautumisen käyttäjäkunnan koon mukaan. 

Node.js-kirjasto taas antaa mahdollisuuden kommunikoida edeltä mainitun Postgre-tietokannan kanssa. Node tekee rajapintojen välistä kommunikointia varten tarvittavien endpointtien rakentamisesta helppoa. Node toimii käytännössä välikätenä sivun ja tietokannan toiminnallisuuden välillä. 

## <span style="color:#FF5733">Tietokantarakenne</span>

Tietokannan rakenne on melko yksinkertainen (kuva 2). 

![](/ReadMeResources/Picture2.png)

*KUVA 2. Kuvassa esitetään projektin tietokantarakenne*

- End_User-taulussa säilytetään käyttäjän tietoja: käyttäjän userIdtä, uniikkia käyttäjätunnusta, salasanaa sekä palautusavainta salasanan nollaamiseen sen unohtuessa.
- Posts-taulussa on perustiedot, jotka vaaditaan tekstijulkaisun tekemiseen: julkaisun id, otsikko, tekstisisältö, päivämäärä julkaisuhetkellä, julkaisijan userId, sekä valinnainen groupId, jos julkaisu tehdään ryhmään.  
- Groups-taulussa on tiedot, joita ryhmä vaatii: ryhmän id, nimi, kuvaus ja ryhmän omistajan userId. 
- User_has_groups-välitaulu yhdistää End_User-taulun ja Groups-taulun. User_has_groups-taulussa on käyttäjän userId, sekä ryhmän id jonka avulla käyttäjiä voidaan liittää ryhmiin.  
- Favorites-taulussa käyttäjä voi asettaa omaan profiiliinsa lempielokuviaan userId:n ja movie_id:n avulla.  
- Review-taulu on elokuva-arvosteluiden tekemistä varten. Taulussa on jokaiselle arvostelulle uniikki reviewId, content johon arvostelun tekstisisältö tulee, date arvostelun päivämäärää varten ja review johon arvostelu tulee 0-5 asteikolla. Julkaisijan ja elokuvan identifiomista varten käytetään movie_idtä ja käyttäjän userIdtä.


## <span style="color:#FF5733">Rajapintakuvaus</span>

Sovelluksellamme on käytössä oma tietokanta ja sen lisäksi seuraavat API-rajapinnat: The Movie Database (TMDB) ja Finnkino. Omaan tietokantaan on pyritty tallentamaan vain välttämättömät tiedot käyttämällä hyödyksi API-rajapinnoista saatavia tietoja. TMDB on projektissa käytössä elokuvien sekä sarjojen tietojen hakuun, kun taas Finnkino elokuva-aiheisten uutisten hakemiseen. Elokuvista tai sarjoista ei tallenneta tietokantaan muuta kuin niiden id:t, joilla haetaan tarvittavat tiedot TMDBstä.

## <span style="color:#FF5733">Käyttöliittymäsuunnitelma</span>

Sivuston sisältö on pääosin jaettu tauluihin, joiden rakennetta on muovailtu riippuen sisällöstä (kuva 3). Ylemmässä otsikkopalkissa on vasemmalla logo, keskellä muuttuva teksti riippuen millä sivulla on ja oikealla pudotusvalikko (kuva 4,) josta pääsee eri sivuille. 

![](/ReadMeResources/Picture3.png)

*KUVA 3. Kuvassa esitetään profiilisivun alkuperäinen suunnitelma*

![KUVA 4. Kuvassa esitetään sivun alasvetovalikko ](/ReadMeResources/Picture4.png)

*KUVA 4. Kuvassa esitetään sivun alasvetovalikko*
