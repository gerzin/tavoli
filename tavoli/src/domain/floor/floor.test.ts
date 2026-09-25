import type {
    CircleGeometry,
    Polygon,
    RectangleGeometry,
    SquareGeometry,
} from './floor.types'
import {
    isCircleGeometry,
    isRectangleGeometry,
    isSquareGeometry,
    polygonsOverlap,
} from './floor.rules'

const square = (x: number, y: number, size: number): Polygon => [
    { x, y },
    { x: x + size, y },
    { x: x + size, y: y + size },
    { x, y: y + size },
]

describe('floor geometry guards', () => {
    const circle: CircleGeometry = { center: { x: 2, y: 3 }, radius: 1 }
    const rectangle: RectangleGeometry = {
        topLeft: { x: 2, y: 3 },
        width: 4,
        height: 2,
    }
    const squareGeometry: SquareGeometry = { topLeft: { x: 2, y: 3 }, size: 4 }

    test('identifies circles', () => {
        expect(isCircleGeometry(circle)).toBe(true)
        expect(isCircleGeometry(rectangle)).toBe(false)
        expect(isCircleGeometry(squareGeometry)).toBe(false)
    })

    test('identifies rectangles', () => {
        expect(isRectangleGeometry(circle)).toBe(false)
        expect(isRectangleGeometry(rectangle)).toBe(true)
        expect(isRectangleGeometry(squareGeometry)).toBe(false)
    })

    test('identifies squares', () => {
        expect(isSquareGeometry(circle)).toBe(false)
        expect(isSquareGeometry(rectangle)).toBe(false)
        expect(isSquareGeometry(squareGeometry)).toBe(true)
    })
})

describe('polygonsOverlap', () => {
    test('returns false for separate polygons', () => {
        expect(polygonsOverlap(square(0, 0, 2), square(3, 0, 2))).toBe(false)
    })

    test('returns true when polygon edges cross', () => {
        expect(polygonsOverlap(square(0, 0, 2), square(1, 1, 2))).toBe(true)
    })

    test('returns true when one polygon contains the other', () => {
        expect(polygonsOverlap(square(0, 0, 4), square(1, 1, 1))).toBe(true)
    })

    test('returns true when polygons touch at an edge', () => {
        expect(polygonsOverlap(square(0, 0, 2), square(2, 0, 2))).toBe(true)
    })
})
