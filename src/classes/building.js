export class Building {
    constructor(id, is_active, type, level, type_id, effects, game_values) {
        this.id = id;
        this.is_active = is_active;
        this.type = type;
        this.type_id = type_id;
        this.level = level;
        this.effects = effects;
        this.game_values = game_values;
    }
}