import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './../seguranca/auth.service';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SharedModule } from '../shared/shared.module';
import { ParticipantesRoutingModule } from './participantes-routing.module';
import { ParticipanteCadastroComponent } from './participante-cadastro/participante-cadastro.component';
import { ParticipantesPesquisaComponent } from './participantes-pesquisa/participantes-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    PasswordModule,

    SharedModule,
    ParticipantesRoutingModule
  ],
  declarations: [
    ParticipanteCadastroComponent,
    ParticipantesPesquisaComponent
  ],

  providers: [],
  exports: []
})
export class ParticipantesModule { }
