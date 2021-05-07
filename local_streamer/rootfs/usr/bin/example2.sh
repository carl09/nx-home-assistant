#!/usr/bin/with-contenv bashio
# ==============================================================================
# Home Assistant Community Add-on: Example
#
# Example add-on for Home Assistant.
# ------------------------------------------------------------------------------
main() {
    bashio::log.trace "Hello"

    streams=$(bashio::config 'streams')
    bashio::log.info "Seconds between each quotes is set to: ${streams}"

    bashio::log.info "Starting stream"

    for i in $(echo "${streams}" | jq -r '.[]');
    do
        bashio::log.info "---"
        # bashio::log.info $i
        bashio::log.info $i | jq '.endpoint'
        bashio::log.info ""
        bashio::log.info "****"
    done

    # $(sh ./create_ffmpeg_cmd.sh "rtsp://192.168.10.74:554/h264" help) &


    # ffmpeg -rtsp_transport tcp -i rtsp://192.168.10.74:554/h264 -f lavfi -i aevalsrc=0 -acodec aac -vcodec copy -hls_list_size 2 -hls_init_time 1 -hls_time 1 -hls_flags delete_segments /tmp/stream/help.m3u8

    nginx -g "daemon off;"
}
main "$@"