import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Participante, Cep } from '../core/model';
import * as moment from 'moment';

export class ParticipanteFiltro {
  cpf: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ParticipanteService {

  participantesUrl: string;
  cepUrl: string;

  constructor(private http: HttpClient) {
    this.participantesUrl = `${environment.apiUrl}/participantes`;
    this.cepUrl = `${environment.apiUrl}/cep`;
  }

  pesquisar(filtro: ParticipanteFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.cpf) {
      params = params.set('cpf', filtro.cpf);
    }

    return this.http.get(`${this.participantesUrl}`, { params })
      .toPromise()
      .then(response => {
        const participantes = response['content'];

        const resultado = {
          participantes,
          total: response['totalElements']
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.participantesUrl)
      .toPromise()
      .then(response => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.participantesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(participante: Participante): Promise<Participante> {
    return this.http.post<Participante>(this.participantesUrl, participante)
      .toPromise();
  }
 
  atualizar(participante: Participante): Promise<Participante> {
    return this.http.put<Participante>(`${this.participantesUrl}/${participante.codigo}`, participante)
      .toPromise()
      .then(response => {
        const participanteAlterado = response;

        this.converterStringsParaDatas([participanteAlterado]);

        return participanteAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Participante> {
    return this.http.get<Participante>(`${this.participantesUrl}/${codigo}`)
      .toPromise()  
      .then(response => {
        const participante = response;

        this.converterStringsParaDatas([participante]);

        return participante;
      });
  }






  buscarEnderecoPorCep(cep: number): Promise<Cep> {
    return this.http.get<Cep>(`${this.cepUrl}/${cep}`)
      .toPromise();
  }


  private converterStringsParaDatas(participantes: Participante[]) {
    for (const participante of participantes) {
      participante.dataNascimento = moment(participante.dataNascimento,
        'YYYY-MM-DD').toDate();
    }
  }
}
