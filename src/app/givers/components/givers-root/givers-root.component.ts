import { Component, OnInit } from '@angular/core';
import { Giver } from '../../models';
import { MatSnackBar } from '@angular/material';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'gg-givers-root',
  templateUrl: './givers-root.component.html',
  styleUrls: ['./givers-root.component.scss']
})
export class GiversRootComponent {
  givers: Giver[] = [];
  groups: any[] = [];
  selectedGiver: Giver;
  showGiverList = false;
  attempts = 0;

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    public amplifyService: AmplifyService,
  ) {}

  addGiver(giver: Giver): void {
    this.givers = [...this.givers, giver];
    this.showSnackbar('Giver created');
  }

  assignGiver(giver: Giver, group: Giver[]): Giver {
    group = group.filter(loopedGiver => loopedGiver.name !== giver.spouse && loopedGiver.name !== giver.name);
    const randomNumber = Math.floor(Math.random() * group.length);
    const assignedTo = group[randomNumber];
    return { ...giver, assignedTo: assignedTo ? assignedTo : null };
  }

  deleteGiver(deletedGiver: Giver): void {
    this.givers = this.givers.filter(giver => giver.id !== deletedGiver.id);
    this.showSnackbar(`Deleted ${deletedGiver.name}`);
  }

  logout() {
    this.amplifyService.auth().signOut().then(data => this.router.navigate(['/']));
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

  selectGiver(giver: Giver): void {
    this.selectedGiver = giver;
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'dismiss', {
      duration: 3000,
    });
  }

  toggleGiverList(isVisible: boolean): void {
    this.showGiverList = isVisible;
  }

  updateGiver(updatedGiver: Giver): void {
    this.givers = this.givers.map(giver => giver.id === updatedGiver.id ? updatedGiver : giver);
    this.showSnackbar(`${updatedGiver.name} has been updated`);
    this.selectedGiver = null;
  }
}
