import { Component, OnInit } from '@angular/core';
import { Giver, GiverGroup } from '../../models';
import { MatSnackBar } from '@angular/material';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';
import { GiverService } from '../../services/giver.service';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'gg-givers-root',
  templateUrl: './givers-root.component.html',
  styleUrls: ['./givers-root.component.scss']
})
export class GiversRootComponent implements OnInit {
  attempts = 0;
  givers: Giver[] = [];
  groups: GiverGroup[] = [];
  selectedGiver: Giver;
  selectedGiverGroup: GiverGroup;
  showGiverList = false;

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    public amplifyService: AmplifyService,
    private giverService: GiverService
  ) {}

  ngOnInit() {
    this.giverService.get().then(givers => {
      this.givers = givers;
    }).catch(err => {
      console.error(err);
    });
  }

  addGiver(giver: Giver): void {
    this.giverService.post(giver).then(res => {
      this.givers = [...this.givers, giver];
      this.showSnackbar('Giver created');
    }).catch(err => console.error(err));
  }

  assignGiver(giver: Giver, group: Giver[]): Giver {
    group = group.filter(loopedGiver => loopedGiver.name !== giver.spouse && loopedGiver.name !== giver.name);
    const randomNumber = Math.floor(Math.random() * group.length);
    const assignedTo = group[randomNumber];
    return { ...giver, assignedTo: assignedTo ? assignedTo : null };
  }

  deleteGiver(deletedGiver: Giver): void {
    this.giverService.delete(deletedGiver).then(() => {
      this.givers = this.givers.filter(giver => giver.id !== deletedGiver.id);
      this.showSnackbar(`Deleted ${deletedGiver.name}`);
    }).catch(err => console.error(err));
  }

  deleteGiverGroup(deletedGiverGroup: GiverGroup): void {
    this.groups = this.groups.filter(group => group.id !== deletedGiverGroup.id);
  }

  logout() {
    this.amplifyService.auth().signOut().then(data => this.router.navigate(['/']));
  }

  randomizeGroup(giverGroup: Giver[]): Giver[] {
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

  saveGroup({ name, givers, id }: { name: string, id?: string, givers: string[]}): void {
    // from the list of all givers, return a list of givers that have been selected to be in this new group
    const selectedGivers = this.givers.filter(giver => givers.includes(giver.id));

    // if there are an even number of selected givers
    // (a group of odd number of givers would never assign every giver another giver, someone would be left out)
    if (!(selectedGivers.length % 2)) {
      // assign a member to each giver in the group
      const newGroup = this.randomizeGroup(selectedGivers);

      // Not all groups will get every giver an assigned giver.  This is an array of
      const assignedTos = newGroup.map(giver => giver.assignedTo).filter(Boolean);

      // increment the number of attempts this function has been called by itself
      this.attempts = ++this.attempts;

      if (this.attempts === 9) {
        // The random selection has tried 9 times without getting a random order
        this.showSnackbar('Unable to create group');
      }

      if (assignedTos.length !== 0 && this.attempts < 10) {
        // there are all unique pairs and fewer than 10 attempts to randomize givers with eachother

        // this should work for both update and add. If there was an id in the payload, update, otherwise add
        this.groups = id
          ? this.groups.map(group => group.id === id ? { name, id, givers: newGroup } : group)
          : [ ...this.groups, { name, id: uuid(), givers: newGroup }];
        this.toggleGiverList(false);
        this.attempts = 0;
      } else if (this.attempts < 10) {
        this.saveGroup({ name, givers });
      }
    } else {
      this.showSnackbar('Unable to create group');
    }
  }

  selectGiver(giver: Giver): void {
    this.selectedGiver = giver;
  }

  selectGiverGroup(group): void {
    this.toggleGiverList(true);
    this.selectedGiverGroup = group;
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
    this.giverService.put(updatedGiver).then(res => {
      this.givers = this.givers.map(giver => giver.id === updatedGiver.id ? updatedGiver : giver);
      this.showSnackbar(`${updatedGiver.name} has been updated`);
      this.selectedGiver = null;
    }).catch(err => console.error(err));
  }

  updateGiverGroup(updatedGiverGroup: {id: string, name: string, givers: string[]}): void {
    this.saveGroup(updatedGiverGroup);
  }
}
