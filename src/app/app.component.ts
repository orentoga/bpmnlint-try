import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import gridModule from "diagram-js/lib/features/grid-snapping/visuals";

import lintModule from 'bpmn-js-bpmnlint';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterContentInit, OnInit {
  @ViewChild('canvas', { static: true }) private canvas: ElementRef;
  private bpmnJS: BpmnModeler;

  constructor() {
    this.bpmnJS = new BpmnModeler({
      additionalModules: [
        lintModule,
        gridModule
      ],
      linting: {
        active: true
      },
    });

    this.bpmnJS.on('import.done', () => {
      this.bpmnJS.get('canvas').zoom('fit-viewport');
    });
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.canvas.nativeElement);
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  async ngOnInit(): Promise<void> {
    await this.bpmnJS.importXML(this.getNewDiagram());
  }

  getNewDiagram(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_${Date.now()}" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="7.0.0">
      <bpmn:collaboration id="Collaboration_14y77iu">
        <bpmn:participant id="Participant_19fcdqe" processRef="Process_1npd7tv" />
      </bpmn:collaboration>
      <bpmn:process id="Process_1npd7tv" isExecutable="false">
        <bpmn:startEvent id="StartEvent_09wqlnn" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_14y77iu">
          <bpmndi:BPMNShape id="Participant_19fcdqe_di" bpmnElement="Participant_19fcdqe" isHorizontal="true">
            <dc:Bounds x="106" y="61" width="600" height="250" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_09wqlnn">
            <dc:Bounds x="156" y="81" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`
  }
}
