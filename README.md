# Meteobot modul

Meteobot modul for Drupal 7

## Instalation

* copy/export modul folder "meteobot" to [sitename]/sites/all/modules/
* in admin/modules, tab "list" find "meteobot", enabled it, and save configuration
* when modul enabled first time:
  * new db table "meteobot" added to database
  * pull last 7 days data from meteobot.com API, and save to db table "meteobot"
* in admin/structure/block on bottom in "Disabled" find "Meteobot", choose region "Content" and "Save block"
* in admin/structure/block, find "Meteobot", in configure/Visibility settings, tab Pages, check "Only the listed pages", write "meteo", and "Save block"

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
