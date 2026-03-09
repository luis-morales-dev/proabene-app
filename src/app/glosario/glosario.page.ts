import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

interface Termino {
  nombre:     string;
  definicion: string;
}

interface LetterGroup {
  letter: string;
  terms:  Termino[];
}


@Component({
  selector: 'app-glosario',
  templateUrl: './glosario.page.html',
  styleUrls: ['./glosario.page.scss'],
  standalone: false,
})
export class GlosarioPage implements OnInit {

  @ViewChild(IonContent) content!: IonContent;

  searchTerm:    string = '';
  activeLetter:  string = 'A';

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // ── Datos del glosario ───────────────────────────────────────────────
  terminos: Termino[] = [
    // A
    { nombre: 'Antibiótico',       definicion: 'Sustancia que destruye o inhibe el crecimiento de microorganismos, especialmente bacterias.' },
    { nombre: 'Antimicrobiano',    definicion: 'Agente capaz de destruir o inhibir el crecimiento de microorganismos patógenos.' },
    { nombre: 'Aerobio',           definicion: 'Microorganismo que requiere oxígeno para vivir y reproducirse.' },
    // B
    { nombre: 'Bacteremia',        definicion: 'Presencia de bacterias viables en el torrente sanguíneo.' },
    { nombre: 'Beta-lactámico',    definicion: 'Clase de antibióticos que contienen un anillo beta-lactámico en su estructura molecular.' },
    { nombre: 'Biofilm',           definicion: 'Comunidad de microorganismos adheridos a una superficie y recubiertos por una matriz extracelular.' },
    // C
    { nombre: 'Cefalosporina',     definicion: 'Antibiótico beta-lactámico de amplio espectro utilizado contra diversas infecciones bacterianas.' },
    { nombre: 'CIM',               definicion: 'Concentración Inhibitoria Mínima: menor concentración de un antibiótico que inhibe el crecimiento visible de un microorganismo.' },
    { nombre: 'Cultivo',           definicion: 'Técnica de laboratorio para cultivar microorganismos a partir de muestras biológicas.' },
    // D
    { nombre: 'Dosis',             definicion: 'Cantidad de medicamento administrada en un tiempo determinado.' },
    { nombre: 'Dosis de carga',    definicion: 'Dosis inicial mayor administrada para alcanzar rápidamente la concentración terapéutica.' },
    // E
    { nombre: 'Empirico',          definicion: 'Tratamiento iniciado antes de conocer el agente causal, basado en la probabilidad clínica.' },
    { nombre: 'Espectro',          definicion: 'Rango de microorganismos sobre los que un antibiótico tiene actividad.' },
    // F
    { nombre: 'Farmacocinética',   definicion: 'Estudio de la absorción, distribución, metabolismo y excreción de los fármacos en el organismo.' },
    { nombre: 'Farmacodinámica',   definicion: 'Estudio de los efectos bioquímicos y fisiológicos de los fármacos y sus mecanismos de acción.' },
    // G
    { nombre: 'Gram negativo',     definicion: 'Bacteria que no retiene el colorante cristal violeta en la tinción de Gram, debido a su pared celular delgada.' },
    { nombre: 'Gram positivo',     definicion: 'Bacteria que retiene el colorante cristal violeta en la tinción de Gram, por su gruesa capa de peptidoglicano.' },
    // H
    { nombre: 'Hemocultivo',       definicion: 'Cultivo de sangre para detectar la presencia de microorganismos en el torrente sanguíneo.' },
    { nombre: 'Hipersensibilidad', definicion: 'Reacción inmunológica exagerada ante un antígeno, como un medicamento o antibiótico.' },
    // I
    { nombre: 'Infección nosocomial', definicion: 'Infección adquirida durante la estancia en un centro de atención médica.' },
    { nombre: 'Inóculo',           definicion: 'Cantidad de microorganismos introducidos en un cultivo o en el organismo.' },
    // M
    { nombre: 'MRSA',              definicion: 'Staphylococcus aureus resistente a meticilina; bacteria de especial relevancia clínica por su multirresistencia.' },
    // N
    { nombre: 'Neutropenia',       definicion: 'Disminución anormal del número de neutrófilos en sangre, aumentando el riesgo de infecciones.' },
    // P
    { nombre: 'Patógeno',          definicion: 'Microorganismo capaz de causar enfermedad en un huésped susceptible.' },
    { nombre: 'Profilaxis',        definicion: 'Uso preventivo de antibióticos para evitar una infección antes de que ocurra.' },
    // R
    { nombre: 'Resistencia',       definicion: 'Capacidad de un microorganismo de tolerar concentraciones de un antibiótico que inhiben a otros de la misma especie.' },
    // S
    { nombre: 'Sepsis',            definicion: 'Respuesta inflamatoria sistémica grave causada por una infección, que puede comprometer órganos vitales.' },
    { nombre: 'Sensibilidad',      definicion: 'Susceptibilidad de un microorganismo a ser inhibido o eliminado por un antibiótico.' },
    // T
    { nombre: 'Tinción de Gram',   definicion: 'Técnica de coloración bacteriana que permite clasificar bacterias en gram positivas o gram negativas.' },
    // V
    { nombre: 'Vancomicina',       definicion: 'Antibiótico glucopéptido de referencia para el tratamiento de infecciones por bacterias gram positivas resistentes.' },
    { nombre: 'Virulencia',        definicion: 'Grado de patogenicidad de un microorganismo; capacidad para causar daño en el huésped.' },
  ];

  constructor() { }

  ngOnInit() {
  }

  // ── Agrupación y filtrado ────────────────────────────────────────────
  getFilteredGroups(): LetterGroup[] {
    const term = this.searchTerm.toLowerCase().trim();

    const filtered = term
      ? this.terminos.filter(t =>
          t.nombre.toLowerCase().includes(term) ||
          t.definicion.toLowerCase().includes(term)
        )
      : this.terminos;

    const groups: Record<string, Termino[]> = {};

    filtered.forEach(t => {
      const letter = t.nombre[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    });

    return Object.keys(groups)
      .sort()
      .map(letter => ({ letter, terms: groups[letter] }));
  }

  getTotalFiltered(): number {
    return this.getFilteredGroups().reduce((acc, g) => acc + g.terms.length, 0);
  }

  hasTermsForLetter(letter: string): boolean {
    return this.terminos.some(t => t.nombre[0].toUpperCase() === letter);
  }

  // ── Búsqueda ─────────────────────────────────────────────────────────
  onSearch(event: any): void {
    this.searchTerm = event.detail.value || '';
  }

  // ── Scroll a letra ───────────────────────────────────────────────────
  async scrollToLetter(letter: string): Promise<void> {
    if (!this.hasTermsForLetter(letter)) return;
    this.activeLetter = letter;

    const el = document.getElementById('letter-' + letter);
    if (el) {
      const scrollEl = await this.content.getScrollElement();
      const offset = el.offsetTop - 8;
      scrollEl.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

}
