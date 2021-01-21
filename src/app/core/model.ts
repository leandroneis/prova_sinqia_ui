export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  localidade: string;
  uf: string;
}

export class Participante {
  codigo: number;
  nomeCompleto: string;
  cpf:string;
  dataNascimento: Date;
  email: string;
  telefone: string;
  senha: string;
  endereco = new Endereco();
}
export class Cep {
  codigo: number;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
}