import type { Floor } from '../../domain/floor/floor.types'

import type { Polygon } from '../../domain/floor/floor.types'

import { polygonsOverlap } from '../../domain/floor/floor.rules'
export default function addUsableSpace<T>(
    floor: Floor<T>,
    polygon: Polygon,
): Floor<T> {
    const newUsableSpace = floor.usableSpace.concat([polygon])
    return {
        ...floor,
        usableSpace: newUsableSpace,
    }
}

export function addDeadSpace<T>(floor: Floor<T>, polygon: Polygon): Floor<T> {
    const newDeadSpace = floor.deadSpace.concat([polygon])

    if (
        floor.usableSpace.some((existingPolygon) =>
            polygonsOverlap(existingPolygon, polygon),
        )
    ) {
        return floor
    }

    return {
        ...floor,
        deadSpace: newDeadSpace,
    }
}
