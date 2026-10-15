import { createAppleMusicService } from "../../utils/apple-music.js";

let musicService;

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    musicService ??= createAppleMusicService({
        cacheFile: config.appleMusicCacheFile || undefined,
    });

    setResponseHeader(event, "Cache-Control", "no-store");
    return musicService.getLastPlayed(config, (promise) => event.waitUntil(promise), {
        waitForRefresh: getQuery(event).fresh === "1",
    });
});
