import { httpClient } from "../../lib/httpClient"

export const getServerHealth = () => {
    return httpClient.get("/server/health")
}

export const getServerMobileAppVersion = (platform: string): any => {
    return httpClient.get("/server/app/version", { params: { platform: platform }})
}