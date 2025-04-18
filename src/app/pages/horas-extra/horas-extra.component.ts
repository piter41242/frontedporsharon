import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface HoraExtra {
  id: number;
  nombre: string;
  cargo: string;
  fecha: string;
  horaInicio: string;
  horaFinal: string;
  totalHoras: number;
  estado: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-horas-extra',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, FontAwesomeModule],
  templateUrl: './horas-extra.component.html',
  styleUrls: ['./horas-extra.component.scss']
})
export class HorasExtraComponent implements OnInit {
  horasExtras: HoraExtra[] = [
    { id: 1, nombre: 'John Michael', cargo: 'Asesor', fecha: '2024-07-15', horaInicio: '17:00', horaFinal: '20:00', totalHoras: 3, estado: 'completado' },
    { id: 2, nombre: 'Laurent Perrier', cargo: 'Programador', fecha: '2024-07-17', horaInicio: '18:00', horaFinal: '22:00', totalHoras: 4, estado: 'pendiente' }
  ];

  modalVisible: boolean = false;
  horaExtraEditada: HoraExtra = {} as HoraExtra;
  nuevaHoraExtra: HoraExtra = {} as HoraExtra;

  mostrarAgregarModalHorasExtra: boolean = false;

  isLargeScreen: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.horasExtras = this.horasExtras.map(item => ({
      ...item,
      isExpanded: false
    }));
    this.onResize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isLargeScreen = window.innerWidth > 1045;
  }

  toggleAcordeon(item: HoraExtra): void {
    item.isExpanded = !item.isExpanded;
  }

  agregarHorasExtras(): void {
    this.nuevaHoraExtra = {} as HoraExtra;
    this.mostrarAgregarModalHorasExtra = true;
  }

  cerrarAgregarModalHorasExtra(): void {
    this.mostrarAgregarModalHorasExtra = false;
    this.nuevaHoraExtra = {} as HoraExtra;
  }

  guardarNuevaHoraExtra(): void {
    const nuevoId = this.horasExtras.length > 0 ? Math.max(...this.horasExtras.map(h => h.id)) + 1 : 1;

    this.horasExtras.push({
      ...this.nuevaHoraExtra,
      id: nuevoId,
      isExpanded: false
    });

    this.cerrarAgregarModalHorasExtra();
  }

  editarHorasExtras(horaExtra: HoraExtra): void {
    this.horaExtraEditada = { ...horaExtra };
    this.modalVisible = true;
  }

  cancelarEdicion(): void {
    this.modalVisible = false;
  }

  guardarEdicion(): void {
    const index = this.horasExtras.findIndex(h => h.id === this.horaExtraEditada.id);
    if (index !== -1) {
      const originalIsExpanded = this.horasExtras[index].isExpanded;
      this.horasExtras[index] = {
        ...this.horaExtraEditada,
        isExpanded: originalIsExpanded
       };
    }
    this.modalVisible = false;
  }

  eliminarHorasExtras(horaExtra: HoraExtra): void {
    const confirmado = confirm(`¿Estás seguro de eliminar las horas extras de ${horaExtra.nombre} (${horaExtra.fecha})?`);
    if (confirmado) {
      this.horasExtras = this.horasExtras.filter(h => h.id !== horaExtra.id);
    }
  }

  generarReporte(): void {
    console.log('Generando reporte de horas extras...');
    alert('Generando reporte de horas extras...');
  }
}