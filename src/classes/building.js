import { __hash__ } from '../utils/utils';
export class Building {
    constructor(id, is_active, type, level, type_id, effects) {
        this.id = id;
        this.is_active = is_active;
        this.type = type;
        this.type_id = type_id;
        this.level = level;
        this.effects = effects;
    }
}