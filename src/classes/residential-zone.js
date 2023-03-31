class ResidentialZone extends Building {
  constructor(name, maxPopulation, is_abandoned, services, especialities, happiness, negative_effects, upgrade_probability, construction_event, abandon_probability) {
    this.name = name;
    this.maxPopulation = maxPopulation;    
    this.is_abandoned = is_abandoned;    
    this.services = services;
    this.especialities = especialities;
    this.happiness = happiness;
    this.negative_effects = negative_effects;
    this.upgrade_probability = upgrade_probability;
    this.construction_event = construction_event;
    this.abandon_probability = abandon_probability;
  }

}