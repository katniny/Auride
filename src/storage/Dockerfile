FROM tusproject/tusd:v2.8
USER root:root
RUN apk add --no-cache --no-check-certificate libgcc libstdc++
RUN mkdir /hooks
COPY ./src/bun /bin/bun
COPY ./src/onupload.ts /hooks/post-finish
USER 1111:1111
