export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const userToken = config.APPLE_USER_TOKEN;
    return { userToken };
});