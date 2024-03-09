# HOW TO GENERATE

## Configuring lighttpd en local

> sudo nano /etc/lighttpd/lighttpd.conf

exemple de configuration minimale : 

```
server.port             = 8080
server.document-root   = "/run/media/bess/HDD/GIT/stati>
server.errorlog         = "/var/log/lighttpd/error.log"
dir-listing.activate    = "enable"
index-file.names        = ( "index.html" )
mimetype.assign         = (
                                ".html" => "text/html",
                                ".txt" => "text/plain",
                                ".css" => "text/css",
                                ".js" => "application/x>
                                ".jpg" => "image/jpeg",
                                ".jpeg" => "image/jpeg",
                                ".gif" => "image/gif",
                                ".png" => "image/png",
                                "" => "application/octe>
                        )
```

## Run server + hugo en local

Lancer le serveur http

> sudo lighttpd -D -f /etc/lighttpd/lighttpd.conf

Lancer hugo en mode watch

> hugo -w