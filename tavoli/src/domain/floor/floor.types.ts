import { type Table } from '../table/table.types'

export type Point2D = Readonly<{
    x: number
    y: number
}>

/**
 * An implicitly closed polygon represented by an array of points. 
 * The first and last points are assumed to be connected.
 */
export type Polygon = readonly [Point2D, Point2D, Point2D, ...Array<Point2D>]


export type CircleGeometry = Readonly<{
    center: Point2D
    radius: number
}>

export type RectangleGeometry = Readonly<{
    topLeft: Point2D
    width: number
    height: number
}>

export type SquareGeometry = Readonly<{
    topLeft: Point2D
    size: number
}>

export type TableGeometry = CircleGeometry | RectangleGeometry | SquareGeometry

/**
 * Rotation in radians.
 * 
 * 0 means aligned with the x-axis.
 */
export type Orientation = number


/**
 * Represents a table placed on the floor with its geometry and orientation.
 */
export type PlacedTable<T> = Readonly<{
    table: Table<T>
    geometry: TableGeometry
    orientation: Orientation
}>

export type Floor<T> = Readonly<{
    tables: Array<PlacedTable<T>>
    usableSpace: Polygon
    deadSpace: ReadonlyArray<Polygon>
}>

export enum PlacementCheckIssue {
    Collision,
    OutOfBounds,
}

export type PlacementCheckResult = Readonly<{
    ok: boolean
    reason?: PlacementCheckIssue
}>