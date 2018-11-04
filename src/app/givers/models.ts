export interface Giver {
  id: string;
  name: string;
  spouse: string;
  assignedTo?: Giver;
}
