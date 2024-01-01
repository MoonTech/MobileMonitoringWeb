export type GetRecordingsResponse = {
  recordings: Recording[];
};

export type Recording = {
  name: string;
  url: string;
};
