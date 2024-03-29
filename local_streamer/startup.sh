#!/usr/bin/with-contenv bashio

main() {
    bashio: : log.trace "Hello"

    streams =$(bashio: : config 'streams')
    bashio:: log.info "Seconds between each quotes is set to: ${streams}"

    bashio: : log.info "Starting ${OUT} stream"

    for i in streams
    do
        bashio:: log.info $i
    done

    # $(sh ./create_ffmpeg_cmd.sh "rtsp://192.168.10.74:554/h264" help) &


    # ffmpeg -rtsp_transport tcp -i rtsp://192.168.10.74:554/h264 -f lavfi -i aevalsrc=0 -acodec aac -vcodec copy -hls_list_size 2 -hls_init_time 1 -hls_time 1 -hls_flags delete_segments /tmp/stream/help.m3u8

    nginx -g "daemon off;"
}
main "$@"


