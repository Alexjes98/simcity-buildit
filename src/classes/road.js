export class Road {
    constructor(id,name,level, capacity, trafficJams, is_jammed, effects, game_values) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.capacity = capacity;
        this.trafficJams = trafficJams;
        this.is_jammed = is_jammed;
        this.effects = effects;
        this.game_values = game_values;
    }
}