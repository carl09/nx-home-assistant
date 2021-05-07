ARG BUILD_FROM=ghcr.io/hassio-addons/base/amd64:9.2.0
FROM ${BUILD_FROM}

# Install nginx and ffmpeg
RUN apk add --update nginx ffmpeg && rm -rf /var/cache/apk/* && mkdir /tmp/stream
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY rootfs /

COPY startup.sh /
COPY startup.py /
COPY create_ffmpeg_cmd.sh /

RUN chmod a+x /startup.sh
RUN chmod a+x /startup.py
RUN chmod a+x /create_ffmpeg_cmd.sh

# CMD [ "/startup.sh" ]
