import { type Table, } from '../../../src/domain/table/table.types'
import { isTableFull, isTableEmpty } from '../../../src/domain/table/table.rules'

/**
 * Error thrown when attempting to add a seat to a full table.
 */
export class TableFullError extends Error {
    constructor() {
        super('Cannot add seat to a full table')
        this.name = 'TableFullError'
    }
}

/**
 * Error thrown when attempting to remove a seat from an empty table.
 */
export class TableEmptyError extends Error {
    constructor() {
        super('Cannot remove seat from an empty table')
        this.name = 'TableEmptyError'
    }
}

/**
 * Add a seat to a table
 * @throws TableFullError if the table is full
 */
export function addSeatToTable<T>(table: Table<T>, seat: T): Table<T> {
    if (isTableFull(table)) {
        throw new TableFullError()
    }
    return {
        ...table,
        seats: [...table.seats, seat]
    }
}

/**
 * Retrurn a table with the specified seat removed
 * @throws TableEmptyError if the table is empty
 */
export function removeSeatFromTable<T>(table: Table<T>, seat: T): Table<T> {
    if (isTableEmpty(table)) {
        throw new TableEmptyError()
    }
    return {
        ...table,
        seats: table.seats.filter(s => s !== seat)
    }
}