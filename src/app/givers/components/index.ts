import GiversComponents from './givers';
import GiverGroupsComponents from './giver-groups';
import { GiversRootComponent } from './givers-root/givers-root.component';

export default [
  GiversRootComponent,
  ...GiversComponents,
  ...GiverGroupsComponents,
];
