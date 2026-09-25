import { type Table } from './table.types'

export abstract class AbstractTableFactory<T> {
    abstract createEmptyTable(): Table<T>
    /**
     * Get the capacity of the tables created by this factory.
     */
    abstract getCapacity(): number

    protected generateId(): string {
        return crypto.randomUUID()
    }
}

export class TablesWithCapacityFactory<T> extends AbstractTableFactory<T> {
    private capacity: number

    constructor(capacity: number) {
        super()
        this.capacity = capacity
    }

    createEmptyTable(): Table<T> {
        return {
            id: this.generateId(),
            seats: [],
            capacity: this.capacity,
        }
    }

    getCapacity(): number {
        return this.capacity
    }
}
