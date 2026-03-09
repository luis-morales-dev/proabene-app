import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Guia {
  procedimiento: string;
  antibiotico:   string;
  dosis:         string;
  via:           string;
  administracion: string;
  duracion:      string;
}

@Component({
  selector: 'app-guias',
  templateUrl: './guias.page.html',
  styleUrls: ['./guias.page.scss'],
  standalone: false,
})
export class GuiasPage implements OnInit {

  selectedSegment: string = 'respiratoria';
  expandedIndex:   number | null = null;

  // ── Datos de ejemplo por categoría ──────────────────────────────────
  guias: Record<string, Guia[]> = {

    respiratoria: [
      {
        procedimiento:  'Neumonía adquirida en comunidad leve',
        antibiotico:    'Amoxicilina',
        dosis:          '500 mg c/8h',
        via:            'Oral',
        administracion: 'Con o sin alimentos',
        duracion:       '5-7 días',
      },
      {
        procedimiento:  'Neumonía adquirida en comunidad moderada',
        antibiotico:    'Amoxicilina-Clavulanato',
        dosis:          '875/125 mg c/12h',
        via:            'Oral',
        administracion: 'Con alimentos',
        duracion:       '7 días',
      },
      {
        procedimiento:  'Neumonía hospitalaria',
        antibiotico:    'Piperacilina-Tazobactam',
        dosis:          '4.5 g c/6h',
        via:            'IV',
        administracion: 'Infusión en 30 min',
        duracion:       '7-14 días',
      },
      {
        procedimiento:  'Faringoamigdalitis estreptocócica',
        antibiotico:    'Penicilina V',
        dosis:          '500 mg c/12h',
        via:            'Oral',
        administracion: 'Con o sin alimentos',
        duracion:       '10 días',
      },
    ],

    urinaria: [
      {
        procedimiento:  'Cistitis no complicada',
        antibiotico:    'Nitrofurantoína',
        dosis:          '100 mg c/12h',
        via:            'Oral',
        administracion: 'Con alimentos',
        duracion:       '5 días',
      },
      {
        procedimiento:  'Pielonefritis leve',
        antibiotico:    'Ciprofloxacino',
        dosis:          '500 mg c/12h',
        via:            'Oral',
        administracion: 'Con o sin alimentos',
        duracion:       '7 días',
      },
      {
        procedimiento:  'Pielonefritis grave',
        antibiotico:    'Ceftriaxona',
        dosis:          '1 g c/24h',
        via:            'IV',
        administracion: 'Bolo IV en 5 min',
        duracion:       '10-14 días',
      },
    ],

    gastrointestinal: [
      {
        procedimiento:  'Diarrea por C. difficile leve',
        antibiotico:    'Metronidazol',
        dosis:          '500 mg c/8h',
        via:            'Oral',
        administracion: 'Con alimentos',
        duracion:       '10 días',
      },
      {
        procedimiento:  'Diarrea por C. difficile grave',
        antibiotico:    'Vancomicina',
        dosis:          '125 mg c/6h',
        via:            'Oral',
        administracion: 'Con o sin alimentos',
        duracion:       '10 días',
      },
    ],

    piel: [
      {
        procedimiento:  'Celulitis no complicada',
        antibiotico:    'Cefalexina',
        dosis:          '500 mg c/6h',
        via:            'Oral',
        administracion: 'Con o sin alimentos',
        duracion:       '5-7 días',
      },
      {
        procedimiento:  'Celulitis complicada / SARM',
        antibiotico:    'Trimetoprim-Sulfametoxazol',
        dosis:          '1-2 tabletas DS c/12h',
        via:            'Oral',
        administracion: 'Con abundante agua',
        duracion:       '7 días',
      },
    ],

    sistemica: [
      {
        procedimiento:  'Sepsis de foco desconocido',
        antibiotico:    'Meropenem',
        dosis:          '1 g c/8h',
        via:            'IV',
        administracion: 'Infusión en 30 min',
        duracion:       'Según evolución clínica',
      },
      {
        procedimiento:  'Bacteriemia por S. aureus',
        antibiotico:    'Oxacilina',
        dosis:          '2 g c/4h',
        via:            'IV',
        administracion: 'Infusión en 30-60 min',
        duracion:       '14-28 días',
      },
    ],
  };

  constructor() { }

  ngOnInit() {
  }

  // ── Métodos ──────────────────────────────────────────────────────────
  getGuias(): Guia[] {
    return this.guias[this.selectedSegment] || [];
  }

  getCategoryLabel(): string {
    const labels: Record<string, string> = {
      respiratoria:     'Infección Respiratoria',
      urinaria:         'Infección Urinaria',
      gastrointestinal: 'Infección Gastrointestinal',
      piel:             'Piel y Tejidos Blandos',
      sistemica:        'Infección Sistémica',
    };
    return labels[this.selectedSegment] || '';
  }

  onSegmentChange(event: any): void {
    this.selectedSegment = event.detail.value;
    this.expandedIndex = null;
  }

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

}
