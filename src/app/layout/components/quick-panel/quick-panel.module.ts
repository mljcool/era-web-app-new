import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { QuickPanelComponent } from 'app/layout/components/quick-panel/quick-panel.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports: [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,
        MatButtonModule,

        FuseSharedModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule {
}
