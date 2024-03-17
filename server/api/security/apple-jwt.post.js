import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const teamId = config.APPLE_TEAM_ID;
    const keyId = config.APPLE_KEY_ID;
    const privateKey = Buffer.from(config.APPLE_PRIVATE_KEY, "base64").toString("utf-8");

    const token = jwt.sign({}, privateKey, {
        algorithm: "ES256",
        expiresIn: "180d",
        issuer: teamId,
        header: {
            alg: "ES256",
            kid: keyId,
        },
    });
    return { token };
});