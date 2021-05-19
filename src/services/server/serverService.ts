import type {Server} from "../../models/server/server";
import {HttpClient} from "../httpClient/httpClient";
import {Jwt} from "../auth/jwt";
import {httpResponseToLocalException} from "../httpClient/httpExceptionHandler";
import {ServerNotFound} from "./errors/ServerNotFound";

export class ServerService {
    /**
     * Gets the servers of the current logged in user
     */
    static async getUserServers(searchQuery?: { name: string, powerstatus: boolean, ip: string}): Promise<Server[]> {
        try {
            let filterToSend: any = searchQuery
            if (filterToSend.powerstatus === undefined || null) {
                filterToSend = {
                    name: searchQuery.name,
                    ip: searchQuery.ip
                }
            }
            const response = (await HttpClient.get('servers', filterToSend))

            if (response.statusCode === 200) {
                return response.content as Server[]
            } else {
                httpResponseToLocalException(response)
                return undefined
            }
        } catch (ignored) {
            return undefined
        }
    }

    static async getServer(serverId: string): Promise<Server> {
        try {
            const servers = (await HttpClient.get(`servers/${serverId}`)).content

            return servers as Server
        } catch (ignored) {
            throw new ServerNotFound(`Server with ${serverId} not found.`)
        }
    }

    static async saveSaver(server: Server, serverFile?: File): Promise<Server> {
        const response = await HttpClient.post('servers', server)

        const createdServer = response.content as Server

        if(response.statusCode === 200) {
            if(serverFile) {
                await HttpClient.uploadFile(
                    `servers/image/${createdServer.id}`, "PUT", serverFile
                )
            }

            return createdServer
        } else {
            throw httpResponseToLocalException(response)
        }
    }

    static async updateServer(server: Server, serverFile?: File): Promise<void> {
        const response = await HttpClient.put(`servers/${server.id}`, server)

        if(response.statusCode === 204) {
            if(serverFile) {
                await HttpClient.uploadFile(
                    `servers/image/${server.id}`, "PUT", serverFile
                )
            }
            return
        } else {
            throw httpResponseToLocalException(response)
        }
    }

    static async deleteServer(server: Server): Promise<void> {
        const response = await HttpClient.delete(`servers/${server.id}`, {})

        const createdServer = response.content as Server

        if(response.statusCode === 204) {
            return
        } else {
            throw httpResponseToLocalException(response)
        }
    }
}
