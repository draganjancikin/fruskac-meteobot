# Meteobot modul

Meteobot modul for Drupal 7

## Instalation

* copy/export modul folder "meteobot" to [sitename]/sites/all/modules/
* in admin/modules, tab "list" find "meteobot", enabled it, and save configuration
* when modul enabled first time:
  * new table "meteobot" automatically added to database
  * ...

## API

### Get weather data from site database

API link: [site_address]/api/meteo/[period]

Parametar [period] is optional.

| Parametar | API return   |
|:---------:|:------------:|
| if omited | daily data   |
| [daily]   | daily data   |
| [weekly]  | weekly data  |
| [monthly] | monthly data |

### Get weather data from export.meteobot.com

API link: [site_address]/api/export.meteobot.com
