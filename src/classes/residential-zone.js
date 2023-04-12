import { Building } from './building'
export class ResidentialZone extends Building {
  constructor(id,type_id,is_active, type, level, name, maxPopulation, actual_population, is_abandoned, effects, happiness, upgrade_probability, construction_event) {
    super(id,is_active, type, level,type_id,effects);
    this.name = name;
    this.maxPopulation = maxPopulation;
    this.actual_population = actual_population;
    this.is_abandoned = is_abandoned;
    this.effects = effects;
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
      type: 'parks',
    },
    {
      type: 'games',
    },
  ]

  notCoveredServices() {
    let notFound = this.requiredServices.filter(service => !this.effects.find(effect => effect.type === service.type));
    return notFound;
  }

  definePopulation() {

  }

  setIsActive(value){
    this.is_active = value; 
  }
  
  calculateHapiness(){
    let hapiness = 100;
    this.notCoveredServices().forEach(service => {
      hapiness -= 10;      
    });
    console.log(this.notCoveredServices())
    this.happiness = hapiness;
    return this.happiness;
  }
}