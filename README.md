# sausozluk / web ![badge](https://travis-ci.org/sausozluk/web.svg?branch=master)

> web client implementation for sausozluk which is developed with Backbone.

## env config

```bash
#
# example for thisistest.site
#
SOZLUK_NAME=saüsözlük
SOZLUK_ENV=prod
SOZLUK_API_URL=http://thisistest.site/service/proxy/api/v1
```

## todo
```text
- rework for views
- multi login chat broadcast bug
- mobile chat ui looks like shitty
- admin and moderation panel
- settings page
- mail authorization
- message archive
- chat messages must be like entry design
- report topic and entry system
- fix domain config with nginx
- websocket port problem fix (maybe websocket balancer?)
- notification for fatal problems (telegram, slack maybe?)
- up vote, down vote button must be hidden if belong logged-in user (or visitor account).
- check pagination for index cause its list box not a aHref?
- apply promises for whole async mechanic (maybe proxies? but check supported browsers)
- apply base view model for generic methods
- github hooks (do not remember!)
- check fucking tab views (jquery ui?)
- global error management
- mail notification for unread chat messages
- update bower deps
- backup db (job)
- sitemap.xml
- check topic name length on front-end idiot
- http://www.w3resource.com/schema.org/Article.php
```
