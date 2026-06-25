import type { Instrumento } from "../instrumento-financiero"; 

export type UpdateInstrumentoDTO = Omit<Instrumento, 'id_instrumento'>;
