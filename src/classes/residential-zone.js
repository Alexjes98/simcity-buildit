import { Building } from './building'
export class ResidentialZone extends Building {
  constructor(is_active, type, level, name, maxPopulation, actual_population, is_abandoned, services, especialities, happiness, negative_effects, upgrade_probability, construction_event, abandon_probability) {
    super(is_active, type, level);
    this.name = name;
    this.maxPopulation = maxPopulation;
    this.actual_population = actual_population;
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