export type Guest = {
    id: string
    name: string
    surname?: string
    /**
     * The color is used to represent the guest affinity with other guests.
     *
     * We'll try to seat together guests with similar colors.
     * An undefined color means no constraint on seating for this guest.
     */
    color?: number
}
