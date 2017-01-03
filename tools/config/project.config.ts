import { join } from 'path';
import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'Email Templates Management';

    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES
    ];

    this.APP_ASSETS = [
      ...this.APP_ASSETS
    ];

    let additionalPackages: ExtendPackages[] = [
      {
        name:'ng2-bootstrap',
        path:'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
      },
      {
        name:'ng2-bootstrap/*',
        path:'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
      },
      {
        name:'moment',
        path:'node_modules/moment',
        packageMeta:{
          main: 'moment.js',
          defaultExtension: 'js'
        }
      }
    ];
    this.addPackagesBundles(additionalPackages);
  }

}
