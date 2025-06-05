import {Component, Input} from '@angular/core';
import {ISpell, ISpellReference} from '@models/spells.interface';
import {Store} from '@ngrx/store';
import {spellsActions} from '@store/spells/spells.actions';
import {selectSpellList} from '@store/spells/spells.selectors';

@Component({
  selector: 'app-class-spell-list',
  imports: [],
  templateUrl: './class-spell-list.component.html',
  styleUrl: './class-spell-list.component.scss'
})
export class ClassSpellListComponent {
    @Input() spellReferences: ISpellReference[] = [];
    @Input() className: string = '';
    spells: ISpell[] = []
    classLevel: number = 0;
    spellLoading = true;

    constructor(private store: Store) {}

    ngOnChanges(): void {
        this.selectLevel(1);
    }

    selectLevel(level: number) {
        this.classLevel = level;
        this.loadSpellsByLevel();
    }

    private loadSpellsByLevel() {
        const referenceByLevel: ISpellReference[] = this.spellReferences.filter(s => s.level === this.classLevel);

        this.store.dispatch(spellsActions.getSpellsFromReference({spellReferences: referenceByLevel}));

        this.store.select(selectSpellList).subscribe((spells: ISpell[]) => {
            const spellIndexList: string[] = referenceByLevel.map(sp => sp.index);
            this.spells = spells.filter((s) => spellIndexList.includes(s.index));
        });
    }
}
