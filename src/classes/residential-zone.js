import { Building } from './building'
export class ResidentialZone extends Building {
  constructor(id,type_id,is_active, type, level, name, maxPopulation,initial_population, is_abandoned, effects, happiness, upgrade_probability, construction_event, game_values) {
    super(id,is_active, type, level,type_id,effects,game_values);
    this.name = name;
    this.maxPopulation = maxPopulation;
    this.initial_population = initial_population;
    this.actual_population = this.calculatePopulation()
    this.is_abandoned = is_abandoned;
    this.happiness = happiness;
    this.upgrade_probability = upgrade_probability;
    this.construction_event = construction_event;
  }

  requiredServices = [
    {
      type: 'electricity'
    },
    {
      type: 'residual-water'
    },
    {
      type: 'cleanliness'
    },
    {
      type: 'police'
    },
    {
      type: 'firehouse'
    },
    {
      type: 'health'
    }    
  ]

  spacialitiesServices = [
    {
      type: 'specialty',
    },
  ]

  notCoveredServices() {
    let notFound = this.requiredServices.filter(service => !this.effects.find(effect => effect.type === service.type))
    return notFound
  }

  notCoveredSpecialties() {
    let notFound = this.spacialitiesServices.filter(service => !this.effects.find(effect => effect.type === service.type))
    return notFound    
  }
  
  populationBonus(){
    let bonus = 0;
    let bonuses = this.effects.filter(service => service.type === "specialty");
    bonuses.forEach(effect => {
      bonus += effect.factor;  
      if(bonus > this.maxPopulation){
        bonus = this.maxPopulation;
        return bonus;
      }    
    });
    return bonus;
  }

  calculatePopulation(){
    this.actual_population = this.initial_population + this.populationBonus();
    return this.actual_population;
  }
  
  calculateHapiness(){
    let hapiness = 100;
    this.notCoveredServices().forEach(service => {
      hapiness -= 10;      
    });
    this.notCoveredSpecialties().forEach(service =>{
      hapiness -= 10;
    })

    console.log(this.notCoveredServices(),this.notCoveredSpecialties())
    this.happiness = hapiness;
    return this.happiness;
  }
}