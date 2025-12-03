FROM tusproject/tusd:v2.8

USER root:root
RUN apk add --no-cache --no-check-certificate libgcc libstdc++
RUN install -d -m0700 -o 1111 /hooks
RUN install -d -m0700 -o 1111 /data
VOLUME "/data"

USER 1111:1111
COPY --chown=1111:1111 --chmod=500 ./src/bun /bin/bun
COPY --chown=1111:1111 --chmod=500 ./src/onupload.ts /hooks/post-finish
