import { Road } from '../classes/road';
import { ResidentialZone } from '../classes/residential-zone';
import { Service } from '../classes/service';

import { __hash__ } from '../utils/utils';
import { Effect } from '../classes/effect';

export function newRoad() {
    return new Road("road", 0, 10, 0, false, []);
}

export function newResidentialZone () {
    const id = __hash__();
    return new ResidentialZone(
        id,"activable_building", false, "residential", 0,
        "home", 20, 2, false, [],
        0.5, 0, true
    )
}

export function newPoliceStation() {
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "police", 0, [],

        "basic_police_station", 3,
        new Effect(__hash__(), 0, id, 'police'),
        7, 0, false
    );
}
