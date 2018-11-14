import { Component, Input } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger
} from "@angular/animations";
import { timingSafeEqual } from "crypto";

@Component({
  selector: "tree-structure",
  templateUrl: "./tree-structure.component.html",
  styleUrls: ["./tree-structure.component.sass"],
  animations: [
    trigger("slideInLeft", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        query(
          ":enter",
          stagger("120ms", [
            animate(
              "0.5s ease-in",
              keyframes([
                style({ opacity: 0, transform: "translateX(-25%)", offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: "translateX(15px)",
                  offset: 0.3
                }),
                style({ opacity: 1, transform: "translateX(0)", offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ]),
    trigger("slideInDown", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        query(
          ":enter",
          stagger("120ms", [
            animate(
              "0.5s ease-in",
              keyframes([
                style({ opacity: 0, transform: "translateY(-25%)", offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: "translateY(15px)",
                  offset: 0.3
                }),
                style({ opacity: 1, transform: "translateY(0)", offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        ),
        query(
          ":leave",
          stagger("-120ms", [
            animate(
              "0.2s ease-in",
              keyframes([
                style({ opacity: 1, transform: "translateY(0)", offset: 0 }),
                style({
                  opacity: 0,
                  transform: "translateY(-25%)",
                  offset: 1.0
                })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class TreeStructureComponent {
  @Input() direction;
  @Input() steps;
  @Input() parentTask;
  @Input() day;

  constructor() {}

  selectThisStep(task, i) {
    //if the parent task is clicked make subtask visible
    task.stepsVisible = !task.stepsVisible;

    //if it's not the first element
    //and the preceding element has been done
    //then select it and start animation
    console.log(task);
    if ((i > 0 && this.steps[i - 1].done === true) || i === 0) {
      task.selected = true;
    }
  }

  done(task, i) {
    task.done = true;
    //check if this is the last subtask and eventually mark the parent task as completed
    if (i+1 === this.steps.length) {
      this.parentTask.completed = true;
      console.log("completed");
      console.log(this.parentTask);
      console.log(task);
    }
    console.log(task);
  }

  //mark a task as SKIPPED
  skipped() {}

  /* NOT USED IF I KEEP THE VERTICAL SHOWING FOR ALL SUBGROUPS
  horOrVert(i) {
    if (this.direction === "vert") {
      return 'horiz'
    } else {
      return 'vert'
    }
  } */

  ngOnInit(): void {
    //this.steps = this.parentTask.steps;
    this.steps.map(step => {
      step = {
        stepVisible: false
      };
    });
  }
}
