# Elektronika z Leonem

Kurs elektroniki dla pięciolatka: 23 lekcje na płytce stykowej, z Arduino i Raspberry Pi, plus plac zabaw z symulacją obwodu.

Wszystko, co dzieje się na ekranie, liczy solver w przeglądarce: napięcia w węzłach, diody, tranzystory, kondensatory, przekaźnik, NE555 i CD4026. Części można przekładać palcem, a układ reaguje tak, jak by reagował na stole.

Mikrofon działa lokalnie. Nagranie z lekcji 22 zostaje w pamięci przeglądarki, a rozpoznawanie słów w lekcji 23 robi Vosk w WebAssembly, bez wysyłania dźwięku.

Budowanie: `cd zrodla && python3 build.py site`.

Użyte: [vosk-browser](https://github.com/ccoreilly/vosk-browser), model [vosk-model-small-pl-0.22](https://alphacephei.com/vosk/models) (Apache 2.0). Głos Iskry nagrany w ElevenLabs.
