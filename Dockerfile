# Étape 1 : Build avec Node et Webpack
FROM pockost/hugo:0.125.4 AS builder

WORKDIR /app

# Copier les fichiers nécessaires au build
COPY . .

# Build du projet
RUN hugo --gc --minify -b http://shadows.kdanezis.fr:8082


# Étape 2 : With Lupanski docker static website image
# https://lipanski.com/posts/smallest-docker-image-static-website
FROM lipanski/docker-static-website
COPY --from=builder /app/public .
EXPOSE 3000


# HOW TO : 
    # docker build --pull --rm -f 'Dockerfile' -t 'staticfurie:latest' '.' 
    # docker run -d -p 8080:3000 staticfurie:latest
    # docker exec -it xxx /bin/ash