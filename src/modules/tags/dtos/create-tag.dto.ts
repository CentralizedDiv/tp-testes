export interface CreateTagDTO {
  label: string;
  color: string;
}

export type UpdateTagDTO = Partial<CreateTagDTO>;
