// Types related to the table entity in the application


/**
 * Generic type representing a table in the application.
 * @template P - The type of the elements in the seats array.
 */
export type Table<P> = Readonly<{
    // Unique identifier for the table
    id: string
    // Maximum number of people that can be seated at the table
    capacity: number
    // Current people seated at the table
    seats: Array<P>
}>

