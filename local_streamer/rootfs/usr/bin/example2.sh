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

    url=""
    endpoint=""

    for i in ${streams};
    do
        bashio::log.info "---"
        # bashio::log.info $i
        # bashio::log.info $i | jq '.endpoint'
        # bashio::log.info "$i" | jq '.url'
        # bashio::log.info "++"

        endpoint=$(jq -r '.endpoint' <<< $i)
        url=$(jq -r '.url' <<< $i)
        bashio::log.info $endpoint
        bashio::log.info ""

        # ffmpeg -rtsp_transport tcp -i $url -f lavfi -i aevalsrc=0 -acodec aac -vcodec copy -hls_list_size 2 -hls_init_time 1 -hls_time 1 -hls_flags delete_segments /tmp/stream/$endpoint.m3u8
        $(sh /create_ffmpeg_cmd.sh $url $endpoint) &

        bashio::log.info "****"
    done

    # $(sh ./create_ffmpeg_cmd.sh "rtsp://192.168.10.74:554/h264" help) &


    # ffmpeg -rtsp_transport tcp -i rtsp://192.168.10.74:554/h264 -f lavfi -i aevalsrc=0 -acodec aac -vcodec copy -hls_list_size 2 -hls_init_time 1 -hls_time 1 -hls_flags delete_segments /tmp/stream/help.m3u8

    nginx -g "daemon off;"
}
main "$@"