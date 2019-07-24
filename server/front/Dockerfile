FROM node:12.6.0-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apk add --update --no-cache \
    git \
    tzdata \
    shadow

ARG uid=1000
ARG gid=1000
RUN usermod -u $uid node && \
    groupmod -g $gid node && \
    mkdir /home/node/.npm && \
    chown -R ${uid}:${gid} /home/node && \
    chown -R ${uid}:${gid} /usr/local/lib/node_modules

WORKDIR /front

USER node