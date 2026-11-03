# Elektronika z Leonem

Nov 3, 2026 · @Mateusz

## Jak to działa

Kurs ma 23 lekcje po około 15 minut, w pięciu blokach: od baterii i krokodylków do Arduino i Raspberry Pi 5. Przy dwóch lekcjach w tygodniu to około 12 tygodni, ale tempo ustala Leon. Nie musi umieć czytać ani liczyć.

| Blok | Lekcje | Co się dzieje | Kto składa |
| --- | --- | --- | --- |
| 1. Prąd biega w kółko | 1–5 | Krokodylki, lampka, własny włącznik | Leon, Ty podajesz części |
| 2. Płytka | 6–11 | Przycisk, sejf, rezystor, kondensator | Leon z Twoją pomocą |
| 3. Układy, które robią coś same | 12–16 | Dotyk, ciemność, przekaźnik, migacz, kostka | Ty, Leon kończy i uruchamia |
| 4. Arduino | 17–21 | Skrzyżowanie, programowanie przyciskami, gra, serwo | Ty kablujesz i wgrywasz, Leon programuje przyciskami |
| 5. Raspberry Pi 5 | 22–23 | Gadający przycisk, lampka na głos | Ty kablujesz i uruchamiasz, Leon nagrywa i mówi |

Pięć zasad prowadzenia:

- Jedna rzecz na lekcję. Kiedy zadziała, zostaw Leona z układem i niech się bawi. Lekcja kończy się, gdy przestaje go ciekawić, nawet po pięciu minutach.
- Leon robi wszystko, co jego ręce już potrafią: przypina krokodylki, naciska, wkłada kable, ocenia, czy działa. Ty pilnujesz kierunku elementów i robisz drobne rzeczy.
- Od bloku 3 składasz układ przed lekcją i zostawiasz jeden kabel. Leon wkłada ostatni i to on uruchamia układ. Z czasem zostawiasz mu dwa, potem trzy.
- Pytasz przed każdą zmianą: co się stanie? Dopiero potem sprawdzacie. Zgadywanie i sprawdzanie jest ważniejsze od wyjaśnienia.
- Gdy coś nie działa, nie naprawiaj po cichu. Powiedz: szukamy, gdzie prąd się zgubił. Szukanie błędu to połowa elektroniki.

Każda lekcja ma ten sam układ: co przygotować przed, jak idzie lekcja, jedno zdanie, które zostaje w głowie, zabawa na koniec i co sprawdzić, gdy nie działa. Teoria dla Ciebie jest w jednej linii, Leonowi jej nie czytaj.

## Bezpieczeństwo

Kurs działa na baterii 9 V i na USB, więc sam prąd nie jest tu groźny. Prawdziwe ryzyka to gorąca lutownica, zwarta bateria i drobne części.

- Gniazdko. Nic w kursie nie dotyka 230 V. Od pierwszej lekcji powtarzaj Leonowi: bateria jest nasza, gniazdko nie. Dotykanie drutów jest bezpieczne tylko przy baterii, i to musi mu wejść w krew.
- Przekaźnik. Fizycznie dałoby się nim przełączać napięcie sieciowe. Tu nigdy tego nie robisz.
- Zwarcie. Plus połączony z minusem bez niczego pomiędzy grzeje kabel i baterię. Odepnij od razu. Po lekcji bateria wraca do pudełka odpięta od układu.
- Dioda bez rezystora. Na 9 V spali się od razu. Dlatego w bloku 1 Leon dostaje gotowe lampki z rezystorem.
- Drobne części. Nic do buzi, nóżki kłują. Po lekcji wszystko wraca do pudełka, szczególnie gdy w domu jest młodsze dziecko.
- Lutownica. Tylko Ty, przed lekcją, kiedy Leona nie ma przy stole. Po cynie z ołowiem myjesz ręce.
- Kondensator elektrolityczny. Włożony odwrotnie może się przegrzać i pęknąć. Wkładasz go Ty, paskiem do minusa, a Leon tylko naciska przycisk.
- Raspberry Pi. Jego piny pracują na 3,3 V. Nigdy nie podawaj na nie 5 V ani 9 V, i nie przepinaj kabli przy włączonym zasilaniu.
- Diody z bliska. Nie patrzcie w diodę z kilku centymetrów, zwłaszcza w czerwoną przy 15 mA.

## Pudełko

Do bloków 1–3 masz wszystko z zamówienia w TME i z pierwszej paczki z Botlandu. Do lekcji 21 potrzebne jest serwo PWM, a do bloku 5 mikrofon i głośnik.

| Co | Symbol lub źródło | Lekcje |
| --- | --- | --- |
| Bateria 9 V, klip | BAT-6LR61/V, BS-IC | 1–16 |
| Kable z krokodylkami | BU-00285 | 1–5, 12 |
| Diody LED: czerwona, żółta, zielona | L-53SRD-J4, L-53SYD, L-53SGD | wszystkie |
| Rezystory, 13 wartości od 100 Ω do 1 MΩ | CF1/4W-… | wszystkie |
| Płytka stykowa 830, kable męsko-męskie i żeńsko-męskie | Botland | 6–23 |
| Przyciski | B3F-1000 | 7–8, 11, 14, 16–22 |
| Trymery 100 kΩ, 1 MΩ | 3362P-1-104LF, -105LF | 10, 13 |
| Kondensatory 100 nF, 10 µF, 100 µF | CCT-100N/50V, CE-10/50PHT-Y, CE-100/25PHT-Y | 11, 14–16, 21 |
| Tranzystory | 2N3904-DIO | 12, 13, 15 |
| Fototranzystor | L-53P3C | 13 |
| Przekaźnik DPDT 9 V, dioda | G5V2-H1-9, 1N4001-DIO | 14 |
| Timer, licznik, wyświetlacz | NE555P, CD4026BE, SC56-11SRWA | 16 |
| Arduino, kabel USB | masz 3 sztuki | 17–21 |
| Raspberry Pi 5 | masz | 22–23 |

Z domu weźmiesz karton, folię aluminiową, taśmę, klamerkę do bielizny, sznurek i koszyk drobiazgów do lekcji 3. Z warsztatu potrzebujesz lutownicy, małego płaskiego śrubokręta i multimetru. Multimetru nie widzę w Twoich zamówieniach, więc sprawdź, czy go masz.

Przed pierwszą lekcją:

- [ ] Zrób trzy lampki: czerwoną, żółtą i zieloną. Przylutuj rezystor 1 kΩ do długiej nóżki diody.
- [ ] Wolny koniec rezystora oznacz czerwoną taśmą. To plus lampki, Leon będzie go szukał.
- [ ] Końcówki przewodów klipa pobiel cyną albo przylutuj goldpiny, żeby trzymały w płytce.
- [ ] Zmierz baterię. Poniżej około 8 V wymień, bo przekaźnik i kostka zaczną się dziwnie zachowywać.
- [ ] Daj Leonowi własne pudełko na lampki i krokodylki. Baterię trzymasz osobno, z taśmą na stykach.

Przed późniejszymi blokami:

- [ ] Blok 3: sprawdź multimetrem nóżki 2N3904, tak jak w [kroku 2 migacza](https://claude.ai/code/artifact/18ee3bca-dadc-417c-9e50-38d96e9a7f18). Plan płytki zakłada E, B, C od lewej przy płaskiej stronie do Ciebie.
- [ ] Blok 4: sprawdź napis na Arduino. Kody zakładają Uno albo Nano na 5 V.
- [ ] Lekcja 21: serwo musi być zwykłe PWM, na przykład SG90. Serwa magistralowe z SO-ARM tu nie zadziałają.
- [ ] Blok 5: Pi 5 nie ma gniazda słuchawkowego. Dźwięk puścisz przez HDMI, Bluetooth albo kartę USB, a do lekcji 22 i 23 potrzebny jest mikrofon USB.

## Blok 1. Prąd biega w kółko

Bez płytki, tylko bateria, lampka i krokodylki. Idziecie dalej, gdy Leon sam zapala lampkę i umie pokazać, gdzie kółko jest przerwane.

&#91;embedded content: kółko prądu · bateria, dwa krokodylki, lampka\]

Pokaż Leonowi ten obrazek po lekcji 1. Odepnij palcem dowolny kabel na rysunku i zapytaj, co stanie się z lampką.

### Lekcja 1. Lampka się świeci

- Przygotuj: baterię z klipem, czerwoną lampkę, dwa krokodylki, sznurek związany w pętlę.
- Lekcja: Pokaż baterię i powiedz, że to dom prądu z dwoma drzwiami. Leon przypina krokodylek do czerwonego kabla klipa i do czerwonego znaczka na lampce. Drugi krokodylek łączy lampkę z czarnym kablem. Lampka się świeci. Odepnij jeden krokodylek i niech Leon sam zapala i gasi ją kilka razy.
- Zostaje w głowie: Prąd biega tylko po zamkniętym kółku.
- Zabawa: Weźcie pętlę ze sznurka i przesuwajcie ją przez palce. Gdy jedno z was ściśnie sznurek, staje on wszędzie naraz. Tak samo robi prąd. Na koniec powiedz: bateria jest nasza, gniazdko nie.
- Gdy nie działa: Sprawdź, czy czerwony znaczek idzie do czerwonego kabla, potem czy krokodylki łapią metal.
- Dla Ciebie: Dioda zabiera około 2 V, na 1 kΩ zostaje 7 V, więc płynie 7 mA.

### Lekcja 2. Lampka ma swoją stronę

- Przygotuj: wszystkie trzy lampki, cztery krokodylki.
- Lekcja: Zanim zamienisz krokodylki na lampce, zapytaj: zaświeci czy nie? Sprawdźcie. Nie świeci. Wróćcie do poprzedniego ustawienia. Powiedz, że lampka to ulica jednokierunkowa i że dlatego ma znaczek.
- Zostaje w głowie: Lampka puszcza prąd tylko w jedną stronę.
- Zabawa: Pociąg. Połączcie dwie lampki jedna za drugą, znaczek do wolnego końca poprzedniej. Świecą obie. Odwróćcie jedną i zapytaj, co się stanie. Gasną obie, bo droga jest jedna.
- Gdy nie działa: W pociągu każdy znaczek musi patrzeć w tę samą stronę kółka. Trzy lampki w pociągu świecą już słabo, to normalne.
- Dla Ciebie: Szeregowo prąd jest wszędzie taki sam: (9 V − 4 V) / 2 kΩ = 2,5 mA. Odwrócona dioda stoi na 9 V wstecz, ale 1 kΩ ogranicza prąd.

### Lekcja 3. Co puszcza prąd

- Przygotuj: baterię, lampkę, trzy krokodylki, tak żeby zostały dwa wolne końce. Koszyk: łyżka, klucz, moneta, folia, ołówek, klocek, gumka, papier, drewniana łyżka.
- Lekcja: Zetknij wolne krokodylki: świeci. Leon układa rzeczy na dwie kupki, zgaduje świeci albo nie. Potem każdą rzecz łapiecie między krokodylki i sprawdzacie, która kupka miała rację.
- Zostaje w głowie: Metal puszcza prąd, a plastik, drewno i papier nie.
- Zabawa: Leon przynosi z pokoju trzy swoje rzeczy i najpierw mówi, co się stanie. Rzeczy wybieracie razem, nic z gniazdka.
- Gdy nie działa: Lakier i farba nie przewodzą, więc malowany metal zawodzi. Dotknij krokodylkiem gołego miejsca.
- Dla Ciebie: Grafit w zaostrzonym z dwóch stron ołówku może dać słabe światło. To dobry moment, żeby pokazać, że kabel to metal w plastikowym ubraniu.

### Lekcja 4. Świecąca książka

- Przygotuj: kartkę z tektury złożoną na pół, dwa paski folii, taśmę, baterię, lampkę, trzy krokodylki.
- Lekcja: Leon nakleja paski folii na środek obu stron książki, tak żeby stykały się po zamknięciu. Końce pasków wystają poza okładkę. Trzy krokodylki zamykają kółko: czerwony kabel z lampką, lampka z jednym paskiem, drugi pasek z czarnym kablem. Zamknięta książka świeci, otwarta nie.
- Zostaje w głowie: Włącznik to most. Zamknięty puszcza prąd, otwarty przerywa drogę.
- Zabawa: Połóż książkę pod cienki dywanik albo poduszkę. Kto nadepnie, zapala światło.
- Gdy nie działa: Paski muszą stykać się gołą folią, taśma nie może ich rozdzielać.
- Dla Ciebie: Przerwa działa w każdym miejscu kółka, po stronie plusa i po stronie minusa. Pokaż to, przepinając książkę na drugą stronę lampki.

### Lekcja 5. Alarm w drzwiach

- Przygotuj: drewnianą klamerkę z końcami owiniętymi folią, pasek tektury, sznurek, baterię, lampkę, trzy krokodylki.
- Lekcja: Trzy krokodylki zamykają kółko jak w lekcji 4, a dwa z nich łapią folię na ramionach klamerki. Klamerka zaciska pasek tektury, więc lampka nie świeci. Leon ciągnie za sznurek przywiązany do paska. Pasek wyskakuje, folia się styka, światło się zapala.
- Zostaje w głowie: Układ może sam zareagować, kiedy coś się zmieni.
- Zabawa: Przywiążcie sznurek do klamki i przyklejcie klamerkę taśmą do framugi. Leon czeka w ciemnym pokoju, aż tata otworzy drzwi.
- Gdy nie działa: Sprężyna klamerki musi docisnąć folię. Złóż folię kilka razy, żeby było grubiej.
- Dla Ciebie: To styk normalnie rozwarty z izolatorem w środku, a wyciągnięcie izolatora jest wejściem układu.

## Blok 2. Płytka

Leon wkłada kable i naciska, a Ty pilnujesz kierunku diod i kondensatorów. Idziecie dalej, gdy Leon umie sam wpiąć kabel w dobrą kolumnę i powie, co robi rezystor.

Plany mówią o kolumnach 1–63 i rzędach a–e nad rowkiem oraz f–j pod nim. Szyna + i szyna − to górne paski, a każda dziurka w szynie jest równie dobra. Jeśli kolorowa linia ma przerwę w połowie płytki, szyna też jest tam przerwana i połówki łączysz kablem. Baterię podpinasz na końcu: czerwony przewód do szyny +, czarny do szyny −.

&#91;embedded content: płytka stykowa · układ z lekcji 6\]

Taki sam jest zapis w każdej tabeli poniżej: litera to rząd, liczba to kolumna.

### Lekcja 6. Ukryte druty

- Przygotuj: Złóż układ z tabeli bez kabla do szyny − i podepnij baterię.
- Lekcja: Pokaż rząd pięciu dziurek i powiedz, że pod plastikiem leży tam jeden drut. Leon wkłada ostatni kabel i dioda się zapala. Potem wtyka go w b6, c6, a6: dalej działa. W kolumnie 7 już nie.
- Zostaje w głowie: Dziurki w jednym słupku są połączone ukrytym drutem.
- Zabawa: Leon wskazuje dziurkę i mówi, czy dioda się zapali. Potem sprawdza.
- Gdy nie działa: Długa nóżka idzie do kolumny z rezystorem, krótka do kolumny z kablem.
- Dla Ciebie: Rowek rozcina kolumnę na dwa osobne węzły. Szyny − górna i dolna nie są ze sobą połączone.

| Element | Od | Do |
| --- | --- | --- |
| Rezystor 1 kΩ | szyna + | b5 |
| Dioda czerwona | długa d5 | krótka d6 |
| Kabel | b6 | szyna − |

### Lekcja 7. Przycisk

- Przygotuj: Złóż układ z tabeli. Przycisk stoi nad rowkiem, jego cztery nóżki wchodzą w e10, e12, f10 i f12.
- Lekcja: Leon naciska: świeci. Puszcza: gaśnie. Zapytaj, czym to się różni od książki z lekcji 4. Sprężyna sama otwiera most.
- Zostaje w głowie: Przycisk to most, który sam się otwiera.
- Zabawa: Tata nadaje rytm: krótko, krótko, długo. Leon powtarza. Potem zamiana ról.
- Gdy nie działa: Sprawdź, czy wszystkie nóżki przycisku weszły głęboko. Kable wpięte po przekątnej, e10 i f12, działają przy każdym ustawieniu.
- Dla Ciebie: Dwie pary nóżek są w środku połączone na stałe. Przekątna zawsze trafia na dwie różne pary.

| Element | Od | Do |
| --- | --- | --- |
| Rezystor 1 kΩ | szyna + | b5 |
| Dioda czerwona | długa d5 | krótka d6 |
| Kabel | a6 | a10 |
| Kabel | h12 | szyna − |

### Lekcja 8. Sejf na dwa klucze

- Przygotuj: Układ z lekcji 7. Zamiast kabla z h12 do szyny − daj kable z tabeli i drugi przycisk w e16, e18, f16 i f18.
- Lekcja: Leon naciska swój przycisk: nic. Tata naciska swój: nic. Naciskacie razem: świeci.
- Zostaje w głowie: Prąd przejdzie tylko wtedy, gdy oba mosty są zamknięte.
- Zabawa: Schowajcie w pudełku coś słodkiego. Pudełko otwiera się, gdy dioda się zaświeci, a tata naciska swój przycisk dopiero po rozwiązaniu zagadki.
- Gdy nie działa: Naciśnij pierwszy przycisk i połącz kablem h12 z szyną −. Jeśli dioda świeci, problem jest przy drugim przycisku.
- Dla Ciebie: To bramka AND. Wersja OR: wyjmij kabel g12–g16, daj kabel z g12 do szyny − i kabel z b10 do g16. Teraz wystarczy jeden przycisk.

| Element | Od | Do |
| --- | --- | --- |
| Kabel | g12 | g16 |
| Kabel | a18 | szyna − |

### Lekcja 9. Wąska droga

- Przygotuj: Cztery razy to samo, w kolumnach 5, 11, 17 i 23, według tabeli. Rezystory od lewej: 470 Ω, 4,7 kΩ, 47 kΩ i 470 kΩ. Różnią się trzecim paskiem: brązowy, czerwony, pomarańczowy, żółty.
- Lekcja: Zapytaj, która dioda jest najjaśniejsza. Pokaż rezystor i powiedz, że to wąska droga: im węższa, tym mniej biegaczy przejdzie. Zamieńcie dwa rezystory miejscami. Jasność zamienia się razem z nimi.
- Zostaje w głowie: Rezystor to wąska droga dla prądu.
- Zabawa: Wejdźcie pod koc. Czwartą diodę, tę prawie niewidoczną, zaczyna być widać po ciemku.
- Gdy nie działa: Dioda przy 470 kΩ w jasnym pokoju może wyglądać na zgaszoną. Nie myl tego rezystora z 470 Ω.
- Dla Ciebie: Prądy to około 15 mA, 1,5 mA, 150 µA i 15 µA. Jasność spada dziesięć razy na każdym kroku.

| Element | Od | Do |
| --- | --- | --- |
| Rezystor | szyna + | b, kolumna k |
| Dioda | długa d, kolumna k | krótka d, kolumna k+1 |
| Kabel | a, kolumna k+1 | szyna − |

### Lekcja 10. Pokrętło

- Przygotuj: Złóż układ z tabeli. Trymer 100 kΩ ma trzy nóżki w trójkącie: skrajne w c5 i c7, środkową w d6. Daj Leonowi mały płaski śrubokręt.
- Lekcja: Leon kręci i światło rośnie albo słabnie. Powiedz, że pokrętło zmienia szerokość drogi.
- Zostaje w głowie: Pokrętło to droga, którą sam poszerzasz i zwężasz.
- Zabawa: Wschód słońca. Leon zaczyna od ciemności i rozjaśnia diodę tak wolno, jak umie, a tata liczy do dziesięciu.
- Gdy nie działa: Trymer kręci się niepełny obrót, nie zmuszaj go. Sprawdź, czy środkowa nóżka siedzi w d6.
- Dla Ciebie: 470 Ω chroni diodę, gdy trymer jest na zero. Zakres to około 15 mA do 70 µA.

| Element | Od | Do |
| --- | --- | --- |
| Rezystor 470 Ω | szyna + | b5 |
| Kabel | b6 | b8 |
| Dioda | długa d8 | krótka d9 |
| Kabel | a9 | szyna − |

### Lekcja 11. Wiaderko na prąd

- Przygotuj: Złóż układ z tabeli z jednym kondensatorem, drugi trzymasz na później. Nie przycinaj im nóżek, żeby korpus stał nad kablami, a drugi odegnij w stronę dolnych szyn. Przycisk jak w lekcji 7, w e10, e12, f10 i f12.
- Lekcja: Leon trzyma przycisk i liczy do dwóch. Puszcza. Dioda nie gaśnie od razu, tylko powoli słabnie. Powiedz, że kondensator to wiaderko: przycisk je napełnia, a dioda wypija. Dodaj drugi kondensator i sprawdźcie, czy dioda świeci dłużej.
- Zostaje w głowie: Kondensator to wiaderko na prąd.
- Zabawa: Ile Leon naliczy, zanim zgaśnie? Najpierw zgaduje, potem liczycie razem.
- Gdy nie działa: Pasek na kondensatorze musi być w kolumnie 13. Zgaszony pokój pomaga, bo pod koniec dioda świeci bardzo słabo.
- Dla Ciebie: Ładowanie idzie przez 100 Ω, rozładowanie przez 10 kΩ. Symulacja daje około 3 s dla 100 µF i około 6 s dla dwóch równolegle.

| Element | Od | Do |
| --- | --- | --- |
| Rezystor 100 Ω | szyna + | b10 |
| Kondensator 100 µF | plus g12 | pasek g13 |
| Drugi kondensator 100 µF | plus j12 | pasek j13 |
| Rezystor 10 kΩ | h12 | h16 |
| Dioda czerwona | długa j16 | krótka j17 |
| Kabel | i13 | szyna − |
| Kabel | g17 | szyna − |

## Blok 3. Układy, które robią coś same

Składasz przed lekcją, bez jednego kabla. Leon wkłada ostatni kabel, uruchamia i się bawi, a Ty nie tłumaczysz tranzystora, tylko mówisz: mały prąd otwiera bramę dużemu. Idziecie dalej, gdy Leon sam opowie, co układ robi i jak go sprawdzić.

### Lekcja 12. Czujnik dotyku

- Przygotuj: Złóż układ z tabeli. Na kartonie przyklej dwa paski folii, oddalone o szerokość palca. Do jednego prowadź kabel z j13, do drugiego kabel z szyny +, oba przez krokodylki.
- Lekcja: Leon kładzie palec na oba paski i dioda się zapala. Przypomnij lekcję 3: klocek nie puszcza prądu, a palec puszcza odrobinę. Ta odrobina wystarczy, żeby tranzystor otworzył bramę dużemu prądowi.
- Zostaje w głowie: Mały prąd otwiera bramę dużemu.
- Zabawa: Łańcuch. Tata dotyka jednego paska, Leon drugiego, a palce drugich rąk łączycie. Dioda świeci, gdy się dotkniecie. Puszczacie: gaśnie. Na koniec powtórz: bateria jest nasza, gniazdko nie.
- Gdy nie działa: Dociśnij palec mocniej. Jeśli dalej nic, sprawdź nóżki tranzystorów, a na końcu obróć oba o 180°.
- Dla Ciebie: To para Darlingtona, wzmocnienia się mnożą. Symulacja daje pełne światło do około 2 MΩ na palcu i zgaszenie przy 10 MΩ. 1 kΩ chroni bazę, 1 MΩ usuwa przydzwięk z sieci. To działa bezpiecznie tylko dlatego, że to 9 V z baterii.

| Element | Gdzie |
| --- | --- |
| Tranzystor 2N3904, płaska strona do Ciebie | E c8, B c9, C c10 |
| Tranzystor 2N3904, płaska strona do Ciebie | E c12, B c13, C c14 |
| Kabel | a8 do szyny − |
| Kabel | a12 do a9 |
| Kabel | b10 do b14 |
| Kabel | a14 do a18 |
| Rezystor 1 kΩ | szyna + do b19 |
| Dioda czerwona | długa c19, krótka c18 |
| Rezystor 1 kΩ | e13 do h13 |
| Rezystor 1 MΩ | i13 do i18 |
| Kabel | j18 do szyny − |

### Lekcja 13. Lampka nocna

- Przygotuj: Układ z lekcji 12 bez pasków folii, plus elementy z tabeli. Przekręć trymer tak, żeby dioda gasła przy świetle w pokoju, a zapalała się po zasłonięciu czujnika dłonią.
- Lekcja: Leon zasłania czujnik i dioda się zapala. Odsłania i gaśnie. To ta sama brama co w lekcji 12, tylko zamiast palca steruje nią światło.
- Zostaje w głowie: Układ potrafi poczuć ciemność.
- Zabawa: Latarka. Zaciemnijcie pokój, a dioda się zapali. Leon gasi ją latarką i sprawdzacie, z jakiej odległości to działa.
- Gdy nie działa: Zamień nóżki fototranzystora miejscami. Odwrotnie nic mu nie grozi, bo prąd ogranicza rezystor. Potem przekręć trymer.
- Dla Ciebie: Fototranzystor odbiera prąd bazy i gaśnie dioda. Ma szczyt czułości 940 nm, więc żarówka i słońce działają na niego mocniej niż światło LED. Symulacja daje próg od około 6 µA przy trymerze na maksimum do około 160 µA na minimum.

| Element | Gdzie |
| --- | --- |
| Kabel | b13 do b22 |
| Fototranzystor | krótka e22, długa e21 |
| Kabel | a21 do szyny − |
| Trymer 1 MΩ | skrajne c24 i c26, środkowa d25 |
| Rezystor 47 kΩ | szyna + do b24 |
| Kabel | a25 do a22 |

### Lekcja 14. Klik

- Przygotuj: Zmierz przekaźnik omomierzem: między nóżkami 1 i 16 ma być około 540 Ω. Znacznik na obudowie stoi przy kolumnie 10. Kolumny to wtedy kolejno cewka, styk wspólny, styk zwarty w spoczynku i styk rozwarty w spoczynku.
- Lekcja: Zielona świeci. Leon naciska przycisk: słychać klik, zielona gaśnie, czerwona się zapala. Pozwól mu przyłożyć ucho. W środku jest magnes zrobiony z prądu, który przerzuca dźwignię.
- Zostaje w głowie: Prąd robi magnes, a magnes przestawia przełącznik.
- Zabawa: Klikacz. Przebuduj układ według drugiej tabeli, a przekaźnik zacznie sam terkotać i mieszać kolory diod. Leon przykłada ucho i naśladuje ten dźwięk.
- Gdy nie działa: Bateria poniżej około 8 V może nie pociągnąć klikacza. Pasek diody 1N4001 musi być w a10, inaczej przycisk zrobi zwarcie.
- Dla Ciebie: Cewka bierze 16,7 mA, a przekaźnik rusza najpóźniej przy 6,75 V. W klikaczu styk odcina cewkę, a kondensator trzyma ją jeszcze chwilę. Ze 100 µF wychodzi około 8–25 klików na sekundę, zależnie od napięcia puszczania, a większy kondensator zwalnia terkotanie.

| Element | Gdzie |
| --- | --- |
| Przekaźnik, znacznik przy kolumnie 10 | rzędy e i f, kolumny 10, 13, 15, 17 |
| Przycisk | e2, e4, f2, f4 |
| Kabel | a2 do szyny + |
| Kabel | h4 do b10 |
| Kabel | h10 do szyny − |
| Dioda 1N4001 | pasek a10, druga nóżka a6 |
| Kabel | b6 do szyny − |
| Kabel | a13 do szyny + |
| Rezystor 1 kΩ | a15 do a19 |
| Dioda zielona | długa c19, krótka c20 |
| Kabel | a20 do szyny − |
| Rezystor 1 kΩ | b17 do b22 |
| Dioda czerwona | długa d22, krótka d23 |
| Kabel | a23 do szyny − |

Klikacz, zmiany względem tabeli powyżej:

| Element | Gdzie |
| --- | --- |
| Wyjmij kabel | h4 do b10 |
| Kabel | h15 do b10 |
| Kabel | szyna + do i9 |
| Rezystor 100 Ω | j9 do j13 |
| Kondensator 100 µF | plus d7, pasek d6 |
| Kabel | b7 do c10 |

### Lekcja 15. Migacz

- Przygotuj: Złóż [migacz na dwóch tranzystorach](https://claude.ai/code/artifact/18ee3bca-dadc-417c-9e50-38d96e9a7f18) według tamtej instrukcji i nie wpinaj baterii. Odlicz drugą parę kondensatorów 100 µF.
- Lekcja: Leon wpina baterię. Diody migają na zmianę, bez przycisku i bez programu. Powiedz, że dwa tranzystory się przekomarzają: raz ja, raz ty. Odłącz baterię, wstaw 100 µF i podepnij. Miganie zwalnia dziesięć razy.
- Zostaje w głowie: Dwa elementy mogą przełączać się nawzajem bez końca.
- Zabawa: Taniec. Czerwona to przysiad, zielona to skok. Przy 100 µF każda dioda świeci około 3 s, więc Leon nadąży.
- Gdy nie działa: Instrukcja migacza ma własną część Gdy nie działa.
- Dla Ciebie: Tempo wyznacza R × C, więc dziesięć razy większe C daje dziesięć razy wolniej.

### Lekcja 16. Kostka do gry

- Przygotuj: Składanie zajmie Ci dobre pół godziny, więc zrób to bez Leona. Najpierw sprawdź wyświetlacz: połącz nogę 3 przez 470 Ω z minusem, a pozostałych nóg dotykaj plusem przez 1 kΩ.
- Lekcja: Leon naciska przycisk i cyfry lecą tak szybko, że widać prawie ósemkę. Puszcza i zostaje jedna liczba. Nikt nie wie jaka, ani tata, ani on.
- Zostaje w głowie: Zegar daje rytm, a licznik liczy.
- Zabawa: Wyścig. Narysujcie na kartce 30 kratek. Rzucacie przyciskiem, 0 to kolejny rzut. Cyfrę czytacie razem, a Leon przesuwa pionek.
- Gdy nie działa: Nic nie świeci: sprawdź rezystor 470 Ω przy wyświetlaczu i kabel j14 na nodze 3 licznika. Stoi na zero: brakuje kabla g5–g12 albo a13. Zamiast cyfry dziwny kształt: zamieniony kabel segmentu.
- Dla Ciebie: 555 chodzi tu około 27 razy na sekundę. Noga 2 licznika w stanie wysokim blokuje liczenie, a przycisk ściąga ją do masy. Jeden rezystor we wspólnej katodzie zamiast siedmiu oszczędza kable, ale 1 świeci jaśniej niż 8.

&#91;embedded content: kostka · jak płyną impulsy od zegara do cyfry\]

Zegar chodzi cały czas, a przycisk decyduje tylko o tym, czy licznik go słucha.

| Element | Gdzie |
| --- | --- |
| NE555, wycięcie w lewo | noga 1 w f3, noga 8 w e3 |
| CD4026, wycięcie w lewo | noga 1 w f12, noga 16 w e12 |
| Wyświetlacz, kropka na dole po prawej | noga 1 w h30, noga 10 w d30 |
| Kabel | szyna + do dolnej szyny + |
| Kabel | szyna − do dolnej szyny − |
| Kondensator 100 nF | szyna + do szyny − |
| Kabel | a3 do szyny + |
| Kabel | j3 do dolnej szyny − |
| Kabel | j6 do dolnej szyny + |
| Rezystor 1 kΩ | szyna + do b4 |
| Rezystor 2,2 kΩ | a4 do a8 |
| Kabel | b8 do b5 |
| Kabel | c5 do h4 |
| Kondensator 10 µF | plus i4, pasek i3 |
| Kabel | g5 do g12 |
| Kabel | a12 do szyny + |
| Kabel | j19 do dolnej szyny − |
| Kabel | a13 do szyny − |
| Kabel | j14 do dolnej szyny + |
| Rezystor 10 kΩ | h13 do dolnej szyny + |
| Przycisk | e22, e24, f22, f24 |
| Kabel | g13 do g24 |
| Kabel | a22 do szyny − |
| Rezystor 470 Ω | b32 do szyny − |

Segmenty wyświetlacza, siedem kabli:

| Segment | Z licznika | Do wyświetlacza |
| --- | --- | --- |
| a | a18 | a33 |
| b | a16 | a34 |
| c | a15 | j33 |
| d | a19 | j31 |
| e | a17 | j30 |
| f | j17 | a31 |
| g | j18 | a30 |

## Blok 4. Arduino

Arduino to pierwszy mózg w kursie. Ty piszesz i wgrywasz kod, a Leon programuje przyciskami, bez czytania. Idziecie dalej, gdy Leon ułoży z przycisków program i przewidzi, co zrobi.

Jedna płytka służy przez wszystkie pięć lekcji. Prąd idzie z USB, więc bateria 9 V nie jest już potrzebna. Oznacz przyciski kolorową taśmą, tak jak diody obok nich. Pin GND z Arduino idzie do szyny −, a kabel łączy szynę − z dolną szyną −.

&#91;embedded content: stała płytka Arduino · lekcje 17 do 21\]

| Element | Czerwona | Żółta | Zielona | Start |
| --- | --- | --- | --- | --- |
| Kabel z pinu diody | D9 do b2 | D10 do b13 | D11 do b24 |  |
| Rezystor 330 Ω | a2 do a6 | a13 do a17 | a24 do a28 |  |
| Dioda, długa i krótka | c6, c7 | c17, c18 | c28, c29 |  |
| Kabel do szyny − | b7 | b18 | b29 |  |
| Kabel z pinu przycisku | D2 do a9 | D3 do a20 | D4 do a31 | D5 do a40 |
| Przycisk, kolumny | 9 i 11 | 20 i 22 | 31 i 33 | 40 i 42 |
| Kabel do dolnej szyny − | g11 | g22 | g33 | g42 |

### Lekcja 17. Program to lista poleceń

- Przygotuj: Złóż płytkę z tabeli. Na komputerze zainstaluj Arduino IDE, wybierz płytkę i port, wgraj program.
- Lekcja: Najpierw bez prądu. Tata jest robotem i robi dokładnie to, co Leon powie: dwa kroki, obrót, stop. Potem podłączacie Arduino i dioda miga. Leon mówi szybciej albo wolniej, Ty zmieniasz jedną liczbę i wgrywasz program od nowa.
- Zostaje w głowie: Program to lista poleceń, które maszyna wykonuje po kolei.
- Zabawa: Leon wybiera liczbę, a Ty wpisujesz. Zgaduje, co się stanie przy 100, a co przy 2000.
- Gdy nie działa: W menu Narzędzia sprawdź płytkę i port. Kabel USB musi przenosić dane, nie tylko ładować.
- Dla Ciebie: Przy 5 V przez 330 Ω płynie około 9 mA, bezpiecznie dla pinu.

```cpp
// Lekcja 17. Arduino mruga
const int DIODA = 9;
int czekaj = 500;   // Leon mówi: szybciej 100, wolniej 1000

void setup() {
  pinMode(DIODA, OUTPUT);
}

void loop() {
  digitalWrite(DIODA, HIGH);
  delay(czekaj);
  digitalWrite(DIODA, LOW);
  delay(czekaj);
}
```

### Lekcja 18. Skrzyżowanie

- Przygotuj: Wgraj program i postaw płytkę obok samochodzików.
- Lekcja: Leon jest kierowcą. Czerwone stoi, zielone jedzie. Przycisk czerwony to przycisk dla pieszego: skraca zielone i po chwili samochody muszą stanąć.
- Zostaje w głowie: Program może czekać na człowieka.
- Zabawa: Tata prowadzi samochodzik, a Leon pilnuje przepisów i łapie go na czerwonym.
- Gdy nie działa: Jeśli świeci tylko jedna dioda, sprawdź D9, D10 i D11 oraz kable do szyny −.
- Dla Ciebie: Kolejność jest polska: zielone, żółte, czerwone, czerwone z żółtym.

```cpp
// Lekcja 18. Skrzyżowanie z przyciskiem dla pieszego
const int CZERWONA = 9;
const int ZOLTA = 10;
const int ZIELONA = 11;
const int PIESZY = 2;

void swiatla(int c, int z, int g) {
  digitalWrite(CZERWONA, c);
  digitalWrite(ZOLTA, z);
  digitalWrite(ZIELONA, g);
}

void setup() {
  pinMode(CZERWONA, OUTPUT);
  pinMode(ZOLTA, OUTPUT);
  pinMode(ZIELONA, OUTPUT);
  pinMode(PIESZY, INPUT_PULLUP);
}

void loop() {
  swiatla(LOW, LOW, HIGH);                // zielone do 8 s
  for (int i = 0; i < 80; i++) {
    if (digitalRead(PIESZY) == LOW) break; // pieszy skraca zielone
    delay(100);
  }
  swiatla(LOW, HIGH, LOW);   delay(2000); // żółte
  swiatla(HIGH, LOW, LOW);   delay(5000); // czerwone
  swiatla(HIGH, HIGH, LOW);  delay(1000); // czerwone i żółte
}
```

### Lekcja 19. Leon programuje

- Przygotuj: Wgraj program. Daj Leonowi kartkę i trzy kredki.
- Lekcja: Leon rysuje trzy kropki w wybranych kolorach. Potem naciska te kolory po kolei, a każdy mignie. Naciska Start i Arduino odtwarza cały program. Pierwszy kolor po odtworzeniu zaczyna nowy program.
- Zostaje w głowie: Ja układam kroki, a maszyna je wykonuje.
- Zabawa: Tata rysuje kolejność, Leon ją wprowadza i sprawdza, czy maszyna zrobiła to samo. Potem zamiana. Program może mieć do 30 kroków.
- Gdy nie działa: Przycisk liczy się dopiero po puszczeniu, więc Leon musi puścić, zanim naciśnie następny.
- Dla Ciebie: Tablica przechowuje kolejne kolory. To Twój pierwszy program z pamięcią i z danymi od użytkownika.

```cpp
// Lekcja 19. Leon programuje przyciskami
const int DIODY[3] = {9, 10, 11};     // czerwona, żółta, zielona
const int PRZYCISKI[3] = {2, 3, 4};   // ten sam porządek
const int START = 5;
const int MAX_KROKOW = 30;

int program[MAX_KROKOW];
int ile = 0;
bool zagrany = false;

void zapal(int kolor, int czas) {
  digitalWrite(DIODY[kolor], HIGH);
  delay(czas);
  digitalWrite(DIODY[kolor], LOW);
}

bool wcisniety(int pin) {
  if (digitalRead(pin) == HIGH) return false;
  delay(30);
  while (digitalRead(pin) == LOW) {}
  delay(30);
  return true;
}

void setup() {
  for (int i = 0; i < 3; i++) {
    pinMode(DIODY[i], OUTPUT);
    pinMode(PRZYCISKI[i], INPUT_PULLUP);
  }
  pinMode(START, INPUT_PULLUP);
}

void loop() {
  for (int k = 0; k < 3; k++) {
    if (wcisniety(PRZYCISKI[k])) {
      if (zagrany) {                      // nowy program po uruchomieniu
        ile = 0;
        zagrany = false;
      }
      if (ile < MAX_KROKOW) {
        program[ile] = k;
        ile++;
      }
      zapal(k, 150);
    }
  }
  if (wcisniety(START)) {
    delay(500);
    for (int i = 0; i < ile; i++) {
      zapal(program[i], 600);
      delay(200);
    }
    zagrany = true;
  }
}
```

### Lekcja 20. Gra w pamięć

- Przygotuj: Wgraj program. Świecą wszystkie diody, czyli gra czeka na Start.
- Lekcja: Leon naciska Start. Arduino pokazuje dwa kolory, a Leon powtarza je przyciskami. Dobrze: jedno mignięcie i o kolor więcej. Źle: trzy mignięcia i nowa gra.
- Zostaje w głowie: Komputer umie pamiętać i sprawdzać.
- Zabawa: Zawody tata kontra Leon. Kto dojdzie dalej, wybiera zabawę na koniec.
- Gdy nie działa: Gra nie ma limitu czasu i czeka na przycisk. Jeśli kolory lecą za szybko, zmień w pętli czas pokazywania z 600 na 900.
- Dla Ciebie: Stała NA\_START ustawia poziom trudności. Ziarno losowania bierzemy z czasu naciśnięcia Start, więc każda gra jest inna.

```cpp
// Lekcja 20. Gra w zapamiętywanie kolorów
const int DIODY[3] = {9, 10, 11};
const int PRZYCISKI[3] = {2, 3, 4};
const int START = 5;
const int MAX_DLUGOSC = 20;
const int NA_START = 2;               // Leon zaczyna od dwóch kolorów

int ciag[MAX_DLUGOSC];
int dlugosc = NA_START;

void zapal(int kolor, int czas) {
  digitalWrite(DIODY[kolor], HIGH);
  delay(czas);
  digitalWrite(DIODY[kolor], LOW);
}

bool wcisniety(int pin) {
  if (digitalRead(pin) == HIGH) return false;
  delay(30);
  while (digitalRead(pin) == LOW) {}
  delay(30);
  return true;
}

void wszystkie(int stan) {
  for (int i = 0; i < 3; i++) digitalWrite(DIODY[i], stan);
}

void mrugnij(int razy, int czas) {
  for (int i = 0; i < razy; i++) {
    wszystkie(HIGH);
    delay(czas);
    wszystkie(LOW);
    delay(czas);
  }
}

int czekajNaKolor() {
  while (true) {
    for (int k = 0; k < 3; k++) {
      if (wcisniety(PRZYCISKI[k])) {
        zapal(k, 200);
        return k;
      }
    }
  }
}

void nowaGra() {
  wszystkie(HIGH);                    // świecą wszystkie: czekam na Start
  while (!wcisniety(START)) {}
  wszystkie(LOW);
  randomSeed(micros());
  for (int i = 0; i < MAX_DLUGOSC; i++) ciag[i] = random(3);
  dlugosc = NA_START;
}

void setup() {
  for (int i = 0; i < 3; i++) {
    pinMode(DIODY[i], OUTPUT);
    pinMode(PRZYCISKI[i], INPUT_PULLUP);
  }
  pinMode(START, INPUT_PULLUP);
  nowaGra();
}

void loop() {
  delay(800);
  for (int i = 0; i < dlugosc; i++) {  // pokaż ciąg
    zapal(ciag[i], 600);
    delay(250);
  }
  for (int i = 0; i < dlugosc; i++) {  // Leon powtarza
    if (czekajNaKolor() != ciag[i]) {
      mrugnij(3, 250);                 // pomyłka
      nowaGra();
      return;
    }
  }
  mrugnij(1, 400);                     // brawo
  if (dlugosc < MAX_DLUGOSC) dlugosc++;
}
```

### Lekcja 21. Szlaban

- Przygotuj: Potrzebne jest serwo PWM. Pin 5V z Arduino idzie do dolnej szyny +. Przewód czerwony serwa do dolnej szyny +, brązowy do dolnej szyny −, sygnałowy do D6. Kondensator 100 µF wepnij między te szyny, pasek do minusa. Przyklej do orczyka patyczek po lodach.
- Lekcja: Leon naciska czerwony przycisk. Szlaban idzie w górę, świeci zielone, po 4 sekundach wraca czerwone i szlaban opada.
- Zostaje w głowie: Program może poruszać rzeczami.
- Zabawa: Garaż z pudełka po butach ze szlabanem przy wjeździe. Leon jest strażnikiem.
- Gdy nie działa: Serwo drży albo Arduino się resetuje: sprawdź kondensator 100 µF i przełóż kabel do innego portu USB.
- Dla Ciebie: Kąty ustawiasz stałymi ZAMKNIETY i OTWARTY. Biblioteka Servo blokuje PWM na D9 i D10, ale tu używamy tylko stanów włącz i wyłącz.

```cpp
// Lekcja 21. Szlaban
#include <Servo.h>

const int CZERWONA = 9;
const int ZIELONA = 11;
const int PRZYCISK = 2;
const int SERWO = 6;
const int ZAMKNIETY = 0;
const int OTWARTY = 90;

Servo szlaban;

void obroc(int od, int cel) {
  int krok = (cel > od) ? 1 : -1;
  for (int kat = od; kat != cel; kat += krok) {
    szlaban.write(kat);
    delay(15);
  }
  szlaban.write(cel);
}

void setup() {
  pinMode(CZERWONA, OUTPUT);
  pinMode(ZIELONA, OUTPUT);
  pinMode(PRZYCISK, INPUT_PULLUP);
  szlaban.attach(SERWO);
  szlaban.write(ZAMKNIETY);
  digitalWrite(CZERWONA, HIGH);
}

void loop() {
  if (digitalRead(PRZYCISK) == LOW) {
    obroc(ZAMKNIETY, OTWARTY);
    digitalWrite(CZERWONA, LOW);
    digitalWrite(ZIELONA, HIGH);
    delay(4000);
    digitalWrite(ZIELONA, LOW);
    digitalWrite(CZERWONA, HIGH);
    obroc(OTWARTY, ZAMKNIETY);
  }
}
```

## Blok 5. Raspberry Pi 5

Pi to mały komputer z systemem, plikami i dźwiękiem. Uruchamiasz Ty, a Leon nagrywa i mówi. W finale komputer słyszy jego głos, bez internetu.

Potrzebujesz Raspberry Pi OS z pulpitem, głośnika i mikrofonu USB. Biblioteka gpiozero jest w systemie i sama wybiera właściwy układ na Pi 5. Zacznij od pustej płytki, z odłączonym Arduino. Ten sam układ zostaje na obie lekcje. Komenda `pinout` pokaże numery pinów, a nieparzyste są w rzędzie bliżej środka Pi.

&#91;embedded content: złącze Pi 5 · użyte piny, widok z góry, pin 1 po lewej\]

| Element | Gdzie |
| --- | --- |
| Kabel żeńsko-męski | pin 9 (GND) do szyny − |
| Kabel żeńsko-męski | pin 13 (GPIO27) do a2 |
| Rezystor 330 Ω | b2 do b6 |
| Dioda | długa d6, krótka d7 |
| Kabel | a7 do szyny − |
| Kabel żeńsko-męski | pin 11 (GPIO17) do a10 |
| Przycisk | e10, e12, f10, f12 |
| Kabel | h12 do szyny − |

### Lekcja 22. Gadający przycisk

- Przygotuj: Zapisz skrypt w katalogu domowym. Sprawdź dźwięk i mikrofon komendami poniżej.
- Lekcja: Leon mówi do mikrofonu, co chce, przez trzy sekundy. Uruchamiasz skrypt. Leon naciska przycisk, dioda się zapala i z głośnika leci jego głos.
- Zostaje w głowie: Komputer potrafi zapisać mój głos i go oddać.
- Zabawa: Nagrajcie głos zwierząt, a potem tata zgaduje, co to. Nowe nagranie zastępuje stare, bez zmiany skryptu.
- Gdy nie działa: Pi 5 nie ma gniazda słuchawkowego. Wybierz wyjście dźwięku w ikonie głośnika na pasku: HDMI, USB albo Bluetooth. Skrypt kończysz przez Ctrl+C.
- Dla Ciebie: Dioda dostaje 3,3 V przez 330 Ω, czyli około 4 mA, a przycisk korzysta z wbudowanego rezystora podciągającego.

```bash
arecord -f S16_LE -r 44100 -c 1 -d 3 ~/leon.wav
aplay ~/leon.wav
python3 gadajacy_przycisk.py
```

```python
# Lekcja 22. Przycisk, który mówi głosem Leona
from pathlib import Path
from subprocess import run
from time import sleep
from gpiozero import Button, LED

przycisk = Button(17)            # GPIO17, fizyczny pin 11
dioda = LED(27)                  # GPIO27, fizyczny pin 13
nagranie = Path.home() / "leon.wav"

while True:
    przycisk.wait_for_press()
    dioda.on()
    run(["aplay", "-q", str(nagranie)])
    dioda.off()
    przycisk.wait_for_release()
    sleep(0.2)
```

### Lekcja 23. Lampka na głos

- Przygotuj: Raz, z internetem, zainstaluj bibliotekę i polski model komendami poniżej. Zapisz skrypt w katalogu domowym i uruchom go przed lekcją.
- Lekcja: Leon mówi do mikrofonu: zapal. Dioda się zapala. Mówi: zgaś. Gaśnie. Wyciągnij kabel Ethernet i wyłącz Wi-Fi, żeby zobaczył, że dalej działa.
- Zostaje w głowie: Komputer rozpoznaje słowa, bo nauczył się ich z wielu nagrań.
- Zabawa: Testujcie maszynę. Co będzie, gdy Leon szepnie? Gdy krzyknie? Gdy powie zapałka? Na ekranie widać, co usłyszała.
- Gdy nie działa: Mów blisko mikrofonu. Komenda `arecord -l` pokaże, czy Pi widzi mikrofon. Przy błędzie o częstotliwości wybierz mikrofon w ikonie głośnika na pasku.
- Dla Ciebie: Model ma 50 MB, a lista słów w skrypcie zawęża rozpoznawanie do dwóch komend. Rozumie mowę z polskiego syntezatora, ale na głosie dziecka nie jest sprawdzony. Zapal i zgaś możesz zmienić na inne słowa.

```bash
sudo apt install -y libportaudio2 unzip
python3 -m venv --system-site-packages ~/glos
~/glos/bin/pip install vosk sounddevice
cd ~
wget https://alphacephei.com/vosk/models/vosk-model-small-pl-0.22.zip
unzip vosk-model-small-pl-0.22.zip
~/glos/bin/python lampka_na_glos.py
```

```python
# Lekcja 23. Lampka na głos, działa bez internetu
import json
import queue
from pathlib import Path

import sounddevice as sd
from gpiozero import LED
from vosk import KaldiRecognizer, Model

dioda = LED(27)                  # GPIO27, fizyczny pin 13
model = Model(str(Path.home() / "vosk-model-small-pl-0.22"))
slowa = json.dumps(["zapal", "zgaś", "[unk]"], ensure_ascii=False)
rozpoznawacz = KaldiRecognizer(model, 16000, slowa)
dzwiek = queue.Queue()


def mikrofon(dane, ramki, czas, status):
    dzwiek.put(bytes(dane))


with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype="int16",
                       channels=1, callback=mikrofon):
    print("Powiedz: zapal albo zgaś")
    while True:
        if rozpoznawacz.AcceptWaveform(dzwiek.get()):
            tekst = json.loads(rozpoznawacz.Result())["text"]
            print(tekst)
            if "zapal" in tekst:
                dioda.on()
            elif "zgaś" in tekst:
                dioda.off()
```

## Ściąga dla taty

Większość usterek to odwrotna dioda, brak połączenia przez rowek albo zużyta bateria. Sprawdzaj w tej kolejności:

1. Napięcie między szynami: około 9 V z baterii albo 5 V z Arduino.
2. Kierunek diod i kondensatorów: długa nóżka do plusa, pasek kondensatora do minusa.
3. Rowek i przerwana szyna: góra i dół kolumny to dwa osobne węzły.
4. Węzeł po węźle: multimetrem na ciągłość sprawdź każdą linię z planu.
5. Elementy: wyjmij i włóż ponownie, a kabel zamień na inny.

| Wartość | Paski | Gdzie |
| --- | --- | --- |
| 100 Ω | brązowy, czarny, brązowy | 11, 14 |
| 330 Ω | pomarańczowy, pomarańczowy, brązowy | 17–23 |
| 470 Ω | żółty, fioletowy, brązowy | 9, 10, 15, 16 |
| 1 kΩ | brązowy, czarny, czerwony | lampki, 6–8, 12–14, 16 |
| 2,2 kΩ | czerwony, czerwony, czerwony | 16 |
| 4,7 kΩ | żółty, fioletowy, czerwony | 9 |
| 10 kΩ | brązowy, czarny, pomarańczowy | 11, 16 |
| 47 kΩ | żółty, fioletowy, pomarańczowy | 9, 13, 15 |
| 470 kΩ | żółty, fioletowy, żółty | 9 |
| 1 MΩ | brązowy, czarny, zielony | 12, 13 |

Po kursie ScratchJr na tablecie doda programowanie klockami, bo jest darmowy i przeznaczony dla dzieci w wieku 5–7 lat. Dla Ciebie dalszy krok to Platt, „Elektronika. Od praktyki do teorii”.

Plany płytki sprawdziłem skryptem względem schematów, lekcje 11–13 zasymulowałem w ngspice. Kody Arduino kompilują się pod Uno, a logikę lekcji 18–20 przetestowałem na symulowanych przyciskach. Kod z lekcji 22 działa na symulowanych pinach, a rozpoznawanie z lekcji 23 na mowie z syntezatora. Nic nie było złożone na prawdziwym sprzęcie, więc każdy układ sprawdź przed lekcją.

Źródła:

- [Omron G5V-2](https://www.mikroprinc.com/uploads/store/products/pdf/g5v2_pdf5b5708f03b336.pdf): cewka, rozkład nóżek przekaźnika
- [Kingbright SC56-11SRWA](https://www.kingbrightusa.com/images/catalog/SPEC/SC56-11SRWA.pdf): nóżki wyświetlacza
- [CD4026](https://atta.szlcsc.com/upload/public/pdf/source/20240511/1B8A8B9104F38180139EFDCF8AF3B482.pdf): nóżki licznika
- [Kingbright L-53P3C](https://au.element14.com/kingbright/l-53p3c/phototransistor-5mm-940nm/dp/2290444): fototranzystor, 940 nm
- [Raspberry Pi, wybór dźwięku](https://pip-assets.raspberrypi.com/categories/1259-audio-camera-and-display/documents/RP-008124-WP-1-Choosing%20an%20Audio%20option.pdf): brak gniazda audio w Pi 5
- [Modele Vosk](https://alphacephei.com/vosk/models): vosk-model-small-pl-0.22
- [ScratchJr](https://apps.apple.com/app/scratchjr/id895485086): wiek i cena
