ARG BUILD_FROM
FROM $BUILD_FROM

# ENV LANG C.UTF-8

# Install nginx and ffmpeg
RUN apk add --update nginx ffmpeg && rm -rf /var/cache/apk/* && mkdir /tmp/stream
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# COPY run.sh /
# RUN chmod a+x /run.sh
# CMD [ "/startup.sh" ]

COPY startup.sh /
COPY create_ffmpeg_cmd.sh /

RUN chmod a+x /startup.sh
RUN chmod a+x /create_ffmpeg_cmd.sh

CMD [ "/startup.sh" ]
