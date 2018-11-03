import { Component } from '@angular/core';
import { Giver } from './models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'gg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  givers: Giver[] = [];
  groups: any[] = [];
  showGiverList = false;
  attempts = 0;

  constructor(public snackBar: MatSnackBar) {}

  addGiver(giver: Giver): void {
    this.givers = [...this.givers, giver];
    this.showSnackbar('Giver created');
  }

  randommizeGroup(giverGroup: Giver[]): Giver[] {
    if (!(giverGroup.length  % 2)) {
      let available = giverGroup;
      return  giverGroup.map(giver => {
        const updatedGiver = this.assignGiver(giver, available);
        available = available.filter(availableGiver => {
          return updatedGiver.assignedTo
            ? availableGiver.id !== updatedGiver.assignedTo.id
            : null;
        });
        return updatedGiver;
      });
    }
  }

  assignGiver(giver: Giver, group: Giver[]): Giver {
    group = group.filter(loopedGiver => loopedGiver.name !== giver.spouse && loopedGiver.name !== giver.name);
    const randomNumber = Math.floor(Math.random() * group.length);
    const assignedTo = group[randomNumber];
    return { ...giver, assignedTo: assignedTo ? assignedTo : null };
  }

  saveGroup(data: string[]): void {
    const selectedGivers = this.givers.filter(giver => data.includes(giver.id));
    if (!(selectedGivers.length  % 2)) {
      const newGroup = this.randommizeGroup(selectedGivers);
      const assignedTos = newGroup.map(giver => giver.assignedTo).filter(Boolean);
      this.attempts = ++this.attempts;

      if (this.attempts === 9) {
        this.showSnackbar('Unable to create group');
      }

      if (assignedTos.length !== 0 && this.attempts < 10) {
        this.groups = [ ...this.groups, newGroup];
        this.toggleGiverList(false);
        this.attempts = 0;
      } else if (this.attempts < 10) {
        this.saveGroup(data);
      }
    } else {
      this.showSnackbar('Unable to create group');
    }

  }

  toggleGiverList(isVisible: boolean): void {
    this.showGiverList = isVisible;
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'dismiss', {
      duration: 3000,
    });
  }
}
