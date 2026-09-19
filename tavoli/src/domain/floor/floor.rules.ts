import { type Point2D, type TableGeometry, type CircleGeometry, type RectangleGeometry } from './floor.types'

const EPSILON = 1e-9

const CIRCLE_APPROXIMATION_SEGMENTS = 32

type Segment = readonly [Point2D, Point2D]

export function isCircleGeometry(geometry: TableGeometry): boolean {
    return "radius" in geometry
}

export function isRectangleGeometry(geometry: TableGeometry): boolean {
    return "width" in geometry
}

export function isSquareGeometry(geometry: TableGeometry): boolean {
    return "size" in geometry
}

