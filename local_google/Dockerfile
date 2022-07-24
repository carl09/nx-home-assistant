ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

# ADD package.json /

#RUN apk add --no-cache nodejs-npm && \
# RUN apk add nodejs-npm && \
# npm install --production

ADD www/ /www/

RUN apk add nodejs npm

# Copy data for add-on
COPY run.sh /
# COPY server.js /
# COPY server.js.map /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
