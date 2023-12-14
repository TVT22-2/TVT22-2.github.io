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
