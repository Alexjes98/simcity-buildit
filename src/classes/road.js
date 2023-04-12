export class Road {
    constructor(name,level, capacity, trafficJams, is_jammed, effects, game_values) {
        this.name = name;
        this.level = level;
        this.capacity = capacity;
        this.trafficJams = trafficJams;
        this.is_jammed = is_jammed;
        this.effects = effects;
        this.game_values = game_values;
    }
}