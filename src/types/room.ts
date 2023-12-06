export type Room = {
  name: string;
  cameras: string[];
  owner: RoomOwner;
};

export type RoomOwner = {
  login: string;
  rooms: string[];
};
