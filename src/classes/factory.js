import { Building } from './building'

export class Factory extends Building {
    constructor(id, is_active, type, level, type_id, effects, game_values) {
        super(id, is_active, type, level, type_id, effects, game_values);

    }
}