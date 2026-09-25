import {
    type Point2D,
    type TableGeometry,
    type CircleGeometry,
    type RectangleGeometry,
    type Polygon,
} from './floor.types'

export const EPSILON = 1e-9

const CIRCLE_APPROXIMATION_SEGMENTS = 32

type Segment = readonly [Point2D, Point2D]

export function isCircleGeometry(geometry: TableGeometry): boolean {
    return 'radius' in geometry
}

export function isRectangleGeometry(geometry: TableGeometry): boolean {
    return 'width' in geometry
}

export function isSquareGeometry(geometry: TableGeometry): boolean {
    return 'size' in geometry
}

export function polygonsOverlap(
    existingPolygon: Polygon,
    polygon: Polygon,
): boolean {
    const epsilon = EPSILON

    const orientation = (
        start: Point2D,
        end: Point2D,
        point: Point2D,
    ): number =>
        (end.x - start.x) * (point.y - start.y) -
        (end.y - start.y) * (point.x - start.x)

    const pointOnSegment = (
        point: Point2D,
        start: Point2D,
        end: Point2D,
    ): boolean =>
        Math.abs(orientation(start, end, point)) <= epsilon &&
        point.x >= Math.min(start.x, end.x) - epsilon &&
        point.x <= Math.max(start.x, end.x) + epsilon &&
        point.y >= Math.min(start.y, end.y) - epsilon &&
        point.y <= Math.max(start.y, end.y) + epsilon

    const segmentsIntersect = (
        firstStart: Point2D,
        firstEnd: Point2D,
        secondStart: Point2D,
        secondEnd: Point2D,
    ): boolean => {
        const firstStartSide = orientation(secondStart, secondEnd, firstStart)
        const firstEndSide = orientation(secondStart, secondEnd, firstEnd)
        const secondStartSide = orientation(firstStart, firstEnd, secondStart)
        const secondEndSide = orientation(firstStart, firstEnd, secondEnd)

        if (
            (Math.abs(firstStartSide) <= epsilon &&
                pointOnSegment(firstStart, secondStart, secondEnd)) ||
            (Math.abs(firstEndSide) <= epsilon &&
                pointOnSegment(firstEnd, secondStart, secondEnd)) ||
            (Math.abs(secondStartSide) <= epsilon &&
                pointOnSegment(secondStart, firstStart, firstEnd)) ||
            (Math.abs(secondEndSide) <= epsilon &&
                pointOnSegment(secondEnd, firstStart, firstEnd))
        ) {
            return true
        }

        return (
            firstStartSide > epsilon !== firstEndSide > epsilon &&
            secondStartSide > epsilon !== secondEndSide > epsilon
        )
    }

    const containsPoint = (container: Polygon, point: Point2D): boolean => {
        let inside = false

        for (let index = 0; index < container.length; index += 1) {
            const start = container[index]
            const end = container[(index + 1) % container.length]

            if (pointOnSegment(point, start, end)) {
                return true
            }

            if (start.y > point.y !== end.y > point.y) {
                const crossingX =
                    start.x +
                    ((point.y - start.y) * (end.x - start.x)) /
                        (end.y - start.y)

                if (crossingX > point.x) {
                    inside = !inside
                }
            }
        }

        return inside
    }

    for (
        let existingIndex = 0;
        existingIndex < existingPolygon.length;
        existingIndex += 1
    ) {
        const existingStart = existingPolygon[existingIndex]
        const existingEnd =
            existingPolygon[(existingIndex + 1) % existingPolygon.length]

        for (let index = 0; index < polygon.length; index += 1) {
            const start = polygon[index]
            const end = polygon[(index + 1) % polygon.length]

            if (segmentsIntersect(existingStart, existingEnd, start, end)) {
                return true
            }
        }
    }

    return (
        containsPoint(existingPolygon, polygon[0]) ||
        containsPoint(polygon, existingPolygon[0])
    )
}
