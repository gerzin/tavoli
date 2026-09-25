import React, { useMemo, useState } from 'react';
import { FloorEditorScreen } from '../ui/screens/floor-editor';

const navItems = [
    { id: "floor-editor", label: "Floor Editor" }
];

export default function App() {

    const [screen, setScreen] = React.useState("floor-editor");
    return (
        <div className="App">

        </div>
    )
}
