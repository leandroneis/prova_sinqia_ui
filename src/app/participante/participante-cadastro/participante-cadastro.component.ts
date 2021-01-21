import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ParticipanteService } from './../participante.service';
import { Participante,  Endereco } from './../../core/model';
import { AuthService } from './../../seguranca/auth.service';
@Component({
  selector: 'app-participante-cadastro',
  templateUrl: './participante-cadastro.component.html',
  styleUrls: ['./participante-cadastro.component.css']
})
export class ParticipanteCadastroComponent implements OnInit {

  participante = new Participante();
  
  constructor(
    public auth: AuthService,
    private participanteService: ParticipanteService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoParticipante = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo participante');

    if (codigoParticipante) {
      this.carregarParticipante(codigoParticipante);
    }
  }


  get editando() {
    return Boolean(this.participante.codigo)
  }

  carregarParticipante(codigo: number) {
    this.participanteService.buscarPorCodigo(codigo)
      .then(participante => {
        this.participante = participante;

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarParticipante(form);
    } else {
      this.adicionarParticipante(form);
    }
  }

  adicionarParticipante(form: FormControl) {
    this.participanteService.adicionar(this.participante)
      .then(participanteAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Participante adicionado com sucesso!' });
        this.router.navigate(['/participantes', participanteAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarParticipante(form: FormControl) {
    this.participanteService.atualizar(this.participante)
      .then(participante => {
        this.participante = participante;

        this.messageService.add({ severity: 'success', detail: 'Participante alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.participante = new Participante();
    }.bind(this), 1);

    this.router.navigate(['/participantes/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de participante: ${this.participante.nomeCompleto}`);
  }

  preencherEnderecoCep(cep:any){
    this.participanteService.buscarEnderecoPorCep(cep).then(
      endereco => {
        if(endereco){
          this.participante.endereco.bairro = endereco.bairro;
          this.participante.endereco.logradouro = endereco.logradouro;
          this.participante.endereco.cep = endereco.cep;
          this.participante.endereco.uf = endereco.uf;
          this.participante.endereco.localidade = endereco.localidade;
          this.participante.endereco.cep = endereco.cep;
        }
      }
    ).catch(erro => this.errorHandler.handle(erro));
  }
}
