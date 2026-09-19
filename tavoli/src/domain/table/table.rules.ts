import { type Table } from './table.types'


/**
 * Check if a table is full
 */
export function isTableFull<T>(table: Table<T>): boolean {
    return table.seats.length >= table.capacity
}

/**
 * Check if a table is empty
 */
export function isTableEmpty<T>(table: Table<T>): boolean {
    return table.seats.length === 0
}