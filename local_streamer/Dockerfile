ARG BUILD_FROM=ghcr.io/hassio-addons/base/amd64:9.2.0
FROM ${BUILD_FROM}

# Install nginx and ffmpeg
RUN apk add --update nginx ffmpeg && rm -rf /var/cache/apk/* && mkdir /tmp/stream
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY rootfs /

COPY startup.sh /
COPY run.sh /
COPY create_ffmpeg_cmd.sh /

RUN chmod a+x /startup.sh
RUN chmod a+x /run.sh
RUN chmod a+x /create_ffmpeg_cmd.sh

# CMD [ "/run.sh" ]
