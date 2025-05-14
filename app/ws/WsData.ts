import type WebSocket from 'ws';
export class WsData {
    private hall: Map<String, WsUser> = new Map();
    private rooms: Map<string, WsRoom> = new Map();

    //join Hall
    joinHall(user: WsUser) {
        if (!this.hall.has(user.id)) {
            this.hall.set(user.id, user);
            user.ws.send(`欢迎${user.id}进入游戏大厅`)
        }
    }

    createRoom(userId: string) {
        const roomId = Math.random().toString(36).slice(2, 10);
        this.rooms.set(roomId, { id: roomId, users: new Set([userId]) });
        this.hall.get(userId)!.roomId = roomId;
        this.hall.get(userId)!.ws.send(`房间已创建,ID:${roomId}`);
    }

    joinRoom(userId: string, roomId: string) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.users.add(userId);
            this.hall.get(userId)!.roomId = roomId;
            this.hall.get(userId)!.ws.send(`已加入房间：${roomId}`);
        } else {
            this.hall.get(userId)!.ws.send(`房间不存在：${roomId}`);
        }
    }

    sendToRoom(userId: string, roomId: string, content: string) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.users.forEach(uid => {
                if (uid !== userId) {
                    this.hall.get(uid)?.ws.send(`来自${userId}的消息: ${content}`);
                }
            });
        }
    }

    leaveAllRooms(userId: string) {
        this.rooms.forEach(room => {
            room.users.delete(userId);
        });
    }
}
export class WsUser {
    constructor(public id: string, public ws: WebSocket, public roomId: string) { }
}
export class WsRoom {
    constructor(public id: string, public users: Set<string>) { }
}