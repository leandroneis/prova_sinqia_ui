import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ParticipanteFiltro, ParticipanteService } from '../participante.service';
import { AuthService } from './../../seguranca/auth.service';


@Component({
  selector: 'app-participantes-pesquisa',
  templateUrl: './participantes-pesquisa.component.html',
  styleUrls: ['./participantes-pesquisa.component.css']
})
export class ParticipantesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ParticipanteFiltro();
  participantes = [];
  @ViewChild('tabela') grid: Table;

  constructor(
    public auth: AuthService,
    private participanteService: ParticipanteService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de participantes');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.participanteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.participantes = resultado.participantes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(participante: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(participante);
      }
    });
  }

  excluir(participante: any) {
    this.participanteService.excluir(participante.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Participante excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  temPermissao(participante:any) {
    return this.auth.jwtPayload.nome === participante.nomeCompleto || this.auth.temPermissao('ROLE_ADMIN');
    
  }

}
